import React, { Component } from 'react';

class QuizTimer extends Component {
    constructor() {
        super();
        this.state = { time: {}, seconds: 5 };
        this.timer = 0;
        //this.startTimer = this.startTimer.bind(this);
        //this.countDown = this.countDown.bind(this);
    }

    secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = ("0" + Math.floor(divisor_for_minutes / 60)).slice(-2);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = ("0" + Math.ceil(divisor_for_seconds)).slice(-2);

        let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
        };
        return obj;
    }

    startTimer = () => {
        if (this.timer == 0 && this.state.seconds > 0) {            
            this.timer = setInterval(this.countDown, 1000);
        } else {
            this.timer = 0
            this.setState({ seconds: 5});
        }
    }

    componentWillMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);        
        this.setState({ time: timeLeftVar});
        this.startTimer();
    }

    countDown = () => {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
        });
        
        // Check if we're at zero.
        if (seconds == 0) { 
            clearInterval(this.timer);
            this.props.quizEnd();
        }
    }

    render() {
        return(
        <div>
            <button onClick={this.startTimer}>Start</button>
            {this.state.time.m}:{this.state.time.s}
        </div>
        );
    }
}

export default QuizTimer;