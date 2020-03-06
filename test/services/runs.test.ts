import assert from 'assert';
import app from '../../src/app';

describe('\'runs\' service', () => {
  it('registered the service', () => {
    const service = app.service('runs');

    assert.ok(service, 'Registered the service');
  });
});
