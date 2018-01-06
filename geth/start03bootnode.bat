title "geth03"
::admin.addPeer("enode://b33bbc2e9d7855e09774ea55b0f5a9d60b65107b710fdc367254ed543759ea28ea0f5ca6d6f03b915780dfdd3f98b7855841d149f48ff8ca4784bc9720a0c1c2@139.63.10.103:30305?discport=0")
::geth --datadir "C:\dev\ethereum\geth\data\03" --ipcpath geth03 --port 30305 --nodiscover --networkid 1234 --rpc --rpcaddr "139.63.10.103" --rpcport 8547 --rpccorsdomain "*" console 2> "C:\dev\ethereum\geth\data\03\console.log"
:: NOTE --nodiscover cannot be used with --bootnodes (bootnodes uses UDP)
:: NOTE --bootnodes must specify IP even for localhost, i.e. [127.0.0.1]:30301 instead of [::]:30301
geth --datadir "C:\dev\ethereum\geth\data\03" --ipcpath geth03 --port 30305 --networkid 1234 --rpc --rpcport 8547 --rpccorsdomain "*" --bootnodes "enode://6d35248c9f26c788f6014b7f55a71c910eea1a7db5c40962986448d6df44ae76aff50908dfeeb4462fbf2c08dcd0d4d432376df69687ac1def2d57206f0a25e7@[::]:30301" console 2> "C:\dev\ethereum\geth\data\03\console.log"
