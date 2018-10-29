pragma solidity ^0.4.24;

contract DistributedStorage {
  mapping (address => bytes32) public storedData;

  function uploadData(bytes32 data) public {
    storedData[msg.sender] = data;
  }

  function getData() public view returns (bytes32) {
    return storedData[msg.sender];
  }
}
