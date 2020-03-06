import React, { Component } from "react";
import demoData from "./demoData";

export default function withAverage(Warp, subject) {
  class Average extends Component {
    componentDidMount() {
      demoData._addSubject(subject);
    }

    _removeSubject(sub) {
      sub && demoData._removeSubject(sub);
    }

    _editScore(score) {
      demoData._editScore({ ...subject, ...{ score } });
    };
    render() {
      const {
        title,
        ...passThroughProps
      } = this.props;
      return (
        <>
          <p>{title}</p>
          <Warp
            {...passThroughProps}
            _editScore={this._editScore}
            _removeSubject={this._removeSubject}
          />
        </>
      );
    }

  };
  Average.subject = Warp.subject
  return Average;
} 