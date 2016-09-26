(function(App) {

  'use strict';

  App.View.CircleMenu = Backbone.View.extend({

    model: new (Backbone.Model.extend({
      defaults: {
        active: false
      }
    })),

    defaults: {
      initialAngle: -90,
      speed: 250,
      distance: 60,
      distanceHidden: 40,
      delay: 50,
      arc: 360,
      elWidth: 50,
      elHeight: 50
    },

    events: {
      'click .js-btn-toggle-menu' : 'onClickToggleMenu',
      'click .js-ul-toggle-menu-item' : 'onClickToggleMenuItem'
    },

    initialize: function(settings) {
      this.options = _.extend({}, this.defaults, settings.options || {});
      this.cache();
      this.listeners();

      this.setUlToggleMenuItems();
    },

    cache: function() {
      this.$window = $(window);
      this.$document = $(document);

      this.$btnToggleMenu = this.$el.find('.js-btn-toggle-menu');
      this.$ulToggleMenu = this.$el.find('.js-ul-toggle-menu');
    },

    listeners: function() {
      this.listenTo(this.model, 'change:active', this.changeActive.bind(this));
    },

    // MODEL EVENTS
    changeActive: function() {
      var active = this.model.get('active');
      // Set classes
      this.$btnToggleMenu.toggleClass('-active', active);
      this.$ulToggleMenu.toggleClass('-active', active);

      // Set menu items
      this.setUlToggleMenuItems();
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
    setUlToggleMenuItems: function(toggle) {
      var $li = this.$ulToggleMenu.children('li');
      var options = this.options,
          lenght = $li.length,
          distance = (this.model.get('active')) ? options.distance : options.distanceHidden,
          fixAngle = ((options.arc)/lenght)/2;

      _.each($li, function(li, i){
        var radians = this.getRadians(((options.arc)/lenght) * i + options.initialAngle + fixAngle),
            x = 0 + distance * Math.cos(radians),
            y = 0 + distance * Math.sin(radians),
            delay = (this.model.get('active')) ? (options.delay * i) : options.delay * (lenght - i);

        $(li).transition({
          opacity: (this.model.get('active')) ? 1 : 0,
          x: x,
          y: y,
          delay: delay
        },options.speed)

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
