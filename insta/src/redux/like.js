import * as ActionTypes from './ActionTypes';
import { act } from 'react-dom/test-utils';
import { actions } from 'react-redux-form';

export const Likes=(state={
    unlikeRequest:false,
    unlikeSuccess:false,

    isLoading:false,
    errMess:null,
    likes:[],
},action)=>{

    switch(action.type){
        case ActionTypes.LIKES_REQUEST:
            return{...state,isLoading:true,errMess:null};
        case ActionTypes.ADD_LIKES:
            return {...state,isLoading:false,errMess:null,likes:action.payload};
         
        case ActionTypes.LIKES_FAILED:
            return{...state,isLoading:false,errMess:action.payload,likes:[]};

        case ActionTypes.UNLIKES_REQUEST:
            return{...state,unlikeRequest:true,unlikeSuccess:false};
            
        case ActionTypes.UNLIKES_SUCCESS:
            return{...state,unlikeRequest:false,unlikeSuccess:true};
        
        case ActionTypes.ADD_LIKE:
            var like = action.payload;
            return {...state,isLoading:false,likes:state.likes.concat(like)};
        default:
            return state;
    }
}