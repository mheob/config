---
name: create-pr
description: Create a Pull Request
user-invocable: true
allowed-tools: Bash(az*), Bash(git*), Bash(nr*)
agent: git-versioning
---

Create a _DRAFT_ Pull Request based on all commits in the current branch that differ from `develop`.

- the title is written as conventional commit with a max length of 50 characters
- the description is organized in "Summary", "Changes", "Motivation" and if useful any additional context
- use our template: @.azuredevops/pull_request_template.md

Make sure the description is clear and concise, and that it provides enough information for reviewers to understand the purpose
and impact of the changes.

If possible extract the Jira ticket number (NBP-0000) from the branch name and replace all instances of `NBP-XXX` in the
description.

Use Azure DevOps as remote. If you can use the Azure DevOps MCP us it, otherwise make sure the `az` CLI should be installed and
configured. If not describe how to use the `az` CLI to create the PR on Azure DevOps.

Do not use the `--no-verify` if not really need.

Do not mention an co-author or generator.
