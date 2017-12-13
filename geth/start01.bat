title "geth01"
mode con:cols=100 lines=10
geth --datadir "C:\dev\ethereum\geth\data\01" --ipcpath geth01 --nodiscover --networkid 1234 --rpc --rpccorsdomain "*" console 2> "C:\dev\ethereum\geth\data\01\console.log"
::geth --datadir "C:\dev\ethereum\geth\data\01" --ipcpath geth01 --nodiscover --networkid 1234 --rpc --rpccorsdomain="chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn" console 2> "C:\dev\ethereum\geth\data\01\console.log"
