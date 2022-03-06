import {Component} from "react"
import Cookies from "js-cookie"
import jsPDF from "jspdf";
import "jspdf-autotable";

import "./index.css"

class ShowRecord extends Component{
    state={
        medicalDetails:[],
        dataIsLoaded:false
    }

    generatePDF = medicalDetails => {
        let keys=[];
        for (var k in medicalDetails[0])
            keys.push(k)
        keys=keys.slice(4,-3)
        const tableColumns=["date"].concat(medicalDetails.map(eachDetail=>eachDetail.date));
        const tableRows = keys.map(eachKey=>
            {return [eachKey].concat(medicalDetails.map(eachRecord=>{return eachRecord[eachKey]}))});
        var doc = new jsPDF()
        doc.text("memberid:",10,10)
        doc.autoTable(tableColumns,tableRows, {styles: {font: "rotobo"}},{startY:20})
        doc.save("123.pdf")
    }

    componentDidMount (){
        const url = 'http://localhost:3005/showrecord'
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
    }

    render(){
        const {medicalDetails,dataIsLoaded} = this.state;
        let keys=[]
        for (var k in medicalDetails[0])
            keys.push(k)
        keys = keys.slice(3,-3);
        if(!dataIsLoaded)
            return <p>Please wait!!!</p>
        else{
            return <div className="showrecord-container">
                <button onClick={() => this.generatePDF(medicalDetails)}>Generate pdf</button>
                <table className="showrecordtable"><tbody>
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
                </tbody></table>
            </div>
        }
    }
}

export default ShowRecord