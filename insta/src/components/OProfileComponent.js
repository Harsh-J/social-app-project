import React,{Component} from 'react';
import {Button} from 'reactstrap';

import {Card,CardImg,CardImgOverlay,CardTitle, CardBody,CardText, CardHeader, Row,Label,Modal,ModalBody,ModalHeader,Col,Alert,Spinner,ButtonGroup} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import {Loading} from './LoadingComponent';
function RenderUser({users,fetchOUser}) {
    if (users != null)
        return(
            <div className="col-12 col-md-12 m-1">
               
                <ul className="list-unstyled">
                
                        {users.map((user) => {
                            return (
                                <div key={user._id}>
                                    
                                    <li>
                           
                           
                           
                                    <p className="comment" ><img className="likemodalpic" src={user.photo} width="40px" height="40px" /><span className=""> {user.firstname} {user.lastname}</span><Link to={`/oprofile/${user.username}`}  className="oprofilelink" onClick={()=>fetchOUser(user._id)}><span className="likedby">@ {user.username}</span></Link></p>
                                  
                                    
                                  
                                    </li>
                                    <hr className="commentline"></hr>
                                
                                </div>
                            );
                        })}
                  
                </ul>
               
            </div>
        );
    else
        return(
            <div></div>
        );
}
class OProfile extends Component{

    constructor(props){
        super(props);
        
        this.toggleModal=this.toggleModal.bind(this);
        this.onDismiss=this.onDismiss.bind(this);
        this.toggleFollowersModal=this.toggleFollowersModal.bind(this);
        this.toggleFollowingModal=this.toggleFollowingModal.bind(this);

        this.state={
            isModalOpen:false,
            isFollowersModalOpen:false,
            isFollowingModalOpen:false,
        
        };

    }
    toggleModal(){
        this.setState({
            isModalOpen:!this.state.isModalOpen,
        })
    }
    onDismiss(){
        this.setState({
            visible:!this.state.visible,
        })
    }
    handleSubmit(values){
        this.toggleModal();
       
    }
    toggleFollowersModal(){
        this.setState({
            isFollowersModalOpen:!this.state.isFollowersModalOpen
        })
    }
    toggleFollowingModal(){
        this.setState({
            isFollowingModalOpen:!this.state.isFollowingModalOpen
        })
    }

    render(){

        
        const posts=this.props.user.ouserposts.map((post)=>{

            return (
                <div  className="col-12 col-md-3 m-1 profileimage">
                    <img src={post.photo} className="profileimages"></img>
                </div>
            );
        });
        if (this.props.user.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.user.errMess) {
            return(
                <div className="container">
                    <div className="row errmess">
                        <h4>{this.props.user.errMess}</h4>
                    </div>
                </div>
            );
        }
        else
        return(
            <div className="container">
                 <div className="row justify-content-md-center mt-0 profilediv">
                <div className="col-12 col-md-9 ">
                <div className="row">
                <div className="userpic ouserpic col-sm-6">
                {this.props.userinfo ? 
               <img src= {this.props.userinfo.photo} onClick={this.toggleModal} />
                :
                <span></span>
            } 
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalBody>  
                        
                {this.props.userinfo ? 
               <img className="modelimg" src= {this.props.userinfo.photo} />
                :
                <span></span>
            } 
                    </ModalBody>
           </Modal>

                
                
                
                </div>
                <div className="userinfo ouserinfo col-sm-6 mr-0 ">
        <p className="font-weight-bold"> {this.props.userinfo  ? 
                <span>{this.props.userinfo.username}</span>
                :
                <span></span>
            }</p>
                <p className="font-weight-bold">  {this.props.userinfo  ? 
                <span>{this.props.userinfo.firstname} {this.props.userinfo.lastname}</span>
                :
                <span></span>
            }</p>
             
             <ButtonGroup className="btngrpoprofile" size="lg"><Button className="postnumberbtn">{this.props.user.ouserposts.length>0 ? <span>{this.props.user.ouserposts.length} posts</span> :<span>posts</span>} </Button>
          <Button className="followersbtn" onClick={this.toggleFollowersModal}>  {this.props.user.ouserposts.length>0 ? <span className="ml-2">{this.props.user.ouserposts[0].postedBy.followers.length}</span>:<span></span>} followers </Button>
            <Button className="followingbtn" onClick={this.toggleFollowingModal}>{this.props.user.ouserposts.length>0 ? <span className="ml-2">{this.props.user.ouserposts[0].postedBy.following.length}</span>:<span></span>} following</Button></ButtonGroup>
            {this.props.currentuser.userinfo._id===this.props.user.ouserinfo._id ?
            <span></span>
            :
            //show unfollow button if this user is already present in the current logged in list of following users
            this.props.user.ouserinfo.followers.filter((user)=>user._id===this.props.currentuser.userinfo._id).length >0  ?
            <span><Button color="primary" className="unfollowbtn" onClick={()=>this.props.unfollowUser(this.props.user.ouserinfo._id)}>Unfollow{this.props.user.ouserunfollowLoading ? <span className="fa fa-spinner fa-pulse ml-1"></span>
            :
            <span></span>}</Button></span>
            :
            <span><Button color="primary" className="followbtn" onClick={()=>this.props.followUser(this.props.user.ouserinfo._id)}>Follow {this.props.user.ouserfollowLoading ? <span className="fa fa-spinner fa-pulse ml-1"></span>
            :
            <span></span>}</Button></span>}
         
        
            
                
                </div>
                </div>
                <hr></hr>
                <Modal isOpen={this.state.isFollowersModalOpen} toggle={this.toggleFollowersModal}>
        <ModalHeader toggle={this.toggleFollowersModal} >Followers of {this.props.user.ouserinfo.username}</ModalHeader>
            <ModalBody>      
                      
               
                {this.props.user.ouserinfo  ?
                    <span><RenderUser users={this.props.user.ouserinfo.followers} fetchOUser={this.props.fetchOUser}  /></span>           
                    :
                    <span></span>
    }

                
            </ModalBody>
            
           </Modal>
           <Modal isOpen={this.state.isFollowingModalOpen} toggle={this.toggleFollowingModal}>
        <ModalHeader toggle={this.toggleFollowingModal} >{this.props.user.ouserinfo.username} follows-</ModalHeader>
            <ModalBody>      
                      
               
                {this.props.user.ouserinfo  ?
                    <span><RenderUser users={this.props.user.ouserinfo.following} fetchOUser={this.props.fetchOUser} /></span>           
                    :
                    <span></span>
    }

                
            </ModalBody>
            
           </Modal>
                {posts.length==0 ?
                 <span className="defaultmsg">Looks like {this.props.userinfo.username } doesn't have any good photos :p <span></span></span>:
                 
                 <div className="row col-12 postsdiv">{posts}</div>}
                </div>

            </div>
            </div>
        )
    }
}


export default OProfile;