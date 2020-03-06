// Initializes the `weapons` service on path `/weapons`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Weapons } from './weapons.class';
import createModel from '../../models/weapons.model';
import hooks from './weapons.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'weapons': Weapons & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/weapons', new Weapons(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('weapons');

  service.hooks(hooks);
}
