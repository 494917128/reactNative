import React from 'react'
import { connect } from 'react-redux'
import {addCount,subtractCount} from '../store/actions'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

// redux的传参
const mapStateToProps = (state, ownProps) => {
  return {
    count: state.count
  }
}

// redux的传函数
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addCount: () => {
      dispatch(addCount(1))
    },
    subtractCount: () =>{
      dispatch(subtractCount(1))
    }
  }
}

class Count extends React.Component {

  // 这个方法名称是已经定义好的，不能改名称。用于定义初始状态
  constructor(props){
    super(props);
    this.state = {
      data:1
    }
  }

  // 在第一次渲染后调用，只在客户端
  componentDidMount (){

  }

  render() {
    return (<View>
      <Text>{this.props.count}</Text>
      <TouchableOpacity onPress={this.props.addCount}><Text>+1</Text></TouchableOpacity>
      <TouchableOpacity onPress={this.props.subtractCount}><Text>-1</Text></TouchableOpacity>
    </View>)
  }
};

// 将redux的方法和数据加载
Count = connect(
  mapStateToProps,
  mapDispatchToProps
)(Count)

export default Count