# Workflow Commands

## Docker tippecanoe

Build and push the tippecanoe docker image to GHCR

```
act \
--container-architecture linux/arm64 \
--secret-file .act/.secrets \
--workflows .github/workflows/docker-tippecanoe.yml \
--job build-and-push-image \
workflow_dispatch
```

## Build and Push osmium

Build and push the osmium docker image to GHCR

```
act \
--container-architecture linux/arm64 \
--secret-file .act/.secrets \
--workflows .github/workflows/docker-osmium.yml \
--job build-and-push-image \
workflow_dispatch
```

## Render tiles

Use a Digital Dcean droplet to render pmtiles and push to S3.

Note that the input arg, e.g. `tile-regions-id=test-monaco`, determines the regions file that is used.

```
act \
  --container-architecture linux/arm64 \
  --platform ubuntu-latest=act-runner:latest \
  --platform ubuntu-22.04=act-runner:latest \
  --pull=false \
  --var-file .act/.vars-render-tiles \
  --env-file .act/.env \
  --secret DIGITAL_OCEAN_SSH_PRIVATE_KEY="$(< .act/id_rsa)" \
  --secret-file .act/.secrets \
  --workflows .github/workflows/render-tiles.yml \
  --job render-tiles \
  --job cleanup \
  --input tile-regions-id=test-monaco \
  workflow_dispatch
```

## Deploy Staging

Build the Astro site and deploy to S3/CloudFront.

```
act \
  --container-architecture linux/arm64 \
  --platform ubuntu-latest=act-runner:latest \
  --platform ubuntu-22.04=act-runner:latest \
  --pull=false \
  --var-file .act/.vars-deploy-staging \
  --env-file .act/.env \
  --secret-file .act/.secrets \
  --workflows .github/workflows/deploy-staging.yml \
  --job deploy \
  workflow_dispatch
```

## Deploy Production

Build the Astro site and deploy to S3/CloudFront.

```
act \
  --container-architecture linux/arm64 \
  --platform ubuntu-latest=act-runner:latest \
  --platform ubuntu-22.04=act-runner:latest \
  --pull=false \
  --var-file .act/.vars-deploy-production \
  --env-file .act/.env \
  --secret-file .act/.secrets \
  --workflows .github/workflows/deploy-production.yml \
  --job deploy \
  workflow_dispatch
```
