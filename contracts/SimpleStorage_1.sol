//Solidity Version
pragma solidity 0.6.4;

contract SimpleStorage {
    string public storedData;

    event myEventTest(string eventOutput);

    function set(string memory myText) public {
        storedData = myText;
        emit myEventTest(myText);
    }

    function get() public view returns (string memory) {
        return storedData;
    }
}