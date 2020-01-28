import {
  CloudFrontResponse,
  CloudFrontResponseEvent,
  CloudFrontResponseResult,
  CloudFrontResultResponse,
} from 'aws-lambda';

export const makeHandler = (config: { parameter1: string }) => {
  // eslint-disable-next-line @typescript-eslint/require-await
  return async (event: CloudFrontResponseEvent): Promise<CloudFrontResponseResult> => {
    const request = event.Records[0].cf.request;
    const response = event.Records[0].cf.response as CloudFrontResponse & CloudFrontResultResponse;

    return response;
  };
};
