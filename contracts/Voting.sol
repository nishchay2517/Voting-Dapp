// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Voting {
    struct candidate {
        string name;
        uint256 voteCount;
    }

    candidate[] public candidates;
    address owner;

    mapping (address => bool) public voters;

    uint256 votingStart;
    uint256 votingEnd;

    constructor(string[] memory _candidateNames , uint256 _durationMinutes){
        for(uint256 i=0;i<_candidateNames.length;i++){
            candidates.push(candidate({
                name : _candidateNames[i],
                voteCount : 0
            }));
        }

        owner = msg.sender;
        votingStart = block.timestamp;
        votingEnd = block.timestamp + (_durationMinutes* 1 minutes);
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function addCandidate(string memory _name) public onlyOwner {
        candidates.push(candidate({
            name : _name,
            voteCount : 0
        }));
    }

    function vote(uint256 _candidateindex) public{
        require(!voters[msg.sender] , "you have already voted.");
        require(_candidateindex < candidates.length , "invalid vote");

        candidates[_candidateindex].voteCount++;
        voters[msg.sender] = true;
    }

    function getAllvotesCandidates() public view returns(candidate[] memory){
        return candidates;
    }

    function getVotingStatus() public view returns(bool) {
        return (block.timestamp >= votingStart && block.timestamp <= votingEnd);
    }

    function getRemainingtime() public view returns(uint256){
        require(block.timestamp >= votingStart , "voting has not started yet");
        if(block.timestamp >= votingEnd) return 0;
        return votingEnd - block.timestamp;
    }

}
