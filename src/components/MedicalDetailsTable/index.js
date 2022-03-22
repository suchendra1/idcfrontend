export default (props) =>{
    const {medicalDetails}=props
    return(
        <div className="medical-details-table-containener">
            <table className="medical-details-table">
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
        </div>
    )
}