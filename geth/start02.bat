title "geth 02"
mode con:cols=100 lines=10
::geth --datadir "C:\dev\ethereum\geth\data\02" --ipcpath geth02 --port 30304 --nodiscover --networkid 1234 --rpc --rpcport 8546 --rpccorsdomain "*" console 2> "C:\dev\ethereum\geth\data\02\console.log"
geth --datadir "C:\dev\ethereum\geth\data\02" --ipcpath geth02 --port 30304 --nodiscover --networkid 1234 --rpc --rpcport 8546 --rpccorsdomain "http://localhost:8000" console 2> "C:\dev\ethereum\geth\data\02\console.log"
