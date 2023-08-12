// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
// @unsupported: ovm

import {IMailbox} from "./interfaces/IMailbox.sol";

contract L2Contract {
    event Received(uint32 origin, address sender, bytes body);
    mapping(address => bool) public isVerified;
    // FIX: ADD L1 MAILBOX ADDRESS
    address constant mailbox = 0x4B1A0E704F5Bec55600801d93B1bEd88d12caa7f;
    // for access control on handle implementations
    modifier onlyMailbox() {
        require(msg.sender == mailbox);
        _;
    }

    // alignment preserving cast
    function bytes32ToAddress(bytes32 _buf) internal pure returns (address) {
        return address(uint160(uint256(_buf)));
    }
    // receive messages from L1 Chain
    // set the sender address as verified ? dont know the sender is user or contract yet ?
    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes memory _body
    ) external onlyMailbox {
        address sender = bytes32ToAddress(_sender);
        isVerified[sender] = true;
        emit Received(_origin, sender, _body);
    }
    function verify(address _addr) external {
        isVerified[_addr] = true;
    }
}
