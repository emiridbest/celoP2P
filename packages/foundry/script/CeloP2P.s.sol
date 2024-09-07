// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import {Script, console} from "forge-std/Script.sol";
import {P2P1} from "../src/CeloP2P1.sol"; //onchain_evm_44787_0x22

contract CounterScript is Script {
    P2P1 public p2P1;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        p2P1 = new P2P1();

        vm.stopBroadcast();
    }
}