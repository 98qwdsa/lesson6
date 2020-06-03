import React from 'react';
import Art from './components/Art';
import Math from './components/Math';
import DemoData from './demoData';
import "./App.scss";
import Profile,{NameContext,EmailContext} from './context/profieContext'


class Demo extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      _Average: null,
      _Subject: [],
      showArt: true,
      showMath: true,
      extras_Average: 0,
      extras: 5,
      email: Profile.email,
      nameContext:{
        name:Profile.name,
        changeName: this.changeName
      }
    }

    this.extras = {
      Art: 0,
      Math: 0
    };

    DemoData.subjectChangeCb = (_Average)=>{
      this.setState({
        _Average
      })

      this.editExtraScore();
    }

    DemoData.aerageChangeCb = (_Subject)=>{
      this.setState({
        _Subject
      })

      this.editExtraScore();
    }
  }

  changeExtraScore = (extraSubject)=>{
    console.log("enter changeExtraScore",extraSubject)
    this.extras[extraSubject.code] = extraSubject.score
    this.editExtraScore();
  }

  editExtraScore = ()=>{
    console.log("this.extra",this.extras)
    let _TotalScore = 0;
    let _Average = 0;
    let _TotalExtraScore = parseInt(this.extras.Art) + parseInt(this.extras.Math) 
    DemoData._TotalSubject.forEach(e => {
      _TotalScore += e.score;
    });
    _TotalScore += _TotalExtraScore;
    _TotalScore > 0 ? _Average = (_TotalScore / DemoData._TotalSubject.length).toFixed(2) : _Average =0;
    
    this.setState({
      extras_Average:_Average
    })
  }

  display =(e)=>{
    if("showArt" === e.target.name){
      this.setState({
        showArt: !this.state.showArt
      })
    }else if("showMath" === e.target.name){
      this.setState({
        showMath: !this.state.showMath
      })
    }
  }
  componentDidMount(){
    console.log("this.extras",this.extras);
  }


  changeEmail = (e)=>{
   this.setState({
     email: e.target.value
   })
    
  }

  changeName = (e)=>{
    console.log(e.target)
    const nameContext = {
      name: e.target.value,
      changeName: this.changeName
    }
    this.setState({
      nameContext:nameContext
    })
  }

  render(){
  
    return(
      <div className="average_warp">
        email:<input type="text" value={this.state.email} onChange={this.changeEmail}/>
        <p>name:{this.state.nameContext.name}</p>
        <p>Subject:
           {DemoData._TotalSubject !=null && DemoData._TotalSubject.map((value,key)=>{
               return (<span key={key} >{value.code}:{value.score}/</span>)
           })}
        </p>
            
        <p>Average: {DemoData._Average ? DemoData._Average : 0}</p>

        <p>Extras_Average: {this.state.extras_Average ? this.state.extras_Average :0} </p>
        
        <div className="Calculator_warp">
          <div >
            <button  type="button" name="showArt" onClick={this.display}>显示/隐藏</button>
            <NameContext.Provider value={this.state.nameContext}>
              {this.state.showArt && 
              <Art 
                title="美术成绩"
                changeExtraScore={this.changeExtraScore}
                extraEle = {
                  (extraScore,handleExtraScore)=>{
                    return(
                      <input type="number" value={extraScore} onChange={handleExtraScore}/>
                    )
                   
                  }
                }
              />
              }
            </NameContext.Provider>
          </div>
          <div>
            <button  type="button" name="showMath" onClick={this.display}>显示/隐藏</button>
            <EmailContext.Provider value={this.state.email}>

                {this.state.showMath && <Math title="数学成绩" 
                changeExtraScore={this.changeExtraScore}
                extraEle = {
                  (extraScore,handleExtraScore)=>{
                    return(
                      <input type="number" value={extraScore} onChange={handleExtraScore}/>
                    )
                   
                  }
                }
              />}
             </EmailContext.Provider>
          </div>
        </div>
        
      </div>
      
    )
  }
}

export default Demo