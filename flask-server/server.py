from flask import Flask
import pandas as pd
import fastf1
import warnings
import json

warnings.simplefilter(action='ignore', category=FutureWarning)
# Enable Caching
fastf1.Cache.enable_cache('./cache')

app = Flask(__name__)


@app.route("/events/<int:year>")
def events(year):
    schedule = fastf1.get_event_schedule(year)
    events = schedule['EventName']
    return {"events": events.tolist()}


@app.route("/sessions/<int:year>/<string:event>")
def sessions(year, event):
    if event.startswith('Pre-Season'):
        sessions = fastf1.get_testing_event(year, event)
        sessions = sessions[['Session1', 'Session2', 'Session3']]
    else:
        sessions = fastf1.get_event(year, event)
        sessions = sessions[['Session1', 'Session2',
                             'Session3', 'Session4', 'Session5']]
    return {"sessions": sessions.tolist()}


@app.route("/drivers/<int:year>/<string:event>/<string:session>")
def drivers(year, event, session):
    drivers = fastf1.get_session(year, event, session)
    drivers.load()
    drivers = drivers.laps['Driver']
    return {"drivers": drivers.unique().tolist()}


@app.route("/lapData/<int:year>/<string:event>/<string:session>/<string:driver1>/<string:driver2>")
def lapData(year, event, session, driver1, driver2):
    # Get session
    selected_session = fastf1.get_session(year, event, session)
    selected_session.load()

    # Include outliers
    # Format Driver 1
    laps_driver_1 = selected_session.laps.pick_driver(driver1)
    laps_driver_1 = laps_driver_1[['LapTime', 'LapNumber', 'Team', 'Driver']]
    laps_driver_1 = laps_driver_1.rename(columns={'LapTime': 'LapTime1', 'Team': 'Team1', 'Driver': 'Driver1'})

    # Format Driver 2
    laps_driver_2 = selected_session.laps.pick_driver(driver2)
    laps_driver_2 = laps_driver_2[['LapTime', 'LapNumber', 'Team', 'Driver']]
    laps_driver_2 = laps_driver_2.rename(columns={'LapTime': 'LapTime2', 'Team': 'Team2', 'Driver': 'Driver2'})

    # Merge
    laps = laps_driver_1.merge(laps_driver_2, how='outer')

    # Exclude outliers
    # Format Driver 1    
    quicklaps_driver_1 = selected_session.laps.pick_driver(driver1).pick_quicklaps()
    quicklaps_driver_1 = quicklaps_driver_1[['LapTime', 'LapNumber', 'Team', 'Driver']]
    quicklaps_driver_1 = quicklaps_driver_1.rename(columns={'LapTime': 'LapTime1', 'Team': 'Team1', 'Driver': 'Driver1'})
    
    # Format Driver 2
    quicklaps_driver_2 = selected_session.laps.pick_driver(driver2).pick_quicklaps()
    quicklaps_driver_2 = quicklaps_driver_2[['LapTime', 'LapNumber', 'Team', 'Driver']]
    quicklaps_driver_2 = quicklaps_driver_2.rename(columns={'LapTime': 'LapTime2', 'Team': 'Team2', 'Driver': 'Driver2'})
    
    # Merge
    quicklaps = quicklaps_driver_1.merge(quicklaps_driver_2, how='outer')

    # Convert to JSON format
    # TODO: Solution for seconds formatting that preserves all data
    # json_str = laps.to_json(orient="records", date_unit="ms")
    json_str = quicklaps.to_json(orient="records", date_unit="ms")
    parsed = json.loads(json_str)

    return parsed


if __name__ == "__main__":
    app.run(debug=True)
