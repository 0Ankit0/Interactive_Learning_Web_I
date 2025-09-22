# Build CSS from SCSS
# This script compiles SCSS to the dist/css folder

Write-Host "Building CSS from SCSS..." -ForegroundColor Green

# Compile expanded version for development
Write-Host "Compiling expanded version..." -ForegroundColor Yellow
sass scss/main.scss dist/css/main.css --style=expanded

# Compile compressed version for production
Write-Host "Compiling compressed version..." -ForegroundColor Yellow
sass scss/main.scss dist/css/main.min.css --style=compressed

Write-Host "CSS build complete!" -ForegroundColor Green
Write-Host "Files created:" -ForegroundColor Cyan
Write-Host "  - dist/css/main.css (expanded)" -ForegroundColor Cyan
Write-Host "  - dist/css/main.min.css (compressed)" -ForegroundColor Cyan
