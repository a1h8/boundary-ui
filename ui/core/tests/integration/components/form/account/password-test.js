import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | form/account/password', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.submit = () => {};
    this.cancel = () => {};
    this.model = { type: 'password' };

    await render(hbs`
      <Form::Account::Password
        @model={{this.model}}
        @submit={{this.submit}}
        @cancel={{this.cancel}}
      />`);

    assert.ok(find('form'));
  });
});