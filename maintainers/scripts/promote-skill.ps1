# Promote a personal skill into the August-Marketplace-Main repo for publishing to the August AI site.
#
# Usage:
#   .\scripts\promote-skill.ps1 -Name "personal-call-notes"
#   .\scripts\promote-skill.ps1 -Name "dive" -Category "Investments" -Tags "research,diligence"
#   .\scripts\promote-skill.ps1 -Name "my-skill" -Description "Short one-liner for the site listing"
#
# Reads ~/.claude/skills/<Name>/SKILL.md, creates/updates the plugin wrapper in this repo,
# and upserts the marketplace.json entry. Safe to re-run — updates in place if already promoted.
#
# After running:
#   git add . && git commit -m "promote <slug> skill" && git push origin main
#   The August AI site updates within ~30 seconds.

param(
    [Parameter(Mandatory)] [string]$Name,
    [string]$Description,
    [ValidateSet("Investments","Productivity","Legal & Compliance","Advisory","Lifestyle & Marketing","Business Operations")]
    [string]$Category = "Productivity",
    [string]$Tags = "workflow"
)

$ErrorActionPreference = "Stop"

$SkillsDir       = "$env:USERPROFILE\.claude\skills"
$RepoRoot        = Resolve-Path "$PSScriptRoot\.."
$MarketplacePath = "$RepoRoot\.claude-plugin\marketplace.json"
$SourceSkill     = "$SkillsDir\$Name\SKILL.md"

if (-not (Test-Path $SourceSkill)) {
    Write-Error "Skill not found: $SourceSkill"
}

# --- Read source SKILL.md ---
$rawContent = Get-Content $SourceSkill -Raw -Encoding UTF8

# --- Parse YAML frontmatter ---
$fmMatch = [regex]::Match($rawContent, '(?s)^---\r?\n(.+?)\r?\n---')
if (-not $fmMatch.Success) { Write-Error "No YAML frontmatter found in $SourceSkill" }
$frontmatter = $fmMatch.Groups[1].Value

# Extract description from frontmatter if not overridden
if (-not $Description) {
    # Handle multiline >- block
    $multilineMatch = [regex]::Match($frontmatter, '(?s)description:\s*>-?\s*\r?\n((?:[ \t]+.+\r?\n?)+)')
    if ($multilineMatch.Success) {
        $Description = ($multilineMatch.Groups[1].Value -split '\r?\n' |
            ForEach-Object { $_.Trim() } |
            Where-Object { $_ -ne "" }) -join ' '
    } else {
        $inlineMatch = [regex]::Match($frontmatter, 'description:\s*(.+)')
        $Description = $inlineMatch.Success ? $inlineMatch.Groups[1].Value.Trim() : $Name
    }
    # Strip (PERSONAL) marker from description
    $Description = $Description -replace '^\(PERSONAL\)\s*', ''
}

# --- Truncate to first sentence for the site listing ---
# The full description is needed in SKILL.md (it's what Claude uses to trigger the skill)
# but marketplace.json and plugin.json only need a short one-liner.
$SiteDescription = ($Description -split '(?<=[.!?])\s')[0].Trim()
if ($SiteDescription.Length -gt 120) {
    $SiteDescription = $SiteDescription.Substring(0, 117).TrimEnd() + '...'
}

# --- Derive slug, display name, and subdirectory ---
$Slug        = $Name -replace '^personal-', ''
$PluginName  = "$Slug-plugin"
$DisplayName = (Get-Culture).TextInfo.ToTitleCase(($Slug -replace '-', ' '))

# Map category to subfolder; anything unrecognised goes into productivity
$SubDir = switch ($Category) {
    "Investments"           { "investments" }
    "Legal & Compliance"    { "legal" }
    "Advisory"              { "advisory" }
    "Lifestyle & Marketing" { "lifestyle-marketing" }
    "Business Operations"   { "business-operations" }
    default                 { "productivity" }
}

$PluginDir   = "$RepoRoot\skills\$Slug"
$ManifestDir = "$PluginDir\.claude-plugin"
$SkillDir    = "$PluginDir\skills\$Slug"

New-Item -ItemType Directory -Force $ManifestDir | Out-Null
New-Item -ItemType Directory -Force $SkillDir    | Out-Null

# --- Write plugin.json ---
$pluginJson = [ordered]@{
    '$schema'   = "https://json.schemastore.org/claude-code-plugin-manifest.json"
    name        = $PluginName
    displayName = $DisplayName
    version     = "1.0.0"
    description = $SiteDescription
    author      = [ordered]@{ name = "August Group" }
    repository  = "https://github.com/Cal1234567/August-Marketplace-Main"
    skills      = "./skills"
}
$pluginJson | ConvertTo-Json -Depth 5 | Set-Content "$ManifestDir\plugin.json" -Encoding UTF8
Write-Host "  Wrote $ManifestDir\plugin.json"

# --- Write SKILL.md (rewrite name slug, strip PERSONAL marker) ---
$newFrontmatter = $frontmatter `
    -replace 'name:\s*.+', "name: $Slug" `
    -replace '\(PERSONAL\)\s*', ''
$newContent = $rawContent -replace '(?s)^---\r?\n.+?\r?\n---', "---`n$newFrontmatter`n---"
Set-Content "$SkillDir\SKILL.md" -Value $newContent -Encoding UTF8 -NoNewline
Write-Host "  Wrote $SkillDir\SKILL.md"

# --- Upsert marketplace.json ---
$marketplace = Get-Content $MarketplacePath -Raw | ConvertFrom-Json
$tagArray    = @($Tags -split "," | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne "" })

$entry = [ordered]@{
    name        = $PluginName
    displayName = $DisplayName
    source      = "./skills/$Slug"
    description = $SiteDescription
    version     = "1.0.0"
    author      = [ordered]@{ name = "August Group" }
    category    = $Category
    tags        = $tagArray
}

$existing = $marketplace.plugins | Where-Object { $_.name -eq $PluginName }
if ($existing) {
    $marketplace.plugins = @($marketplace.plugins | ForEach-Object {
        if ($_.name -eq $PluginName) { $entry } else { $_ }
    })
    Write-Host "  Updated $PluginName in marketplace.json"
} else {
    $marketplace.plugins += $entry
    Write-Host "  Added $PluginName to marketplace.json ($(($marketplace.plugins).Count) plugins total)"
}

$marketplace | ConvertTo-Json -Depth 10 | Set-Content $MarketplacePath -Encoding UTF8

Write-Host ""
Write-Host "Done — $Slug is ready to publish."
Write-Host "  git add . && git commit -m `"promote $Slug skill`" && git push origin main"
