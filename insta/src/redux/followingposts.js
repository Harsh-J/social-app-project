import * as ActionTypes from './ActionTypes';
import { act } from 'react-dom/test-utils';

export const FollowingPosts=(state={
    isLoading:true,
    errMess:null,
    posts:[]
},action)=>{

    switch(action.type){
        case ActionTypes.FOLLOWING_POSTS_SUCCESS:
            return {...state,isLoading:false,errMess:null,posts:action.payload};
         
        case ActionTypes.FOLLOWING_POSTS_LOADING:
            return{...state,isLoading:true,errMess:null,posts:[]};
        
        case ActionTypes.FOLLOWING_POSTS_FAILED:
            return {...state,isLoading:false,errMess:action.payload,posts:[]};
        default:
            return state;
    }
}