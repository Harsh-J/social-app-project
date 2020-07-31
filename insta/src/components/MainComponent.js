import React,{ Component} from 'react';
import Header from './HeaderComponent';
import Posts from './PostsComponent';
import CreatePost from './CreatePostComponent';
import Profile from './ProfileComponent';
import OProfile from './OProfileComponent';
import MyFollowingPosts from './MyFollowingComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {  fetchPosts,loginUser,logoutUser,postlike,postComment,postaPost,
     imageUpload,fetchprofile,fetchUser,postUserPic,fetchOUser,
    followUser,unfollowUser,fetchFollowingPosts,registerUser,deletePost,
    fetchComments, fetchLikes,postunlike,fetchSearchUsers } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { Toast,ToastHeader,ToastBody, Alert } from 'reactstrap';



const mapStateToProps=state=>{
    return{
        posts:state.posts,
        auth:state.auth,
        likes:state.likes,
        comments:state.comments,
        profile:state.profile,
        user:state.user,
        ouser:state.ouser,
        upload:state.upload,
        followingposts:state.followingposts,
        delete:state.delete,

    }
}
const mapDispatchToProps=(dispatch)=>({
    fetchPosts:()=>{dispatch(fetchPosts())},
    fetchComments: () => {dispatch(fetchComments())},
    fetchLikes:()=>{dispatch(fetchLikes())},
    registerUser:(creds)=>dispatch(registerUser(creds)),
    loginUser:(creds)=>dispatch(loginUser(creds)),
    logoutUser:()=>dispatch(logoutUser()),
    postlike:(postId)=>dispatch(postlike(postId)),
    postComment:(data)=>dispatch(postComment(data)),
    postaPost:(data)=>dispatch(postaPost(data)),
    imageUpload:(image)=>dispatch(imageUpload(image)),
    fetchprofile:()=>{dispatch(fetchprofile())},
    fetchUser:()=>{dispatch(fetchUser())},
    postUserPic:(image)=>{dispatch(postUserPic(image))},
    fetchOUser:(id)=>{dispatch(fetchOUser(id))},
    followUser:(id)=>{dispatch(followUser(id))},
    unfollowUser:(id)=>{dispatch(unfollowUser(id))},
    fetchFollowingPosts:()=>{dispatch(fetchFollowingPosts())},
    deletePost:(id)=>{dispatch(deletePost(id))},
    postunlike:(postId)=>dispatch(postunlike(postId)),
    fetchSearchUsers:(query)=>{dispatch(fetchSearchUsers(query))},    
})





class Main extends Component{

    componentDidMount(){
        this.props.fetchPosts();
        this.props.fetchprofile();
        this.props.fetchUser();
        this.props.fetchFollowingPosts();
        this.props.fetchComments();
        this.props.fetchLikes();
    }


    
    render(){

        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
              this.props.auth.isAuthenticated
                ? <Component {...props} />
                :
                
                <Redirect to={{
                    pathname: '/',
                    state: { from: props.location }
                  }} />
            )} />
          );

        return(
            <div>
                <Header auth={this.props.auth}
                  registerUser={this.props.registerUser}
                loginUser={this.props.loginUser}
                logoutUser={this.props.logoutUser}
                fetchSearchUsers={this.props.fetchSearchUsers}
                 />
                 
              
                <Switch>
                    <Route exact path="/" component={()=> <Posts posts={this.props.posts} 
                                                                     likes={this.props.likes}
                                                                     postlike={this.props.postlike}
                                                                     comments={this.props.comments}
                                                                     postComment={this.props.postComment}
                                                                     fetchOUser={this.props.fetchOUser}
                                                                     currentuser={this.props.user}
                                                                     deletePost={this.props.deletePost}
                                                                     postunlike={this.props.postunlike}
                />} />
                    <Route exact path="/createPost" component={()=><CreatePost postaPost={this.props.postaPost} user={this.props.user} upload={this.props.upload} />} />
                    <Route exact path="/profile" component={()=><Profile profile={this.props.profile} user={this.props.user} userinfo={this.props.user.userinfo} postUserPic={this.props.postUserPic} />} />
                    <PrivateRoute exact path="/oprofile/:username" component={()=><OProfile user={this.props.ouser} userinfo={this.props.ouser.ouserinfo} currentuser={this.props.user} followUser={this.props.followUser} unfollowUser={this.props.unfollowUser}/>} />
                    <Route exact path="/followingPosts" component={()=> <MyFollowingPosts posts={this.props.followingposts} 
                                                                     likes={this.props.likes}
                                                                     postlike={this.props.postlike}
                                                                     comments={this.props.comments}
                                                                     postComment={this.props.postComment}
                                                                     fetchOUser={this.props.fetchOUser}
                                                                     currentuser={this.props.user}
                                                                    
                                                                     postunlike={this.props.postunlike}
                />} />
                    <Redirect to="/" />
                </Switch>
  
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
