import React, { Component } from "react";
import QuestionBox from "./QuestionBox";
import quizService from "../quizService";
import Result from "./Result";
import "../assets/style.css";

class QuizSet extends Component {

  state = {
    questionBank: [],
    score: 0,
    responses: 0,
    time: {},
    seconds: this.props.quizTime,
    fullName: this.props.fullName
  };

  getQuestions = () => {
    quizService().then(question => {
      this.setState({
        questionBank: question
      });
    });
  };

  completeAnswer = (answers, correctAnswer) => {
    if (answers === correctAnswer) {
      this.setState({
        score: this.state.score + 1
      });
    }

    this.setState({
      responses: this.state.responses < 5 ? this.state.responses + 1 : 5
    });

    if (this.state.responses === 4) {
      this.quizEnd();
    }
  };

  secondsToTime(secs) {

    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = ("0" + Math.floor(divisor_for_minutes / 60)).slice(-2);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = ("0" + Math.ceil(divisor_for_seconds)).slice(-2);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  }

  startTimer = () => {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  };

  countDown = () => {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });

    // Check if we're at zero.
    if (seconds == 0) {
      this.quizEnd();
    }
  };

  componentDidMount() {
    this.getQuestions();
    this.quizStart();
  }

  quizStart = () => {
    this.timer = 0;
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.startTimer();
  };

  quizEnd = () => {
    clearInterval(this.timer);
    this.setState({
      responses: 5,
      seconds: this.props.quizTime
    });
  };

  render() {

    return (
      <div className="card p-3 my-3">
        <div className="title">
          <span>Quiz: {this.state.fullName}</span> {this.state.time.m}:
          {this.state.time.s}
        </div>
        {this.state.questionBank.length > 0 &&
          this.state.responses < 5 &&
          this.state.questionBank.map(
            ({ question, answers, correct, questionId }) => (
              <QuestionBox
                question={question}
                options={answers}
                selected={answers => this.completeAnswer(answers, correct)}
                key={questionId}
              />
            )
          )}

        {this.state.responses === 5 ? (
          <Result
            score={this.state.score}
            playAgain={() => {
              this.getQuestions();
              this.quizStart();
              this.setState({
                score: 0,
                responses: 0
              });
            }}
          />
        ) : null}

        {/* <button onClick={this.props.goBack}></button> */}
      </div>
    );
  }
}

export default QuizSet;
