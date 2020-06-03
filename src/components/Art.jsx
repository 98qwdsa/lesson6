
import React from 'react';
import Calculator from './Calculator/Calculator';
// import DemoData from '../demoData';
import Average from '../HOC/Average';
import {NameContext} from '../context/profieContext'

class Art extends React.Component{
  static subject = { code:"Art", score:0};
  static extra = {code:'Art', score:5}
 

  constructor(props){
    super(props);
    
    this.state = {
      extra: {
        code:'Art',
        score:5
      }
    }
  }

  // setScore = (score)=>{
  //   console.log("art",this.subject);
  //   DemoData._editScore({ code:"Art", score:score});
  // }

  // componentDidMount(){
  //   DemoData._addSubject(this.subject)
  //   console.log("art component",this.subject);
    
  // }

  // componentWillUnmount(){
  //   console.log("Art will unmont");
  //   DemoData._removeSubject(this.subject);
  // }

  handelExtra = (e)=>{
    const newEle = {
      code:'Art',
      score:e.target.value
    }
    this.setState({
      extra: newEle
    })
    
    this.props.changeExtraScore(newEle);
  }

  render(){
    const { cb} = this.props;
    return(
      <div>
        <NameContext.Consumer>
          {
            ({name,changeName})=>{
              return(
                <span>
                  <input type="text" value={name} onChange={changeName}/>
                  <Calculator cb={cb}></Calculator>
                  {this.props.extraEle(this.state.extra.score,this.handelExtra)}
                </span>
              )
             
            }
          }
          
        </NameContext.Consumer>
        
      </div>
     
    )
  }
}

export default Average(Art,Art.subject);