import React from "react"

const Connected = (props)=>{
    return(
        <div className="connected-container">
            <h1 className="connected-header">you are connected to metamask</h1>
            <p className="connected-account">MetaMask Account : {props.account}</p>
            <button className="login-button" onClick={props.connectWallet}>Login MetaMask</button>

        </div>
    )
}

export default Connected;