// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import {Script, console} from "forge-std/Script.sol";
import {MiniSafe} from "../src/MiniSafe.sol";

contract CounterScript is Script {
    MiniSafe public minisafe;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        minisafe = new MiniSafe();

        vm.stopBroadcast();
    }
}
