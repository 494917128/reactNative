import { combineReducers } from 'redux'

const reducers = combineReducers({
  count:(state=0,action)=>{
  	switch (action.type){
  		case ('ADD_COUNT'):
  			return state + action.num;
  		case ('SUBTRACT_COUNT'):
  			return state - action.num;
  		default:
  			return state;
  	}
  },
  animateCls:(state='', action) => {
    switch (action.type) {
      case "CURRENT_ANIMATE":
          return action.cls
      default:
          return state
    }
  } 
})

export default reducers