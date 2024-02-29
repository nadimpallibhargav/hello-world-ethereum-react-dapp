import React, { useState } from "react";
import { ethers } from "ethers";
import SimpleStorage_abi from "./SimpleStorage_abi.json";

const SimpleStore = () => {
  let contractAddress = "0xa84b090f3bdDeB498d661AB2682872E9c35760F2";

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

// transaction history list
// 0x49d7bcca3e217b22574395391e03fedfd740bf8029af0e3f11c8e65a1d2c54b8;
// 0xdb13b13b527c13b106028085489289b5073ad22ae96939ba4ba289c89fbb99ff;
// 0x458a3c0acbba90b523f4d85be30870ae12b41887ef747c2164d1df74c9a466d3;
// 0x52d21f75e012e912ad7c3d405fc0f6c1b627b17dbc0c32d9620d75cb323b2e9a;
// 0xb595407a7002023eea2f8b848946cb37b7a03cf46d47a043cfd38511ed92d4ce;
// 0x1fc0cc359b03e14eb903434f2114089dd214474c1a68521fc12157fa20a93512;
// 0x5a719e29e2d569b2f70dfb7ba2a49128d6d13507e0a7d354e1a00d44b31c137a
// 0xe2d80bce7f4150d2b677a2ab45fdc7e1894c4adbfb1db1d8009f9f6f8b670bbc;
// 0xdf8cabec66d2bc5b7f5c3ccd1feb4e4b7c4044b570d1d33852aab3d4a4d0eb0f;
