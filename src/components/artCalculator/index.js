import React from "react";
import Calculator from "../Calculator/Calculator";
import withAverage from "../../HOC/withAverage/withAverage";
import { NameContext } from "../../context/profieContext";

class Art extends React.Component {
  static subject = { code: "art", score: 0 };
  static contextType = NameContext;

  constructor(props) {
    super(props);
    this.state = {
      extras: 0
    }
  }

  handelExtras = e => {
    e.persist();
    this.props.onExtrasChange(e);
    let extras = e.target.value;
    this.setState({
      extras
    });
  };

  handleName = e => {
    e.persist();
    console.log(e.target.value);
  }

  componentWillUnmount() {
    this.props._removeSubject(Art.subject)
  }

  render() {
    const name = this.context;
    return (
      //用NameContext.Consumer取值渲染 nameContext里面的name值
      <NameContext.Consumer>
        {/*实现nameContext的显示和修改， 然后同步到最外层的组件*/}
        {({ name, changeName }) =>
          <span>
            <input style={{float: 'left'}} name="name" value={name} onChange={changeName} />
            <Calculator cb={this.props._editScore} />
            {/*用prop render的方式渲染附加分数组件，最好使用行间自定义属性渲染。同时实现附加分的值修改后同步到父级组件*/}
            {this.props.extrasElm(this.state.extras, this.handelExtras)}
          </span>}
      </NameContext.Consumer>   
    );
  }
}
export default withAverage(Art, Art.subject);
