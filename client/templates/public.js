Meteor.startup(function() {
  SEO.config({
    auto: {
      twitter: false,
      og: false,
      set: ['description', 'url', 'title']
    }
  });
});