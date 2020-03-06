import assert from 'assert';
import app from '../../src/app';

describe('\'quests\' service', () => {
  it('registered the service', () => {
    const service = app.service('quests');

    assert.ok(service, 'Registered the service');
  });
});
