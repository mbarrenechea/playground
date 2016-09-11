(function(App) {

  'use strict';

  App.View.Slider = Backbone.View.extend({

    model: new (Backbone.Model.extend({
      defaults: {
        index: 0,
        length: 4
      }
    })),

    events: {
      'click .js-slider-next' : 'onClickNext',
      'click .js-slider-prev' : 'onClickPrev'
    },

    initialize: function(settings) {
      this.options = _.extend({}, this.defaults, settings.options || {});
      this.cache();
      this.listeners();

      // Set the initial state
      this.changeIndex();
    },

    cache: function() {
      this.$sliderItems = this.$el.find('.js-slider-item');
    },

    listeners: function() {
      this.model.on('change:index', this.changeIndex.bind(this));
    },

    // UI EVENTS
    onClickNext: function(e) {
      e && e.preventDefault();
      var index = this.model.get('index');
      var length = this.model.get('length');
      var newIndex = ((index + 1) > length) ? length : index + 1;

      this.model.set('index', newIndex);
    },

    onClickPrev: function(e) {
      e && e.preventDefault();
      var index = this.model.get('index');
      var length = this.model.get('length');
      var newIndex = ((index - 1) < 0) ? 0 : index - 1;

      this.model.set('index', newIndex);
    },




    // CHANGE EVENTS
    changeIndex: function() {
      var index = this.model.get('index');

      _.each(this.$sliderItems, function(el, i) {
        var $el = $(el);
        $el.transition(this.getStyle(i));
      }.bind(this));

    },




    // HELPERS
    getStyle: function(i) {
      var constant = 10;
      var index = this.model.get('index');
      var length = this.model.get('length');
      var differenceFromIndex = Math.abs(i - index);
      var differenceFromLength = Math.abs(length - index);
      var constantOpened = (differenceFromIndex == 1) ? 50 : 0;

      if (i === index) {
        return {
          zIndex: 0,
          x: 0
        }
      }

      if (i > index) {
        return {
          zIndex: differenceFromIndex,
          x: window.innerWidth - ((differenceFromLength - differenceFromIndex) * constant) - constantOpened
        }
      }

      if (i < index) {
        return {
          zIndex: differenceFromIndex,
          x: -window.innerWidth + ((i * constant) + constant) + constantOpened
        }
      }
    },

    getX: function(i, index, differenceFromIndex, differenceFromLength) {
      var constant = 10;
      var constantOpened = 40;
    }

  });

})(this.App);
