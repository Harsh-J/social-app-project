import * as ActionTypes from './ActionTypes';
import { act } from 'react-dom/test-utils';

export const Upload=(state={
    uploadLoading:false,
    errMess:null,
    uploadSuccess:false,
},action)=>{

    switch(action.type){
        case ActionTypes.UPLOAD_REQUEST:
            return {...state,uploadLoading:true,errMess:null,uploadSuccess:false};
         
        case ActionTypes.UPLOAD_SUCCESS:
            return{...state,uploadLoading:false,errMess:null,uploadSuccess:true};
        
        case ActionTypes.UPLOAD_FAILED:
            return {...state,isLoading:false,errMess:action.payload,uploadSuccess:false};
        default:
            return state;
    }
}