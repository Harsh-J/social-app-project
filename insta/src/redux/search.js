import * as ActionTypes from './ActionTypes';
import { act } from 'react-dom/test-utils';

export const SearchUser=(state={
    isLoading:true,
    errMess:null,
    searchusersinfo:[],
    

},action)=>{

    switch(action.type){
        case ActionTypes.ADD_SEARCH_USERS:
            return {...state,isLoading:false,errMess:null,searchusersinfo:action.payload};
         
        case ActionTypes.SEARCH_LOADING:
            return{...state,isLoading:true,errMess:null,searchusersinfo:[]};
        
        case ActionTypes.SEARCH_FAILED:
            return {...state,isLoading:false,errMess:action.payload,searchusersinfo:[]};

        default:
            return state;
    }
}
