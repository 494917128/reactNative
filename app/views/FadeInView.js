// FadeInView.js
import React, { Component } from 'react';
import {
  Animated,
} from 'react-native';

export default class FadeInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),          // 透明度初始值设为0
      rotate: new Animated.Value(0),
    };
  }
  componentDidMount() {
    var _this = this
    Animated.parallel([
        Animated.timing(                            // 随时间变化而执行的动画类型
          _this.state.fadeAnim,                      // 动画中的变量值
          {
            toValue: 1,                             // 透明度最终变为1，即完全不透明
            duration: 500,
            useNativeDriver: true,
          }
        ),Animated.timing(
            this.state.rotate, 
            {
              toValue: 1,        //属性目标值
              duration: 500,    //动画执行时间
              useNativeDriver: true,
            }
        )
    ]).start();                                  // 开始执行动画
    
  }
  render() {
    return (
      <Animated.View
        style={{
          ...this.props.style,
          transform:[
                {
                    rotate: this.state.rotate.interpolate({
                        inputRange:[0,1],
                        outputRange:['0deg','360deg']
                    })
                }
            ],
          opacity: this.state.fadeAnim,          // 将透明度指定为动画变量值
        }}
        
      >
        {this.props.children}
      </Animated.View>
    );
  }
}