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
			const response = await fetch(`https://ec-weather-proxy.appspot.com/forecast/29e4a4ce0ec0068b03fe203fa81d457f/-33.9249,18.4241?delay=5&chaos=0.2/api.darksky.net/forecast/29e4a4ce0ec0068b03fe203fa81d457f/-33.9249,18.4241?exclude=flags,alerts,daily`, { mode: 'no-cors' });
			const weatherObject = await response.json();
			const data = await weatherObject["hourly"]["data"].slice(0, 23); // Limit the result to a 24 hour forecast
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
			<div className="container">
				<h2 style={{textAlign: "center"}}>The temperature forecast in Cape Town</h2>
				<TemperatureWarning currentTemperature={currentTemperature} previousTemperature={previousTemperature} />
				{hourlyData.length > 0 && <MainDisplay hourlyData={hourlyData} />}
				{hourlyData.length <= 0 && <button style={{textAlign: "center"}} className="btn-floating btn-large waves-effect waves-light blue" onClick={this.getWeather}>Retry</button>}
			</div>
		)
	}
};