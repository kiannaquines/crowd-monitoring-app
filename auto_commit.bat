@echo off

set /p commit_message="Enter your commit message "
set /p branch_name="Enter your branch name "

git add .
git commit -m "%commit_message%"
git push -u origin %branch_name%

echo You have successfully commit and push the project changes...

timeout /t 6 /nobreak

cls
