import React, { Component } from "react";
import QuizSet from "./components/QuizSet";
import QuizInfoForm from "./components/QuizInfoForm";

class App extends Component {
  state = {
    step: 1,
    fullname: "",
    email: "",
    phone: ""
  };

  inputChangeHandler = e => {
    this.setState({
      fullname: e.target.value
    })
  };

  nextStep = () => {
    let { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  prevStep = () => {
    let { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  render() {
    let { step } = this.state;
    switch (step) {
      case 1:
        return (
          <div className="container">
          <div className="card p-3 my-5 col-12 col-md-6 offset-md-3 box-shadow">
            <h1 className="text-center">Quiz</h1>
            <QuizInfoForm
              value="HW"
              fullName={this.state.fullname}
              onchange={this.inputChangeHandler}
              onsubmit={this.nextStep}
            />
            </div>
          </div>
        );
        break;
      case 2:
        return (
          <div className="container">
            <QuizSet
              fullName={this.state.fullname}
              quizTime="20"
              goBack={this.prevStep}
            />
          </div>
        );
        break;
      default:
        break;
    }
  }

  componentDidMount(){
    this.setState({
      fullname: this.state.fullname 
    })
  }
}

export default App;
