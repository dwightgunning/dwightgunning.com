# dwightgunning.com

The project source and CI/CD for [www.dwightgunning.com](https://www.dwightgunning.com).

A static site built with [Astro.build](https://astro.build/) and GitHub actions, hosted on AWS with Route53+CloudFront+S3.

## Development notes

### Design system

The site is styled with [Tailwindcss](https://tailwindcss.com).

- `tailwind.config.cjs`
- `tailwindBase.css`
- [color palette](./COLOR_PALETTE.md)

### Images

[ImageMagick](https://imagemagick.org/index.php) `mogrify` is good for converting original photos from various formats to jpegs with minimal quality loss. The Astro [assets](https://docs.astro.build/en/guides/assets/#overview) can then take care of generating web optimized images.

### Maps

See the [tiles readme](./tiles/README.md).

## CI/CD

### Setup

#### Digital Ocean

- Personal Access Token. Enables the `doctl` command to authenticate and perform actions with Digital Ocean resources. Setup [here](https://cloud.digitalocean.com/account/api/tokens).
- SSH key pair. Enables setup of SSH Key-Based Authentication on new Droplets. Setup [here](https://cloud.digitalocean.com/account/security).
- Project identifier. Identifiable via `doctl projects list`.

##### References

- [Digital Ocean Slugs](https://slugs.do-api.dev/): Identifiers for droplet, distro/app images, regions, etc.
- [doctl Command Line Interface docs](https://docs.digitalocean.com/reference/doctl/)

#### Amazon Web Services

- An AWS I&AM user authentication key
- S3 Bucket
- CloudFront Distribution

### Local runs with nektos/act

Workflows can be run locally using [act](https://github.com/nektos/act).

1. Build the runner:

```
docker build -t act-runner:latest .github/act-runner
```

2. Configure the workflow environment, variables and secrets. See the `.templates` in `.act/`.

a. Create an SSH key pair. Then setup Digital Ocean with the public key for SSH Key-Based Authentication

```
ssh-keygen -f $(pwd)/.act/id_rsa && chmod 600 $(pwd)/.act/id_rsa
```

b. Create an AWS I&AM User with permissions to access the bucket. Generate an access key; retrieve the access key id and secret.

3. List the workflows:

```
act -l
```

1. Run workflows. See the [Workflow Reference](.act/WORKFLOW_REFERENCE.md).

### GitHub Actions

GitHub Actions can be inspected and triggered via `gh` cli command.

```
gh workflow run
```

### Upload to S3

```
aws s3 sync dist/ s3://staging.dwightgunning.com/ --exclude 'assets/maps/pmtiles*' --exclude 'assets/maps/fonts/*' --exclude 'assets/maps/sprites/\*' --delete
```

### Invalidate CloudFront Distribution

```
aws cloudfront create-invalidation --distribution-id E1LBPVSBKVF447 --paths "/outdoors/_" "/\_astro/_"
```

## Astro commands

All commands are run from the root of the project, from a terminal:

| Command             | Action                                             |
| :------------------ | :------------------------------------------------- |
| `yarn install`      | Installs dependencies                              |
| `yarn dev`          | Starts local dev server at `localhost:3000`        |
| `yarn build`        | Build your production site to `./dist/`            |
| `yarn preview`      | Preview your build locally, before deploying       |
| `yarn astro ...`    | Run CLI commands like `astro add`, `astro preview` |
| `yarn astro --help` | Get help using the Astro CLI                       |
