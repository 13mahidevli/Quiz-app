import React, { useState } from "react";
import Question from "./Questions";

export default function Quiz() {
  const [completed, setcompleted] = useState(false);
  const [currindex, setcurrindex] = useState(0);
  const [selectedanswer, setselectedanswer] = useState("");
  const [score, setscore] = useState(0);

  const currquestion = Question[currindex];

  const handleanswer = (answer) => {
    setselectedanswer(answer);
  };

  const restart = () => {
    setcurrindex(0);
    setscore(0);
    setselectedanswer("");
    setcompleted(false);
  };

  if (completed) {
    return (
      <div className="quiz-completed">
        <h2 className="quiz-completed-title">complete</h2>
        <p className="quiz-score">
          Your score: {score} out of {Question.length}
        </p>
        <button className="restart-btn" onClick={restart}>
          restart
        </button>
      </div>
    );
  }

  const handleNextQuestion = () => {
    if (selectedanswer == currquestion.answer) {
      setscore(score + 1);
    }
    if (currindex < Question.length - 1) {
      setcurrindex(currindex + 1);
    } else {
      setcompleted(true);
    }
  };

  return (
    <div className="mx-2 text-center my-5 quiz-container">
      <h2 className="question-number">QUIZ APP</h2>
      <h3 className="question-text">
        {currindex + 1}) {currquestion.question}
      </h3>
      <div className="my-3 options-container">
        {currquestion.options.map((option, index) => (
          <>
            <div
              key={index}
              onClick={() => handleanswer(option)}
              className="mx-1 option-btn"
            >
              {option}
            </div>
          </>
        ))}
      </div>
      <div>
        {Question.map(() => (
          <button className="button"></button>
        ))}
      </div>
      <button
        className="next-btn"
        style={{ backgroundColor: "blue", color: "white" }}
        onClick={handleNextQuestion}
      >
        Next Question
      </button>
    </div>
  );
}
