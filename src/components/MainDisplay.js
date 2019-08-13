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
				<button onClick={this.temperatureToggle}>{this.state.tempMeasurement === 'Fahrenheit' ? 'Convert to Celsius' : 'Convert to Fahrenheit'}</button>
				{hourlyData.map(hour => {
					return (
						<p key={hour.time}>
							On {moment(hour.time*1000).format("DD MMM YYYY hh:mm a")} the temperature will be {(this.state.tempMeasurement === 'Fahrenheit') ? `${hour.temperature}℉` : `${((hour.temperature - 32) * 5 / 9).toFixed(2)}°C`}
						</p>
					)
				})}
			</div>
		)
	}
};