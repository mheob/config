# Configuration for my projects

Just a summary of my configurations to import easily.

See the readmes in each package for further information.

## Tipps

### Kodiak

From the [official Kodiak docs](https://kodiakhq.com/docs/config-reference):

> Kodiak's configuration file is a TOML file and should be placed at `.kodiak.toml` (repository root or `.github/.kodiak.toml`).

If Kodiak cannot find configuration in the repository, Kodiak will use the global configuration in look in the [`.github`](https://github.com/mheob/.github) repository if the project is inside of the `@mheob` scope.

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
