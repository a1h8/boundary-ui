/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class IndexController extends Controller {
  // =services

  @service clockTick;

  // =properties

  now = new Date();
}
