import React from "react";
import Art from "./components/artCalculator";
import Mathe from "./components/MathCalulator";
import dataDemo from "./demoData";
import "./App.scss";

import profile, { NameContext, EmailContext } from "./context/profieContext";
import DataSource from "./demoData";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.extras = {
      art: 0,
      mathe: 0,
    };
    this.state = {
      _Average: 0,
      _Subject: [],
      showArt: false,
      showMath: false,
      extras_Average: 0,
      email: profile.email,
      name: profile.name,
      extras_Mathe: this.extras.mathe,
    };

    dataDemo.aerageChangeCb = (_Average) => {
      this.setState({
        _Average,
      });
      this.handelExtras_Average();
    };
    dataDemo.subjectChangeCb = (_Subject) => {
      this.setState({
        _Subject,
      });
    };
  }
  changeContextValue = (e) => {
    e.persist();
    //在当前组件修改要显示的2个context值 一个name， 一个email
    this.setState({ [e.target.name]: e.target.value });
  };
  handelExtras = (e) => {
    //同步附加分数到当前组件
    e.persist();
    const name = e.target.name;
    const value = e.target.value;
    this.extras[name] = parseInt(value, 10);
    if (name === "mathe") {
      this.setState({ extras_Mathe: this.extras[name] });
    }
  };
  handelExtras_Average = () => {
    // 计算带附加分的平均数
    let totle = 0;
    DataSource._TotalSubject.forEach((e) => {
      totle += e.score + this.extras[e.code];
    });
    console.log(totle);
    let extrasAverage = (totle / DataSource._TotalSubject.length).toFixed(2);
    extrasAverage = isNaN(extrasAverage) ? 0 : extrasAverage;
    this.setState({ extras_Average: extrasAverage });
  };
  toggle = (e) => {
    e.persist();
    //显示隐藏计算器组件
    console.log(!this.state[`show${e.target.value}`]);
    this.setState({
      [`show${e.target.value}`]: !this.state[`show${e.target.value}`],
    });
  };
  render() {
    return (
      <div className="average_warp">
        <p>
          email:
          <input
            name="email"
            value={this.state.email}
            onChange={this.changeContextValue}
          />
        </p>
        <p>name:{this.state.name}</p>
        <div>
          _Subject:{/*显示没有计算附加分的科目code与对应的分数*/}
          {this.state._Subject.map((subject) => (
            <div key={subject.code}>
              {subject.code}:{subject.score}
            </div>
          ))}
        </div>
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
            <NameContext.Provider
              value={{
                name: this.state.name,
                changeName: this.changeContextValue,
              }}
            >
              {this.state.showArt && (
                <Art
                  title="请计算美术成绩"
                  onExtrasChange={this.handelExtras}
                  render={(extra, handelExtras) => {
                    return (
                      <p>
                        <input
                          type="text"
                          name="art"
                          value={extra}
                          onChange={handelExtras}
                        />
                      </p>
                    );
                  }}
                />
              )}
            </NameContext.Provider>
          </div>
          <div>
            <button onClick={this.toggle} value="Math">
              显示/影藏
            </button>
            {/*通过EmailContext.Provider向Mathe组件提供相关值*/}
            <EmailContext.Provider value={this.state.email}>
              {this.state.showMath && (
                <Mathe title="请计算数学成绩">
                  {/*在<Mathe>组件的内部定义附加分数的组件，并且实现能同步修改和显示附加分数的值*/}
                  <p>
                    extras:
                    <input
                      type="range"
                      min="0"
                      max="20"
                      name="mathe"
                      step="1"
                      value={this.state.extras_Mathe}
                      onChange={this.handelExtras}
                    />
                    {this.state.extras_Mathe}
                  </p>
                </Mathe>
              )}
            </EmailContext.Provider>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
