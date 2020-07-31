import * as ActionTypes from './ActionTypes';
import { act } from 'react-dom/test-utils';

export const OUser=(state={
    isLoading:true,
    errMess:null,
    ouserinfo:[],
    ouserposts:[],
    ouserfollowLoading:false,
    ouserfollowSuccess:false,
    ouserunfollowLoading:false,
    ouserunfollowSuccess:false,
    

},action)=>{

    switch(action.type){
        case ActionTypes.OUSER_SUCCESS:
            return {...state,isLoading:false,errMess:null,ouserinfo:action.payload.user,ouserposts:action.payload.posts};
         
        case ActionTypes.OUSER_REQUEST:
            return{...state,isLoading:true,errMess:null,ouserinfo:[],ouserposts:[]};
        
        case ActionTypes.OUSER_FAILED:
            return {...state,isLoading:false,errMess:action.payload,ouserinfo:[],ouserposts:[]};
        case ActionTypes.OUSER_FOLLOW_REQUEST:
            return{...state,ouserfollowLoading:true,ouserfollowSuccess:false};
        case ActionTypes.OUSER_FOLLOW_SUCCESS:
            return{...state,ouserfollowLoading:false,ouserfollowSuccess:true};

        case ActionTypes.OUSER_UNFOLLOW_REQUEST:
                return{...state,ouserunfollowLoading:true,ouserunfollowSuccess:false};
        case ActionTypes.OUSER_UNFOLLOW_SUCCESS:
                return{...state,ouserunfollowLoading:false,ouserunfollowSuccess:true};
        

       
        default:
            return state;
    }
}