# dwightgunning.com

## Project notes

### Color palette

- `tailwind.config.cjs`
- `tailwindBase.css`

#### Custom Colors

- fern
- armadillo

#### Surfaces:

- surface-bg
- surface-low
- surface-high

#### Text:

- text-primary
- text-secondary
- text-accent
- text-success
- text-warning
- text-error

#### Interactive elements:

- interactive
- interactive-accent

#### Separation:

- separator

#### References:

- https://www.shortwave.com/blog/dark-mode/
- https://blog.zeplin.io/dark-mode-color-palette
- https://medium.com/eightshapes-llc/light-dark-9f8ea42c9081
- https://www.w3.org/TR/WCAG22/
- https://uicolors.app/create
- https://tailwindcss.com/docs/customizing-colors
- https://www.tints.dev
- https://color.adobe.com/create/color-wheel
- https://contrast-grid.eightshapes.com

## Image processing

ImageMagick mogrify is good for re-formatting and resizing images for the web. I'm following [this guide](https://www.smashingmagazine.com/2015/06/efficient-image-resizing-with-imagemagick/).

```
mogrify -path OUTPUT_PATH -filter Triangle -define filter:support=2 -thumbnail 1024 -unsharp 0.25x0.25+8+0.065 -dither None -posterize 136 -quality 82 -define jpeg:fancy-upsampling=off -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -define png:exclude-chunk=all -interlace none -colorspace sRGB -strip -format jpg INPUT_PATH
```

## Maps

Tools:

- Quick FIT>GPX converter: https://www.alltrails.com/converter/
- Bounding Box coordinates tool: https://geojson.io/

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

## Astro docs

### 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

### 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                             |
| :--------------------- | :------------------------------------------------- |
| `npm install`          | Installs dependencies                              |
| `npm run dev`          | Starts local dev server at `localhost:3000`        |
| `npm run build`        | Build your production site to `./dist/`            |
| `npm run preview`      | Preview your build locally, before deploying       |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro preview` |
| `npm run astro --help` | Get help using the Astro CLI                       |

### 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
