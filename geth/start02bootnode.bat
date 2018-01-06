title "geth 02"
mode con:cols=100 lines=10
::geth --datadir "C:\dev\ethereum\geth\data\02" --ipcpath geth02 --port 30304 --nodiscover --networkid 1234 --rpc --rpcport 8546 --rpccorsdomain "*" console 2> "C:\dev\ethereum\geth\data\02\console.log"
:: NOTE --nodiscover cannot be used with --bootnodes (bootnodes uses UDP)
:: NOTE --bootnodes must specify IP even for localhost, i.e. [127.0.0.1]:30301 instead of [::]:30301
geth --datadir "C:\dev\ethereum\geth\data\02" --ipcpath geth02 --port 30304 --networkid 1234 --rpc --rpcport 8546 --rpccorsdomain "http://localhost:8000" --bootnodes "enode://6d35248c9f26c788f6014b7f55a71c910eea1a7db5c40962986448d6df44ae76aff50908dfeeb4462fbf2c08dcd0d4d432376df69687ac1def2d57206f0a25e7@[127.0.0.1]:30301" console 2> "C:\dev\ethereum\geth\data\02\console.log"
