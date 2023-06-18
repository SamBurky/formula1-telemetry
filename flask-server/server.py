from flask import Flask, session
import pandas as pd
import fastf1
import warnings
import json

warnings.simplefilter(action='ignore', category=FutureWarning)
# Enable Caching
fastf1.Cache.enable_cache('./cache')

app = Flask(__name__)
app.secret_key = "fastf1telemetrykey"

@app.route("/events/<int:year>")
def events(year):
    session["year"] = year
    schedule = fastf1.get_event_schedule(year)
    events = schedule['EventName']
    return {"events": events.tolist()}


@app.route("/sessions/<string:event>")
def sessions(event):
    session["event"] = event
    if event.startswith('Pre-Season'):
        sessions = fastf1.get_testing_event(session["year"], event)
        sessions = sessions[['Session1', 'Session2', 'Session3']]
    else:
        sessions = fastf1.get_event(session["year"], event)
        sessions = sessions[['Session1', 'Session2',
                             'Session3', 'Session4', 'Session5']]
    return {"sessions": sessions.tolist()}


@app.route("/drivers/<string:raceSession>")
def drivers(raceSession):
    session["raceSession"] = raceSession
    drivers = fastf1.get_session(session["year"], session["event"], raceSession)
    drivers.load()
    drivers = drivers.laps['Driver']
    return {"drivers": drivers.unique().tolist()}


@app.route("/lapData/<string:driver1>/<string:driver2>")
def lapData(driver1, driver2):
    session["driver1"] = driver1
    session["driver2"] = driver2
    # Get session
    selected_session = fastf1.get_session(session["year"], session["event"], session["raceSession"])
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
    laps = laps_driver_1.merge(laps_driver_2, how='outer')

    # Convert to JSON format
    # TODO: Solution for seconds formatting that preserves all data
    # json_str = laps.to_json(orient="records", date_unit="ms")
    json_str = laps.to_json(orient="records", date_unit="ms")
    parsed = json.loads(json_str)

    return parsed

@app.route("/telemetryData/<string:driver>/<int:lapNo>")
def telemetryData( driver, lapNo ):

    selected_session = fastf1.get_session(session["year"],session["event"],session["raceSession"])
    selected_session.load()

    laps_driver_1 = selected_session.laps.pick_driver(driver)
    fastest_driver_1 = laps_driver_1.pick_fastest()
    telemetry_driver_1 = fastest_driver_1.get_telemetry().add_distance()

    # laps_driver_2 = selected_session.laps.pick_driver("PER")
    # fastest_driver_2 = laps_driver_2.pick_fastest()
    # telemetry_driver_2 = fastest_driver_2.get_telemetry().add_distance()

    telemetry_driver_1 = telemetry_driver_1[['Speed', 'Distance']]
    telemetry_driver_1 = telemetry_driver_1.rename(columns={'Distance': 'x', 'Speed': 'y'})
    telemetry_driver_1['value'] = telemetry_driver_1.loc[:, 'y']

    # telemetry_driver_2 = telemetry_driver_2[['Speed', 'Distance']]
    # telemetry_driver_2 = telemetry_driver_2.rename(columns={'Distance': 'x', 'Speed': 'y'})
    # telemetry_driver_2['value2'] = telemetry_driver_2.loc[:, 'y2']

    # telemetry = pd.merge_asof(telemetry_driver_1, telemetry_driver_2, on='x', direction='nearest')


    # TESTING
    # # DRS data comes in dirty, set value 8 to 0 and anything > 8 to 1
    # telemetry_driver_1.loc[telemetry_driver_1['DRS'] == 8, 'DRS'] = 0
    # telemetry_driver_1.loc[telemetry_driver_1['DRS'] > 8, 'DRS'] = 1

    # telemetry_driver_2.loc[telemetry_driver_2['DRS'] == 8, 'DRS'] = 0
    # telemetry_driver_2.loc[telemetry_driver_2['DRS'] > 8, 'DRS'] = 1

    # # Change brake from true and false to 0 and 1
    # telemetry_driver_1.loc[telemetry_driver_1['Brake'] == True, 'Brake'] = 1
    # telemetry_driver_1.loc[telemetry_driver_1['Brake'] == False, 'Brake'] = 0

    # telemetry_driver_2.loc[telemetry_driver_2['Brake'] == True, 'Brake'] = 1
    # telemetry_driver_2.loc[telemetry_driver_2['Brake'] == False, 'Brake'] = 0

    # telemetry_driver_1 = telemetry_driver_1.drop(columns=['Date','SessionTime','DriverAhead','DistanceToDriverAhead','Time','Source','Status'])
    # telemetry_driver_2 = telemetry_driver_2.drop(columns=['Date','SessionTime','DriverAhead','DistanceToDriverAhead','Time','Source','Status'])
    # telemetry_driver_2 = telemetry_driver_2.rename(columns={'RPM': 'RPM2','Speed': 'Speed2','nGear': 'nGear2','Throttle': 'Throttle2','Brake': 'Brake2','DRS': 'DRS2','RelativeDistance': 'RelativeDistance2','X': 'X2',	'Y': 'Y2',	'Z': 'Z2',	'Distance': 'Distance2'})
    # telemetry = telemetry_driver_1.merge(telemetry_driver_2, how='outer',left_index=True, right_index=True)

    # if test == 1:
    #     json_str = telemetry_driver_1.to_json(orient="records", date_unit="ms")
    # if test == 2:
    json_str = telemetry_driver_1.to_json(orient="records", date_unit="ms")

    parsed = json.loads(json_str)

    # json_str_1 = telemetry_driver_1.to_json(orient="records", date_unit="ms")
    # json_str_2 = telemetry_driver_2.to_json(orient="records", date_unit="ms")
    # # json_str_1 = "[{\"driver_telemetry_1\":" + json_str_1[1:-1] + "}"
    # # json_str_2 = "{\"driver_telemetry_2\":" + json_str_2[1:-1] + "}]"
    # parsed1 = json.loads(json_str_1)
    # parsed2 = json.loads(json_str_2)

    # if driver == "driver1":
    #     return parsed1

    # return parsed2
    return parsed




if __name__ == "__main__":
    app.run(debug=True)
