/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class ScopesScopeCredentialStoresCredentialStoreCredentialsNewController extends Controller {
  // =services

  @service intl;

  // =attributes

  queryParams = ['type'];

  /**
   * Translated new credentials breadcrumb
   * @type {string}
   */
  get breadCrumb() {
    return this.intl.t('resources.credential.titles.new');
  }
}
