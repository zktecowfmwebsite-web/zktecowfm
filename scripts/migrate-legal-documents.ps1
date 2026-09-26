$sourceRoot = 'C:\Users\srirama\Videos\WFM\ZKTeco_WFM_Full_Site_v177_Resource_Wireframe_and_Blue_Hero 1\site_v177\site_v171\site_v170\site_v169\site_v168'
$pages = @(
  @{ File = 'privacy.html'; Target = 'src/pages/privacy.astro'; Current = 'privacy'; Title = 'Privacy Notice | ZKTeco WFM' },
  @{ File = 'cookie-policy.html'; Target = 'src/pages/cookie-policy.astro'; Current = 'cookie-policy'; Title = 'Cookie Policy | ZKTeco WFM' },
  @{ File = 'terms.html'; Target = 'src/pages/terms.astro'; Current = 'terms'; Title = 'Website Terms of Use | ZKTeco WFM' },
  @{ File = 'biometric-privacy-policy.html'; Target = 'src/pages/biometric-privacy-policy.astro'; Current = 'biometric-privacy-policy'; Title = 'U.S. Biometric Privacy Policy | ZKTeco WFM' }
)

foreach ($page in $pages) {
  $path = Join-Path $sourceRoot $page.File
  $html = [IO.File]::ReadAllText($path, [Text.Encoding]::UTF8)

  $descriptionMatch = [regex]::Match($html, '<meta\s+content="([^"]*)"\s+name="description"\s*/?>', [Text.RegularExpressions.RegexOptions]::IgnoreCase)
  $description = if ($descriptionMatch.Success) { $descriptionMatch.Groups[1].Value } else { $page.Title }

  $hero = [regex]::Match($html, '<section class="zk-hero">.*?</section>', [Text.RegularExpressions.RegexOptions]::Singleline).Value
  $hero = $hero -replace 'class="zk-hero"', 'class="zk-document-hero"'
  $hero = $hero -replace 'zk-policy-date', 'zk-document-date'

  $content = [regex]::Match($html, '<aside class="zk-policy-sidebar">.*?</article>', [Text.RegularExpressions.RegexOptions]::Singleline).Value
  if (-not $hero -or -not $content) { throw "Could not extract document structure from $($page.File)." }
  $content = $content -replace 'zk-policy-sidebar', 'zk-document-sidebar'
  $content = $content -replace 'zk-legal-copy', 'zk-document-copy'
  $content = $content -replace 'zk-notice', 'zk-document-notice'
  $content = $content -replace '\.html(?=(["#]))', ''

  $output = @"
---
import SiteLayout from '../layouts/SiteLayout.astro';
import '../styles/pages/legal-document.css';
---
<!-- tailwind.css is loaded by SiteLayout. -->
<SiteLayout title="$($page.Title)" description="$description">
$hero
  <section class="zk-document">
    <div class="zk-wrap">
      <div class="zk-document-layout">
        $content
      </div>
    </div>
  </section>
</SiteLayout>
"@
  [IO.File]::WriteAllText((Join-Path (Get-Location) $page.Target), $output, [Text.UTF8Encoding]::new($false))
}
