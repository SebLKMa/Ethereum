::start the 2 geth nodes
::start geth --datadir "C:\dev\ethereum\geth\data\01" --ipcpath geth01 --nodiscover --networkid 1234 --rpc --rpccorsdomain "*" console 2> "C:\dev\ethereum\geth\data\01\console.log"
::start geth --datadir "C:\dev\ethereum\geth\data\02" --ipcpath geth02 --port 30304 --nodiscover --networkid 1234 --rpc --rpcport 8546 --rpccorsdomain "*" console 2> "C:\dev\ethereum\geth\data\02\console.log"
start cmd /C start01.bat
start cmd /C start02.bat

:: wait 3 secs
timeout 3

::attach to the 2 started geth nodes
::start geth attach ipc:\\.\pipe\geth01
::start geth attach ipc:\\.\pipe\geth02
start cmd /C attach01.bat
start cmd /C attach02.bat

::3rd node using dynamic IP
::start cmd /C start03.bat
::timeout 3
::start cmd /C attach03.bat