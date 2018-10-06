import React, { Component } from "react";
import "./Quiz.css";
import "bootstrap/dist/css/bootstrap.css";
import Hero from "./Hero";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = { clicks: 0 };
  }
  render() {
    return (
      <div className="container-fluid">
        <Hero />
      </div>
    );
  }
}

export default Quiz;
