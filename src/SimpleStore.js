import React, { useState } from "react";
import { ethers } from "ethers";
import SimpleStorage_abi from "./SimpleStorage_abi.json";

const SimpleStore = () => {
  let contractAddress = "0x358AA13c52544ECCEF6B0ADD0f801012ADAD5eE3";

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
          updateEthers();
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
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
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
        <button type={"submit"}>submit</button>
      </form>

      <button onClick={getCurrentVal}>Get Current Value:</button>

      {currentContractVal}

      {errorMessage}
    </div>
  );
};

export default SimpleStore;

// 0x49d7bcca3e217b22574395391e03fedfd740bf8029af0e3f11c8e65a1d2c54b8;
// 0xdb13b13b527c13b106028085489289b5073ad22ae96939ba4ba289c89fbb99ff;
// 0x458a3c0acbba90b523f4d85be30870ae12b41887ef747c2164d1df74c9a466d3;