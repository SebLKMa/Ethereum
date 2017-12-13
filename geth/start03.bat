title "geth03"
::admin.addPeer("enode://b33bbc2e9d7855e09774ea55b0f5a9d60b65107b710fdc367254ed543759ea28ea0f5ca6d6f03b915780dfdd3f98b7855841d149f48ff8ca4784bc9720a0c1c2@139.63.10.103:30305?discport=0")
::geth --datadir "C:\dev\ethereum\geth\data\03" --ipcpath geth03 --port 30305 --nodiscover --networkid 1234 --rpc --rpcaddr "139.63.10.103" --rpcport 8547 --rpccorsdomain "*" console 2> "C:\dev\ethereum\geth\data\03\console.log"
geth --datadir "C:\dev\ethereum\geth\data\03" --ipcpath geth03 --port 30305 --nodiscover --networkid 1234 --rpc --rpcport 8547 --rpccorsdomain "*" console 2> "C:\dev\ethereum\geth\data\03\console.log"
