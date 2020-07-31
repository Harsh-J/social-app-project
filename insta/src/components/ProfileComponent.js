import React,{Component} from 'react';
import {Button} from 'reactstrap';

import {Card,CardImg,CardImgOverlay,CardTitle, CardBody,CardText, CardHeader, Row,Label,Modal,ModalBody,ModalHeader,Col,Alert} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';

class Profile extends Component{
   
    constructor(props){
        super(props);
        
        this.toggleModal=this.toggleModal.bind(this);
        this.onDismiss=this.onDismiss.bind(this);

        this.state={
            isModalOpen:false,
            visible:true,
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
                <div className="col-12 col-md-9 ">
                <div className="row">
                <div className="userpic col-sm-6">
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
                
                
                </div>
                <div className="userinfo col-sm-6 mr-0 ">
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
             
        <p >{this.props.profile.profileposts.length>0 ? <span>{this.props.profile.profileposts.length} posts</span> :<span>posts</span>} 
            {this.props.profile.profileposts.length>0 ? <span className="ml-2">{this.props.profile.profileposts[0].postedBy.followers.length}</span>:<span></span>} followers 
            {this.props.profile.profileposts.length>0 ? <span className="ml-2">{this.props.profile.profileposts[0].postedBy.following.length}</span>:<span></span>} following</p>
              
                
                </div>
                </div>
                <hr></hr>
               
    
                {posts.length==0 ?
                 <span className="defaultmsg">How it's going? Good? But you haven't posted anything !! Go for it <span><Link to="/createPost" className="defaultmsglink">createPost</Link></span></span>:
                 
                 <div className="row col-12 postsdiv">{posts}</div>}
                </div>
                

            </div>
            </div>
        )
    }
}


export default Profile;