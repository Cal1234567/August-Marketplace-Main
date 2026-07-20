# Azure architecture report contract

Use this order. Keep the opening compact; make the rest complete enough for the site owner and August IT to estimate and execute.

## Bottom line

State in three short lines:

1. workload type and readiness;
2. minimum Azure architecture;
3. largest blocker or unknown.

## Current system

List verified facts about the front end, server/runtime, data, identity, files, integrations, jobs, and deployment assumptions. Add a separate short list of unknowns.

## Recommended Azure architecture

Use a table:

| Component | Azure destination | Launch status | Why |
|---|---|---|---|

Use `Required for first launch`, `Required before broader use`, `Optional later`, or `Not needed` for launch status.

Then add `What stays unchanged` and `What this site does not need`.

## Required migrations

Use a table:

| Priority | Change | Owner | Evidence | Acceptance test |
|---|---|---|---|---|

Separate site-owner work from August IT/Matt work. Do not turn unknown ownership into a technical assumption.

## August IT handoff

Produce a consolidated, ready-to-send handoff rather than a general list of IT tasks.

Use a client/authentication matrix when authentication exists:

| Client | Platform and flow | Redirect URI | Audience/scope | Conditional Access/device requirement | Required? |
|---|---|---|---|---|---|

Use an access and approval matrix:

| Principal or owner | Scope | Role, permission, or approval | Permanent or temporary | Expiry/cleanup | Acceptance test |
|---|---|---|---|---|---|

Also state:

- required subscription resource providers;
- resource group, region, services, and dependency order;
- app owner versus admin-consent/Conditional Access owner;
- exact user/group allowlist;
- managed-identity assignments;
- private-network, DNS, callback, webhook, or outbound-IP needs;
- temporary developer or database access and how it will be removed;
- expected propagation waits and who verifies completion.

Omit rows that do not apply. Do not insert Brain-specific identifiers or authentication settings without evidence from the inspected site.

## Security and data boundary

Cover:

- intended users and tenant restriction;
- authentication and authorization;
- private versus shared data;
- stable user identity;
- secrets and managed identity;
- runtime versus admin database permissions;
- public/private networking;
- sensitive integrations and audit/logging needs.

## Limitations and decision points

Include only limitations that materially affect this site. For each, label it as:

- `Verified in code`;
- `Verified in current Microsoft documentation`;
- `Inference`;
- `Unknown - owner must answer`.

If cost matters, give cost drivers first. Provide a numeric estimate only from current Azure pricing inputs and state the assumptions.

## Sequenced first-launch plan

Give a short ordered plan from architecture sign-off through the launch gate. Name dependencies and rollback points.

## Go-live gates

Use pass/fail checks for the applicable items:

- build and startup;
- health and readiness;
- authentication enforced;
- unauthenticated and wrong-tenant access denied;
- intended users/groups allowed and non-members denied;
- every browser, desktop/native, CLI, API, or service client tested under the real Conditional Access policy;
- two-user authorization/data isolation;
- database/storage connectivity and least privilege;
- managed identity can pull the artifact and read only the required secrets;
- required subscription providers and Azure role assignments active;
- secrets absent from code and images;
- integration credentials/callbacks/webhooks;
- restart and multi-replica behavior;
- logging and backup/restore;
- temporary human roles, firewall rules, and direct database access removed or carrying an approved expiry owner;
- rollback.

## Sources and evidence

Make the report independently reviewable:

- cite repository evidence with repository-relative file paths and line numbers when available;
- cite current Microsoft documentation with human-readable page titles and full URLs;
- distinguish repository fact, Microsoft-verified fact, inference, and unanswered assumption;
- do not include local absolute paths, tool reference tokens, raw logs, email bodies, credentials, or secrets.

## Questions to close

End with the smallest set of unanswered questions, grouped by `Site owner` and `August IT/Matt`. Do not ask feature questions.
