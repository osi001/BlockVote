import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import 'bulma/css/bulma.css'
import Web3 from 'web3';
import Head from 'next/head'
import '../src/App.css';
import ABI from './contracts/ABI.json';
function App() {
  // const [web3, setWeb3] = useState()
  const [contract, setContract] = useState();
  const [account, setAccount] = useState();
  const [ballotId, setUserBallotId] = useState();
  const [candidateId, setCandidateId] = useState();
  const [voterAddress, setVoterAddress] = useState();
  const [name, setName] = useState();
  const [details, setDetails] = useState();
  const [info, setInfo] = useState();
  const [isAdmin, setIsAdmin] = useState(false);

  const web3 = new Web3(Web3.givenProvider);

  const connectWeb3 = async () => {

    await window.ethereum.request( { method: "eth_requestAccounts"})
    await window.ethereum.enable();

    const accounts = await web3.eth.getAccounts();

    console.log('The accounts ', accounts);
    setAccount(accounts);

    const networkId = await web3.eth.net.getId();
    console.log('the network id', networkId);
    const smartContract = new web3.eth.Contract(ABI, '0xf8130d527eb951b58d1e9357f913e628caa55f76');

    console.log('the smartcontract', smartContract.methods);
    setContract(smartContract);
    // if(networkId!==NetworkDetails['id'])
    // { alert('Please Choose Rinkeby Wallet to Continue') }
  };



  useEffect(() => {
    connectWeb3();
  }, []);
  // const requestRightToVote = async () => {
  //   try {
  //     const response = await contract.methods.requestRightToVote.call(ballotId);
  //     console.log(response);
  //     // setDrawIdInfo(drawInfo);
  //   } catch (error) {
  //     console.log(error);

  //     toast.error("The Function Doesn't Exist");
  //   }
  // };
  const vote = async () => {
    try {
      const response = await contract.methods.vote(121212).send({ from: account[0] });
      console.log(response);
      // setDrawIdInfo(drawInfo);
    } catch (error) {
      console.log(error);

      toast.error("The Function Doesn't Exist");
    }
  };




  // const createBallot = async () => {
  //   try {
  //     const createBallot = await contract.methods.createBallot(12121212, 'test').send({ from: account[0] });
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("The Function Doesn't Exist");
  //   }
  // };

  const giveRightToVote = async () => {
    debugger;
    try {
      const response = await contract.methods.giveRightToVote(account[0]).send({ from: account[0] });
      console.log(response);
      // setDrawIdInfo(drawInfo);
    } catch (error) {
      console.log(error);

      toast.error("The Function Doesn't Exist");
    }
  };

  const addCandidate = async () => {
    try {
      const response = await contract.methods.addCandidate('usman', 'test', 121112).send({ from: account[0] });
      console.log(response);
      // setDrawIdInfo(drawInfo);
    } catch (error) {
      console.log(error);

      toast.error("The Function Doesn't Exist");
    }
  };

  const openBallot = async () => {
    try {
      const response = await contract.methods.openBallot().call();
      console.log(response);
      // setDrawIdInfo(drawInfo);
    } catch (error) {
      console.log(error);

      toast.error("The Function Doesn't Exist");
    }
  };

  const getWinningCandidate = async () => {
    try {
      await contract.methods.getWinningCandidate().call();

      // setDrawIdInfo(drawInfo);
    } catch (error) {
      console.log(error);

      toast.error("The Function Doesn't Exist");
    }
  };

  return (
    <>
      

      <Toaster position='top-center' reverseOrder={false} />

      <main className='main'>

      <nav className="navbar mt-4 mb-4">
          <div className="container">
            <div className="navbar-brand">
              <h1>Block Vote </h1>
            </div>
            <div className="navbar-middle">
              
            </div>
            <div className="navbar-end">
              <button onClick={connectWeb3} className="button is-link">Connect Wallet</button>
            </div>
          </div>
         </nav>

      {isAdmin ? (
        <>
        


         <div className='container'>
          <section className='mt-5'>
            <div className='columns'>
              <div className='column is-one-thirds'>
              <h3 class="title is-3">Admin Functions</h3>
                <br />
                <br />
                <button className="button is-link is-large is-light mt-3"
                  onClick={() => {
                    // createBallot();
                  }}>
                  Open Ballot
                </button>{' '}
                <br />
                <br />
                <input class="input is-info" type="text" placeholder="Address"></input>
                <button className="button is-link is-large is-light mt-3"
                  onClick={() => {
                    giveRightToVote();
                  }}>
                  Give Right to Vote
                </button>{' '}
                <br />
                <br />
                
                <br />
                <br />
                <button className="button is-link is-large is-light mt-3"
                  onClick={() => {
                    // openBallot();
                  }}>
                  Close Ballot
                </button>{' '}
                <br />
                <br />
                <button className="button is-link is-large is-light mt-3"
                  onClick={() => {
                    getWinningCandidate();
                  }}>
                  Get Winning Candidate
                </button>
                <br />
                <br />
              </div>
              <div className='column is-one-third'>
                <h2> Candidates/Vote-count </h2>
                
                <section className="mt-5">
                  <div className="card">
                    <div className="card-content">
                      <div className="content">
                        <h2>Cand1 </h2>
                        <h3>Vote Count: </h3>
                        <div>
                          
                        </div>
                        <ul className="ml-0">
                          
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
                
                <section className="mt-5">
                  <div className="card">
                    <div className="card-content">
                      <div className="content">
                        <h2>Cand2 </h2>
                        <h3>Vote Count: </h3>
                        <div>
                          
                        </div>
                        <ul className="ml-0">
                          
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div className='column is-one-third'>
                <h2> Voter list </h2>
              </div>

            </div>
           </section>
          </div>


          
        </>
      ) : (
        <>
        <div className='container'>
          <section className='mt-10'>
            <div className='columns'>
              <div className='column is-two-thirds'>
              
              <section className='mt-7'>

              
              <h3 class="title is-3">Voter Functions</h3>

              </section>
              
              <section className='mt-6'>
                <input class="input is-info" type="text" placeholder="Address"></input>
              
              <button className="button is-primary is-large is-light mt-3"
                onClick={() => {
                  // requestRightToVote();
                }}>
                Delegate
              </button>{' '}
              </section>
              
              <section className='mt-6'>
              <div class="field">
                  <label class="label">Candidates</label>
                  <div class="control">
                    <div class="select">
                      <select>
                        <option>Select dropdown</option>
                        <option>With options</option>
                      </select>
                    </div>
                  </div>
                </div>
                <br />
              
              <button className="button is-primary is-large is-light mt-3"
                onClick={() => {
                  vote();
                }}>
                Vote
              </button>{' '}
              </section>
              </div>
            </div>
          </section>
        </div>
         
          
        </>
      )}

      </main>
      
      <footer className = "footer">
        <p>&copy; 2022 Block Vote</p>
      </footer>
      
    </>
  );
}

export default App;
