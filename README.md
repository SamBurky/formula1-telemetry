# formula1-telemetry
Formula 1 telemetry website

TO STARTUP:
1. 
If first time on system:
After activating virtual environment: `pip install -r requirements.txt`

Always:
Activate virtual environment with: `.\.venv\Scripts\Activate.ps1`
Start Server with: python `.\flask-server\server.py`
Start Client with: `npm start`

TODO:
- Dropdowns over the top of graphs
- Chart X and Y axis
- Chart Title and labels
- Changing data for chart
- Interactable chart
- Fix practice sessions
- Displays something other than loading when clicking dropdown other than year to start
- Remove sessions that have not occurred
- Fix timing precision with JSON formatting
- Get/Post requests instead of app.route?
- Change component libraries
- Telemetry + fastest minisectors charts
- responsiveness!
- second driver comparison
- Favicon and Site title
- Clean up codebase
- Deploy