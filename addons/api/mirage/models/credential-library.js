import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  scope: belongsTo(),
  credentialStore: belongsTo(),
});
