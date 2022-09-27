# Renovate configuration

This is my shared Renovate configuration.\
For further information see the [Renovate Docs](https://docs.renovatebot.com/config-presets).

## Usage

Please overwrite the schedule in the used Renovate config stored at `.github/renovate.json`.

```json
{
	"$schema": "https://docs.renovatebot.com/renovate-schema.json",
	"extends": ["github>mheob/config/renovate"],
	"schedule": ["before 4am on Wednesday"]
}
```

## Ruleset

```json
{
	"$schema": "https://docs.renovatebot.com/renovate-schema.json",
	"extends": ["config:base", "group:allNonMajor", "schedule:earlyMondays"],
	"labels": ["dependencies"],
	"rangeStrategy": "bump",
	"major": {
		"dependencyDashboardApproval": true
	},
	"stabilityDays": 3,
	"prCreation": "not-pending",
	"prConcurrentLimit": 5,
	"timezone": "Europe/Berlin"
}
```
