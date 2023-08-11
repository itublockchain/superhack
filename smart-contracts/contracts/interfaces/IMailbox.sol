// SPDX-License-Identifier: MIT
// @unsupported: ovm
pragma solidity ^0.8.10;

interface IMailbox {
    function dispatch(uint32 destination, bytes32 recipient, bytes calldata body) external returns (bytes32);
    function process(bytes calldata _metadata, bytes calldata _message)
        external;
}
