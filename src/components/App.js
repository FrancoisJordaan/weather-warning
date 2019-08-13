import React from 'react';
import { MainDisplay } from './MainDisplay';
import { TemperatureWarning } from './TemperatureWarning';

export class App extends React.Component {
	state = {
		hourlyData: [],
		previousTemperature: undefined,
		currentTemperature: undefined,
		counter: 1000
	};

	componentDidMount = async () => {
		this.getWeather();
		setInterval(this.getWeather, 1200000);
	};

	getWeather = async () => {
		try {
			const response = await fetch(`api`);
			const weatherObject = await response.json();
			const data = await weatherObject["hourly"]["data"].slice(0, 23);
			this.setState({
				hourlyData: data,
				previousTemperature: this.state.currentTemperature,
				currentTemperature: (data[0].temperature - 32 * 5 / 9) // Convert fahrenheit to celcius formula
			});
		}
		catch (err) {
			this.setState({counter: (this.state.counter * 2)});
			setTimeout(this.getWeather, this.state.counter);
		}
	};

	render() {
		const { hourlyData, previousTemperature, currentTemperature } = this.state

		return (
			<div>
				<h1>The temperature forecast for Cape Town</h1>
				<TemperatureWarning currentTemperature={currentTemperature} previousTemperature={previousTemperature} />
				{hourlyData.length > 0 && <MainDisplay hourlyData={hourlyData} />}
				{hourlyData.length <= 0 && <button onClick={this.getWeather}>Retry API</button>}
			</div>
		)
	}
};