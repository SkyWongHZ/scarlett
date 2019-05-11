import React,{Component} from  'React'
import {View,Text,StyleSheet,TouchableOpacity,Dimensions} from 'react-native'
import {addClick} from '../actions/mainActions'
import {connect} from 'react-redux'

const  {width}=Dimensions.get('screen')
console.log('width',width);

class  Main  extends Component{
  addNumberClick=()=>{
    // alert('1111')
    this.props.addClick()
  }

  testClick=()=>{
    alert('这是一个test事件')
  }

  goIntoDetail=()=>{
    this.props.navigation.navigate('PageDetail')
  }

  render(){
    return(
      <View>
        <View>
          <TouchableOpacity style={styles.container} onPress={this.addNumberClick}>
            <Text style={styles.containerSize}>这是一个点击事件</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>{this.props.sum}</Text>
        </View>

        <TouchableOpacity onPress={this.goIntoDetail} style={styles.detailContainer} >
          <Text>跳转到详情页</Text>
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
  },
  detailContainer:{
    width:width,
    height:30,
    backgroundColor:'green',
  }
})

const mapStateToProps=state=>({
  sum:state.mainReducer.sum
})

const mapDispatchToProps=dispatch=>({
  addClick:()=>{
    dispatch(addClick())
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(Main)