'use strict';

import React, { Component } from 'react';
import { Platform, View, NativeModules, BackHandler} from 'react-native';
import { createStackNavigator, NavigationActions, } from 'react-navigation';
import { StackViewStyleInterpolator } from 'react-navigation-stack';

export default class EZNavigator extends Component {
  constructor(props) {
    super();

    // ios header 配置
    this.StackNavigatorConfig = {
      headerMode: 'float',
      navigationOptions: {
        headerBackTitle: null,
        headerStyle: {
          backgroundColor: '#fff'
        },
        headerTitleStyle: {
          fontWeight: 'normal',
          fontSize: 17,
          color: '#333'
        }
      }
    };

    if(Platform.OS === 'android') {
      this.StackNavigatorConfig = {
        transitionConfig: () => ({ screenInterpolator: StackViewStyleInterpolator.forHorizontal }),
        headerMode: 'screen',
        navigationOptions: {
          headerStyle: {
            height: 44,
            shadowColor: 'rgba(0, 0, 0, 0)',
            shadowOpacity: 0,
            shadowRadius: 0,
            shadowOffset: { height: 0 },
            elevation: 0,
            backgroundColor: '#fff',
            borderColor: '#ccc',
            borderStyle: 'solid',
            borderBottomWidth: 0.5
          },
          headerTitleStyle: {
            width: '100%',
            fontWeight: 'normal',
            fontSize: 17,
            color: '#333',
            textAlign: 'center',
            marginHorizontal: 0
          },
          headerRight: <View style={{width: 50, height: 44}} />
        }
      }
    };

    const { routes, defaultRoute, } = props;

    if(defaultRoute) {
      this.StackNavigatorConfig.initialRouteName = defaultRoute;
    }

    const ezGetStateForAction = (getStateForAction) => (action, state) => {
      const { type, routeName, } = action;

      // 跳转到底直接退出
      if(type === NavigationActions.BACK && state.index <= 0) {
        NativeModules.EzvizRNBridge.popNativeNavigation();
      }

      // 阻止快速点击重复跳转
      let isDuplicate = false;
      if(state && state.routes[state.routes.length - 1].routeName === routeName && type === NavigationActions.NAVIGATE) {
        isDuplicate = true;
        return null;
      }

      return getStateForAction(action, state);
    };

    this.NavigatorComponent = createStackNavigator(routes, this.StackNavigatorConfig);
    this.NavigatorComponent.router.getStateForAction = ezGetStateForAction(this.NavigatorComponent.router.getStateForAction);
  }


    componentDidMount() {
         BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
         BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    onBackPress = () => {
        if (this.nav.state.nav.index === 0) {
            NativeModules.EzvizRNBridge.popNativeNavigation();
            return true;
        }
        return false;
    };


    render() {
    const { NavigatorComponent } = this;
    const { onRef, onNavigationStateChange, } = this.props;

    return (
      <NavigatorComponent
          {...this.props}
        ref={nav => {onRef && onRef(nav); this.nav = nav}}
        onNavigationStateChange={(prevState, newState, action) => {
          onNavigationStateChange && onNavigationStateChange(prevState, newState, action)}
        }/>

    )
  }
}
