import React, { useState } from "react";
import { ethers } from "ethers";
import SimpleStorage_abi from "./SimpleStorage_abi.json";

const SimpleStore = () => {
  let contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const [currentContractVal, setCurrentContractVal] = useState(null);

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText("wallet connected");
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
    } else {
      setErrorMessage("Please install metamask");
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  };

  const updateEthers = () => {
    let tempProvider = new ethers.providers.web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(
      contractAddress,
      SimpleStorage_abi,
      tempSigner
    );
    setContract(tempContract);
  };

  const getCurrentVal = async () => {
    let val = await contract.get();
    setCurrentContractVal(val);
  };

  const setHandler = (e) => {
    e.preventDefault();
    contract.set(e.target.setText.value);
  };

  return (
    <div>
      <h3>{"get/set interaction with contract"}</h3>
      <button onClick={connectWalletHandler}>{connButtonText}</button>
      <h4>Account: {defaultAccount}</h4>

      <form onSubmit={setHandler}>
        <input id="setText" type="text" />
        <button type="submit">submit</button>
      </form>

      <button onClick={getCurrentVal}>Get Current Value</button>

      {errorMessage}
    </div>
  );
};

export default SimpleStore;
