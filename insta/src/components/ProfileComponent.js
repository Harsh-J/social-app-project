import React,{Component} from 'react';
import {Button} from 'reactstrap';

import {Card,CardImg,CardImgOverlay,CardTitle, CardBody,CardText, CardHeader, Row,Label,Modal,ModalBody,ModalHeader,Col,Alert,ButtonGroup} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';

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

class Profile extends Component{
   
    constructor(props){
        super(props);
        
        this.toggleModal=this.toggleModal.bind(this);
        this.onDismiss=this.onDismiss.bind(this);
        this.toggleFollowersModal=this.toggleFollowersModal.bind(this);
        this.toggleFollowingModal=this.toggleFollowingModal.bind(this);

        this.state={
            isModalOpen:false,
            visible:true,
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
        this.props.postUserPic({userpic:values.image});
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

        

        const posts=this.props.profile.profileposts.map((post)=>{

            return (
                <div  className="col-12 col-md-3 m-1 profileimage">
                    <img src={post.photo} className="profileimages"></img>
                </div>
            );
        });
        return(
            
            <div className="container">
                 <div className="row justify-content-md-center mt-0 profilediv">
                <div className="col-12 col-md-12 ">
                
                <div className="userpic">
                {this.props.userinfo ? 
               <img src= {this.props.userinfo.photo} />
                :
                <span></span>
            } 

                <p><Button onClick={this.toggleModal} className="userpicbtn" className="userpicbtn">Set Image {this.props.user.userpicLoading ? <span className="fa fa-spinner fa-pulse ml-1"></span> : <span></span>}</Button></p>
                {this.props.user.userpicSuccess ? <span><Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss} delay={3000}>Image Uploaded Successfully!</Alert></span>:<span></span>}
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Upload Profile Picture</ModalHeader>
                 <ModalBody>      
                      
                 <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        
                       
                        <Row className="form-group">
                            <Col>
                        
                            <Label htmlFor="image">Select Image</Label>
                            <Control.file model=".image" id="image"className="form-control" />
                            </Col>
                        </Row>
                   <Button type="submit" className="userpicbtn">Submit</Button>
               </LocalForm>
                    
                
            </ModalBody>
           </Modal>
            
           <Modal isOpen={this.state.isFollowersModalOpen} toggle={this.toggleFollowersModal}>
        <ModalHeader toggle={this.toggleFollowersModal} >Followers of {this.props.user.userinfo.username}</ModalHeader>
            <ModalBody>      
                      
               
                {this.props.user.userinfo  ?
                    <span><RenderUser users={this.props.user.userinfo.followers} fetchOUser={this.props.fetchOUser}  /></span>           
                    :
                    <span></span>
    }

                
            </ModalBody>
            
           </Modal>
           <Modal isOpen={this.state.isFollowingModalOpen} toggle={this.toggleFollowingModal}>
        <ModalHeader toggle={this.toggleFollowingModal} >{this.props.user.userinfo.username} follows-</ModalHeader>
            <ModalBody>      
                      
               
                {this.props.user.userinfo  ?
                    <span><RenderUser users={this.props.user.userinfo.following} fetchOUser={this.props.fetchOUser} /></span>           
                    :
                    <span></span>
    }

                
            </ModalBody>
            
           </Modal>
                
                </div>
                <div className="userinfo ">
        <p className="font-weight-bold"> {this.props.user.userinfo  ? 
                <span>{this.props.user.userinfo.username}</span>
                :
                <span></span>
            }</p>
                <p className="font-weight-bold">  {this.props.user.userinfo ? 
                <span>{this.props.user.userinfo.firstname} {this.props.user.userinfo.lastname}</span>
                :
                <span></span>
            }</p>
             
             <ButtonGroup className="btngrp" size="lg"> <Button className="postnumberbtn">{this.props.profile.profileposts.length>0 ? <span>{this.props.profile.profileposts.length} posts</span> :<span>posts</span>} </Button> 
            <Button className="followersbtn" onClick={this.toggleFollowersModal} >{this.props.profile.profileposts.length>0 ? <span className="ml-2" >{this.props.profile.profileposts[0].postedBy.followers.length}</span>:<span></span>} followers </Button>
           <Button className="followingbtn" onClick={this.toggleFollowingModal}> {this.props.profile.profileposts.length>0 ? <span className="ml-2">{this.props.profile.profileposts[0].postedBy.following.length}</span>:<span></span>} following </Button></ButtonGroup>
              
                
                </div>
                </div>
                <hr></hr>
               
    
                {posts.length==0 ?
                
                 <span className="defaultmsg">How it's going? Good? But you haven't posted anything !! Go for it <span><Link to="/createPost" className="defaultmsglink">createPost</Link></span></span>:
                 
                 <div className="row col-12 postsdiv">{posts}</div>}
                </div>
                

            </div>
        
        )
    }
}


export default Profile;