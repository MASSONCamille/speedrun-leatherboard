// Initializes the `runs` service on path `/runs`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Runs } from './runs.class';
import createModel from '../../models/runs.model';
import hooks from './runs.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'runs': Runs & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/runs', new Runs(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('runs');

  service.hooks(hooks);
}
