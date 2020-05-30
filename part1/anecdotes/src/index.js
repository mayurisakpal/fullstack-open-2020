import React, { useState } from "react";
import ReactDOM from "react-dom";
import Button from "./components/Button";
import "../src/index.css";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0]);

  const handleNextClick = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  const handleVoteClick = () => {
    let score = [...points];
    score[selected] += 1;
    setPoints(score);
  };

  return (
    <>
      <h1>Anecdote of the day!</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>It has {points[selected]} votes</p>
      <Button onClick={handleVoteClick}>Vote</Button>
      <Button onClick={handleNextClick}>Next anecdote</Button>
      <h2>Anecdote with most votes</h2>
      <p>{props.anecdotes[points.indexOf(Math.max(...points))]}</p>
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
