import Web3 from "web3";
import TranscriptContract from "./contracts/Transcript.json";


const web3 = new Web3(window.ethereum);

const getContractInstance = async () => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = TranscriptContract.networks[networkId];
  if (!deployedNetwork) {
    throw new Error("Contract not deployed on the current network.");
  }
  return new web3.eth.Contract(
    TranscriptContract.abi,
    deployedNetwork.address
  );
};

export { web3, getContractInstance };
