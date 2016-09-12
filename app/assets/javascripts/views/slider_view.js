(function(App) {

  'use strict';

  App.View.Slider = Backbone.View.extend({

    model: new (Backbone.Model.extend({
      defaults: {
        index: 0,
        length: 5
      }
    })),

    events: {
      'click .js-slider-next' : 'onClickIndex',
      'click .js-slider-prev' : 'onClickIndex'
    },

    initialize: function(settings) {
      this.options = _.extend({}, this.defaults, settings.options || {});
      this.cache();
      this.listeners();

      // Set the initial state
      this.changeIndex();
    },

    cache: function() {
      this.$document = $(document);
      this.$sliderItems = this.$el.find('.js-slider-item');
      this.$sliderArrows = this.$el.find('.js-slider-arrow');
    },

    listeners: function() {
      this.model.on('change:index', this.changeIndex.bind(this));
      this.$document.on('keyup.slider', this.onKeyUpIndex.bind(this))
    },

    // UI EVENTS
    onClickIndex: function(e) {
      var index = this.model.get('index');
      var length = this.model.get('length');
      var newIndex = 0;
      switch ($(e.currentTarget).data('direction')) {
        case 'prev':
          newIndex = ((index - 1) < 0) ? 0 : index - 1;
        break;

        case 'next':
          newIndex = ((index + 1) > length - 1) ? length - 1 : index + 1;
        break;
      }

      this.model.set('index', newIndex);
    },

    onKeyUpIndex: function(e) {
      var index = this.model.get('index');
      var length = this.model.get('length');
      var newIndex = 0;
      switch (e.keyCode) {
        case 37:
          newIndex = ((index - 1) < 0) ? 0 : index - 1;
        break;

        case 39:
          newIndex = ((index + 1) > length - 1) ? length - 1 : index + 1;
        break;
      }

      this.model.set('index', newIndex);
    },

    // onClickPrev: function(e) {
    //   e && e.preventDefault();
    //   var index = this.model.get('index');
    //   var length = this.model.get('length');
    //   var newIndex = ((index - 1) < 0) ? 0 : index - 1;
    //
    //   this.model.set('index', newIndex);
    // },




    // CHANGE EVENTS
    changeIndex: function() {

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

  });

})(this.App);
