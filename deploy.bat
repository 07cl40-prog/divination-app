@echo off
REM DivineHub 自动部署脚本 - 一键部署到 Vercel

echo.
echo ========================================
echo   🔮 DivineHub 自动部署脚本
echo   域名: www.blingjew.com
echo ========================================
echo.

REM 检查 Git 是否已安装
echo [1/5] 检查 Git...
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git 未安装！
    echo 请访问 https://git-scm.com 下载安装
    pause
    exit /b 1
)
echo ✅ Git 已安装

REM 进入项目目录
echo [2/5] 进入项目目录...
cd /d %USERPROFILE%\Desktop\divination-app
if errorlevel 1 (
    echo ❌ 项目目录不存在！
    pause
    exit /b 1
)
echo ✅ 项目目录正确

REM 初始化 Git
echo [3/5] 初始化 Git 仓库...
if not exist ".git" (
    call git init
    call git add .
    call git commit -m "Initial commit: DivineHub"
    echo ✅ Git 仓库已初始化
) else (
    echo ✅ Git 仓库已存在
)

REM 提示用户
echo.
echo ========================================
echo   📋 下一步操作
echo ========================================
echo.
echo 1. 访问 https://github.com/new 创建新仓库
echo    - 仓库名称: divination-app
echo    - 选择 Public
echo    - 点击 Create repository
echo.
echo 2. 复制 GitHub 给你的命令，在 PowerShell 中运行：
echo    git remote add origin https://github.com/YOUR_USERNAME/divination-app.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 3. 访问 https://vercel.com
echo    - 用 GitHub 账号登录
echo    - 点击 New Project
echo    - 导入 divination-app 仓库
echo    - 点击 Deploy
echo.
echo 4. 在 Vercel 中添加域名 www.blingjew.com
echo    - 进入 Settings → Domains
echo    - 点击 Add Domain
echo    - 输入 www.blingjew.com
echo.
echo 5. 在 Namecheap 中配置 DNS
echo    - 登录 Namecheap
echo    - 找到 blingjew.com 域名
echo    - 点击 Manage → Advanced DNS
echo    - 添加 CNAME 记录：
echo      Host: www
echo      Value: cname.vercel-dns.com
echo.
echo 6. 等待 DNS 生效（15 分钟 - 24 小时）
echo.
echo 7. 访问 https://www.blingjew.com
echo.
echo ========================================
echo.

pause
