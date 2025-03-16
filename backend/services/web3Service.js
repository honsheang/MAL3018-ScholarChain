// filepath: d:\ScholarChain\backend\services\web3Service.js
const Web3 = require('web3');
const Transcript = require('../build/contracts/Transcript.json'); // ABI of the compiled contract

const web3 = new Web3(new Web3.providers.HttpProvider('https://sepolia.infura.io/v3/cb032d6e69ec47d08c59b5ba283eb76a'));
const contractAddress = '0x1B89Fc08f52216293EFD48d23fbea1273A20eeB9';
const transcriptContract = new web3.eth.Contract(Transcript.abi, contractAddress);

module.exports = {
  issueTranscript: async (account, name, studentId, course, graduationYear) => {
    return await transcriptContract.methods.issueTranscript(name, studentId, course, graduationYear).send({ from: account });
  },
  verifyTranscript: async (account, studentId) => {
    return await transcriptContract.methods.verifyTranscript(studentId).send({ from: account });
  },
  getTranscript: async (studentId) => {
    return await transcriptContract.methods.getTranscript(studentId).call();
  },
};