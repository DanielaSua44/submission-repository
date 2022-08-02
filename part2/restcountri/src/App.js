import React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios';
import Country from './Country';
import './App.css';



function App() {

  const [countries,setCountries]=useState([])
  const [filter,setFilter]=useState([])
  

  useEffect(()=>{
    console.log('effect')
    axios.get('https://restcountries.com/v2/all')
    .then(response=>{
      console.log('promise fulfilled')
      setCountries(response.data)
    })
  },[])	//if you want to run the effect only once, you can add an empty array as second 
  


  const searchCountry=(e)=>{
    e.preventDefault()
    let name=e.target.value
    let filtered=countries.filter(country=>country.name.toLowerCase().includes(name.toLowerCase()))
    
    setCountries(filtered)
    setFilter('')
    
  }

 const handleClick=(country,e)=>{
    e.preventDefault()
    console.log(country,e.value);
    setCountries(countries.filter(c=>c.name===country.name))
  }
  

  return (
    <div className="App">
      <h2 className="title">Countries</h2>
       find countries<input className="search" type="text" onChange={searchCountry}/>
      <div className="countries">
       {
         (countries.length>1 && countries.length<=10)?
          countries.map(country=>
            <div className="card" key={country.name}>
             <li className="list" key={country.name}>
                <h3>{country.name}</h3>
                <button className="btn" onClick={(e) =>handleClick(country,e)}>show</button>
             </li>
            </div>
          )
          :(countries.length===1)?
            countries.map(country=>
            <div className="card" key={country.name}>
            <li className="list" key={country.name}>
              <Country country={country}/>

            </li>
            </div>
          )
          :
          <p className="text">Too many matches, specify another filter</p>

       }
        
       </div>
  
    </div>
  );
}

export default App;
