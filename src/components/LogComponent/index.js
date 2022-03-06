import {Component} from "react"
import Cookies from "js-cookie";

import Login from "../Login"
import Logout from "../Logout"

import "./index.css"

class LogComponent extends Component{
    state={
        isLogged:Cookies.get("jwt_token") !== undefined,
    }

    onLogChange = () => {
        this.setState({isLogged:Cookies.get("jwt_token") !== undefined})
    }

    render(){
        const {history} = this.props
        const {isLogged} = this.state
        console.log(isLogged)
        if(!isLogged)
            return <Login onLogChange={this.onLogChange} history={history}/>
        return <Logout onLogChange={this.onLogChange} history={history}/>
    }
}

export default LogComponent