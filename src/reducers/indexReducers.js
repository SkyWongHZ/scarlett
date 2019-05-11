import {ADD_SELECT}  from '../actions/mainActions'

const initialState = {
  sum:0,
};

const indexReducers=(state=initialState,action)=>{
  switch(action.type){
    case ADD_SELECT:{
      return Object.assign({},state,{
        sum:action.sum,
      })
    }
    default:return state
  }
}

export default indexReducers