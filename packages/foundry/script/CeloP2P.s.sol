// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import {Script, console} from "forge-std/src/Script.sol";
import {P2P1} from "../src/CeloP2P copy.sol";

contract CounterScript is Script {
    P2P1 public celoP2P;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        celoP2P = new CeloP2P();

        vm.stopBroadcast();
    }
}