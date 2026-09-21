$ppApp = New-Object -ComObject PowerPoint.Application
$presPath = "C:\Users\spars\Music\devreact\SIH2026_SIH26062_DevReact.pptx"
$pdfPath = "C:\Users\spars\Music\devreact\SIH2026_SIH26062_DevReact.pdf"
$presentation = $ppApp.Presentations.Open($presPath, $true, $false, $false)
$presentation.SaveAs($pdfPath, 32)
$presentation.Close()
$ppApp.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($ppApp) | Out-Null
Write-Host "SUCCESS: PDF created at $pdfPath"
