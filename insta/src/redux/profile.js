import * as ActionTypes from './ActionTypes';
import { act } from 'react-dom/test-utils';

export const Profile=(state={
    isLoading:true,
    errMess:null,
    profileposts:[]
},action)=>{

    switch(action.type){
        case ActionTypes.ADD_PROFILE:
            return {...state,isLoading:false,errMess:null,profileposts:action.payload};
         
        case ActionTypes.PROFILE_REQUEST:
            return{...state,isLoading:true,errMess:null,profileposts:[]};
        
        case ActionTypes.PROFILE_FAILED:
            return {...state,isLoading:false,errMess:action.payload,profileposts:[]};
        default:
            return state;
    }
}