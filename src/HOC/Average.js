import React from 'react';
import DemoData from '../demoData';

function Average (Wrap,subject){
  return class AverageComponent extends React.Component{
    setScore = (sub)=>{
      DemoData._editScore({ code:subject.code, score:sub});
    }
  
    componentDidMount(){
      DemoData._addSubject(subject);
    }
  
    componentWillUnmount(){
      DemoData._removeSubject(subject);
      this.props.changeExtraScore({code:subject.code,score:0})
    }

    render(){
      const {title,extraEle,changeExtraScore} = this.props
      return(
        <div style={{ width: '180px',margin: '40px auto',textAlign:"center"}}>
          <p>{title}</p>
          <Wrap cb={this.setScore} extraEle={extraEle} changeExtraScore={changeExtraScore}/>
        </div>
        
        
      )
    }
  }
}

export default Average;