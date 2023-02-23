import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onInputPassword = event => {
    this.setState({password: event.target.value})
  }

  onInputUsername = event => {
    this.setState({username: event.target.value})
  }

  onSubmitSuccess = () => {
    const {history} = this.props
    history.replace('/')
  }

  onSubmitLoginDetails = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      //   console.log(data)
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})

      this.onSubmitSuccess()
    } else {
      const errorMsg = data.error_msg

      this.setState({showErrorMsg: true, errorMsg})
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    const {username, password, showErrorMsg, errorMsg} = this.state
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <img
          src="https://res.cloudinary.com/dds8wfxdw/image/upload/v1676920782/CCBP-mini%20projects/Movies%20website%20%28netflix%2Cprime%20clone%29/assets/LOGO_ycujjt.png"
          alt="login website logo"
          className="website-logo"
        />
        <form
          className="login-form-container"
          onSubmit={this.onSubmitLoginDetails}
        >
          <h1 className="login-form-heading">Login</h1>
          <label className="login-form-label" htmlFor="usernameInput">
            USERNAME
          </label>
          <input
            type="text"
            className="login-form-input"
            id="usernameInput"
            onChange={this.onInputUsername}
            value={username}
          />
          <label className="login-form-label" htmlFor="passwordInput">
            PASSWORD
          </label>
          <input
            type="password"
            className="login-form-input"
            id="passwordInput"
            onChange={this.onInputPassword}
            value={password}
          />
          {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default LoginPage
