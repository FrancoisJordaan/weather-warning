import React from 'react';
import moment from 'moment';

export class MainDisplay extends React.Component {
	state = {
		tempMeasurement: 'Fahrenheit'
	};

	temperatureToggle = () => {
		(this.state.tempMeasurement === 'Fahrenheit') ? this.setState({tempMeasurement: 'Celsius'}) : this.setState({tempMeasurement: 'Fahrenheit'})
	}

	render() {
		const { hourlyData } = this.props;

		return (
			<div>
				<div style={{textAlign: "center"}}>
					<button className="waves-effect waves-light btn-small" onClick={this.temperatureToggle}>{this.state.tempMeasurement === 'Fahrenheit' ? 'Convert to Celsius' : 'Convert to Fahrenheit'}</button>
				</div>
				<div className="collection">
					{hourlyData.map(hour => {
						return (
							<p className="collection-item" key={hour.time}>
								On {moment(hour.time*1000).format("DD MMM YYYY hh:mm a")} the temperature will be {(this.state.tempMeasurement === 'Fahrenheit') ? `${hour.temperature}℉` : `${((hour.temperature - 32) * 5 / 9).toFixed(2)}°C`}
							</p>
						)
					})}
				</div>
			</div>
		)
	}
};