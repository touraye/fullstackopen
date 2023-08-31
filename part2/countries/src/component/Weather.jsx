import axios from "axios";
import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
const api_key = import.meta.env.VITE_SOME_KEY

const Weather = ( { country } ) => {
	const [ capitalWeather, setCapitalWeather ] = useState( null )		
	
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country?.capital[0]}&appid=${api_key}`

	useEffect(() => {
		axios
			.get(apiUrl)
			.then((response) => {
				setCapitalWeather(response.data)
			})
			.catch((error) => alert(error))
	}, [ apiUrl ] )
	
	console.log( capitalWeather );
	if ( !capitalWeather ) return <p>.....</p>
	
	const weatherIconUrl = `http://openweathermap.org/img/w/${capitalWeather.weather[0].icon}.png`
	return (
		<div>
			<h2>Weather in {capitalWeather.name}</h2>
			<p>Temperature: {capitalWeather.main.temp} K</p>
			<p>Weather: {capitalWeather.weather[0].main}</p>
			<img src={weatherIconUrl} alt={capitalWeather.weather[0].main} />
			<p>Wind Speed: {capitalWeather.wind.speed} m/s</p>
		</div>
	)
}

export default Weather
