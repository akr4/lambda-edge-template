import { CloudFrontHeaders, CloudFrontResponseEvent, CloudFrontResultResponse } from 'aws-lambda';
import { makeHandler } from './';

const handler = makeHandler({ parameter1: 'aaa' });

const makeEvent = (
  request: { uri: string; querystring?: string; headers?: CloudFrontHeaders },
  response: { status: string } | CloudFrontResultResponse,
): CloudFrontResponseEvent => {
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
          response: {
            headers: {},
            statusDescription: '',
            ...response,
          },
        },
      },
    ],
  };
};

test('index', async () => {
  const event = makeEvent(
    {
      uri: '/',
    },
    {
      status: '200',
    },
  );

  const result = await handler(event);

  if (!result) fail();
  expect(result.status).toEqual('200');
});
