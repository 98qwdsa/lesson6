import React, { Component } from 'react'
import Calculator from '../calculator/Calculator';
import withAverage from '../withAverage';
import { NameContext } from '../context/Profile';
class Art extends Component {
    constructor(props) {
        super(props)
        this.state = {
            extra: 5
        }
    }
    static subject = {
        code: 'art',
        score: 0,
    }
    componentWillUnmount() {
        this.props._removeSubject(Art.subject);
    }
    handelExtra = e => {
        e.persist();
        let extra = e.target.value;
        this.setState({
            extra: extra
        })
        this.props.onExtraChange({ extra: parseInt(extra, 10), code: e.target.name })
    }
    render() {
        return (
                <NameContext.Consumer>
                    {({ name, changeName }) =>
                        <span>
                            <input value={name} onChange={changeName} />
                            <Calculator cb={this.props._editScore} /> 
                            {this.props.extraElm(this.state.extra, this.handelExtra)}
                        </span>}
                </NameContext.Consumer>
        )
    }
}
export default withAverage(Art, Art.subject);
