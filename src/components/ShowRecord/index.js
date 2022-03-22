import {Component} from "react"
import Cookies from "js-cookie"
import jsPDF from "jspdf";
import "jspdf-autotable";

import "./index.css"

class ShowRecord extends Component{
    state={
        medicalDetails:[],
        dataIsLoaded:false,
        memberid:""
    }

    generatePDF = medicalDetails => {
        const {memberid} = this.state;
        let keys=[];
        for (var k in medicalDetails[0])
            keys.push(k)
        const tableColumns=["Date"].concat(medicalDetails.map(eachDetail=>eachDetail.date));
        const tableRows = keys.map(eachKey=>
            {return [eachKey].concat(medicalDetails.map(eachRecord=>{return eachRecord[eachKey]}))});
        var doc = new jsPDF()
        doc.text(`memberid:${memberid}`,10,10)
        doc.autoTable(tableColumns,tableRows, {styles: {font: "rotobo"}},{startY:20})
        doc.save("123.pdf")
    }

    componentDidMount (){
        const url = 'http://localhost:3005/showuserrecord'
        const options = {
        method: 'GET',
        headers:{"Content-Type":"application/json",
            "Authorization":"BEARER "+Cookies.get("jwt_token")}
        }

        fetch(url,options)
        .then((res)=>res.json())
        .then((json)=>{
            this.setState({
                medicalDetails:json,
                dataIsLoaded:true
            })
        })

        const url1 = 'http://localhost:3005/getusermemberid';
        const options1 = {
        method: 'POST',
        headers:{"Content-Type":"application/json",
            "Authorization":"BEARER "+Cookies.get("jwt_token")}
        }

        fetch(url1,options1)
        .then((res)=>res.json())
        .then((json)=>{
            this.setState({
                memberid:json.memberid
            })
        })
    }

    render(){
        const {medicalDetails,dataIsLoaded,memberid} = this.state;
        let keys=[]
        for (var k in medicalDetails[0])
            keys.push(k)
        console.log(keys);
        if(!dataIsLoaded)
            return <p>Please wait!!!</p>
        else{
            return <div className="showrecord-container">
                <p>member id : {memberid}</p>
                <table className="showrecordtable">
                    <tbody>
                        {keys.map(
                            eachKey =>
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
                <button onClick={() => this.generatePDF(medicalDetails)} className="generate-btn">Generate pdf</button>
            </div>
        }
    }
}

export default ShowRecord