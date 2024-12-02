import React, { useEffect, useState } from "react";
import { getContractInstance, web3 } from "./web3";

function App() {
  const [contract, setContract] = useState(null);
  const [owner, setOwner] = useState("");
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [transcript, setTranscript] = useState(null);

  useEffect(() => {
    const loadContract = async () => {
      try {
        const instance = await getContractInstance();
        setContract(instance);

        //const accounts = await web3.eth.requestAccounts();
        const contractOwner = await instance.methods.owner().call();
        setOwner(contractOwner);

        console.log("Contract Owner:", contractOwner);
      } catch (error) {
        console.error("Error loading contract:", error);
      }
    };

    loadContract();
  }, []);

  const handleIssueTranscript = async () => {
    try {
      const accounts = await web3.eth.requestAccounts();
      await contract.methods
        .issueTranscript(name, studentId, course, graduationYear)
        .send({ from: accounts[0] });
      alert("Transcript issued successfully!");
    } catch (error) {
      console.error("Error issuing transcript:", error);
    }
  };

  const handleVerifyTranscript = async () => {
    try {
      const accounts = await web3.eth.requestAccounts();
      await contract.methods.verifyTranscript(studentId).send({ from: accounts[0] });
      alert("Transcript verified successfully!");
    } catch (error) {
      console.error("Error verifying transcript:", error);
    }
  };

  const handleGetTranscript = async () => {
    try {
      const result = await contract.methods.getTranscript(studentId).call();
      setTranscript(result);
    } catch (error) {
      console.error("Error fetching transcript:", error);
    }
  };

  return (
    <div>
      <h1>ScholarChain</h1>
      <h2>Contract Owner: {owner}</h2>

      <div>
        <h3>Issue Transcript</h3>
        <input
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <input
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <input
          placeholder="Graduation Year"
          value={graduationYear}
          onChange={(e) => setGraduationYear(e.target.value)}
        />
        <button onClick={handleIssueTranscript}>Issue Transcript</button>
      </div>

      <div>
        <h3>Verify Transcript</h3>
        <input
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <button onClick={handleVerifyTranscript}>Verify Transcript</button>
      </div>

      <div>
        <h3>Get Transcript</h3>
        <input
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <button onClick={handleGetTranscript}>Get Transcript</button>
        {transcript && (
          <div>
            <p>Name: {transcript[0]}</p>
            <p>Student ID: {transcript[1]}</p>
            <p>Course: {transcript[2]}</p>
            <p>Graduation Year: {transcript[3]}</p>
            <p>Verified: {transcript[4] ? "Yes" : "No"}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
