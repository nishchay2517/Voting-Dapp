import {useState , useEffect} from 'react';
import {ethers} from 'ethers';
import { contractABI , contractAddress } from './constant/constant';
import Login from './components/Login'


function App() {
  const [provider , setProvider] = useState(null);
  const [account , setAccount] = useState(null);
  const [isConnected , setisConnected] = useState(false);
  async function connectMetaMask() {
    if(window.ethereum){
      try{
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);

        await provider.send("eth_requestAccounts" , []);
        const signer = provider.getSigner();
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
      <Login connectWallet = {connectMetaMask}/>
    </div>
  );
}

export default App;
