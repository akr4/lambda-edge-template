import { CloudFrontRequestEvent, CloudFrontRequestResult } from 'aws-lambda';

export const makeHandler = () => {
  // eslint-disable-next-line @typescript-eslint/require-await
  return async (event: CloudFrontRequestEvent): Promise<CloudFrontRequestResult> => {
    const request = event.Records[0].cf.request;

    if (request.uri.endsWith('/')) {
      request.uri = request.uri + 'index.html';
    }

    return request;
  };
};
