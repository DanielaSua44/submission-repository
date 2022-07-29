import React from "react";
import { useState } from "react";
import "./App.css";

const Button = ({ handleClick, text }) => {
  return (
    <button
      className="btn btn-secondary px-2"
      style={{ marginRight: 5 }}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);
  const [negative, setNegative] = useState(0);

  const goodClick = () => {
    setGood(good + 1);
    setAll(all + 1);
    setAverage((good - bad) / all);
    setPositive((good - bad) / all);
    setNegative(bad / all);
  };
  const badClick = () => {
    setBad(bad + 1);
    setAll(all + 1);
    setAverage((good - bad) / all);
    setPositive((good - bad) / all);
    setNegative(bad / all);
  };
  const neutralClick = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
    setAverage((good - bad) / all);
    setPositive((good - bad) / all);
    setNegative(bad / all);
  };
  console.log(good);

  return (
    <div className="App">
      <h1 className="display-2 text-primary">Give Feedback</h1>
      <Button handleClick={goodClick} text="Good" />
      <Button handleClick={badClick} text="Bad" />
      <Button handleClick={neutralClick} text="Neutral" />
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        all={all}
        average={average}
        positive={positive}
        negative={negative}
      />
    </div>
  );
};

const History = (props) => {
  console.log(props);
  if (props.all === 0) {
    return <p className="text-dark">No feedback given</p>;
  } else {
    return (
      <div>
        <table className="table table-striped">
          <tbody>
            <tr>
              <td>Good</td>
              <td>{props.good}</td>
            </tr>
            <tr>
              <td>Neutral</td>
              <td>{props.neutral}</td>
            </tr>
            <tr>
              <td>Bad</td>
              <td>{props.bad}</td>
            </tr>
            <tr>
              <td>All</td>
              <td>{props.all}</td>
            </tr>
            <tr>
              <td>Average</td>
              <td>{props.average}</td>
            </tr>
            <tr>
              <td>Positive</td>
              <td>{props.positive}</td>
            </tr>
            <tr>
              <td>Negative</td>
              <td>{props.negative}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};

const Statistics = (props) => {
  return (
    <div>
      <h2 className="display-3 text-info">Statistics</h2>
      <History good={props.good} bad={props.bad} neutral={props.neutral} all={props.all} average={props.average} positive={props.positive} negative={props.negative} />
    </div>
  );
};

export default App;
