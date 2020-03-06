import assert from 'assert';
import app from '../../src/app';

describe('\'weapons\' service', () => {
  it('registered the service', () => {
    const service = app.service('weapons');

    assert.ok(service, 'Registered the service');
  });
});
