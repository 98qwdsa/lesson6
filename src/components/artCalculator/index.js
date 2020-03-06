import React from "react";
import Calculator from "../Calculator/Calculator";
import withAverage from "../../HOC/withAverage/withAverage";

class Art extends React.Component {
  static subject = { code: "art", score: 0 };
  handelExtras = e => {
    e.persist();
    let extras = e.target.value;
    this.setState({
      extras
    });
    this.props.onExtrasChange({
      extras: parseInt(extras, 10),
      code: e.target.name
    });
  };
  render() {
    return (
      //用NameContext.Consumer取值渲染 nameContext里面的name值
      <span>
        {/*实现nameContext的显示和修改， 然后同步到最外层的组件*/}
        <Calculator cb={this.props._editScore} />
        {/*用prop render的方式渲染附加分数组件，最好使用行间自定义属性渲染。同时实现附加分的值修改后同步到父级组件*/}
      </span>
    );
  }
}
export default withAverage(Art, Art.subject);
