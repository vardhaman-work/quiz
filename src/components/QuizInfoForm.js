import React from "react";

const QuizInfoForm = (props) => {
  return (
    <form onSubmit={props.onsubmit}>
      <div className="form-group">
        <input
          type="text"
          value={props.fullName}
          name="fullname"
          className="form-control"
          onChange={(e) => props.onchange(e)}
        />
      </div>
      <input type="submit" value="Submit" className="btn btn-primary w-100" name="submit" />
    </form>
  );
};

export default QuizInfoForm;
