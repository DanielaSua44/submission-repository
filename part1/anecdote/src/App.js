import React from 'react';
import {useState} from 'react';


function App() {
  const [select,setSelect] = useState(0)
  const [clicks,setClicks] = useState(0)
  const [points,setPoints] = useState([])
  

  const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


const handleVoteClick = () => {
  setClicks(clicks + 1)
  setPoints([...points , select])
}
console.log(points)
console.log(points[0])
const handleClick = () => {
  setSelect({
    ...select,
    select:Math.floor(Math.random()*anecdotes.length)
  })
  setClicks(0)

}
const mostVotes=({points}) => {
  const max=points.reduce((a,b)=>{
    return a>b?a:b
  }
  ,0)
  console.log(max)
  return anecdotes[max.select]
}
console.log(select)
console.log(anecdotes[select.select])
  return (
    <div className="App">
      <h1 className="display-3">Anecdote of the day</h1>
      <p className="text-info">{anecdotes[select.select]}</p>
      <p className="text-dark">has {clicks} votes</p>
      <button className="btn btn-success" onClick={handleClick}>Next anecdote</button>
      <button className="btn btn-primary" onClick={handleVoteClick}>Vote</button>
      <h2 className="display-4">Anecdote with most votes</h2>
      <p className="text-info">{mostVotes({points})}</p>
      <p className="text-dark">has {clicks} votes</p>
    </div>
  );
}

export default App;
