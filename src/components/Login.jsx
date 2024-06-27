import React from "react"

const Login = (props)=>{
    return(
        <div className="login-container">
            <h1 className="welcome-message">Welcome to decentralised Voting Machine</h1>
            <button className="login-button" onClick={props.connectWallet}>Login MetaMask</button>

        </div>
    )
}

export default Login