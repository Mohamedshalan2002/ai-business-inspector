@echo off
title AI Business Inspector — Dev Server
color 0A
cls
echo.
echo  ============================================
echo   AI Business Inspector — Starting up...
echo  ============================================
echo.

cd /d "%~dp0"

echo [1/3] Checking Node.js...
node --version
if errorlevel 1 (
  echo ERROR: Node.js not found. Install from nodejs.org
  pause
  exit /b 1
)

echo.
echo [2/3] Installing dependencies (first run takes ~2 min)...
call npm install

if errorlevel 1 (
  echo ERROR: npm install failed. Check the output above.
  pause
  exit /b 1
)

echo.
echo [3/3] Starting dev server...
echo.
echo  ============================================
echo   Opening: http://localhost:3000
echo  ============================================
echo.

start "" "http://localhost:3000"
call npm run dev
pause
