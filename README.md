# Configuration for my projects

Just a summary of my configurations to import easily.

See the readmes in each package for further information.

## Tipps

### Renovate

Inside of the `@mheob` scope I can use a shared Renovate configuration.\
For further information see the [Renovate Docs](https://docs.renovatebot.com/config-presets).

Please overwrite the schedule in the used Renovate config stored at `.github/renovate.json`.

```json
{
	"$schema": "https://docs.renovatebot.com/renovate-schema.json",
	"extends": ["local>mheob/.github:renovate-config"],
	"schedule": ["before 4am on Wednesday"]
}
```
