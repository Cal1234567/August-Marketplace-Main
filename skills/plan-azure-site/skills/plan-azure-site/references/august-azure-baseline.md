# August Azure baseline

Use this as a decision reference distilled from the hosted Investment Brain. It is not a template to copy blindly.

## Proven shape

The Investment Brain uses:

- one containerized Python/HTTP application on Azure Container Apps;
- an immutable image in Azure Container Registry;
- Azure Database for PostgreSQL Flexible Server;
- a virtual network, delegated Container Apps subnet, PostgreSQL private endpoint, and private DNS;
- Microsoft Entra built-in authentication (Easy Auth), restricted to the August tenant and configured to return `401` when unauthenticated;
- a user-assigned managed identity with only Key Vault secret-read and registry-pull permissions;
- Key Vault references for database and model credentials;
- Log Analytics for application logs;
- Bicep infrastructure definitions;
- explicit liveness and database-backed readiness endpoints;
- a separate database-admin migration path and a restricted application runtime role.

The safe deployment order is infrastructure, permissions, immutable image, database preparation, private application deployment, internal verification, Entra configuration, external ingress, two-user testing, and only then removal of public database access.

## Identity and data boundary

The hosting layer validates Entra tokens. The application maps immutable `tenant ID + object ID` to its own stable user record. It does not use email as the authorization key.

Request identity flows through the application into database access. Private per-user records are also protected with PostgreSQL row-level security. Shared company/org data remains shared by design. The real launch gate verifies that two users can reach shared data while seeing only their own private records, activity, traces, and generated artifacts.

For another site, require row-level security only when private per-user database rows actually exist. Still require stable identity mapping and explicit authorization wherever user-specific access exists.

## Important limitations learned

- Easy Auth validates hosted requests but a non-browser client may still need its own Entra token-acquisition flow.
- Decide all client types before configuring Entra. The Brain needed separate web callback, delegated API scope, public-client, and desktop/broker settings because its installed clients were discovered after the browser path.
- Test a real target device against August Conditional Access early. The Brain's device-code flow authenticated the user but could not satisfy the managed-device policy, so it moved to normal browser/broker sign-in instead of weakening the policy.
- Entra application ownership does not include every approval. An app owner can configure the registration, while August IT may still need to grant admin consent and control Conditional Access.
- Easy Auth must be paired with an explicit user or group boundary; tenant authentication alone may allow more August users than intended.
- Shared static API keys are not the default for people. They do not provide the same individual audit trail or enforcement of Entra MFA and Conditional Access; reserve them for justified machine-to-machine use.
- Trust Easy Auth identity headers only when the application cannot be reached around the authentication layer.
- Container-local files are ephemeral and replica-local. The Brain temporarily stays at one replica because generated artifacts remain on local disk. A site that must scale or preserve files needs durable storage.
- A private PostgreSQL endpoint improves containment but makes laptop administration unavailable by design. Plan an approved in-network migration/admin path.
- The runtime database identity must not hold the administrator credential. Grant only the reads/writes the application needs.
- Hosted routes should be allowlisted. Do not expose local admin, ingest, debug, or generic passthrough endpoints simply because they exist in the codebase.
- Cross-version PostgreSQL moves can invalidate derived search/index data. The Brain had to rebuild derived full-text-search columns after its PostgreSQL version change.
- External ingress should remain closed until authentication is enforced and verified.

## Provisioning and handoff lessons

The July 2026 rollout exposed coordination dependencies that should be collected in one IT request before deployment:

- confirm required Azure subscription providers before building; missing `Microsoft.Network` and `Microsoft.ContainerRegistry` registrations blocked the Brain rollout;
- enumerate managed-identity assignments explicitly; the Brain runtime separately needed secret-read access in Key Vault and image-pull access in ACR;
- separate permanent runtime permissions from temporary human access; Contributor and Key Vault administration were time-limited and needed an expiry/extension owner;
- treat laptop database firewall rules as temporary migration access, not the operating model; close them after an approved in-network administration path exists;
- allow for Azure RBAC, firewall, and directory changes to propagate before declaring a configuration wrong;
- provision a placeholder image only as an infrastructure smoke test. It is not evidence that the application, identity flow, secrets, or data path are launch-ready.

## What not to copy automatically

- Do not require PostgreSQL for a static or stateless site.
- Do not require Container Apps for static build output.
- Do not hold a site to one replica when it has no local state.
- Do not add row-level security when there is no per-user database boundary.
- Do not add private networking, jobs, queues, or durable file storage without a real requirement.
- Do not copy Brain-specific API routes, memory concepts, model credentials, or product workflows.
- Do not copy the Brain's public-client setting, desktop redirect URIs, delegated scope name, PostgreSQL, ACR, or Container Apps unless the inspected workload earns them.

The governing rule is: use the simplest architecture that is secure and effective for the observed site.
