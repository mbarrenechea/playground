(function(App) {

  'use strict';

  App.View.CircleMenu = Backbone.View.extend({

    model: new (Backbone.Model.extend({
      defaults: {
        active: false
      }
    })),

    events: {
      'click .js-btn-toggle-menu' : 'onClickToggleMenu',
      'click .js-ul-toggle-menu-item' : 'onClickToggleMenuItem'
    },

    initialize: function(settings) {
      this.options = _.extend({}, this.defaults, settings.options || {});
      this.cache();
      this.listeners();

      this.setUlToggleMenu();
    },

    cache: function() {
      this.$window = $(window);
      this.$document = $(document);

      this.$ulToggleMenu = this.$el.find('.js-ul-toggle-menu');
    },

    listeners: function() {
      this.listenTo(this.model, 'change:active', this.changeActive.bind(this));
    },

    // MODEL EVENTS
    changeActive: function() {
      var active = this.model.get('active');
      this.$ulToggleMenu.toggleClass('-active', active);
      this.setUlToggleMenu();
    },

    // UI EVENTS
    onClickToggleMenu: function(e) {
      e && e.preventDefault();
      var active = this.model.get('active');
      this.model.set('active', !active);
    },

    onClickToggleMenuItem: function(e) {
      e && e.preventDefault();
      this.model.set('active', false);
    },

    // HELPERS
    setUlToggleMenu: function(toggle) {
      var $li = this.$ulToggleMenu.children('li');
      var lenght = $li.length,
          speed = 250,
          distance = (this.model.get('active')) ? 80 : 50;

      _.each($li, function(li, i){
        var radians = this.getRadians(((360)/lenght) * i - 90),
            x = 0 + distance * Math.cos(radians),
            y = 0 + distance * Math.sin(radians),
            delay = (this.model.get('active')) ? (50 * i) : 50 * (lenght - i);

        $(li).transition({
          opacity: (this.model.get('active')) ? 1 : 0,
          x: x,
          y: y,
          delay: delay
        },speed)

      }.bind(this));
    },

    getDegrees: function() {
      return radians * (180/Math.PI)
    },

    getRadians: function(degrees) {
      return degrees * (Math.PI/180)
    }


  });

})(this.App);
