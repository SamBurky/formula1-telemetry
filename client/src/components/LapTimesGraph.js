import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

class LapTimesGraph extends React.Component {
    constructor(props) {
        super(props);

        this.handleLapDataChange = this.handleLapDataChange.bind(this);
    }

    state = { 
        lapData: ''
    }

    handleLapDataChange() {
        fetch("/lapData")
        .then(res => {
        return res.json()
        })
        .then(lapDataBack => {
        console.log(lapDataBack);
        this.setState({ lapData: lapDataBack })
        }
        )

    }

    render() { 


        return (  
                <div id="lap-times-graph">
                    <LineChart width={600} height={300} data={this.state.lapData}>
                        <XAxis interval={4} />
                        <YAxis dataKey="LapTime" type= "number" domain={['dataMin - 1', 'dataMax + 1']} />
                        <Line type="monotone" dataKey="LapTime" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                    </LineChart>
                    Lap Times Graph
                    <Button id="submit-button" onClick={this.handleLapDataChange}>Submit?</Button>

                </div>
        );
    }
}
 
export default LapTimesGraph;