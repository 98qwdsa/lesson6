import React from "react";
import Calculator from "../Calculator/Calculator";
import withAverage from "../../HOC/withAverage/withAverage";
import { EmailContext } from "../../context/profieContext";

class Mathe extends React.Component {
  static subject = { code: "mathe", score: 0 };
  static contextType = EmailContext;

  componentWillUnmount() {
    this.props._removeSubject(Mathe.subject)
  }

  render() {
    const email = this.context;
    return (
      <>
        <span>
          {/*请用class.contextType的方式获取EmailContext的值*/}
          {email}
        </span>
        <Calculator cb={this.props._editScore} />
        {/*请用props render的方式渲染附加分数组件最好使用children属性*/}
        {this.props.children}
      </>
    )
    
  }
}
export default withAverage(Mathe, Mathe.subject);
