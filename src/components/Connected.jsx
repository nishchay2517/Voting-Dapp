import React from "react"

const Connected = (props)=>{
    return(
        <div className="connected-container">
            <h1 className="connected-header">you are connected to metamask</h1>
            <p className="connected-account">MetaMask Account : {props.account}</p>
            <p className="connected-account">Remaining time : {props.remainingtime}</p>
            <button className="login-button" onClick={props.connectWallet}>Login MetaMask</button>

            <div>
                <input type="number" placeholder="Enter candidate index" value={props.number} onClick={props.handleNumberChange}></input>
                <button className="login-button" onClick={props.voteFunction}>Vote</button>
            </div>
            <table id="myTable" className="candidates-table">
                <thead>
                    <tr>
                        <th>INDEX</th>
                        <th>CANDIDATE NAME</th>
                        <th>CANDIDATE VOTES</th>
                    </tr>
                    <tbody>
                        {
                            props.candidates.map((candidate , index) =>{
                                <tr key = {index}>
                                    <td>{candidate.index}</td>
                                    <td>{candidate.name}</td>
                                    <td>{candidate.voteCount}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </thead>

            </table>
        </div>
    )
}

export default Connected;