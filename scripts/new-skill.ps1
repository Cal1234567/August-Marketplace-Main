# Create a new personal skill stub in ~/.claude/skills/ — the source of truth for all skills.
#
# Usage:
#   .\scripts\new-skill.ps1 -Name "my-skill" -Description "Does X when user says Y"
#
# Edits to ~/.claude/skills/ take effect immediately in Claude Code (no reload needed).
# When you're ready to publish the skill to the August AI site, run:
#   .\scripts\promote-skill.ps1 -Name "my-skill"

param(
    [Parameter(Mandatory)] [string]$Name,
    [string]$Description = "TODO: add description"
)

$ErrorActionPreference = "Stop"

$SkillDir = "$env:USERPROFILE\.claude\skills\$Name"

if (Test-Path $SkillDir) {
    Write-Error "Skill already exists: $SkillDir"
}

New-Item -ItemType Directory -Force $SkillDir | Out-Null

$DisplayName = (Get-Culture).TextInfo.ToTitleCase(($Name -replace '-', ' '))

$skillMd = @"
---
name: $Name
description: >-
  $Description
---

# $DisplayName

TODO: add skill instructions here.
"@

Set-Content "$SkillDir\SKILL.md" -Value $skillMd -Encoding UTF8 -NoNewline

Write-Host "Created: $SkillDir\SKILL.md"
Write-Host "Edit the file — changes take effect immediately in Claude Code."
Write-Host "To publish to the August AI site: .\scripts\promote-skill.ps1 -Name `"$Name`""
