import React, { useState } from "react";

const QuestionBox = ({ question, options, selected }) => {
    const [answers, setAnswers] = useState(options)
  return <div className="questionBox">
    <div className="question">{question}</div>
    {answers.map((text,index)=>{
        return(
            <button 
                key={index} 
                className="answerBtn"
                onClick={()=>{
                    setAnswers([text])
                    selected(text)
                }}>
                {text}
            </button>
        )
    })}
  </div>;
};

export default QuestionBox;
