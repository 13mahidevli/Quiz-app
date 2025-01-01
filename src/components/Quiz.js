import React, { useState, useEffect } from "react";
import Question from "./Questions";
import imgs from "./quiz.jpg";

export default function Quiz() {
  const [completed, setcompleted] = useState(false);
  const [currindex, setcurrindex] = useState(0);
  const [selectedanswer, setselectedanswer] = useState("");
  const [score, setscore] = useState(0);
  const [lefttime, setlefttime] = useState("");
  const currquestion = Question[currindex];
  const [colors, setcolors] = useState("black");
  const [quizStarted, setQuizStarted] = useState(false);
  const [number, setnumber] = useState("");

  //to next the question
  const handleNextQuestion = () => {
    setnumber(number + 1);
    if (selectedanswer == currquestion.answer) {
      setscore(score + 1);
    }
    if (currindex < Question.length - 1) {
      setcurrindex(currindex + 1);
    } else {
      setcompleted(true);
    }
    setlefttime(20);
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

  //to chagne the timer color to red
  useEffect(() => {
    if (lefttime <= 6) {
      setcolors("red");
    } else {
      setcolors("black");
    }
  }, [lefttime]);

  //to start the quiz
  const startQuiz = () => {
    setnumber(0);
    setQuizStarted(true);
    setlefttime(20);
    setcurrindex(0);
  };

  //to save the answer
  const handleanswer = (answer) => {
    setselectedanswer(answer);
  };

  //restart of the quiz
  const restart = () => {
    setcurrindex(0);
    setscore(0);
    setselectedanswer("");
    setcompleted(false);
    setlefttime(20);
    setnumber(0);
  };

  // when quiz is completed
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

  // prev... questions
  function handlePrevQuestion() {
    setlefttime(20);
    setcurrindex(currindex - 1);
  }

  return (
    <div>
      {/* when it is not started  */}
      {!quizStarted && (
        <div>
          <div>
            <img className="img" src={imgs} alt="" />
          </div>
          <button onClick={startQuiz}>start quiz</button>
        </div>
      )}

      {/* when quiz start  */}
      {quizStarted && (
        <>
          <div className="mx-2 text-center my-5 quiz-container">
            <h2 className="question-number">QUIZ APP</h2>

            {/* to show time  */}
            <div className="timer">
              <p style={{ color: colors }}>Time Remaining: {lefttime}s</p>
            </div>

            {/* to write question  */}
            <h3 className="question-text">
              {currindex + 1}) {currquestion.question}
            </h3>

            {/* the code  */}
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

            {/* to trace the number of question  */}
            <div>
              {Question.map((button, index) => (
                <button
                  key={index}
                  style={{
                    backgroundColor: index <= number ? "grey" : "white",
                  }}
                  className="button"
                ></button>
              ))}
            </div>

            {/* prev.. button  */}
            <button
              disabled={currindex == 0 ? true : false}
              className="next-btn mx-5"
              style={{
                backgroundColor: "blue",
                color: "white",
                backgroundColor: currindex == 0 ? "grey" : "blue",
              }}
              onClick={handlePrevQuestion}
            >
              Previous Q..
            </button>

            {/* next button  */}
            <button
              className="next-btn mx-5"
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
