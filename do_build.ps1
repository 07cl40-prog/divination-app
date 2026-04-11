$ErrorActionPreference = "Continue"
$projectDir = "C:\Users\Administrator\Desktop\divination-app"

# Remove old dist
if (Test-Path "$projectDir\dist") {
    Remove-Item -Recurse -Force "$projectDir\dist"
}

# Run build from correct directory
Set-Location $projectDir
$output = & npm run build 2>&1
$exitCode = $LASTEXITCODE
$output | Out-File -FilePath "$projectDir\build3.log" -Encoding UTF8

Write-Host "Exit code: $exitCode"

# Check dist
if (Test-Path "$projectDir\dist\index.html") {
    Write-Host "BUILD SUCCESS"
    Get-ChildItem "$projectDir\dist" -Recurse | ForEach-Object { Write-Host "  $($_.FullName)" }
} else {
    Write-Host "BUILD FAILED"
    Write-Host $output
}
