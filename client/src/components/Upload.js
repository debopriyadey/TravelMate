import React, { Component } from 'react';
import LoginForm from './loginForm';
import ReviewForm from './ReviewForm';


class Upload extends Component {
    render() {
        return (
            <div>
                <LoginForm />
                <ReviewForm />
            </div>
        )
    }
}

export default Upload;