---
name: plan-azure-site
description: "Inspect an internal website, web app, API, or prototype and produce a minimal, evidence-backed Azure hosting architecture, migration plan, and shareable PDF. Use when someone asks what a site needs to run on Azure, whether an internal tool is Azure-ready, what must migrate from local hosting, Vercel, Supabase, SharePoint, or another platform, what Azure services are required, or what limitations and IT dependencies must be resolved before deployment. This skill plans and packages architecture only: it does not choose product features, modify the application, provision resources, deploy, or publish."
---

# Plan an Azure Site

Produce the first-step architectural plan that a site owner and August IT can act on. Inspect the actual project before recommending services. Prefer the smallest secure architecture that fits the observed workload.

Read [august-azure-baseline.md](references/august-azure-baseline.md) for the proven Investment Brain pattern and its limits. Read [report-contract.md](references/report-contract.md) before writing the report. Read [pdf-deliverable.md](references/pdf-deliverable.md) before creating the final files.

## Hold the boundary

- Analyze hosting architecture, migrations, constraints, ownership, and go-live gates.
- Do not decide or recommend product features, workflows, interface changes, or business logic.
- Do not modify code or configuration.
- Create report artifacts only in a writable task output folder, never inside the inspected repository unless the user explicitly asks.
- Do not provision Azure resources, deploy, publish, spend money, change production data, or send requests to IT.
- If the user later asks for implementation, hand the approved plan to the relevant build/deployment workflow and require confirmation before any production, billing, credential, or data action.

## Inspect the current system

Use repository evidence first. Follow the closest project instructions. Inspect only what is needed:

1. Identify framework, language, runtime version, package manager, build command, entry point, listening port, and browser/server boundary.
2. Classify the workload as static front end, server-rendered/full-stack app, API, background worker/job, or a combination.
3. Find data stores, schemas, migrations, extensions, connection libraries, caching, and local or in-memory state.
4. Find authentication, authorization, sessions, user identity keys, roles, and any tenant restriction.
5. Inventory external integrations, OAuth flows, callback URLs, webhooks, API credentials, outbound-network or IP requirements, and rate limits.
6. Find uploads, generated files, reports, logs, local filesystem writes, and assumptions about a shared disk.
7. Find schedulers, queues, long-running work, WebSockets/streaming, concurrency assumptions, and scale-sensitive code.
8. Find environment-variable names, Dockerfiles, deployment manifests, CI/CD, domains, CORS rules, health checks, and observability.
9. Classify every intended client: browser, desktop/native app, CLI or device-code client, API consumer, and service-to-service caller. For each, identify the sign-in flow, redirect URI, token audience or scopes, device-management expectations, and Conditional Access constraints.

Never open or reproduce secrets. Inspect example environment files and secret names only. Treat missing evidence as an unknown, not as permission to assume.

## Build the minimum target

Select only the components the evidence earns:

- Prefer Azure Static Web Apps for a compatible static front end; do not containerize static output without a reason.
- Prefer Azure Container Apps for a containerized server, API, or full-stack runtime that needs managed HTTPS, revisions, health probes, or scaling.
- Add Azure Container Registry only when a container image must be built and stored.
- Preserve the current database engine when practical. Use Azure Database for PostgreSQL Flexible Server when the application is already PostgreSQL-based or genuinely needs relational persistence.
- Add Azure Blob Storage or Azure Files only when files must survive restarts or be shared across replicas. Choose based on the application's access pattern; do not call ephemeral container storage durable.
- Use Microsoft Entra ID for August-user sign-in. Use the immutable tenant ID plus object ID as the external identity key; never authorize by mutable email alone.
- Use managed identity and least-privilege role assignments for Azure-to-Azure access.
- Keep secrets in Key Vault and expose them through references or managed identity. Separate migration/admin credentials from the restricted runtime identity.
- Add virtual-network integration, private endpoints, and private DNS when sensitive data stores must not be public.
- Add Log Analytics/Application Insights only to the level needed for runtime logs, health, and incident diagnosis.
- Add Container Apps Jobs, a queue, or another worker surface only when real background work exists.
- Use static credentials only for genuine machine-to-machine cases that cannot use managed identity. Do not use shared API keys as the default for human access: they weaken individual auditability and bypass Entra controls such as MFA and Conditional Access.

Treat the Investment Brain architecture as a proven baseline, not a mandatory stack. Explicitly list what the proposed site does **not** need.

## Prepare the August IT handoff

Produce one complete request package before provisioning begins. Do not make Matt or the site owner discover requirements through serial emails. Include only values supported by the inspected workload:

