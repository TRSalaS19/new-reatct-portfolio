import React, {Component} from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "", 
            password: "",
            errorText: ""
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
            errorText: ""
        })
    }

    handleSubmit = event => {
        axios.post("https://api.devcamp.space/sessions", 
            {
                client: {
                    email: this.state.email,
                    password: this.state.password
                }
            },
            { withCredentials: true }
            ).then(response => {
                if (response.data.status === "created") {
                    this.props.handleSuccessfulAuth()
                } else {
                    this.setState({
                        errorText: "Wrong email or password"
                    })
                    this.props.handleSuccessfulAuth()
                }
            }).catch(error => {
                this.setState({
                    errorText: "An error occurred"
                })
                this.props.handleSuccessfulAuth()
            })
        // so that  page doesn't reload upon submit
        event.preventDefault()
    }



    render() {
        return (
            <div>
                <h1>LOGIN TO ACCESS YOUR DASHBOARD</h1>

                <div>{this.state.errorText}</div>

                <form 
                onSubmit={this.handleSubmit} 
                className="auth-form-wrapper"s
                >

                <div className="form-group" >
                    <FontAwesomeIcon icon="envelope" />
                    <input 
                        type="email"
                        // name can be whatever you call it
                        name="email"
                        placeholder="Your email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </div>

                <div className="form-group" >
                    <FontAwesomeIcon icon="lock" />
                    <input 
                        type="password"
                        name="password"
                        placeholder="Your password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </div>
                <button 
                className="btn"
                type="submit" >Login</button>
                </form>
            </div>
        )
    }
}