import React,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import { createStore ,applyMiddleware} from 'redux'
import { Provider, connect} from 'react-redux'
import thunk from 'redux-thunk';
import  indexReducers  from './reducers/indexReducers'
import {addClick}  from './actions/mainActions'

class  Main  extends Component{
  addNumberClick=()=>{
    // alert('1111')
    this.props.addClick()
  }

  testClick=()=>{
    alert('这是一个test事件')
  }

  render(){
    console.log('this.props.sum',this.props.sum);
    return(
      <View>
        <View>
          <TouchableOpacity style={styles.container} onPress={this.addNumberClick}>
            <Text style={styles.containerSize}>这是一个rn页面</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.testClick}>
            <Text>这是一个点击事件</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>{this.props.sum}</Text>
        </View>
      </View>
    )
  }
}


const styles=StyleSheet.create({
  container:{
    marginTop:30,
    marginLeft: 50,
  },
  containerSize:{
    color:'green',
    fontSize: 20,
  }
})

const mapStateToProps=(state)=>{
  return{
    sum:state.sum
  }
}


const mapDispatchToProps=dispatch=>({
  addClick:()=>{
    dispatch(addClick())
  },
})

const ConnectAppBase = connect(mapStateToProps, mapDispatchToProps)(Main);

const App = () => {
  const store = createStore(indexReducers, applyMiddleware(thunk));

  return (
    <Provider store={store}>
      <ConnectAppBase/>
    </Provider>
  );
}

export default App;








