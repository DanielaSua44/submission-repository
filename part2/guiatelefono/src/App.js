import React from "react";
import { useState,useEffect } from "react";
import "./App.css";
import Persons from './Component/Persons'
import personService from './personService'

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState('')
  const [exitMessage, setExitMessage] = useState(null)

 
  const addName = (e) => {
    e.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService.create(personObject).then(returnedPerson => {
        setPersons(...persons, returnedPerson)
        setNewName("");
        setNewNumber("");
        setExitMessage(`${newName} was added to phonebook`)
      }
      ).catch(error =>{
        setErrorMessage(`${newName} was already deleted from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }
  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    }
    )
  }, [])

  const handleDelete=(id)=>{
    console.log(id)
    if(window.confirm(`Delete ${persons.find(person=>person.id===id).name}?`)){
      personService.deletePerson(id).then(()=>{
        setPersons(persons.filter(person=>person.id!==id))
        setExitMessage(`${persons.find(person=>person.id===id).name} was deleted from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
      ).catch(error=>{
        setErrorMessage(error.message)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
      )
    }
    
  }
  const handleNameChange=(e)=>{
    setNewName(e.target.value)
  }
  const handleNumberChange=(e)=>{
    setNewNumber(e.target.value)
  }
  
  const  updateNumber=(id,number)=>{
    const person=persons.find(person=>person.id===id)
    const changedPerson={...person,number}
    if(window.confirm(`${person.name} is already added to phonebook, replace the old number with new number?`)){
      personService.update(id,changedPerson).then(returnedPerson=>{
        setPersons(persons.map(person=>person.id!==id?person:returnedPerson))
        setExitMessage(`${person.name}'s number was updated`)
      }
      ).catch(error=>{
        setErrorMessage(`${person.name} was already deleted from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
      )
    }
  }

  const searchName=(e)=>{
    e.preventDefault()
    const filtered = persons.filter(person=>person.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilter(e.target.value)
    setPersons(filtered)
  }

  const rows=persons?.map(person=>{
      return <Persons key={person.id} person={person} 
      handleDelete={()=>handleDelete(person.id)}
      updateNumber={()=>updateNumber(person.id,newNumber)}
      />
    }
    )

    
  return (
    <div className="App">
      <h2 className="display-2">Phonebook</h2>
      <Filter searchName={searchName} filter= {filter}/>
      <Notification message={errorMessage || exitMessage} />
      <form onSubmit={addName}>
        <div>
        <h2 className="display-3">add a new</h2>
          name: <input className="form-control"
            value={newName}
            onChange={handleNameChange}
          />
          number: <input className="form-control" 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div >
          <button type="submit" className="btn btn-warning">add</button>
        </div>
      </form>
      <h2 className="display-3">Numbers</h2>
        
          <table className="table table-striped">
            <tbody>
              {
                rows
              }
            </tbody>
          </table>

    </div>
  );
}
export default App;


const Filter=({searchName,filter})=>{
  return(
     <div>
          filter shown with: <input className="form-text"
            value={filter}
            onChange={(e)=>searchName(e)}
            placeholder="Search..."/>
        </div>
  )
}

const Notification = ({ message }) => {
  if(message === null){
    return null
  }else if(message.includes('was already deleted from server'|| 'was added to phonebook')){
    return(
      <div className="alert alert-success" role="alert">
        {message}
      </div>
    )
  }else{
    return(
      <div className="alert alert-danger" role="alert">
        {message}
      </div>
    )
  }
}


