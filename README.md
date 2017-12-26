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

# Getting latest to empty local directory
C:\dev\ethereum>git init

C:\dev\ethereum>git remote add origin https://github.com/SebLKMa/Ethereum.git

C:\dev\ethereum>git fetch --all

C:\dev\ethereum>git pull origin master

# Checking in files, e.g. all files from contracts directory
C:\dev\ethereum\solidity\basics>git add contracts/*

C:\dev\ethereum\solidity\basics>git commit -m "contracts added"

C:\dev\ethereum\solidity\basics>git push -u origin master

# Pull a specific directory
cd into the top of your repo copy
git fetch
git checkout HEAD path/to/your/dir/or/file
(Where "path/..." in starts at the directory just below the repo root containing your ".../file")

