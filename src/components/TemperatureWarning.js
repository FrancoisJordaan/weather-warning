import React from 'react';

export const TemperatureWarning = props => {
	const { currentTemperature, previousTemperature } = props;
	let showWarning = false;

	if(previousTemperature >= 15 && previousTemperature <= 25 && (currentTemperature > 25 || currentTemperature < 15)) {
		showWarning = true
	}

	return <div>{showWarning && <h1>WARNING! Exptreme temperatures</h1>}</div>
};