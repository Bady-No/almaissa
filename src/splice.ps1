$file = 'src\App.tsx'
$newBlock = 'src\ProductModalNew.txt'

$original = Get-Content $file -Encoding UTF8
$replacement = Get-Content $newBlock -Encoding UTF8

$before = $original[0..610]
$after  = $original[956..($original.Length - 1)]

$combined = $before + $replacement + $after
$combined | Set-Content $file -Encoding UTF8
Write-Host "Done. Total lines: $($combined.Length)"
