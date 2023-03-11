from flask import Flask
import fastf1
import warnings

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


@app.route("/lapData")
def lapData():
    selected_session = fastf1.get_session(2022, 'Bahrain Grand Prix', 'Race')
    selected_session.load()
    quicklaps_driver_1 = selected_session.laps.pick_driver(
        'VER').pick_quicklaps()
    quicklaps_driver_1 = quicklaps_driver_1[[
        'LapTime', 'LapNumber', 'Team', 'Driver']]
    return {"lapData": quicklaps_driver_1.to_json()}


if __name__ == "__main__":
    app.run(debug=True)
