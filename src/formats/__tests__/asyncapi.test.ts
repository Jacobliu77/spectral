import { isAsyncApiv2 } from '../asyncapi';

describe('AsyncApi format', () => {
  describe('AsyncApi 2.0', () => {
    it.each(['2.0.0'])('recognizes %s version correctly', version => {
      expect(isAsyncApiv2({ asyncapi: version })).toBe(true);
    });

    const testCases = [
      { asyncapi: '3.0' },
      { asyncapi: '2' },
      { asyncapi: '2.0' },
      { asyncapi: '1.0' },
      { asyncapi: 2 },
      { openapi: '4.0' },
      { openapi: '2.0' },
      { openapi: null },
      { swagger: null },
      { swagger: '3.0' },
      {},
      null,
    ];

    it.each(testCases)('does not recognize invalid document %o', document => {
      expect(isAsyncApiv2(document)).toBe(false);
    });
  });
});
