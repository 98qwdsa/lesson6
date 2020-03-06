import React, { Component } from 'react'
import Calculator from '../calculator/Calculator';
import withAverage from '../withAverage'
import {EmailContext} from '../context/Profile'
class Mathe extends Component {
    static subject = {
        code: "mathe",
        score: 0,
    }
    static contextType = EmailContext;
    componentWillUnmount() {
        this.props._removeSubject(Mathe.subject);
    }
    render() {
        return (
            <div>
                {this.context}
                <Calculator cb={this.props._editScore} />{this.props.children()}
                
            </div>

        )
    }
}

export default withAverage(Mathe, Mathe.subject);
