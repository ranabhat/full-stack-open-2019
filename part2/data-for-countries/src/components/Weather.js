import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
    const [location, setLocation] = useState('')
    const [weather, setWeather] = useState('')
    const [wind, setWind] = useState('')
    const [windDir, setWindDir] = useState('')
    const [weatherIcon, setWeatherIcon] = useState('')
    // const [todos, setTodos] = useState([{ }]);
   // console.log('weatherprops', capital)
   const params = {
    access_key: '7a67f03fb3ab41801c1e250c11e6f880',
    query: capital
}
    useEffect(() => {
  
        console.log('effect')
        axios
        .get('http://api.weatherstack.com/current', {params})
        .then(response => {
            const apiResponse = response.data
            setLocation(apiResponse.location.name)
            setWeather(apiResponse.current.temperature)
            setWind(apiResponse.current.wind_speed)
            setWindDir(apiResponse.current.wind_dir)
            setWeatherIcon(apiResponse.current.weather_icons[0])
        })
        .catch(error => {
            console.log('Error Fetching data')
        })
    }, [params])
                
      //const currentweather = weather.current
      //console.log('temperature', Object.keys(currentweather))
    //   axios.get('https://api.weatherstack.com/current', {params})
    //   .then(response => {
    //     const apiResponse = response.data
    //     console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`)
    //   }).catch(error => {
    //     console.log(error)
    //   })

    return (
        <div>
            <h3>Weather in {location}</h3>
            <p><b>temperature:</b> {weather} Celsius </p>
            <img alt="weather-icon" width="50" height="50" src={weatherIcon}></img>
            <p><b>wind:</b> {wind} kph direction {windDir}</p>
            {/* <h4>Weather in {todos.name}</h4> */}
        </div>
    )
}

export default Weather