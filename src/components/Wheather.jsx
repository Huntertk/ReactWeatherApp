import React, { useEffect, useState } from 'react'
import './weather.css'
import { RiSearchFill } from "react-icons/ri";
import { HiLocationMarker } from "react-icons/hi";



const Wheather = () => {
const [inputVal, setInputVal] = useState('')
const [isLocationInput, setIsLocationInput] = useState(false)
const [dataFetching, setDataFetching] = useState(
    {
    "coord": {
        "lon": 85.1167,
        "lat": 25.6
    },
    "weather": [
        {
            "id": 721,
            "main": "Clear",
            "description": "haze",
            "icon": "50n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 0,
        "feels_like": 35.36,
        "temp_min": 33.96,
        "temp_max": 33.96,
        "pressure": 1005,
        "humidity": 0
    },
    "visibility": 4000,
    "wind": {
        "speed": 0,
        "deg": 100
    },
    "clouds": {
        "all": 0
    },
    "dt": 1683905405,
    "sys": {
        "type": 1,
        "id": 9129,
        "country": "IN",
        "sunrise": 1683848172,
        "sunset": 1683896141
    },
    "timezone": 19800,
    "id": 1260086,
    "name": "Enter Correct City Name",
    "cod": 200
}
)

const dataObjInitial = {
    "coord": {
        "lon": 85.1167,
        "lat": 25.6
    },
    "weather": [
        {
            "id": 721,
            "main": "Clear",
            "description": "haze",
            "icon": "50n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 0,
        "feels_like": 35.36,
        "temp_min": 33.96,
        "temp_max": 33.96,
        "pressure": 1005,
        "humidity": 0
    },
    "visibility": 4000,
    "wind": {
        "speed": 0,
        "deg": 100
    },
    "clouds": {
        "all": 0
    },
    "dt": 1683905405,
    "sys": {
        "type": 1,
        "id": 9129,
        "country": "IN",
        "sunrise": 1683848172,
        "sunset": 1683896141
    },
    "timezone": 19800,
    "id": 1260086,
    "name": "Enter Correct City Name",
    "cod": 200
}

const weatherIconData = [ 
    {
        weather: 'Mist',
        url: 'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/mist.svg'
    },
    {
        weather: 'Clouds',
        url: 'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/cloudy.svg'
    },
    {
        weather: 'Rain',
        url: 'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/rain.svg'
    },
    {
        weather: 'Snow',
        url: 'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/snow.svg'
    },
    {
        weather: 'Smoke',
        url: 'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/smoke.svg'
    },
    {
        weather: 'Clear',
        url: 'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/clear-day.svg'
    },
    {
        weather: 'Haze',
        url: 'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/haze.svg'
    },
] 

useEffect(() => {
    handleSubmit
},[inputVal])

const getDataFromApi = async () => {
    try{
        const response = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?q=${inputVal}&units=metric`)
    const data = await response.json()
    if(data.cod !== '404') {
        setDataFetching(data)
    } else {
        setDataFetching(dataObjInitial)
    }
    } catch(err) {
        console.error(err)
    }
    
}
const handleSubmit = (e) => {
    e.preventDefault()
    if(inputVal && dataFetching.cod !== '404'){
        getDataFromApi()
        setIsLocationInput(true)
    } else{
        setIsLocationInput(false)
    }
    setInputVal('')
}
const iconConditionallyRender = weatherIconData.filter((weath) => {
            return weath.weather === dataFetching.weather[0].main 
        })


  return (
    <div className='wheather-container'>
      <div className='form-container'>
        <HiLocationMarker className='location-icon' />
        <input 
        type="text" 
        name='input' 
        value={inputVal} 
        placeholder='Enter City Name'
        className='input'
        onChange={(e) => {setInputVal(e.target.value)}}
        />
        <button onClick={handleSubmit} className='btn'>< RiSearchFill className='btn-icon' /></button>
      </div>
    
      {isLocationInput ?
      <div className="weather-details-container scale-up-top" >

      
       <img className='wheather-icon' src={`${iconConditionallyRender[0].url}`} alt="" />
        <h1 className='temp-text'>{Math.round(dataFetching.main.temp)}°C</h1>
        <h2 className='wheather-text'>{dataFetching.weather[0].main}</h2>
        <h2 className='wheather-text'>{dataFetching.name}</h2>
        <div className="weather-details">
            <div className="humidity-container">
                <p>{dataFetching.main.humidity}%</p>
                <p>Humidity</p>
            </div>
            <div className="humidity-container">
                <p>{dataFetching.wind.speed} Km/h</p>
                <p>Wind Speed</p>
            </div>
        </div>
      </div> : <h1 className='exception-text'>Please Enter Location</h1>
    }
      
    </div>
  )
}

export default Wheather
