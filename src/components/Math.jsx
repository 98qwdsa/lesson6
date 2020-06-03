import React from 'react';
import Calculator from './Calculator/Calculator';
// import DemoData from '../demoData';
import Average from '../HOC/Average';
import {EmailContext} from '../context/profieContext'

class Math extends React.Component{
  static subject = { code:"Math", score:0};
  static extra = {code:'Math', score:5}
  static contextType = EmailContext;

  constructor(props){
    super(props);
    
    this.state = {
      extra: {
        code:'Math',
        score:5
      }
    }
  }

  // setScore = (score)=>{
  //   console.log("Math",this.subject);
  //   DemoData._editScore({ code:"Math", score:score});
  // }

  // componentDidMount(){
  //   DemoData._addSubject(this.subject)
  // }

  // componentWillUnmount(){
  //   DemoData._removeSubject(this.subject);
  // }

  handelExtra = (e)=>{
    const newEle = {
      code:'Math',
      score:e.target.value
    }
    this.setState({
      extra: newEle
    })
    
    this.props.changeExtraScore(newEle);
  }

  render(){
    return(
      <div>
        {this.context}
        <Calculator title={this.props.title}  cb={this.props.cb}></Calculator>
        {this.props.extraEle(this.state.extra.score,this.handelExtra)}
      </div>
     
    )
  }
}

export default Average(Math,Math.subject);