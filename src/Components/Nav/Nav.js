import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from '../../ducks/reducer'

class Nav extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <img src={this.props.profile_pic} />
                <p>{this.props.username}</p>
                <section className="nav-buttons">
                    <Link to="/dashboard">
                        <button>
                            Home
                    </button>
                    </Link>
                    <Link to="/new">
                        <button>
                            New Post
                    </button>
                    </Link>
                    <Link to="/">
                        <button>
                            Logout
                    </button>
                    </Link>
                </section>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const { username, profile_pic } = reduxState

    return {
        username,
        profile_pic
    }
}

export default connect(mapStateToProps, { getUser })(Nav)