import factory from '../generated/factories/target';
import { trait } from 'ember-cli-mirage';

const randomBoolean = (chance = 0.5) => Math.random() < chance;
const hostSetChance = 0.3;

export default factory.extend({

  /**
   * Randomly selects existing host sets to assign to target.
   */
  withRandomHostSets: trait({
    afterCreate(target, server) {
      let randomlySelectedHostSets;
      randomlySelectedHostSets = server.schema.hostSets
        // BLERG:  fun fact, for no reason at all, the element passed
        // into a where function is not a full model instance, as you might
        // expect at this level of abstraction, but appears to be a serialized
        // representation of the model instance.  It's very confusing since
        // the result set of `where` _is a collection of model instances_.
        .where(hostSet => hostSet.scopeId === target.scope.id).models
        .filter(() => randomBoolean(hostSetChance));
      target.update({hostSets: randomlySelectedHostSets});
    }
  })

});
