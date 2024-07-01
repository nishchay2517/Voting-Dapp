import React from "react"

const Connected = (props)=>{
    return(
        <div className="connected-container">
            <h1 className="connected-header">you are connected to metamask</h1>
            <p className="connected-account">MetaMask Account : {props.account}</p>
            <p className="connected-account">Remaining Time : {props.RemainingTime}</p>
            {
                props.showButton ? (
                     <p className="connected-account">you have already voted {props.account}</p>
                ):(
                    <div>
                    <input type="number" placeholder="Enter Candidate Index"  value={props.index} onChange={props.handleNumberChange}></input>
                    <button className="login-button" onClick={props.voteFunction}>Vote</button>
                </div>
                )
            }

            <table id="Table">
                <thead>
                    <tr>
                        <th>index</th>
                        <th>candidate name</th>
                        <th>candidate votes</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.Candidate.map((candidate , index) => {
                            <tr key={index}>
                                <td>{candidate.index}</td>
                                <td>{candidate.name}</td>
                                <td>{candidate.voteCount}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Connected;