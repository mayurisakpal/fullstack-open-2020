import React, { useState } from "react";
import ReactDOM from "react-dom";
import Button from "../src/components/Button";
import Statistic from "../src/components/Statistic";
import "../src/index.css";

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);
  const Total = good + neutral + bad;
  return (
    <>
      <h1>Give feedback</h1>
      <Button onClick={handleGoodClick}>Good</Button>
      <Button onClick={handleNeutralClick}>Neutral</Button>
      <Button onClick={handleBadClick}>Bad</Button>
      <h2>Statistics</h2>
      {Total ? (
        <table>
          <tbody>
            <Statistic text="Good" value={good} />
            <Statistic text="Neutral" value={neutral} />
            <Statistic text="Bad" value={bad} />
            <Statistic text="All" value={Total} />
            <Statistic text="Average" value={(good - bad) / Total} />
            <Statistic text="Positive" value={`${(good / Total) * 100} %`} />
          </tbody>
        </table>
      ) : (
        "No feedback given"
      )}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
