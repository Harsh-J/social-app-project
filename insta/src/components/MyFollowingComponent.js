import React, { Component,useState } from 'react';
import {Card,CardImg,CardImgOverlay,CardTitle, CardBody,CardText, CardHeader, Button,Row,Label,Modal,ModalBody,ModalHeader,Col,Spinner} from 'reactstrap';


import {baseUrl} from '../shared/baseUrl';

import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';

function RenderMenuItem({post,likes,postlike,isLoading,postComment,comments,fetchOUser,currentuser,deletePost,postunlike}){

    const likesarray= likes.likes.filter((like)=>like.postId==post._id);
    const likesarraywcu=likesarray.filter((like)=>like.postedBy._id==currentuser.userinfo._id);
  
    const [isModalOpen, setisModalOpen] = useState(false);


  

  const toggleModal = () => setisModalOpen(!isModalOpen);

    return(
        <Card className="cardorg shadow-sm  bg-white rounded">
            <CardHeader className="cardhead"> 
              <CardTitle className="mb-0 cardtitle">
                  <img src={post.postedBy.photo} width="30px" height="30px"/>
                  
                  <Link to={`/oprofile/${post.postedBy.username}`}className="oprofilelink" onClick={()=>fetchOUser(post.postedBy._id)}>{post.postedBy.username}</Link>
                 
                  </CardTitle>
                
                </CardHeader>
            <CardImg width="100%"  src={post.photo} alt={post.title} className="postimg"/>
              
            <CardBody>
                <CardTitle> <span className="date"> {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(post.updatedAt)))}</span></CardTitle>
                <CardTitle>{post.body}</CardTitle>
                <CardTitle>{post.title}</CardTitle>
                
               
                {likesarraywcu.length >0 ?
        
        <Button className="fa fa-heart fa-lg likebtn" color="primary" size="lg" onClick={()=>postunlike(post._id)}></Button>
        :
        <Button className="fa fa-heart-o fa-lg likebtn" color="primary" size="lg" onClick={()=>postlike(post._id)}></Button>
        
         }



         
        {
            likes.unlikeRequest ?
            <Spinner type="grow" size="sm" color="danger"   />
            :
        <span></span>

           
        }
        
     

        {
            likes.isLoading ?
            <Spinner type="grow" size="sm" color="success"   />
            :
<span className="likeslinkbtn" ><Button className="likeslinkbtnlink" onClick={toggleModal}>{likesarray.length} likes</Button></span>

           

        }
        <Modal isOpen={isModalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal} className="commentsbtn">Liked By</ModalHeader>
            <ModalBody>      
                      
             <RenderLikes likes={likesarray} fetchOUser={fetchOUser} />
                    
           
            </ModalBody>
            
           </Modal>
           
           
          
           
    <Row>
        <CommentForm postId={post._id} postId={post._id} postComment={postComment} comments={ comments.comments.filter((comment) => comment.postId === post._id)} fetchOUser={fetchOUser}  />
    </Row>

            </CardBody>
           
        </Card>
    )
}
function RenderLikes({likes,fetchOUser}) {
    if (likes != null)
        return(
            <div className="col-12 col-md-12 m-1">
               
                <ul className="list-unstyled">
                
                        {likes.map((like) => {
                            return (
                                <div key={like._id}>
                                    
                                    <li>
                            <p className="comment" ><img className="likemodalpic" src={like.postedBy.photo} width="40px" height="40px" /><span className=""> {like.postedBy.firstname} {like.postedBy.lastname}</span><Link to={`/oprofile/${like.postedBy.username}`}  className="oprofilelink" onClick={()=>fetchOUser(like.postedBy._id)}><span className="likedby">@ {like.postedBy.username}</span></Link></p>
                                  
                                    
                                  
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
class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.state = {
          isNavOpen: false,
          isModalOpen: false
        };
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment({postId:this.props.postId, text:values.comment});
    }

    render() {
        return(
        <div className="commentbtndiv">
            <Button  onClick={this.toggleModal} className="commentbtn" color="primary" block>  Comments:<span className="ml-1">{this.props.comments.length}</span></Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal} className="commentsbtn">Comments</ModalHeader>
            <ModalBody>      
                      
                <RenderComments comments={this.props.comments} fetchOUser={this.props.fetchOUser}  />   
                    
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                   
                    <Row className="form-group">
                        <Col>
                        <Label htmlFor="comment">Comment</Label>
                        <Control.textarea model=".comment" id="comment"
                                    rows="2" className="form-control" />
                        </Col>
                    </Row>
                    <Button type="submit" className="bg-primary">
                        Submit
                    </Button>
                </LocalForm>
            </ModalBody>
           </Modal>
        </div>
        );
    }

}
function RenderComments({comments,fetchOUser}) {
    if (comments != null)
        return(
            <div className="col-12 col-md-12 m-1">
               
                <ul className="list-unstyled">
                
                        {comments.map((comment) => {
                            return (
                                <div key={comment._id}>
                                    
                                    <li>
                                    <p className="comment" >{comment.text}<Link to={`/oprofile/${comment.postedBy.username}`}  className="oprofilelink" onClick={()=>fetchOUser(comment.postedBy._id)}><span className="commentby">@ {comment.postedBy.username}</span></Link></p>
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

const MyFollowingPosts=(props)=>{

    

    const posts=props.posts.posts.map((post)=>{

        return (
            <div key={post._id} className="col-12 col-md-6 m-1 ">
                <RenderMenuItem post={post}  likes={props.likes} postlike={props.postlike} comments={props.comments} 
                postComment={props.postComment} fetchOUser={props.fetchOUser} currentuser={props.currentuser}
                 postunlike={props.postunlike}  />
            </div>
        );
    });

    return(
        <div className="container">
            
            {posts.length==0 ?
                <div className="defaultmsgfpdiv"><span className="defaultmsgfp"> You haven't followed anyone !! </span></div>:
                <div className="row justify-content-md-center mt-0">
                {posts}
                </div> }
          
        </div>
    )
}
export default MyFollowingPosts;