App = Ember.Application.create({});

// App.Store = DS.Store.extend({
//   revision: 12,
//   adapter: DS.RESTAdapter.extend({
//     url: 'http://localhost:3000'
//   })
// });

App.Store = DS.Store.extend({
  revision: 12,
  adapter: 'DS.FixtureAdapter',
});

App.Router.map(function() {
  this.resource('about');
  this.resource('posts', function() {
    this.resource('post', { path: ':post_id' });
  });
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return App.Post.find();
  }
});

App.PostController = Ember.ObjectController.extend({
  isEditing: false,

  edit: function() {
    this.set('isEditing', true);
  },

  doneEditing: function() {
    this.set('isEditing', false);
    this.get('store').commit();
  }
});

var attr = DS.attr;

App.Post = DS.Model.extend({
  title: attr('string'),
  author: attr('string'),
  intro: attr('string'),
  extended: attr('string'),
  publishedAt: attr('date')
});

App.Post.FIXTURES = [{
  id: 1,
  title: "Rails is Omakase",
  author: "d2h",
  publishedAt: new Date('12-27-2012'),
  intro: "Here is an intro",
  extended: "Here is some extended"
},{
  id: 2,
  title: "The Parley Letter",
  author: "d2h",
  publishedAt: new Date('12-24-2012'),
  intro: "Here is an intro",
  extended: "Here is some extended"
}]

var showdown = new Showdown.converter();

Ember.Handlebars.registerBoundHelper('markdown', function(input) {
  return new Handlebars.SafeString(showdown.makeHtml(input));
});

Ember.Handlebars.registerBoundHelper('date', function(date) {
  return moment(date).fromNow();
});
