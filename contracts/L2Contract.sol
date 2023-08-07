// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {IMailbox} from "./interfaces/IMailbox.sol";

contract L2Contract {
    event Received(uint32 origin, address sender, bytes body);
    //TODO: ADD MAILBOX ADDRESS
    address constant mailbox = 0x00;
    // for access control on handle implementations
    modifier onlyMailbox() {
        require(msg.sender == mailbox);
        _;
    }

    // alignment preserving cast
    function bytes32ToAddress(bytes32 _buf) internal pure returns (address) {
        return address(uint160(uint256(_buf)));
    }

    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes memory _body
    ) external onlyMailbox {
        address sender = bytes32ToAddress(_sender);
        emit Received(_origin, sender, _body);
    }
}
