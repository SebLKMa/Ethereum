title "geth01"
mode con:cols=100 lines=10
:: NOTE --nodiscover cannot be used with --bootnodes (bootnodes uses UDP)
:: NOTE --bootnodes must specify IP even for localhost, i.e. [127.0.0.1]:30301 instead of [::]:30301
geth --datadir "C:\dev\ethereum\geth\data\01" --ipcpath geth01 --networkid 1234 --rpc --rpccorsdomain "*" --bootnodes "enode://6d35248c9f26c788f6014b7f55a71c910eea1a7db5c40962986448d6df44ae76aff50908dfeeb4462fbf2c08dcd0d4d432376df69687ac1def2d57206f0a25e7@[127.0.0.1]:30301" console 2> "C:\dev\ethereum\geth\data\01\console.log"
::geth --datadir "C:\dev\ethereum\geth\data\01" --ipcpath geth01 --nodiscover --networkid 1234 --rpc --rpccorsdomain="chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn" console 2> "C:\dev\ethereum\geth\data\01\console.log"
