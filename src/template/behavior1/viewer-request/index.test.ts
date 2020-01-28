import { makeHandler } from './';
import { CloudFrontHeaders, CloudFrontRequest, CloudFrontRequestEvent, CloudFrontResponse } from 'aws-lambda';

const handler = makeHandler();

const makeEvent = (request: {
  uri: string;
  querystring?: string;
  headers?: CloudFrontHeaders;
}): CloudFrontRequestEvent => {
  return {
    Records: [
      {
        cf: {
          config: {
            requestId: 'aaa',
            distributionId: 'my-distribution',
            distributionDomainName: '',
            eventType: 'viewer-request',
          },
          request: {
            querystring: '',
            headers: {},
            method: 'GET',
            clientIp: '0.0.0.0',
            ...request,
          },
        },
      },
    ],
  };
};

test('index', async () => {
  const event = makeEvent({
    uri: '/',
  });

  const result = (await handler(event)) as CloudFrontRequest;

  expect(result).toBeDefined();
  expect(result?.uri).toEqual('/index.html');
});

test('subdirectory index', async () => {
  const event = makeEvent({
    uri: '/foo/',
  });

  const result = (await handler(event)) as CloudFrontRequest;

  expect(result).toBeDefined();
  expect(result?.uri).toEqual('/foo/index.html');
});
