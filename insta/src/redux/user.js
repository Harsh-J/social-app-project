import * as ActionTypes from './ActionTypes';
import { act } from 'react-dom/test-utils';

export const User=(state={
    isLoading:true,
    errMess:null,
    userinfo:[],
    userpicLoading:false,
    userpicSuccess:false,

},action)=>{

    switch(action.type){
        case ActionTypes.USER_SUCCESS:
            return {...state,isLoading:false,errMess:null,userinfo:action.payload};
         
        case ActionTypes.USER_REQUEST:
            return{...state,isLoading:true,errMess:null,userinfo:[]};
        
        case ActionTypes.USER_FAILED:
            return {...state,isLoading:false,errMess:action.payload,userinfo:[]};

        case ActionTypes.USERPIC_REQUEST:
            return{...state,userpicLoading:true,userpicSuccess:false}
        case ActionTypes.USERPIC_SUCCESS:
            return{...state,userpicLoading:false,userpicSuccess:true}
        default:
            return state;
    }
}