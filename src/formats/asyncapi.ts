import { isObject } from 'lodash';

type MaybeAsyncApi2 = Partial<{ asyncapi: unknown }>;

const bearsAStringPropertyNamed = (document: unknown, propertyName: string) => {
  return isObject(document) && propertyName in document && typeof document[propertyName] === 'string';
};

export const isAsyncApiv2 = (document: unknown) =>
  bearsAStringPropertyNamed(document, 'asyncapi') && String((document as MaybeAsyncApi2).asyncapi) === '2.0.0';
