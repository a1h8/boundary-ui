/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { loading } from 'ember-loading';
import config from '../config/environment';

export default class ClusterUrlRoute extends Route {
  // =services

  @service store;
  @service session;
  @service clusterUrl;
  @service intl;
  @service flashMessages;
  @service router;
  @service('browser/window') window;

  // =attributes

  /**
   * @type {ApplicationAdapter}
   */
  get adapter() {
    return this.store.adapterFor('application');
  }

  // =methods

  /**
   * If arriving here already authenticated, redirect to index for further
   * processing.  User must be logged out before changing the clusterUrl.
   */
  beforeModel() {
    if (this.session.isAuthenticated) this.router.replaceWith('index');
  }

  /**
   * Adds the existing clusterUrl, if any, to the controller scope.
   * @param {Controller} controller
   */
  setupController(controller) {
    super.setupController(...arguments);
    let clusterUrl = this.clusterUrl.rendererClusterUrl;
    // If clusterUrl is unset and this is a development environment,
    // autoset the clusterUrl field of the UI for better DX.
    // The controller URL is almost always the same as the current window when
    // using mocks, and this makes development more rapid since developers
    // do not need to fill a clusterUrl on every session.
    if (!clusterUrl && config.autoOrigin) {
      clusterUrl = this.window.location.origin;
    }
    controller.setProperties({ clusterUrl: clusterUrl });
  }

  /**
   * Points the API to the specified clusterUrl.  When the main process receives
   * the clusterUrl, it is expected that the renderer will be restarted.
   * @param {string} clusterUrl
   */
  @action
  @loading
  async setClusterUrl(clusterUrl) {
    try {
      await this.clusterUrl.setClusterUrl(clusterUrl);
      this.router.replaceWith('index');
    } catch (e) {
      // If scopes do not load, we assume this is not a Boundary API
      const errorMessage = this.intl.t(
        'errors.cluster-url-verification-failed.description'
      );
      this.flashMessages.danger(errorMessage, {
        noticationType: 'error',
        sticky: true,
        dismiss: (flash) => flash.destroyMessage(),
      });
    }
  }
}
