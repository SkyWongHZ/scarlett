import React,{Component} from  'React'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'

class  PageDetail  extends Component{
  skipClick=()=>{
    this.props.navigation.goBack()
  }
  showDetail=()=>{

  }
  render(){
    return(
      <View>
        <TouchableOpacity style={styles.container} onPress={this.skipClick}>
          <Text>这是详情页</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={this.showDetail}>
            <Text>使用react-redux</Text>
          </TouchableOpacity>
          <Text>{this.props.total}</Text>
        </View>
      </View>
      
    )
  }
}

const styles=StyleSheet.create({
  container:{
    marginTop:30,
    marginLeft: 30,
  }
})

const mapStateToProps=state=>{
  return{
    total:state.PageDetailReducer.total,
  }
}

const mapDispatchToProps=dispatch=>({
 
})

export default connect(mapStateToProps,mapDispatchToProps)(PageDetail)