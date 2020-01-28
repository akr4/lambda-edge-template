# lambda-edge-template

A template for Lambda@Edge projects

## Files

```
.
├── src
│   ├── env
│   │   ├── production
│   │   │   └── behavior1
│   │   │       ├── origin-response
│   │   │       │   └── index.ts
│   │   │       └── viewer-request
│   │   │           └── index.ts
│   │   └── staging
│   │       └── behavior1
│   │           ├── origin-response
│   │           │   └── index.ts
│   │           └── viewer-request
│   │               └── index.ts
│   └── template
│       └── behavior1
│           ├── origin-response
│           │   ├── index.test.ts
│           │   └── index.ts
│           └── viewer-request
│               ├── index.test.ts
│               └── index.ts
└── webpack.config.js
```

### template directory

Lambda@Edge does not support environment variables. To use parameter, this repo utilises "templates".
Templates are higher-order functions that return a Lambda@Edge handler function. These can accept parameters to modify the handler functions.

For example, the following template function `makeHandler` accepts s3 bucket name and returns a handler function that uses the bucket.

```typescript
export const makeHandler = (config: { bucket_name: string }) => {
  return async (event: CloudFrontResponseEvent): Promise<CloudFrontResponseResult> => {
    // get from the bucket
  };
};
```

### env directory

`env` directory contains Lambda@Edge handler functions for each environment, behavior, and trigger such as viewer-request. Basically it just generates a handler function by using a template function.

```typescript
import { makeHandler } from '../../../../template/behavior1/origin-response';

export const handler = makeHandler({
  bucket_name: 'my-bucket',
});
```

### webpack.config.js

`webpack.config.js` is where to configure what to build. The below is an example that makes viewer-requst and origin-response handler functions for staging and production environment.

```javascript
entry: {
  staging_behavior1_viewer_request: path.resolve(__dirname, 'src/env/staging/behavior1/viewer-request/index.ts'),
  staging_behavior1_origin_response: path.resolve(__dirname, 'src/env/staging/behavior1/origin-response/index.ts')

  production_behavior1_viewer_request: path.resolve(__dirname, 'src/env/production/behavior1/viewer-request/indets'),
  production_behavior1_origin_response: path.resolve(__dirname, 'src/env/production/behavior1/origin-response/index.ts'),
},
```

## Build

```
npm run build
```

## Test

```
npm run test
```
