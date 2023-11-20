// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract AzaToken is ERC20, Ownable, ReentrancyGuard {
    uint256 public constant TOTAL_SUPPLY = 21000000 * 10**18; // 18 decimals
    uint256 public cashbackPercentage;
    uint256 private _cashbackAddressLockExpiration;
    bool private _locked;
    bool private _frozen;
    uint256 public gasFee;

    event GasFeeSet(uint256 gasFee);

    // Mapping to track whether cashback was sent for a specific transaction
    mapping(address => mapping(uint256 => bool)) public cashbackSent;

    event TokenSentWithCashback(address indexed from, address indexed to, uint256 value, uint256 cashback);

    modifier onlyValidAddress(address _address) {
        require(_address != address(0) && _address != address(this), "Invalid address");
        _;
    }

    modifier onlySufficientBalance(uint256 value) {
        require(balanceOf(msg.sender) >= value, "Insufficient balance");
        _;
    }

    modifier hasEnoughMATIC() {
        require(balanceOf(msg.sender) >= 0.05 * 10**18, "Insufficient MATIC for transaction fees");
        _;
    }

    modifier onlyValidValue(uint256 value) {
        require(value > 0, "Invalid value");
        _;
    }

    modifier noReentrancy() {
        require(!_locked, "Reentrant call detected");
        _;
        _locked = true;
        _;
        _locked = false;
    }

    modifier notFrozen() {
        require(!_frozen, "Contract is currently frozen");
        _;
    }

    constructor() ERC20("AzaToken", "AZT") Ownable() {
        _mint(msg.sender, TOTAL_SUPPLY);
        cashbackPercentage = 5; // Set initial cashback percentage to 5%
    }


    function lockCashbackAddress() external onlyOwner noReentrancy notFrozen {
        _cashbackAddressLockExpiration = block.timestamp + 1 days;
    }


    function send(address to, uint256 value) external
        onlyValidAddress(to)
        onlySufficientBalance(value)
        onlyValidValue(value)
        noReentrancy
        notFrozen
        hasEnoughMATIC
    {
        // Transfer tokens to the recipient
        _transfer(msg.sender, to, value);
    }

    function setGasFee(uint256 _gasFee) external onlyOwner noReentrancy notFrozen{
        gasFee = _gasFee;
        emit GasFeeSet(gasFee);
    }
}
