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
    0x1B89Fc08f52216293EFD48d23fbea1273A20eeB9
  );
};

export { web3, getContractInstance };
