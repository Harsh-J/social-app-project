import * as ActionTypes from './ActionTypes';
import { act } from 'react-dom/test-utils';
import { actions } from 'react-redux-form';

export const Delete=(state={
    deleteLoading:false,
    errMess:null,
    deleteSuccess:false,
},action)=>{

    switch(action.type){
        case ActionTypes.DELETE_SUCCESS:
            return {...state,deleteLoading:false,errMess:null,deleteSuccess:true};
         
        case ActionTypes.DELETE_REQUEST:
            return{...state,deleteLoading:true,errMess:null,deleteSuccess:false};
        
        case ActionTypes.DELETE_FAILED:
            return {...state,deleteLoading:false,errMess:action.payload,deleteSuccess:false};
        default:
            return state;
    }
}