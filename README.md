# Ethereum Blockchain

To clone the repository

git clone https://github.com/SebLKMa/Ethereum.git


To submit changes to sol files

cd Ethereum/Solidity

git add *.sol

git commit -m "your submission comments"

git push -u origin master

# Wiki
I also just transfered the first part of my Word doc to the Wiki tab here.

# Checking in files, e.g. all files from contracts directory
C:\dev\ethereum\solidity\basics>git add contracts/*

C:\dev\ethereum\solidity\basics>git commit -m "contracts added"
[master b5a4a3d] contracts added
 4 files changed, 58 insertions(+), 13 deletions(-)
 create mode 100644 solidity/basics/contracts/Ownable.sol
 create mode 100644 solidity/basics/contracts/OwnedHello.sol

C:\dev\ethereum\solidity\basics>git push -u origin master
Counting objects: 9, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (9/9), done.
Writing objects: 100% (9/9), 1.80 KiB | 613.00 KiB/s, done.
Total 9 (delta 5), reused 0 (delta 0)
remote: Resolving deltas: 100% (5/5), completed with 5 local objects.
To https://github.com/SebLKMa/Ethereum.git
   5fa4781..b5a4a3d  master -> master
Branch master set up to track remote branch master from origin.

