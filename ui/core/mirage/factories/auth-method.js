import factory from '../generated/factories/auth-method';
import { trait } from 'ember-cli-mirage';

export default factory.extend({
  id: (i) => `auth-method-id-${i}`,

  /**
   * Adds accounts (with associated users) to auth method.
   */
  withAccountsAndUsers: trait({
    afterCreate(authMethod, server) {
      const { scope } = authMethod;
      server.createList('user', 5, { scope }).map(user => {
        const { id } = server.create('account', { scope, authMethod });
        user.update({ accountIds: [id] });
      });
    }
  })

});
