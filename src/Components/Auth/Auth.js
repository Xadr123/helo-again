import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from '../../ducks/reducer'

class Auth extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRegister = () => {
        const { username, password } = this.state
        axios.post('/api/register', {
            username,
            password
        }).then(res => {
            this.props.getUser(res.data)
            this.props.history.push('/dashboard')
        }).catch(err => console.log(err))
    }

    handleLogin = () => {
        const { username, password } = this.state
        axios.post('/api/login', {
            username,
            password
        })
            .then(res => {
                console.log(res.data)
                this.props.getUser(res.data)
                this.props.history.push('/dashboard')
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <div>
                    <img
                        src="https://raw.githubusercontent.com/DevMountain/simulation-3/master/assets/helo_logo.png"
                    />
                    <h1>
                        HELO
                    </h1>
                    <section>
                        Username: <input
                            maxLength='50'
                            name='username'
                            onChange={this.handleInput}
                        />
                    </section>
                    <section>
                        Password: <input
                            type="password"
                            maxLength='50'
                            name='password'
                            onChange={this.handleInput}
                        />
                    </section>
                    <button onClick={this.handleLogin} >Login</button>
                    <button onClick={this.handleRegister} >Register</button>
                </div>
            </div>
        )
    }
}

export default connect(null, { getUser })(Auth)