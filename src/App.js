import React, { Component } from 'react'
import profile, { EmailContext, NameContext } from './context/Profile'
import Art from './artCalculator/index'
import Mathe from './matheCalculator/index'
import dataDemo from './demoData'
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _Average: null,
      _Subject: [],
      showArt: true,
      showMathe: true,
      extra_Average: null,
      extra: 5,
      email: profile.email,
      nameContent: {
        name: profile.name,
        changeName: profile.changeName,
      }
    };
    this.extra = {
      art: 0,
      mathe: 0
    };
    dataDemo.averageChangeCb = _Average => {
      this.setState({
        _Average
      });
      this.handleExtra_Average();
    };
    dataDemo.subjectChangeCb = _Subject => {
      this.setState({
        _Subject
      });
    };
  }
  handleExtra = e => {
    this.extra[e.code] = e.extra;
  };
  handleExtra_Average = () => {
    let extra_Average = null;
    let totle = 0;
    dataDemo._TotalSuject.forEach(e => {
      totle += e.score + parseInt(this.extra[e.code], 10);
    });
    extra_Average = (totle / dataDemo._TotalSuject.length).toFixed(2);
    this.setState({
      extra_Average
    });
  };
  render() {
    return (
      <div style={{ textAlign: "center", marginTop: '1rem' }}>
        email:<input value={this.state.email} onChange={e => {
          this.setState({
            email: e.target.value
          });
        }} />
        <p>name: {this.state.nameContent.name}</p>
        <p>
          _Subject:{this.state._Subject.map(e =>
            <span key={e.code}>
              {e.code}:{e.score} /
              </span>
          )}
        </p>
        <p> _Average:{this.state._Average}</p>
        <p>Extras_Average: {this.state.extra_Average}</p>
        <div className="cal">
          <div className="art">
            <button onClick={(e) => {
              const value = e.target.value;
              this.setState({
                [`show${value}`]: !this.state[`show${value}`]
              });
            }} value="Art">
              显示/隐藏
            </button>
            <NameContext.Provider value={this.state.nameContent}>
              {this.state.showArt &&
                <Art
                  title="请计算美术成绩"
                  onExtraChange={this.handleExtra}
                  extraElm={(extra, handleExtra) => {
                    this.extra.art = extra;
                    return (
                      <p>
                        extra:<input type="number" name="art" value={extra} onChange={handleExtra} />
                      </p>
                    );
                  }}
                />}
            </NameContext.Provider>
          </div>
          <div className="mathe">
            <button onClick={(e) => {
              const value = e.target.value;
              this.setState({
                [`show${value}`]: !this.state[`show${value}`]
              });
            }} value="Mathe">
              显示/隐藏
            </button>
            <EmailContext.Provider value={this.state.email}>
              {this.state.showMathe &&
                <Mathe title="请计算数学成绩">
                  {
                    () => {
                      return (
                        <p>
                          extra:
                          <input type="range" min="-20" max="20" step="5" name="mathe" value={this.state.extra} onChange={e => {
                            const extra = e.target.value;
                            this.handleExtra({
                              code: "mathe",
                              extra
                            });
                            this.setState({ extra });
                          }}
                          />
                          <span>{this.state.extra}</span>
                        </p>
                      );
                    }
                  }
                </Mathe>}
            </EmailContext.Provider>
          </div>
          <div style={{ clear: "both" }}></div>
        </div>

      </div>
    )
  }
}

