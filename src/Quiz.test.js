import React from "react";
import ReactDOM from "react-dom";
import Quiz from "./Quiz";

describe("Quiz app", () => {
  it("renders withoud crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Quiz />, div);
  });
});
