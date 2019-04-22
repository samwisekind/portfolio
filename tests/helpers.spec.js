const { expect } = require('chai');
const sinon = require('sinon');

const errorHandler = require('../src/helpers/errorHandler');

describe('Helpers', () => {
  describe('errorHandler', () => {
    beforeEach(() => sinon.stub(console, 'error'));

    afterEach(sinon.restore);

    it('Tests 500 error', async () => {
      const error = errorHandler(new Error(500));

      expect(console.error.called).to.be.equal(false);
      expect(error.status).to.equal(500);
      expect(error.message).to.equal('The server encountered an internal error or misconfiguration and was unable to complete your request.');
    });

    it('Tests 400 error', async () => {
      const error = errorHandler(new Error(400));

      expect(console.error.called).to.be.equal(false);
      expect(error.status).to.equal(400);
      expect(error.message).to.equal('Your request was invalid and could not be completed.');
    });

    it('Tests 404 error', async () => {
      const error = errorHandler(new Error(404));

      expect(console.error.called).to.be.equal(false);
      expect(error.status).to.equal(404);
      expect(error.message).to.equal('The requested resource was not found, or has been moved or deleted.');
    });

    it('Tests default error', async () => {
      const error = errorHandler(new Error());

      expect(console.error.called).to.be.equal(false);
      expect(error.status).to.equal(500);
      expect(error.message).to.equal('The server encountered an internal error or misconfiguration and was unable to complete your request.');
    });
  });
});
