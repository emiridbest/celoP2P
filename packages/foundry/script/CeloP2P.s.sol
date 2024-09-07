// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import {Script, console} from "forge-std/Script.sol";
import {AttestedCeloP2P} from "../src/CeloP2P1.sol"; //onchain_evm_44787_0x22

contract CounterScript is Script {
    AttestedCeloP2P public p2P1;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        p2P1 = new AttestedCeloP2P();

        vm.stopBroadcast();
    }
}