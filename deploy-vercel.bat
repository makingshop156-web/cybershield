@echo off
echo ============================================
echo  CyberShield — Deploy to Vercel
echo ============================================
echo.
echo Step 1: Create a Vercel token at:
echo         https://vercel.com/account/tokens
echo.
set /p TOKEN="Enter Vercel token: "
echo.
cd /d "%~dp0"
npx vercel --token %TOKEN% --prod --yes
echo.
pause
