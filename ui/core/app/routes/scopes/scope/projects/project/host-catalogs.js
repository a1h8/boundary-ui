import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import loading from 'ember-loading/decorator';
import { confirm } from '../../../../../utilities/confirm';

export default class ScopesScopeProjectsProjectHostCatalogsRoute extends Route {
  // =services

  @service intl;
  @service notify;

  // =methods

  /**
   * Loads all host catalogs under the current scope.
   * @return {Promise{[HostCatalogModel]}}
   */
  async model() {
    const { id: scope_id } = this.modelFor('scopes.scope.projects.project');
    return this.store.query('host-catalog', { scope_id });
  }

  // =actions

  /**
   * Rollback changes on project.
   * @param {HostCatalogModel} hostCatalog
   */
  @action
  cancel(hostCatalog) {
    const { isNew } = hostCatalog;
    hostCatalog.rollbackAttributes();
    if (isNew) this.transitionTo('scopes.scope.projects.project.host-catalogs');
  }

  /**
   * Handle save.
   * @param {HostCatalogModel} hostCatalog
   * @param {Event} e
   */
  @action
  @loading
  async save(hostCatalog) {
    const { isNew } = hostCatalog;
    try {
      await hostCatalog.save();
      await this.transitionTo(
        'scopes.scope.projects.project.host-catalogs.host-catalog',
        hostCatalog
      );
      this.refresh();
      this.notify.success(
        this.intl.t(isNew ? 'notifications.create-success' : 'notifications.save-success')
      );
    } catch (error) {
      // TODO: replace with translated strings
      this.notify.error(error.message, { closeAfter: null });
      throw error;
    }
  }

  /**
   * Deletes the host catalog and redirects to index.
   * @param {HostCatalogModel} hostCatalog
   */
  @action
  @loading
  @confirm('questions.delete-confirm')
  async delete(hostCatalog) {
    try {
      await hostCatalog.destroyRecord();
      await this.replaceWith('scopes.scope.projects.project.host-catalogs');
      this.refresh();
      this.notify.success(this.intl.t('notifications.delete-success'));
    } catch (error) {
      // TODO: replace with translated strings
      this.notify.error(error.message, { closeAfter: null });
    }
  }
}