from flask import Flask
import fastf1
import warnings

warnings.simplefilter(action='ignore', category=FutureWarning)
# Enable Caching
fastf1.Cache.enable_cache('./cache')

app = Flask(__name__)

@app.route("/events")
def events():
    schedule = fastf1.get_event_schedule(2021)
    events = schedule['EventName']
    return {"events": events.tolist()}

@app.route("/sessions")
def sessions():
    sessions = fastf1.get_event(2023, 1)
    sessions = sessions[['Session1','Session2','Session3','Session4','Session5']]
    return {"sessions": sessions.tolist()}

@app.route("/drivers")
def drivers():
    drivers = fastf1.get_session(2022,2,1)
    drivers.load()
    drivers = drivers.laps['Driver']
    return {"drivers": drivers.unique().tolist()}

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

if __name__ == "__main__":
    app.run(debug=True)