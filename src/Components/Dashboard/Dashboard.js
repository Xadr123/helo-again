import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            search: '',
            userposts: true
        }
    }

    componentDidMount = () => {
        this.getPosts()
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCheck = (e) => {
        if (!document.getElementById("post-check").checked) {
            this.setState({
                userposts: false
            })
        } else {
            this.setState({
                userposts: true
            })
        }
    }

    handleReset = (id) => {
        if (this.state.userposts === true) {
            axios.get(`/api/posts/${id}?userposts=${this.state.userposts}`)
                .then(res => {
                    this.setState({
                        search: '',
                        posts: res.data
                    })
                })
        } else {
            axios.get(`/api/posts/${id}?userposts=${this.state.userposts}`)
                .then(res => {
                    this.setState({
                        search: '',
                        posts: res.data
                    })
                })
        }
    }

    getPosts = () => {
        if (this.state.search !== '' && this.state.userposts === true) {
            axios.get(`/api/posts/${this.props.userId}?userposts=${this.state.userposts}&search=${this.state.search}`)
                .then(res => {
                    this.setState({
                        posts: res.data
                    })
                }).catch(err => console.log(err))
        } else if (this.state.userposts === false && this.state.search === '') {
            axios.get(`/api/posts/${this.props.userId}?userposts=${this.state.userposts}`)
                .then(res => {
                    this.setState({
                        posts: res.data
                    })
                }).catch(err => console.log(err))
        } else if (this.state.userposts === true && this.state.search === '') {
            axios.get(`/api/posts/${this.props.userId}?userposts=${this.state.userposts}`)
                .then(res => {
                    this.setState({
                        posts: res.data
                    })
                }).catch(err => console.log(err))
        } else if (this.state.userposts === false && this.state.search !== '') {
            axios.get(`/api/posts/${this.props.userId}?userposts=${this.state.userposts}&search=${this.state.search}`)
                .then(res => {
                    this.setState({
                        posts: res.data
                    })
                }).catch(err => console.log(err))
        }
    }

    render() {
        const postMapper = this.state.posts.map((post) => {
            return (

                <Link to={`/post/${post.post_id}`}>
                    <div>
                        <div>
                            {post.title}
                            <section>
                                {post.username}
                                <img src={post.profile_pic} height="50px" width="50px" />
                            </section>
                        </div>
                    </div>
                </Link>
            )
        })

        return (
            <div>
                <div>
                    <input
                        placeholder="Search"
                        name="search"
                        value={this.state.search}
                        onChange={this.handleInput}
                    />
                    <button onClick={() => {
                        this.getPosts()
                    }} >Search</button>
                    <button onClick={() => {
                        this.handleReset(this.props.userId)
                    }} >Reset</button>
                    <input
                        type="checkbox"
                        value={this.state.userposts}
                        name="userposts"
                        id="post-check"
                        defaultChecked
                        onClick={this.handleCheck}
                    /> My Posts
                </div>
                <div>
                    {postMapper}
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const { user_id } = reduxState

    return {
        user_id
    }
}

export default connect(mapStateToProps)(Dashboard)