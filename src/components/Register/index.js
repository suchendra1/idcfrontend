import {Component} from "react"
import { toast } from "react-toastify";

import './index.css'

class Register extends Component{
    state={
        registerType:"User",
        ID:"",
        mobile:"",
        name:"",
        password:"",
        confirmPassword:"",
        message:""
    }

    onChangeID = (event) => {
        this.setState({ID:event.target.value});
    }

    OnChangeRegisterType = event => {
        this.setState({registerType:event.target.value})
    }

    onChangeMobileNumber= event=>{
        this.setState({mobile:event.target.value})
    }

    onChangeName = event => {
        this.setState({name:event.target.value})
    }

    onChangePassword = event => {
        this.setState({password:event.target.value})
    }

    onChangeConfirmPassword = event => {
        this.setState({confirmPassword:event.target.value})
    }

    onClickregister = async event => {
        const {ID,name,mobile,password,confirmPassword,registerType}=this.state
        if(ID==="" && registerType==="User")
        {
            this.setState({message:"Member Id can not be empty!"})
            return;
        }
        if(password!==confirmPassword)
        {
            return
        }

        let url="http://localhost:3005/"
        switch(registerType){
            case "User":url+="userregister";break;
            case "Lab Technician":url+="labtechregister";break;
            case "Doctor" :url+="doctorregister";break;
        }
        console.log(url)
        const userDetails = {memberid:ID,mobile,name,password}
        const options = {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(userDetails)}

        const res = await fetch(url,options)
        if(res.ok === true)
        {
            const {history} = this.props
            toast.success("Registration Success!!!")
            history.replace("/")
        }
        else{
            const {message} = await res.json()
            this.setState({message})
        }
    }

    render (){
        const {ID,mobile, password,name,confirmPassword,message,registerType} = this.state;
        const isNotMatch = password !== confirmPassword && confirmPassword !== "";
        let inputElement;
        switch (registerType){
            case "User":inputElement = <input type="text" className="input" onChange={this.onChangeID} name="ID" id="ID" value={ID} placeholder="Member ID"/>;break;
            case "Doctor":;
            case "Lab Technician" : inputElement=<input type="text" className="input" onChange={this.onChangeMobileNumber} name="mobile" id="mobile" value={mobile} placeholder="Mobile Number"/>;
        }
        return(
            <div className="register-container">
                <h3 className="login-heading">Register</h3>
                <select name="registerType" id="registerType" onChange={this.OnChangeRegisterType}>
                    <option value="User">User</option>
                    <option value="Lab Technician">Lab Technician</option>
                    <option value="Doctor">Doctor</option>
                </select>
                {inputElement}
                <input className="input" type="text" id="name" placeholder="Name" onChange={this.onChangeName} value={name}/>
                <input className="input" type="password" id="password" placeholder="Password" onChange={this.onChangePassword} value={password}/>
                <input className="input" type="password" id="confirm-password" placeholder="Confirm Password" onChange={this.onChangeConfirmPassword} value={confirmPassword}/>
                <p className="error">{isNotMatch ? "Confirm password does not match with password!" : ""}</p>
                <button type="button" className="submit-button bn632-hover bn20" onClick={this.onClickregister} >Register</button>
                <p className="error">{message}</p>
            </div>
        )
    }
}

export default Register