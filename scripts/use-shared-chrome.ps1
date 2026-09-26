$pagesRoot = Join-Path (Get-Location) 'src/pages'
$componentsRoot = Join-Path (Get-Location) 'src/components'
$headerPattern = '<header class="zk-global-header">.*?</header>'
$footerPattern = '<footer class="zk-global-footer">.*?</footer>'

Get-ChildItem -Path $pagesRoot -Recurse -Filter '*.astro' | ForEach-Object {
  $path = $_.FullName
  $source = [IO.File]::ReadAllText($path)
  $hasHeader = [regex]::IsMatch($source, $headerPattern, [Text.RegularExpressions.RegexOptions]::Singleline)
  $hasFooter = [regex]::IsMatch($source, $footerPattern, [Text.RegularExpressions.RegexOptions]::Singleline)
  if (-not $hasHeader -and -not $hasFooter) { return }

  $pageRelativePath = $path.Substring($pagesRoot.Length).TrimStart('\', '/')
  $pageDirectory = Split-Path -Parent $pageRelativePath
  $levelsUp = if ($pageDirectory) { ($pageDirectory -split '[\\/]').Count + 1 } else { 1 }
  $relative = ((('../') * $levelsUp) -join '') + 'components'
  $headerImport = "import Header from '$relative/Header.astro';"
  $footerImport = "import Footer from '$relative/Footer.astro';"

  if (-not $source.Contains($headerImport) -or -not $source.Contains($footerImport)) {
    $imports = @()
    if (-not $source.Contains($headerImport)) { $imports += $headerImport }
    if (-not $source.Contains($footerImport)) { $imports += $footerImport }
    $importBlock = ($imports -join "`n") + "`n"
    if ($source.StartsWith('---')) {
      $source = $source.Insert(4, "`n$importBlock")
    } else {
      $source = "---`n$importBlock---`n$source"
    }
  }

  if ($hasHeader) { $source = [regex]::Replace($source, $headerPattern, '<Header />', [Text.RegularExpressions.RegexOptions]::Singleline, [TimeSpan]::FromSeconds(5)) }
  if ($hasFooter) { $source = [regex]::Replace($source, $footerPattern, '<Footer />', [Text.RegularExpressions.RegexOptions]::Singleline, [TimeSpan]::FromSeconds(5)) }
  elseif ($hasHeader) { $source = $source -replace '</body>', "  <Footer />`n  </body>" }

  [IO.File]::WriteAllText($path, $source, [Text.UTF8Encoding]::new($false))
}
