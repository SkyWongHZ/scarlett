import React,{Component} from  'React'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import {addClick} from '../actions/mainActions'

class  Main  extends Component{
  addNumberClick=()=>{
    // alert('1111')
    this.props.addClick()
  }

  testClick=()=>{
    alert('这是一个test事件')
  }

  render(){
    return(
      <View>
        <TouchableOpacity style={styles.container} onPress={this.addNumberClick}>
          <Text style={styles.containerSize}>这是一个rn页面</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.testClick}>
          <Text>这是一个点击事件</Text>
        </TouchableOpacity>
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

const mapStateToProps=state=>({

})

const mapDispatchToProps=dispatch=>({
  addClick:()=>{
    dispatch(addClick())
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(Main)