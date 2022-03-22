import { Component } from "react";
import { Modal,Button } from 'rsuite';

import Cookies from "js-cookie";

import 'rsuite/dist/rsuite.min.css'

class showRecords extends Component{
    state={
        patientMemberID:"",
        modelOpen:false,
        medicalDetails:{}
    }

    onChangePatientMemberID = event => {
        this.setState({patientMemberID:event.target.value})
    }

    handleClose = event => {
        this.setState({modelOpen:false})
    }

    onClickGetDetails = async () =>{
        const {patientMemberID} = this.state;
        const url = `http://localhost:3005/showuserrecord/${patientMemberID}`
        const options = {
        method: 'GET',
        headers:{"Content-Type":"application/json",
            "Authorization":"BEARER "+Cookies.get("jwt_token")},
        params:{memberid:patientMemberID}
        }

        fetch(url,options)
        .then((res)=>res.json())
        .then((json)=>{
            this.setState({
                medicalDetails:json,
                modelOpen:true
            })
            console.log(json)
        })
    }

    render(){
        const {modelOpen,medicalDetails,patientMemberID} = this.state;let keys=[]
        for (var k in medicalDetails[0])
            keys.push(k)
        return (
            <div className="doctor-container">
                <div className="patient-search-container">
                    <input type="text" placeholder="Enter patient Memeber ID" value={patientMemberID} onChange={this.onChangePatientMemberID}/>
                    <button type="button" onClick={this.onClickGetDetails} className="patient-search-btn">Get Details</button>
                </div>
                <Modal overflow={true} open={modelOpen}>
                    <Modal.Header>
                        <Modal.Title>Patient Member ID : {patientMemberID}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <table className="showrecordtable">
                            <tbody>
                                {keys.map(
                                    eachKey=>
                                    <tr>
                                        <th>
                                            {eachKey}
                                        </th>
                                        {medicalDetails.map(eachRecord=>
                                            <td>
                                                {eachRecord[eachKey]}
                                            </td>
                                        )}
                                    </tr>
                                    )}
                            </tbody>
                        </table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose} appearance="primary">
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default showRecords;