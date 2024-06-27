import {useState , useEffect} from 'react';
import {ethers} from 'ethers';
import { contractABI , contractAddress } from './constant/constant';
import Connected from './components/Connected';
import Login from './components/Login'


function App() {
  const [provider , setProvider] = useState(null);
  const [account , setAccount] = useState(null);
  const [isConnected , setisConnected] = useState(false);
  const [votingStatus , setVotingStatus] = useState(true);
  const [remainingtime , setRemainingtime] = useState('');
  const [candidate , setcandidate] = useState([]);
  const [number , setnumber] = useState("");

  useEffect(()=>{
    getCandidate();
    getRemainingtime();
    getCurrentStatus();

    if(window.ethereum){
      window.ethereum.on('accountsChanged' , handleAccountsChanged);
    }

    return () =>{
      if(window.ethereum){
        window.ethereum.removeListener('accountsChanged' , handleAccountsChanged)
      }
    }
  })

  async function getCandidate() {
    const provider = new ethers.BrowserProvider(window.ethereum);

    await provider.send("eth_requestAccounts" , []);
    const signer = await provider.getSigner();

    const contractInstance = new ethers.Contract(contractAddress , contractABI , signer);

    const candidateList = await contractInstance.getAllvotesCandidates();
    const formattedCandidates = candidateList.map((candidate , index) =>{
      return {
        index : index , 
        name : candidate.name,
        voteCount : candidate.voteCount.toNumber()
      }
    });
    setcandidate(formattedCandidates);
  }

  async function getCurrentStatus() {
    const provider = new ethers.BrowserProvider(window.ethereum);

    await provider.send("eth_requestAccounts" , []);
    const signer = await provider.getSigner();

    const contractInstance = new ethers.Contract(contractAddress , contractABI , signer);

    const status = await contractInstance.getVotingStatus();

    setVotingStatus(status);

  }

  async function getRemainingtime() {
    const provider = new ethers.BrowserProvider(window.ethereum);

    await provider.send("eth_requestAccounts" , []);
    const signer = await provider.getSigner();

    const contractInstance = new ethers.Contract(contractAddress , contractABI , signer);

    const time = await contractInstance.getRemainingtime();

    setVotingStatus(parseInt(time , 16));
  }

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
      {isConnected ? (<Connected account = {account} candidate = {candidate} remainingtime = {remainingtime} number = {number}/> ) : (<Login connectWallet = {connectMetaMask}/>)}
    </div>
  );
}

export default App;
