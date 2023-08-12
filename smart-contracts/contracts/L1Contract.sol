// SPDX-License-Identifier: MIT 
// @unsupported: ovm
pragma solidity ^0.8.10;

import { ByteHasher } from './helpers/ByteHasher.sol';
import { IWorldID } from './interfaces/IWorldId.sol';
import { IMailbox } from './interfaces/IMailbox.sol';


contract L1Contract {
    using ByteHasher for bytes;
	error InvalidNullifier();

    
	IWorldID internal immutable worldId;
    mapping(uint256 => bool) internal nullifierHashes;
	
    address internal addRecipient = 0x65698ef6229AF993c6aC2c2ec8e08dcFEa227952; //mailbox contract of OPSTACK chain
    bytes32 internal bytRecipient = bytes32(uint256(uint160(addRecipient)));
    bytes internal _body;

    IMailbox mailbox = IMailbox(0xCC737a94FecaeC165AbCf12dED095BB13F037685); // Hyperlane optimism testnet mailbox

    uint32 internal immutable destination = 42069; // domain id of OPSTACK chain
    uint256 internal immutable externalNullifier;
	uint256 internal immutable groupId = 1;


    constructor (IWorldID _worldId, string memory _appId, string memory _actionId) {
        worldId = _worldId;
		externalNullifier = abi.encodePacked(abi.encodePacked(_appId).hashToField(), _actionId).hashToField();
    }

    function verify(address signal, uint256 root, uint256 nullifierHash, uint256[8] calldata proof) public {
        if (nullifierHashes[nullifierHash]) {
            revert InvalidNullifier();
        }
        worldId.verifyProof
        (		
            root,
			groupId,
			abi.encodePacked(signal).hashToField(),
			nullifierHash,
			externalNullifier,
			proof
        );

    	nullifierHashes[nullifierHash] = true;
        _body = "msg.sender";    
        mailbox.dispatch(destination, bytRecipient, _body);

    }
    
    function sendTestMessages () public {
        _body = "msg.sender";    
        mailbox.dispatch(destination, bytRecipient, _body);
    }
}