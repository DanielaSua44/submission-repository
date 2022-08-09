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
  const [notification, setNotification] = useState(null)

 
  const addName = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    setNewName('')
    setNewNumber('')
    const existingPerson = persons.find(p => p.name === personObject.name)
    if ( existingPerson ) {
      const ok = window.confirm(`${existingPerson.name} is already added to phonebook, update the number?`)
      if ( ok ) {

        personService.update(existingPerson.id, {...existingPerson, number: newNumber }).then(savedPerson => {
          setPersons(persons.map(p => p.id === existingPerson.id ? savedPerson : p ))
          notify(`Updated info of ${savedPerson.name}`)
        })
        .catch(error => {
          notify(
            `the person '${existingPerson.name}' was had already been from the server`, 'alert'
          )
          setPersons(persons.filter(p => p.id !== existingPerson.id))
        })

        return 
      }
    }

    personService.create(personObject).then(savedPerson => {
      setPersons(persons.concat(savedPerson))
      notify(`Added ${savedPerson.name}`)
    })
   
  }

  console.log(persons)
    const notify = (message, type='info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
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
        setNotification(`${persons.find(person=>person.id===id).name} was deleted from server`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
      ).catch(error=>{
        setNotification(error.message)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
      )
    }
    
  }

  
 const personsToShow = (filter.length === 0) ? persons :
    persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));





    
  return (
    <div className="App">
      <h2 className="display-2">Phonebook</h2>
      <Filter searchName={({target}) =>setFilter(target.value)} filter= {filter}/>
      <Notification notification={notification} />
      <form onSubmit={addName}>
        <div>
        <h2 className="display-3">add a new</h2>
          name: <input className="form-control"
            value={newName}
            onChange={({target})=>setNewName(target.value)}
          />
          number: <input className="form-control" 
            value={newNumber}
            onChange={({target})=>setNewNumber(target.value)}
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
                personsToShow.map(person =>
                  <Persons key={person.id} person={person} handleDelete={()=>handleDelete(person.id)}

                  />
                )
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
            onChange={searchName}
            placeholder="Search..."/>
        </div>
  )
}

const Notification = ({ notification }) => {
  if(notification === null){
    return null
  }else if(notification.includes('was already deleted from server'|| 'was added to phonebook')){
    return(
      <div className="alert alert-success" role="alert">
        {notification}
      </div>
    )
  }else{
    return(
      <div className="alert alert-danger" role="alert">
        {notification}
      </div>
    )
  }
}


