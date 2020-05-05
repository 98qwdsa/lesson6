import React from "react";
import Art from "./components/artCalculator";
import Mathe from "./components/MathCalulator";
import dataDemo from "./demoData";
import "./App.scss";
import profile, { NameContext, EmailContext } from "./context/profieContext";

class App extends React.Component {

  constructor(props) {
    super(props);    
    this.state = {
      _Average: null,
      _Subject: [],
      showArt: true,
      showMath: true,
      extras_Average: null,
      email: profile.email,
      name: profile.name
    };
    this.extras = {
      art: 0,
      mathe: 5
    };
    dataDemo.aerageChangeCb = _Average => {
      this.setState({
        _Average
      });
      this.handelExtras_Average();
    };
    dataDemo.subjectChangeCb = _Subject => {
      this.setState({
        _Subject
      });
    };
  }
  changeContextValue = e => {
    e.persist();
    //在当前组件修改要显示的2个context值 一个name， 一个email
    if (e.target.name === 'email') {
      this.setState({
        email: e.target.value,
        name: e.target.value.match(/(\S*)@/)[1]
      });
    } else {
      this.setState({
        email: e.target.value + '@' + this.state.email.match(/@(\S*)/)[1],
        name: e.target.value
      });
    }
    
  };
  handelExtras = e => {
    //同步附加分数到当前组件
    e.persist();
    this.extras[e.target.name] = parseInt(e.target.value, 10);
    if (e.target.name === "mathe") {
      this.setState({
        matcheExtra: this.extras.mathe
      });
    }
  };
  handelExtras_Average = () => {
    // 计算带附加分的平均数
    let extras_Average = null;
    let total = 0;
    dataDemo._TotalSubject.forEach(e =>{
      total = e.score + parseInt(this.extras[e.code],10);
    });
    extras_Average= (total / dataDemo._TotalSubject.length).toFixed(2);
    this.setState({
      extras_Average
    });
  };
  toggle = e => {
    e.persist();
    //显示隐藏计算器组件
    const value = e.target.value;
    if (value === 'Math') {
      this.setState({
        showMath: !this.state.showMath
      });
    } else if (value === 'Art') {
      this.setState({
        showArt: !this.state.showArt
      }) 
    }
    
  };
  render() {
    return (
      <div className="average_warp">
        <p>
          email:{/*显示和修改Email.context的值*/}
          <input value={this.state.email} onChange = {this.changeContextValue} name="email" style = {{width: "200px"}} />
        </p>
        <p>
          name:{/*显示nameContext的值*/}
          <span name="name">{this.state.name}</span>
          
        </p>
        <p>
          _Subject: {/*显示没有计算附加分的科目code与对应的分数*/}
          {
            this.state._Subject.map(e => 
              <span key={e.code}>{e.code}: {e.score} / </span>
            )
          }
        </p>
        <p>
          _Average:{/*显示没有计算附加分数后的平均分*/}
          {this.state._Average}
        </p>
        <p>
          Extras_Average: {/*显示计算附加分数后的平均分*/}
          {this.state.extras_Average}
        </p>
        <div className="Calculator_warp">
          <div>
            <button onClick={this.toggle} value="Art">
              显示/影藏
            </button>
            {/*通过NameContext.Provider向Art组件提供相关值*/}
            {/*在<Art>组件上通过自定义属性传值利用 prop render的方式在子组件渲染附加分数的组件，并且实现在子组件修改附加分值的时候要在当前组件保存附加分数的值*/}
            <NameContext.Provider value={{name: this.state.name, changeName: this.changeContextValue}}>
              {this.state.showArt && <Art title="请计算美术成绩" onExtrasChange={this.handelExtras} extrasElm={(extras, handelExtras) => {
                this.extras.art = extras;
                return (
                  <p>
                    extras: <input type="number" name="art" value={extras} onChange={handelExtras} />
                  </p>
                )
              }} />}
            </NameContext.Provider>
          </div>
          <div>
            <button onClick={this.toggle} value="Math">
              显示/影藏
            </button>
            {/*通过EmailContext.Provider向Mathe组件提供相关值*/}
            <EmailContext.Provider value={this.state.email}>
              {this.state.showMath &&
                <Mathe title="请计算数学成绩">
                  {/*在<Mathe>组件的内部定义附加分数的组件，并且实现能同步修改和显示附加分数的值*/}
                  <p>
                    extras: <input type="range" name="mathe" value={this.extras.mathe} onChange={this.handelExtras} />
                    <span>{this.extras.mathe}</span>
                  </p>
                </Mathe>}
            </EmailContext.Provider>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
