import {useState , useEffect} from 'react';
import {ethers} from 'ethers';
import { contractABI , contractAddress } from './constant/constant';
import Connected from './components/Connected';
import Login from './components/Login'


function App() {
  const [provider , setProvider] = useState(null);
  const [account , setAccount] = useState(null);
  const [isConnected , setisConnected] = useState(false);

  useEffect(()=>{
    if(window.ethereum){
      window.ethereum.on('accountsChanged' , handleAccountsChanged);
    }

    return () =>{
      if(window.ethereum){
        window.ethereum.removeListener('accountsChanged' , handleAccountsChanged)
      }
    }
  })

  function handleAccountsChanged(accounts) {
    if(accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
    }else{
      setisConnected(false);
      setAccount(null);
    }
  }
  async function connectMetaMask() {
    if(window.ethereum){
      try{
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);

        await provider.send("eth_requestAccounts" , []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("MEtaMask  connected  :"  + address);
        setisConnected(true);
      }
      catch(err){
        console.log(err);
      }
    }
    else{
      console.error("metamask is not detected in browser ");

    }
  }
  return (
    <div className="App">
      {isConnected ? (<Connected account = {account}/> ) : (<Login connectWallet = {connectMetaMask}/>)}
    </div>
  );
}

export default App;
