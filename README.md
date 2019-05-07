f# dwightgunning.com

[www.dwightgunning.com](https://www.dwightgunning.com)

## Deploying to S3:

_See: `deploy.sh`.

First the build project
```(shell)
cactus build
```
Then, deploy the build to the S3 bucket.
```(shell)
aws s3 cp .build s3://${AWS S3 Bucket ID} --recursive
```
Finally, issue a CDN invalidation
```(shell)
aws cloudfront create-invalidation --distribution-id ${AWS Cloudfront Distribution ID} --paths /
```
