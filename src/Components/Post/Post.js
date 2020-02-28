import React, { Component } from 'react'
import { withRouter } from 'react-router'
import axios from 'axios'

class Post extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            img: '',
            content: '',
            author: '',
            authorPicture: ''
        }
    }

    componentDidMount = () => {
        const { postid } = this.props.match.params

        console.log(postid)

        axios.get(`/api/post/${postid}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    title: res.data[0].title,
                    img: res.data[0].img,
                    content: res.data[0].content,
                    author: res.data[0].username,
                    authorPicture: res.data[0].profile_pic
                })
            })
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.title}
                    {this.state.author}
                    <img src={this.state.authorPicture} width="50px" height="50px" />
                </div>
                <div>
                    <img src={this.state.img} width="160" height="90" />
                    {this.state.content}
                </div>
            </div>
        )
    }
}

export default withRouter(Post)