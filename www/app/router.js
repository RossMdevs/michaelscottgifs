import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  metrics: service(),
  fastboot: service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    const isFastBoot = this.get('fastboot.isFastBoot');

    if (!isFastBoot) {
      Ember.run.once(this, () => {
        const page = this.get('url');
        const title = this.getWithDefault('currentRouteName', 'unknown');

        get(this, 'metrics').trackPage('GoogleAnalytics', { title: title });
      });
    }
  }
});

export default Router.map(function() {
});
