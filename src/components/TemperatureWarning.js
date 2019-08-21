import React from 'react';

export const TemperatureWarning = props => {
	const { currentTemperature, previousTemperature } = props;
	let showWarning = false;

	if(previousTemperature >= 15 && previousTemperature <= 25 && (currentTemperature > 25 || currentTemperature < 15)) {
		showWarning = true
	}

	return <div style={{textAlign: "center"}}>{showWarning && <div><i class="large material-icons">warning</i><h2>WARNING! Extreme temperatures</h2></div>}</div>
};