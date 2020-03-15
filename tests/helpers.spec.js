const errorHandler = require('../src/helpers/errorHandler');

describe('Helpers', () => {
  describe('errorHandler', () => {
    it('Tests 500 error', async () => {
      const error = errorHandler(new Error(500));

      expect(error.status).toBe(500);
      expect(error.message).toBe('The server encountered an internal error or misconfiguration and was unable to complete your request.');
    });

    it('Tests 400 error', async () => {
      const error = errorHandler(new Error(400));

      expect(error.status).toBe(400);
      expect(error.message).toBe('Your request was invalid and could not be completed.');
    });

    it('Tests 404 error', async () => {
      const error = errorHandler(new Error(404));

      expect(error.status).toBe(404);
      expect(error.message).toBe('The requested resource was not found, or has been moved or deleted.');
    });

    it('Tests default error', async () => {
      const error = errorHandler(new Error());

      expect(error.status).toBe(500);
      expect(error.message).toBe('The server encountered an internal error or misconfiguration and was unable to complete your request.');
    });
  });
});
