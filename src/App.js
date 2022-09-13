import logo from './logo.svg';
import Profile from './images/faucet-profile-img-1.jpeg';
import './App.css';
import { ethers } from 'ethers';
import { useState } from 'react';
import { useEffect } from 'react';

import moment from 'moment'

// const private_key_receiver="0x471339a2440a393db7272b1f753fd5175e521de042e8e1711c3207b081460e32"
const receiverAddress="0xE3CCE0D4a67b60703eb4f7EdE08adA32B3b8D555"

const private_key="0x646ed2e12d09f673bf3112e158420311fbc14e8a9718672eb66355d6a6815395"
const address="0x32fEa0810Dc021743fCD7A4cB0D079bEFd84eF5C"
const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545");

const wallet= new ethers.Wallet(private_key,provider)

const tokentransfers="0.01"

function App() {
  const [balance, setBlance]=useState(0)
  const [success, setSuccess]=useState('')
  const [spin, setSpin]=useState(false)
  const [receiver, setReceiver]=useState('')

  
  

  
  provider.getBalance(address).then((balance) => {
    // convert a currency unit from wei to ether
    const balanceInEth = ethers.utils.formatEther(balance)
    setBlance(balanceInEth)
    // console.log(`balance: ${balanceInEth} ETH`)
   })

   const sendMeToken=()=>{
    if(receiver==''){
      alert('Paste your address')

      return
    }

    setSpin(true)
    let tx = {
      to: receiver,
      // Convert currency unit from ether to wei
      value: ethers.utils.parseEther(tokentransfers)
      
  }
  wallet.sendTransaction(tx)
.then((txObj) => {
    console.log('txHash', txObj.hash)

    setSpin(false)

    setSuccess(true)
    // => 0x9c172314a693b94853b49dc057cf1cb8e529f29ce0272f451eea8f5741aa9b58
    // A transaction result can be checked in a etherscan with a transaction hash which can be obtained here.
})

   }




  return (
    <>
    {/* {console.log(moment(moment().format()).fromNow())} */}


   
    <section className='vertical-center'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1><i class="fa fa-bath" aria-hidden="true"></i> Rinkeby Authenticated Faucet</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-12'>
            Balance: {balance} BNB

          </div>

        </div>
        <div className="row">
					<div className="col-lg-8 offset-lg-2">
            <div className="input-group ethInput">
              <input type="text" className="form-control" onChange={(e)=>setReceiver(e.target.value)} value={receiver} placeholder="Social network URL containing your Ethereum address..." />
              <div class="input-group-append">
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Give me BNB</button>
                <div className="dropdown-menu dropdown-menu-right">
                  <span className="dropdown-item"  onClick={()=>sendMeToken()}>{tokentransfers} BNB</span>
                  {/* <a className="dropdown-item" href="#">7.5 Ethers / 1 day</a>
                  <a className="dropdown-item" href="#">18.75 Ethers / 3 days</a> */}
                </div>
              </div>
            </div>
					</div>
				</div>

        {spin?<>

          <div className='row'>
          <div className='col-sm-8'>
                  <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
          </div>

        </div>
        
        </>:null}
        
        <div className='row'>
          <div className='col-lg-6 offset-lg-3'>
          <div className="panel panel-small panel-default requestsTable_box">
            <div className="panel-body">
              <table className="table table-condensed requestsTable">
                <tbody>
                  {success?<>
                    <tr>
                    <td><img src={Profile} alt="" /></td>
                    <td><span className='requestsTable_addr'><pre>{receiver}</pre></span></td>
                    <td className='text-center'><span>{moment(moment().format()).fromNow()}</span>
                      <div className="progress">
                        <div className="progress-bar progress-bar-striped progress-bar-animated bg-danger width80"></div>
                      </div>
                    </td>
                  </tr>
                  </>:null}
                  

                </tbody>
              </table>
            </div>
            <div className="panel-footer">
              <table>
                <tbody>
                  <tr>
                    <td><i className="fa fa-rss" aria-hidden="true"></i> <span id="peers">0</span> peers</td>
                    <td><i className="fa fa-database" aria-hidden="true"></i> <span id="block">11309209</span> blocks</td>
                    <td><i className="fa fa-heartbeat" aria-hidden="true"></i> <span id="funds">9.046256971665328e+56</span> Ethers</td>
                    <td><i className="fa fa-university" aria-hidden="true"></i> <span id="funded">803917</span> funded</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          </div>
        </div>
        <div className='row'>
          <h2>How does this work?</h2>
          <p>This Ether faucet is running on the Rinkeby network. To prevent malicious actors from exhausting all available funds or accumulating enough Ether to mount long running spam attacks, requests are tied to common 3rd party social network accounts. Anyone having a Twitter or Facebook account may request funds within the permitted limits.</p>
          <dl className='reqText'>
            <dt className='mb-2'><i className='fa fa-twitter'></i> <span>To request funds via Twitter, make a <a href='#'>tweet</a> with your Ethereum address pasted into the contents (surrounding text doesn't matter). Copy-paste the <a href="#">tweets URL</a> into the above input box and fire away!</span></dt>
            <dt><i className='fa fa-facebook'></i> <span>To request funds via Facebook, publish a new public post with your Ethereum address embedded into the content (surrounding text doesn't matter). Copy-paste the <a href="#">posts URL</a> into the above input box and fire away!</span></dt>
          </dl>
          <p>You can track the current pending requests below the input field to see how much you have to wait until your turn comes.</p>
          <p><i>The faucet is running invisible reCaptcha protection against bots.</i></p>
        </div>
      </div>
    </section>
    </>
  );
}

export default App;
