import React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios';


const api_key = process.env.REACT_APP_API_KEY
const Country=({country})=>{
   const [city,setCity]=useState([])

    useEffect(()=>{
        console.log('effect')
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`)
        /*axios.get(`http://api.weatherstack.com/current
         ? access_key =api_key
         & query = ${country.capital}`)*/
        .then(response=>{
            console.log('promise fulfilled')
            setCity(response.data)
        }
        )
    },[country.capital])
    console.log(city)
    return(
        <div className="card">
            <h3>{country.name}</h3>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <p>languages {country.languages.map(language=>language.name).join(', ')}</p>
            <img src={country.flag} alt={country.name} style={{width:200 ,height:200}}/>
            <h2>Weather in {country.capital}</h2>
            {
                city.main && <><p>temperature {Math.round(city.main.temp)}</p>
                <p> min: {Math.round(city.main.temp_min)}</p>
                 <p>max:  {Math.round(city.main.temp_max)}</p>
                <p>wind {city.wind.speed}</p>
                <img src={"http://openweathermap.org/img/wn/" + city.weather[0].icon + "@2x.png"} width="80" height="80" alt="" /></>

            }

        </div>
    )
}

export default Country;