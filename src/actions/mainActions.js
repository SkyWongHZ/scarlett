export const ADD_SELECT='ADD_SELECT'

export  function addClick(){
  return(dispatch,getState)=>{
    dispatch({
      type:ADD_SELECT,
      sum:5,
    })
  }
}




