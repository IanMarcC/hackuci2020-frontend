import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Card} from 'react-bootstrap';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {user: '', price: '', availability: ''};
    }
    render() {
        return (
            <Card className="post">
                <Card.Body>
                    <Card.Title>
                        {this.props.price}
                        </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        {this.props.user}
                        </Card.Subtitle>
                    <Card.Text>
                        {this.props.availability}
                    </Card.Text>
                    <Button>Message</Button>
                </Card.Body>
                </Card>
        )
    }
}
/*
class Posts extends Component {
    state = {
        posts: [{}]
    };


    render() {
        return (
            {<Post user={this.state.posts.for post in this.state.posts}
        );
    }
}
*/

export default Post;