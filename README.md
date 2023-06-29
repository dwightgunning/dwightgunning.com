# dwightgunning.com

[www.dwightgunning.com](https://www.dwightgunning.com)

## Deploying to S3:

First deploy the build to the S3 bucket `www.dwightgunning.com`.
```(shell)
cactus deploy
```

Then issue a CDN invalidation
```(shell)
aws cloudfront create-invalidation --distribution-id <<distribution id>> --paths /
```
