import TopicView from 'discourse/views/topic';
import ArchetypeTemplate from 'discourse/plugins/Discourse reports/discourse/mixins/archetype-template';

const ARCHETYPE_REGULAR = 'regular';

export default TopicView.reopen({
  templateName: function() {
    return ArchetypeTemplate.get(this.get('topic'), 'topic');
  }.property('topic.archetype'),

  onChangeArchetype: function() {
    if (this.topic && this.topic.archetype) {
      this.rerender();
    }
  }.observes('topic.archetype'),

  didInsertElement: function() {
    let archetype = this.get('topic').get('archetype');
    Ember.$('body').toggleClass('height--normal', archetype === ARCHETYPE_REGULAR);
  },

  willDestroyElement: function() {
   Ember.$('body').removeClass('height--normal');
 }
});
