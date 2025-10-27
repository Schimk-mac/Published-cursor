# Integration Validation Script
# Checks for common integration issues before testing

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Product Page Integration Validator" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$errors = @()
$warnings = @()
$passed = 0

# Check 1: All files present
Write-Host "Checking file presence..." -ForegroundColor Yellow
$requiredFiles = @(
    "snippets/product-gallery-agent1.liquid",
    "assets/product-gallery-agent1.css",
    "assets/product-gallery-agent1.js",
    "snippets/product-info-agent2.liquid",
    "assets/product-info-agent2.css",
    "assets/product-info-agent2.js",
    "snippets/product-extras-agent3.liquid",
    "assets/product-extras-agent3.css",
    "assets/product-extras-agent3.js",
    "sections/main-product-agent-integrated.liquid",
    "AGENT-COORDINATION.md",
    "AGENT3-INTEGRATION-GUIDE.md",
    "INTEGRATION-TESTING-GUIDE.md"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "  + $file" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "  - MISSING: $file" -ForegroundColor Red
        $errors += "Missing file: $file"
    }
}

Write-Host ""

# Check 2: Dev server status
Write-Host "Checking dev server..." -ForegroundColor Yellow
$portCheck = netstat -ano | Select-String "9292"
if ($portCheck) {
    Write-Host "  + Dev server running on port 9292" -ForegroundColor Green
    $passed++
} else {
    Write-Host "  - Dev server NOT running on port 9292" -ForegroundColor Red
    $warnings += "Dev server may not be running. Start with: shopify theme dev"
}

Write-Host ""

# Check 3: Git status
Write-Host "Checking git status..." -ForegroundColor Yellow
$branch = git branch --show-current
if ($branch -eq "integration/all-agents-product-page") {
    Write-Host "  + On correct branch: $branch" -ForegroundColor Green
    $passed++
} else {
    Write-Host "  ! On branch: $branch (expected: integration/all-agents-product-page)" -ForegroundColor Yellow
    $warnings += "Not on integration branch"
}

$unstagedChanges = git status --short
if ($unstagedChanges) {
    Write-Host "  ! Uncommitted changes found:" -ForegroundColor Yellow
    $unstagedChanges | ForEach-Object { Write-Host "    $_" -ForegroundColor Yellow }
} else {
    Write-Host "  + All changes committed" -ForegroundColor Green
    $passed++
}

Write-Host ""

# Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Validation Results" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "Checks Passed: $passed" -ForegroundColor Green

if ($errors.Count -gt 0) {
    Write-Host ""
    Write-Host "ERRORS ($($errors.Count)):" -ForegroundColor Red
    foreach ($error in $errors) {
        Write-Host "  - $error" -ForegroundColor Red
    }
}

if ($warnings.Count -gt 0) {
    Write-Host ""
    Write-Host "WARNINGS ($($warnings.Count)):" -ForegroundColor Yellow
    foreach ($warning in $warnings) {
        Write-Host "  - $warning" -ForegroundColor Yellow
    }
}

if ($errors.Count -eq 0 -and $warnings.Count -eq 0) {
    Write-Host ""
    Write-Host "SUCCESS: All checks passed! Ready for testing." -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Open browser at http://127.0.0.1:9292" -ForegroundColor Cyan
    Write-Host "2. Navigate to a product page" -ForegroundColor Cyan
    Write-Host "3. Follow INTEGRATION-TESTING-GUIDE.md for detailed tests" -ForegroundColor Cyan
    exit 0
} else {
    Write-Host ""
    Write-Host "FAILED: Please fix the errors above before testing." -ForegroundColor Red
    exit 1
}
