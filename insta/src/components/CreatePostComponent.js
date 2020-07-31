import React, { Component } from 'react';
import {Card,CardImg,CardImgOverlay,CardTitle, CardBody,CardText, CardHeader, Button,Row,Label,Modal,ModalBody,ModalHeader,Col,Alert} from 'reactstrap';


import {baseUrl} from '../shared/baseUrl';

import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';

class Form extends Component {

    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDismiss=this.onDismiss.bind(this);
        
        this.state = {
          isNavOpen: false,
          isModalOpen: false,
          visible:true,
        };
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postaPost({title:values.title, body:values.body,image:values.image});
    }
    onDismiss(){
        this.setState({
            visible:!this.state.visible,
        })
    }

    render() {
        return(
        <div className="uploaddiv">

            <Card className="cardorg shadow-sm  bg-white rounded">
            <CardHeader className="cardhead"> 
              <CardTitle className="mb-0 cardtitle">Upload Details</CardTitle></CardHeader>
          
          
            <CardBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Col>
                            <Label htmlFor="title">Title</Label>
                            <Control.text model=".title" id="title" className="form-control" />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                            <Label htmlFor="body">Body</Label>
                            <Control.text model=".body" id="body" className="form-control" />
                            </Col>
                        </Row>
                       
                        <Row className="form-group">
                            <Col>
                            <Label htmlFor="image">Select Image</Label>
                            <Control.file model=".image" id="image"className="form-control" />
                            </Col>
                        </Row>
                   <Button type="submit" className="bg-primary postsubmitbtn">
                       Submit {this.props.upload.uploadLoading ? <span className="fa fa-spinner fa-pulse ml-1"></span>: <span></span>}
                   </Button>
                   {this.props.upload.uploadSuccess ? <span><Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>Posted Successfully!!</Alert></span>:<span></span>}
               </LocalForm>
               
           
        

            </CardBody>
           
        </Card>
           </div>
        );
    }

}

         
         
class CreatePost extends Component{

    render(){
        return(
            <div className="container">
                 <div className="row justify-content-md-center mt-0">
                <div className="col-12 col-md-6 ">
                <Form postaPost={this.props.postaPost} user={this.props.user}  upload={this.props.upload} />
                </div>

            </div>
            </div>
        )
    }
}


export default CreatePost;