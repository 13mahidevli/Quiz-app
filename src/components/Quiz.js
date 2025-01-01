import React, { useState, useEffect } from "react";
import Question from "./Questions";

export default function Quiz() {
  const [completed, setcompleted] = useState(false);
  const [currindex, setcurrindex] = useState(0);
  const [selectedanswer, setselectedanswer] = useState("");
  const [score, setscore] = useState(0);
  const [lefttime, setlefttime] = useState(15);
  const currquestion = Question[currindex];
  const [colors, setcolors] = useState("black");
  const [quizStarted, setQuizStarted] = useState(false);

  const handleNextQuestion = () => {
    if (selectedanswer == currquestion.answer) {
      setscore(score + 1);
    }
    if (currindex < Question.length - 1) {
      setcurrindex(currindex + 1);
    } else {
      setcompleted(true);
    }
    setlefttime(15);
  };

  useEffect(() => {
    if (lefttime > -1) {
      const timeinterval = setInterval(() => {
        setlefttime((prevtime) => prevtime - 1);
      }, 1000);
      return () => clearInterval(timeinterval);
    } else {
      handleNextQuestion();
    }
  }, [lefttime]);

  useEffect(() => {
    if (lefttime < 6) {
      setcolors("red");
    } else {
      setcolors("black");
    }
  }, [lefttime]);

  const startQuiz = () => {
    setQuizStarted(true); 
  };

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

  return (
    <div>
      {!quizStarted && (
        <div>
          <button onClick={startQuiz}>start quiz</button>
        </div>
      )}
      {quizStarted && (
        <>
          <div className="mx-2 text-center my-5 quiz-container">
            <h2 className="question-number">QUIZ APP</h2>
            <div className="timer">
              <p style={{ color: colors }}>Time Remaining: {lefttime}s</p>
            </div>
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
                    {index + 1}: {option}
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
        </>
      )}
    </div>
  );
}
