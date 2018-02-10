import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { observer } from '@ember/object';

export default Controller.extend({
  queryParams: ['q'],
  q: '',
  images: null,
  headTagsService: service('head-tags'),

  imagesObserver: observer('images', function() {
    this.get('headTagsService').collectHeadTags();
  }),
});