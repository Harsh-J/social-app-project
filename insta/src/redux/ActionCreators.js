import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';
import { Form } from 'reactstrap';

export const fetchPosts=()=>(dispatch)=>{
    dispatch(postsLoading(true));

    return fetch(baseUrl+'posts')
        .then(response=>{
            if(response.ok){
                return response;
            }
            else{
                var error=new Error('Error'+response.status+': '+response.statusText);
                error.response=response;
                throw error;
            }
        },
        error=>{
            var errmess=new Error(error.message);
            throw errmess;
        })
        .then(response=>response.json())
        .then(posts=>{
         
            dispatch(addPosts(posts))
        })
        .catch(error=>dispatch(postsFailed(error.message)));
    }

    export const postsLoading=()=>({
        type:ActionTypes.POSTS_LOADING
    });
    export const postsFailed=(errmess)=>({
        type:ActionTypes.POSTS_FAILED,
        payload:errmess
    });
    export const addPosts=(posts)=>({
        type:ActionTypes.ADD_POSTS,
        payload:posts
    });


    export const requestLogin = (creds)=>{
        return{
            type:ActionTypes.LOGIN_REQUEST,
            creds
        }
    }
    export const receiveLogin=(response)=>{
        return{
            type:ActionTypes.LOGIN_SUCCESS,
            token:response.token
        }
    }
    export const loginError=(message)=>{
        return{
            type:ActionTypes.LOGIN_FAILURE,
            message
        }
    }
    export const loginUser=(creds)=>(dispatch)=>{

        dispatch(requestLogin(creds))

        return fetch(baseUrl+'users/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(creds)
        })
        .then((response)=>{
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error=>{
            throw error;
        })
        .then(response=>response.json())
        .then(response=>{
            if (response.success) {
                // If login was successful, set the token in local storage
                localStorage.setItem('token', response.token);
                localStorage.setItem('creds', JSON.stringify(creds));
                // Dispatch the success action
                //dispatch(fetchFavorites());
                setTimeout(()=>dispatch(logoutUser()),86400000);
                dispatch(receiveLogin(response));
                dispatch(fetchFollowingPosts());
                dispatch(fetchprofile());
                dispatch(fetchUser());
            }
            else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }

        })
        .catch(error=>{alert('Username or Password is not correct!!')})
    };


    export const requestLogout = () => {
        return {
          type: ActionTypes.LOGOUT_REQUEST
        }
    }
      
    export const receiveLogout = () => {
        return {
          type: ActionTypes.LOGOUT_SUCCESS
        }
    }
    
    // Logs the user out
    export const logoutUser = () => (dispatch) => {
        dispatch(requestLogout())
        localStorage.removeItem('token');
        localStorage.removeItem('creds');
        
        dispatch(receiveLogout())
    }

    export const imageUpload=(image)=>(dispatch)=>{
        console.log(image[0]);

       
    }

    export const imageUploadLoading=()=>({
        type:ActionTypes.UPLOADIMG_REQUEST,

    })
    export const imageUploadSuccess=()=>({
        type:ActionTypes.UPLOADIMG_SUCCESS,
    })

    export const postaPost=(data)=>(dispatch)=>{

    

      dispatch(postLoading());
        
        dispatch(imageUploadLoading());

        const Data=new FormData();
        Data.append('file',data.image[0]);
        Data.append('upload_preset','insta-clone');
        Data.append('cloud_name','dndahpg5r');
        var title=data.title;
        var body=data.body;

        fetch('	https://api.cloudinary.com/v1_1/dndahpg5r/image/upload',{
            method:'POST',
            body:Data,
            credentials:"same-origin"


        })
        .then(res=>res.json())
        .then(data=>{
         
            var url=data.url;
            dispatch(imageUploadSuccess());

            //fetch for posting a post after uploading a image
            
                    const bearer='Bearer '+localStorage.getItem('token');
                    fetch(baseUrl+'posts',{
                              method:'POST',
                              body:JSON.stringify({"title":title,"body":body,"photo":url}),
                               headers: {
                                    "Content-Type": "application/json",
                                    'Authorization': bearer
                                        },
                               credentials: "same-origin"
        })
        .then(response=>{
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error=>{
            throw error;
        })
        .then(response=>response.json())
        .then(resp=>{
            
            dispatch(fetchPosts());
            dispatch(postSuccess());
            dispatch(fetchprofile());
          
        })

        

        })
        
        .catch(error=>dispatch(postFailed(error.message)));

        
    }
    export const postLoading=()=>({
        type:ActionTypes.UPLOAD_REQUEST
    })
    export const postSuccess=()=>({
        type:ActionTypes.UPLOAD_SUCCESS
    })
    export const postFailed=(message)=>({
        type:ActionTypes.UPLOAD_FAILED,
        message
    })



    

    export const fetchprofile=()=>(dispatch)=>{

        dispatch(profileLoading());

        const bearer='Bearer '+localStorage.getItem('token');

        return fetch(baseUrl+'posts'+'/myposts',{

            headers: {
                "Content-Type": "application/json",
                'Authorization': bearer
                    },
           credentials: "same-origin"
        })
        .then(response=>{
            if(response.ok){
                return response;
            }
            else{
                var error=new Error('Error'+response.status+': '+response.statusText);
                error.response=response;
                throw error;
            }
        },
        error=>{
            var errmess=new Error(error.message);
            throw errmess;
        })
        .then(response=>response.json())
        .then(posts=>{
     
            dispatch(addProfile(posts))
         
            
        })
        .catch(error=>dispatch(profileFailed(error.message)));
    }

    export const profileLoading=()=>({
        type:ActionTypes.PROFILE_REQUEST,
    });
    export const profileFailed=(errmess)=>({
        type:ActionTypes.PROFILE_FAILED,
        payload:errmess
    });
    export const addProfile=(posts)=>({
        type:ActionTypes.ADD_PROFILE,
        payload:posts
    });

    export const fetchUser=()=>(dispatch)=>{

        dispatch(fetchUserLoading());
        const bearer='Bearer '+localStorage.getItem('token');
        fetch(baseUrl+'users'+'/currentuser',{
            headers: {
                "Content-Type": "application/json",
                'Authorization': bearer
                    },
           credentials: "same-origin"
        })
        .then(response=>{
            if(response.ok){
                return response;
            }
            else{
                var error=new Error('Error'+response.status+': '+response.statusText);
                error.response=response;
                throw error;
            }
        },
        error=>{
            var errmess=new Error(error.message);
            throw errmess;
        })
        .then(response=>response.json())
        .then(user=>{
        
            
           dispatch(fetchUserSuccess(user));
            
        })
        .catch(error=>dispatch(fetchUserFailed(error.message)));
    }

    export const fetchUserLoading=()=>({
        type:ActionTypes.USER_REQUEST,
    })
    export const fetchUserSuccess=(user)=>({
        type:ActionTypes.USER_SUCCESS,
        payload:user
    })

    export const fetchUserFailed=(errmess)=>({
        type:ActionTypes.USER_FAILED,
        payload:errmess
    })


    export const postUserPic=(image)=>(dispatch)=>{
        dispatch(userpicLoading());
      
        const Data=new FormData();
        Data.append('file',image.userpic[0]);
        Data.append('upload_preset','insta-clone');
        Data.append('cloud_name','dndahpg5r');
        

        fetch('	https://api.cloudinary.com/v1_1/dndahpg5r/image/upload',{
            method:'POST',
            body:Data,
            credentials:"same-origin"

        })
        .then(res=>res.json())
        .then(data=>{
      
            var url=data.url;
           

            //fetch for posting a post after uploading a image
         
                    const bearer='Bearer '+localStorage.getItem('token');
                    fetch(baseUrl+'users'+'/updatepic',{
                              method:'PUT',
                              body:JSON.stringify({photo:url}),
                               headers: {
                                    "Content-Type": "application/json",
                                    'Authorization': bearer
                                        },
                               credentials: "same-origin"
        })
        .then(response=>{
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error=>{
            throw error;
        })
        .then(response=>response.json())
        .then(resp=>{
            dispatch(fetchUser());
          
            dispatch(fetchPosts());
         
            dispatch(userpicSuccess());
            dispatch(fetchLikes());
           
            
        })
        .catch(error=>dispatch(userpicFailed()));

        })
        .catch(err=>{
            console.log(err);
        })
    }
export const userpicLoading=()=>({
    type:ActionTypes.USERPIC_REQUEST,
})
export const userpicSuccess=()=>({
    type:ActionTypes.USERPIC_SUCCESS,

})
export const userpicFailed=()=>({
    type:ActionTypes.USERPIC_FAILED,
})
  

export const fetchOUser=(id)=>(dispatch)=>{
    dispatch(ouserRequest());
    fetch(baseUrl+'users/'+id,{
        headers: {
            "Content-Type": "application/json",
  
                },
       credentials: "same-origin"
    })
    .then(response=>{
        if(response.ok){
            return response;
        }
        else{
            var error=new Error('Error'+response.status+': '+response.statusText);
            error.response=response;
            throw error;
        }
    },
    error=>{
        var errmess=new Error(error.message);
        throw errmess;
    })
    .then(response=>response.json())
    .then(result=>{
    
      
        dispatch(ouserSuccess(result));
       
        
    })
    .catch(error=>dispatch(ouserFailed()));   
}

export const ouserRequest=()=>({
    type:ActionTypes.OUSER_REQUEST,
})
export const ouserSuccess=(result)=>({
    type:ActionTypes.OUSER_SUCCESS,
    payload:result
})
export const ouserFailed=(errmess)=>({
    type:ActionTypes.OUSER_FAILED,
    payload:errmess
})

export const followUser=(id)=>(dispatch)=>{

    dispatch(ouserfollowRequest());

    const bearer='Bearer '+localStorage.getItem('token');
    return fetch(baseUrl+'users/'+id+'/follow',{
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
            'Authorization': bearer
          },
          credentials: "same-origin"
    })
    .then(response=>{
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error=>{
        throw error;
    })
    .then(response=>response.json())
    .then(resp=>{
        dispatch(fetchOUser(id));
        dispatch(fetchprofile());
        dispatch(ouserfollowSuccess());
        dispatch(fetchUser());
        dispatch(fetchFollowingPosts());
    })
    .catch(error=>dispatch(ouserfollowFailed(error.message)));
    
}

export const ouserfollowRequest=()=>({
    type:ActionTypes.OUSER_FOLLOW_REQUEST,
})

export const ouserfollowSuccess=()=>({
    type:ActionTypes.OUSER_FOLLOW_SUCCESS,
})
export const ouserfollowFailed=(errmess)=>({
    type:ActionTypes.OUSER_FOLLOW_FAILED,
    payload:errmess,

})
export const unfollowUser=(id)=>(dispatch)=>{

    dispatch(ouserunfollowRequest());

    const bearer='Bearer '+localStorage.getItem('token');
    return fetch(baseUrl+'users/'+id+'/unfollow',{
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
            'Authorization': bearer
          },
          credentials: "same-origin"
    })
    .then(response=>{
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error=>{
        throw error;
    })
    .then(response=>response.json())
    .then(resp=>{
        dispatch(fetchOUser(id));
        dispatch(fetchprofile());
        dispatch(ouserunfollowSuccess());
        dispatch(fetchUser());
        dispatch(fetchFollowingPosts());
    })
    .catch(error=>dispatch(ouserunfollowFailed(error.message)));
    
}

export const ouserunfollowRequest=()=>({
    type:ActionTypes.OUSER_UNFOLLOW_REQUEST,
})

export const ouserunfollowSuccess=()=>({
    type:ActionTypes.OUSER_UNFOLLOW_SUCCESS,
})
export const ouserunfollowFailed=(errmess)=>({
    type:ActionTypes.OUSER_UNFOLLOW_FAILED,
    payload:errmess,

})



export const fetchFollowingPosts=()=>(dispatch)=>{
    dispatch(followingpostsLoading(true));
    const bearer='Bearer '+localStorage.getItem('token');
    return fetch(baseUrl+'posts'+'/getSubPosts',{
        headers: {
            "Content-Type": "application/json",
            'Authorization': bearer
          },
          credentials: "same-origin"
    })
        .then(response=>{
            if(response.ok){
                return response;
            }
            else{
                var error=new Error('Error'+response.status+': '+response.statusText);
                error.response=response;
                throw error;
            }
        },
        error=>{
            var errmess=new Error(error.message);
            throw errmess;
        })
        .then(response=>response.json())
        .then(posts=>{
        
            dispatch(followingpostsSuccess(posts))
        })
        .catch(error=>dispatch(followingpostsFailed(error.message)));
    }

    export const followingpostsLoading=()=>({
        type:ActionTypes.FOLLOWING_POSTS_LOADING
    });
    export const followingpostsFailed=(errmess)=>({
        type:ActionTypes.FOLLOWING_POSTS_FAILED,
        payload:errmess
    });
    export const followingpostsSuccess=(posts)=>({
        type:ActionTypes.FOLLOWING_POSTS_SUCCESS,
        payload:posts
    });


    export const requestRegister = (creds) => {
        return {
            type: ActionTypes.REGISTER_REQUEST,
            creds
        }
    }
      
    export const receiveRegister = (response) => {
        return {
            type: ActionTypes.REGISTER_SUCCESS,
            payload:response.success
            
        }
    }
      
    export const RegisterError = (message) => {
        return {
            type: ActionTypes.REGISTER_FAILURE,
            message
        }
    }
    
    export const registerUser = (creds) => (dispatch) => {
        // We dispatch requestLogin to kickoff the call to the API
     
        dispatch(requestRegister(creds))
    
        return fetch(baseUrl + 'users/signup', {
            method: 'POST',
            headers: { 
                'Content-Type':'application/json' 
            },
            body: JSON.stringify(creds),
            

        })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
            },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                // If login was successful, set the token in local storage
                
                // Dispatch the success action
              
                dispatch(receiveRegister(response));
            }
            else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => {alert('Try with a different user name!!')})
    };


    export const deletePost=(postId)=>(dispatch)=>{
        dispatch(deleteRequest())
        const bearer='Bearer '+localStorage.getItem('token');
        return fetch(baseUrl+'posts/'+postId+'/delete',{
            method:"DELETE",

            headers: {
                "Content-Type": "application/json",
                'Authorization': bearer
              },
              credentials: "same-origin"
        })
        .then(response=>{
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error=>{
            throw error;
        })
        .then(response=>response.json())
        .then(deleteresp=>{
            dispatch(deleteSuccess());
            dispatch(fetchPosts());
            dispatch(fetchprofile());
        })
        .catch(error=>dispatch(deleteFailed(error.message)));
    }

    export const deleteRequest=()=>({
        type:ActionTypes.DELETE_REQUEST,
    })
    export const deleteSuccess=()=>({
        type:ActionTypes.DELETE_SUCCESS,

    })
    export const deleteFailed=(message)=>({
        type:ActionTypes.DELETE_FAILED,

    })

    export const fetchComments = () => (dispatch) => {
        return fetch(baseUrl + 'comments')
            .then(response => {
                if (response.ok) {
                    return response;
                }
                else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
            .then(response => response.json())
            .then(comments => dispatch(addComments(comments)))
            .catch(error => dispatch(commentsFailed(error.message)));
    }
    
    export const commentsFailed = (errmess) => ({
        type: ActionTypes.COMMENTS_FAILED,
        payload: errmess
    });
    
    export const addComments = (comments) => ({
        type: ActionTypes.ADD_COMMENTS,
        payload: comments
    });

    export const addComment = (comment) => ({
        type: ActionTypes.ADD_COMMENT,
        payload: comment
    });

    export const postComment = (data) => (dispatch) => {

        const newComment = {
            text: data.text,
            
            postId: data.postId,
        }
       
    
        const bearer = 'Bearer ' + localStorage.getItem('token');
    
        return fetch(baseUrl + 'comments', {
            method: 'POST',
            body: JSON.stringify(newComment),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            },
            credentials: 'same-origin'
        })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => { console.log('Post comments ', error.message);
            alert('Your comment could not be posted\nError: '+ error.message); })
    }


    export const fetchLikes = () => (dispatch) => {
        return fetch(baseUrl + 'likes')
            .then(response => {
                if (response.ok) {
                    return response;
                }
                else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
            .then(response => response.json())
            .then(likes => dispatch(addLikes(likes)))
            .catch(error => dispatch(likesFailed(error.message)));
    }
    
    export const likesFailed = (errmess) => ({
        type: ActionTypes.LIKES_FAILED,
        payload: errmess
    });
    
    export const addLikes = (likes) => ({
        type: ActionTypes.ADD_LIKES,
        payload: likes
    });


    export const postlikeRequest=()=>({
        type:ActionTypes.LIKES_REQUEST,
    })

    export const addLike = (like) => ({
        type: ActionTypes.ADD_LIKE,
        payload: like
    });

    export const postlike = (data) => (dispatch) => {

       
   
        dispatch(postlikeRequest());
        const bearer = 'Bearer ' + localStorage.getItem('token');
    
        return fetch(baseUrl + 'likes', {
            method: 'POST',
            body: JSON.stringify({"postId":data}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            },
            credentials: 'same-origin'
        })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => dispatch(addLike(response)))
        .catch(error => {
            alert('Your like could not be posted\nError: '+ error.message); })
    }


    export const postunlike = (data) => (dispatch) => {

        dispatch(postunlikeRequest());
        const bearer = 'Bearer ' + localStorage.getItem('token');
    
        return fetch(baseUrl + 'likes'+'/unlike', {
            method: 'DELETE',
            body: JSON.stringify({"postId":data}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            },
            credentials: 'same-origin'
        })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => {
            dispatch(postunlikeSuccess());
            dispatch(fetchLikes());
        })
        .catch(error => { console.log('Post likes ', error.message);
            alert('Your like could not be posted\nError: '+ error.message); })
    }
export const postunlikeRequest=()=>({
    type:ActionTypes.UNLIKES_REQUEST,
})
export const postunlikeSuccess=()=>({
    type:ActionTypes.UNLIKES_SUCCESS,
})

export const fetchSearchUsers=(query)=>(dispatch)=>{

    dispatch(searchUsersLoading());
     
    const bearer = 'Bearer ' + localStorage.getItem('token');
    
    return fetch(baseUrl + 'users'+'/search-users', {
        method: 'POST',
        body: JSON.stringify({"query":query}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => {
        
        dispatch(addSearchUsers(response));
    })
    .catch(error => { console.log('Post likes ', error.message);
        alert('Your like could not be posted\nError: '+ error.message); })
}
    
export const searchUsersLoading=()=>({
    type:ActionTypes.SEARCH_LOADING,
})
export const addSearchUsers=(users)=>({
    type:ActionTypes.ADD_SEARCH_USERS,
    payload:users
})

    