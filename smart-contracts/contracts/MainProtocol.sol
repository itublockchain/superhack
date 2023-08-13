// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
// @unsupported: ovm

// This is a simple democratic voting contract
// It allows people to vote for a proposal
// It allows people to propose a proposal

contract Protocol {

    event NewVote(
        address indexed sender,
        uint256 indexed proposal
        ); //event when a person cast a vote
    event NewPropose(
        address indexed sender,
        string indexed proposal
        ); //event when a person propose a proposal
    event Winner(
        string indexed winner,
        string indexed proposalName,
        uint256 indexed proposalId
        );

    struct Proposal {
        string name; // name of the proposal
        string description;
        address sender;
        uint256 plusVotecount;
        uint256 minusVotecount;
        uint256 deadline;        
    }


    Proposal[] public proposals;
    mapping(address => uint256 ) public totalVoteCountPerPerson;
    mapping(address => uint256 ) public totalProposalCountPerPerson;
    mapping(address => mapping (uint256 => uint256) ) public hasVoted;
    address private chairPerson;

    constructor() {
        chairPerson = msg.sender; //the person who deploys the contract becomes the chairperson
    }


    function votePlus(uint256 _proposalId) public {
        require(hasVoted[msg.sender][_proposalId] == 0, "You have already voted");
        require(_proposalId < proposals.length, "The proposal does not exist");
        require(proposals[_proposalId].deadline > block.timestamp, "The proposal is expired");
        totalVoteCountPerPerson[msg.sender] += 1;
        proposals[_proposalId].plusVotecount += 1;
        hasVoted[msg.sender][_proposalId] = 1;
        emit NewVote(msg.sender, _proposalId);
    }


    function voteMinus(uint256 _proposalId) public {
        require(hasVoted[msg.sender][_proposalId] == 0, "You have already voted");
        require(_proposalId < proposals.length, "The proposal does not exist");
        require(proposals[_proposalId].deadline > block.timestamp, "The proposal is expired");
        totalVoteCountPerPerson[msg.sender] += 1;
        proposals[_proposalId].minusVotecount += 1;
        hasVoted[msg.sender][_proposalId] = 1;
        emit NewVote(msg.sender, _proposalId);
    }


    function propose(string memory _name, string memory _description, uint256 _deadlineDay) public {
        proposals.push(Proposal(_name, _description, msg.sender,0, 0, block.timestamp + _deadlineDay * 1 days));
        totalProposalCountPerPerson[msg.sender] += 1;
        emit NewPropose(msg.sender, _name);
    }


    function deleteProposal(uint256 _proposalId) public {
        require(_proposalId < proposals.length, "The proposal does not exist");
        require(msg.sender == chairPerson || msg.sender == proposals[_proposalId].sender, "Only the chairperson or the proposer can delete the proposal");
        delete proposals[_proposalId];
    }


    function getProposal(uint256 _proposalId) public view returns (string memory, string memory, uint256, uint256, uint256) {
        require(_proposalId < proposals.length, "The proposal does not exist");
        Proposal memory proposal = proposals[_proposalId];
        return (proposal.name, proposal.description, proposal.deadline, proposal.plusVotecount, proposal.minusVotecount);
    }


    function checkProposal(uint256 _proposalId) public view returns (bool) {
        require(_proposalId < proposals.length, "The proposal does not exist");
        Proposal memory proposal = proposals[_proposalId];
        if (proposal.deadline > block.timestamp) {
            return true;
        }
        return false;
    }


    function setWinner(uint256 _proposalId) public {
        require(_proposalId < proposals.length, "The proposal does not exist");
        Proposal memory proposal = proposals[_proposalId];
        require(proposal.deadline < block.timestamp, "The proposal is not expired yet");
        string memory winner;
        if (proposal.plusVotecount > proposal.minusVotecount) {
            winner = "Yes";
        } else if (proposal.plusVotecount < proposal.minusVotecount) {
            winner = "No";
        } else {
            winner = "Equal";
        }
        emit Winner(winner, proposal.name, _proposalId);
    }


    function setWinnerEarly(uint256 _proposalId) public {
        require(_proposalId < proposals.length, "The proposal does not exist");
        Proposal memory proposal = proposals[_proposalId];
        require(msg.sender == chairPerson, "Only the chairperson can set the winner early");
        string memory winner;
        if (proposal.plusVotecount > proposal.minusVotecount) {
            winner = "Yes";
        } else if (proposal.plusVotecount < proposal.minusVotecount) {
            winner = "No";
        } else {
            winner = "Equal";
        }        
        emit Winner(winner, proposal.name, _proposalId);
    }

    function getProposals() public view returns (Proposal[] memory) {
        return proposals;
    }
}