- resource group, region, Azure services, naming assumptions, dependencies, and required subscription resource providers;
- Entra app name, site owner, IT approver, allowed user/group boundary, and whether admin consent is required;
- a client matrix covering browser, native/desktop, CLI/device-code, API, and service callers, with each required platform, redirect URI, token audience/scope, and Conditional Access/device requirement;
- every managed identity and its exact least-privilege role and scope, including image-pull and secret-read access when applicable;
- any temporary human Azure roles, their scope, approver, expiry, extension owner, and removal check;
- private-network, DNS, outbound-IP, webhook, and database-administration dependencies;
- any temporary firewall or direct-database access needed for migration, plus the permanent in-network replacement and removal date;
- approval order, known propagation waits, validation owner, and the evidence that closes each request.

Distinguish application ownership from tenant administration. An app owner may configure the registration while August IT still retains admin consent, Conditional Access, subscription registration, and privileged-role approval.

Do not copy the Brain's native-client settings automatically. Request public-client flows, desktop/mobile platforms, broker or localhost redirect URIs, or a delegated API scope only when an inspected non-browser client actually needs them. Treat scope names as application-specific.

## Verify live Azure facts

Azure capabilities, quotas, pricing, and authentication details change. Before stating a service limitation, exact price, supported region, runtime limit, networking behavior, or plan requirement:

1. Verify it in current official Microsoft Learn, Azure service documentation, or the Azure Pricing Calculator.
2. Prefer primary Microsoft sources only.
3. Cite the supporting page beside the claim.
4. Label an inference as an inference.

Keep repository facts, live Azure facts, and assumptions visibly separate.

## Analyze the migration

For every current component, state:

- what exists now;
- its proposed Azure destination;
- whether it can move unchanged, needs configuration, or needs code/data migration;
- the reason and source evidence;
- the owner: site owner, August IT/Matt, or shared;
- the proof required before go-live.

Always test these migration seams:

- build and container compatibility;
- environment and secret handling;
- managed-platform coupling: map direct browser SDKs, auth, database APIs/RLS, storage, realtime, and serverless/edge functions separately;
- database engine/version, extensions, schema, data transfer, derived indexes, runtime role, and rollback;
- Entra app registration, ownership versus admin consent, tenant and group restriction, every client platform and redirect URI, token audience/scope, client token acquisition, and compatibility with existing Conditional Access/device policy;
- per-user authorization and multi-user data isolation;
- filesystem durability and replica scaling;
- sessions, in-process caches, and concurrent requests;
- external API OAuth, per-user credentials, webhook reachability, egress/IP restrictions, and rate limits;
- CORS, domains, HTTPS, health/readiness probes, logging, backup/restore, and support ownership.

Do not describe a migration as complete because the app builds. The plan must include a real authenticated multi-user test and a failure/rollback check appropriate to the data sensitivity.

## Apply the go-live sequence

Default to this safe order, removing steps the workload does not need:

1. Confirm the workload classification, data sensitivity, users, and current dependencies.
2. Agree the minimal architecture, client types, and ownership split with August IT.
3. Deliver the complete IT handoff; register required subscription providers and approve Entra, RBAC, and network dependencies before application deployment begins.
4. Create infrastructure as code and least-privilege identities.
5. Build an immutable artifact or image.
6. Prepare and verify data migrations with separate admin and runtime credentials.
7. Deploy privately or with external ingress disabled.
8. Verify image pull, health, database/storage connectivity, secret access, and logging from inside the runtime.
9. Configure Entra for every required client and test with a real target user/device under existing Conditional Access before opening access. Prefer fitting the architecture to policy over requesting an exception.
10. Run unauthenticated, wrong-tenant, two-user isolation, integration, restart, and rollback tests.
11. Remove or schedule removal of temporary roles, firewall rules, and direct database access; then open access only after all applicable gates pass.

## Keep the answer useful

- Lead with the bottom line and the smallest recommended architecture.
- Explain Azure service names in plain language.
- Distinguish **required for first launch**, **required before broader use**, and **optional later**.
- Name unknowns and who can answer them instead of inventing detail.
- Include necessary migrations and meaningful limitations; omit generic cloud advice.
- Include the ready-to-send August IT handoff package with exact requests, owners, dependencies, expiries, and acceptance tests.
- Avoid feature recommendations entirely.

## Package the deliverable

Always finish with both an editable Markdown report and a polished PDF containing the complete assessment. Follow [pdf-deliverable.md](references/pdf-deliverable.md) exactly.

The chat response is only the handoff: give the three-line bottom line, then link the PDF first and Markdown second. Do not make the user reconstruct the report from chat history.
