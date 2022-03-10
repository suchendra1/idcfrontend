import {Component} from "react"
import Cookies from 'js-cookie'

import './index.css'
import './index.scss'

class Login extends Component{
    state={
        ID:"",
        password:""
    }

    onChangeID = (event) => {
        this.setState({ID:event.target.value});
    }

    onChangePassword = event => {
        this.setState({password:event.target.value})
    }

    onSubmitSuccess = jwtToken => {
        const {history,onLogChange} = this.props;
        Cookies.set('jwt_token', jwtToken, {expires: 30})
        setTimeout(function() {}, 500);
        history.replace('/');
        onLogChange()
    }

    onClickLogin = async event => {
        const {ID, password} = this.state
        const userDetails = {memberid:ID, password}
        const url = 'http://localhost:3005/login'
        const options = {
        method: 'POST',
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(userDetails),
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.ok === true) {
            this.onSubmitSuccess(data.jwt_token)
        }
    }

    render (){
        const {ID,password}=this.state;
        return(
            <div className="login-container">
                <h3>Login</h3>
                <div class="form__group field">
                    <input type="input" class="form__field" placeholder="ID" name="ID" id='ID' onChange={this.onChangeID} value={ID} required />
                    <label for="name" class="form__label">Name</label>
                </div>
                <div class="form__group field">
                    <input type="input" class="form__field" placeholder="Password" name="password" id='password' value={password} onChange={this.onChangePassword} required />
                    <label for="name" class="form__label">Password</label>
                </div>
                <button type="button" className="submit-button bn632-hover bn20" onClick={this.onClickLogin}>Login</button>
            </div>
        )
    }
}

export default Login