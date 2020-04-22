import React from "react";
import Calculator from "../Calculator/Calculator";
import withAverage from "../../HOC/withAverage/withAverage";
import { NameContext } from "../../context/profieContext";

class Art extends React.Component {
  constructor(props) {
    super(props);
    this.state = { extras: 0 };
  }
  static subject = { code: "art", score: 0 };
  handelExtras = (e) => {
    e.persist();
    let extras = e.target.value;
    this.setState({
      extras,
    });
    this.props.onExtrasChange(e);
  };
  render() {
    return (
      //用NameContext.Consumer取值渲染 nameContext里面的name值
      <NameContext.Consumer>
        {({ name, changeName }) => (
          <span>
            {/*实现nameContext的显示和修改， 然后同步到最外层的组件*/}
            <input name="name" value={name} onChange={changeName} />
            <Calculator cb={this.props._editScore} />
            {/*用prop render的方式渲染附加分数组件，最好使用行间自定义属性渲染。同时实现附加分的值修改后同步到父级组件*/}
            {this.props.render(this.state.extras, this.handelExtras)}
          </span>
        )}
      </NameContext.Consumer>
    );
  }
}
export default withAverage(Art, Art.subject);
