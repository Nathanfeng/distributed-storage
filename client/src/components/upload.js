import React, {Component} from 'react';
import ipfs from '../utils/ipfs.js';
import DistributedStorage from '../contracts/DistributedStorage.json';
import getWeb3 from '../utils/getWeb3';
import truffleContract from 'truffle-contract';

class Upload extends Component {

  state = {
    ipfsHash: '',
    buffer: '',
    transactionHash: ''
  }

  search = (event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)
  }

  convertToBuffer = async(reader) => {
    //file is converted to a buffer to prepare for uploading to IPFS
    const buffer = await Buffer.from(reader.result);
    //set this buffer -using es6 syntax
    this.setState({buffer});
  };

  upload = async (event) => {
    //save document to ipfs
    await ipfs.add(this.state.buffer, (error, ipfsHash) => {
      console.log(error, ipfsHash[0].hash)
      this.setState({ipfsHash})
    });

    //save the hash onto the blockchain
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const Contract = truffleContract(DistributedStorage);
    Contract.setProvider(web3.currentProvider);
    const instance = await Contract.deployed();
    const transactionHash = await instance.methods.uploadData(this.state.ipfsHash, {from: accounts[0]});
    this.setState({transactionHash});
  }


  render() {
    return (
      <div>
        <h3>Select a File to Upload</h3>
        <form onSubmit={this.upload}>
        <input
          type='file'
          onClick={this.search}
        />
        <button>Upload Chosen File</button>
        </form>
      </div>
    )
  }
}

export default Upload;
