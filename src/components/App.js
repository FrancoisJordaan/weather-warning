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
			const response = await fetch(`https://fsjordaan-eval-test.apigee.net/data-filing`, {cache: 'no-cache'});
			const weatherObject = await response.json();
			const data = await weatherObject["hourly"]["data"].slice(0, 24); // Limit the result to a 24 hour forecast
			this.setState({
				hourlyData: data,
				previousTemperature: this.state.currentTemperature,
				currentTemperature: ((data[0].temperature - 32) * 5 / 9) // Convert fahrenheit to celcius formula
			});
		}
		catch (err) {
			this.setState({counter: (this.state.counter * 2)});
			setTimeout(this.getWeather, this.state.counter);
		}
	};

	render() {
		const { hourlyData, previousTemperature, currentTemperature } = this.state;
		const retryButtonStyle = {
			float: "left",
			marginLeft: "50px"
		};
		const appHeaderStyle = {textAlign: "center"};

		return (
			<div>
				<button style={retryButtonStyle} className="btn-floating btn-large waves-effect waves-light blue" onClick={this.getWeather}>Retry</button>
				<div className="container">
					<h2 style={appHeaderStyle}>The temperature forecast in Cape Town</h2>
					<TemperatureWarning currentTemperature={currentTemperature} previousTemperature={previousTemperature} />
					{hourlyData.length > 0 && <MainDisplay hourlyData={hourlyData} />}
				</div>
			</div>
		)
	}
};