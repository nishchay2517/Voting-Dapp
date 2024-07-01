import {useState , useEffect} from 'react';
import {ethers} from 'ethers';
import { contractAddress , contractABI } from './constant/constant';
import Connected from './components/Connected';
import Login from './components/Login'


function App() {
  const [provider , setProvider] = useState(null);
  const [account , setAccount] = useState(null);
  const [isConnected , setisConnected] = useState(false);
  const [votingStatus , setVotingStatus] = useState(false);
  const [RemainingTime , setRemainingTime] = useState()
  const [Candidate , setCandidate] = useState([]);
  const [index , setIndex] = useState('');
  const [canvote , setcanvote] = useState(true);

  useEffect(()=>{
    getCandidates();
    getRemainingTime();
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
  async function vote(){
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contractInstance = await new ethers.Contract(contractAddress , contractABI , signer);

    const tx = await contractInstance.vote(index);

    await tx.wait();
    canVote(); 
  }

  async function canVote(){
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contractInstance = await new ethers.Contract(contractAddress , contractABI , signer);

    const voteStatus = await contractInstance.voters(await signer.getAddress());
    setcanvote(voteStatus);

    
  }

  async function getCurrentStatus() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contractInstance = await new ethers.Contract(contractAddress , contractABI , signer);
    const status = await contractInstance.getVotingStatus();
    setVotingStatus(status);
    
  }

  async function getRemainingTime() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress , contractABI , signer);

    const time = await contractInstance.getRemainingtime();
    setRemainingTime(parseInt(time , 16));
  }

  async function getCandidates() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress , contractABI , signer);

    const candidateList = await contractInstance.getAllvotesCandidates();

    const formattedCandidates = candidateList.map((candidate , index)=>{
      return{
        index : index,
        name : candidate.name,
        voteCount : Number(candidate.voteCount)
      }
    });
    setCandidate(formattedCandidates);
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
  async function handleNumberChange(e) {
    setIndex(e.target.value);
  }
  return (
    <div className="App">
      {isConnected ? (<Connected account = {account} Candidate = {Candidate} RemainingTime = {RemainingTime} index = {index} handleNumberChange = {handleNumberChange} voteFunction = {vote} showButton = {canVote}/> ) : (<Login connectWallet = {connectMetaMask}/>)}
    </div>
  );
}

export default App;
