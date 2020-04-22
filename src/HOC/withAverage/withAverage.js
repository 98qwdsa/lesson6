import React from "react";
import demoData from "../../demoData";
import hoistNonReactStatic from "hoist-non-react-statics";
import DataSource from "../../demoData";
export default function withAverage(Warp, subject) {
  //Warp.prototype.componentWillUnmount = function() {};
  class Average extends React.Component {
    //实现在组件实例化的时候在模拟服务中添加改科目与成绩
    componentDidMount() {
      DataSource._addSubject(subject);
    }

    //实现在组件销毁的时候在模拟服务中删除改科目与成绩
    componentWillUnmount() {
      DataSource._removeSubject(subject);
    }

    _editScore(score) {
      demoData._editScore({ ...subject, ...{ score } });
    }
    render() {
      const { title, ...passThroughProps } = this.props;
      return (
        <>
          <p>{title}</p>
          <Warp {...passThroughProps} _editScore={this._editScore} />
        </>
      );
    }
  }
  //Average.subject = Warp.subject
  hoistNonReactStatic(Average, Warp);
  return Average;
}
