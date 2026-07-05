@echo off
title Git Setup — AI Business Inspector
color 0B
cls
echo.
echo  ============================================
echo   Git Setup — AI Business Inspector
echo  ============================================
echo.

cd /d "%~dp0"

echo Initializing git...
git init
git config user.email "ms4439409@gmail.com"
git config user.name "Mohamed Shalan"
git branch -M main

echo.
echo Adding all files...
git add .
git commit -m "Initial commit - AI Business Inspector landing page"

echo.
echo Connecting to GitHub...
git remote add origin https://github.com/Mohamedshalan2002/ai-business-inspector.git

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
if errorlevel 1 (
  echo ERROR: Push failed. Make sure you're signed in to GitHub.
  echo Try running: git credential-manager github login
) else (
  echo  ============================================
  echo   SUCCESS! Code is live on GitHub.
  echo   https://github.com/Mohamedshalan2002/ai-business-inspector
  echo  ============================================
)
pause
