(function(App) {

  'use strict';

  App.View.Logo = Backbone.View.extend({

    model: new (Backbone.Model.extend({
      defaults: {
      }
    })),

    events: {
      'mouseover' : 'onMouseOverDraw'
    },

    initialize: function(settings) {
      this.options = _.extend({}, this.defaults, settings.options || {});
      this.cache();
      this.listeners();

      this.drawSVG();
    },

    cache: function() {
      this.$window = $(window);
      this.$document = $(document);
    },

    listeners: function() {
    },

    drawSVG: function() {
      this.logo = new Vivus('logo-vizzuality', {
        start: 'manual',
        duration: 40,
        type: 'async',
        animTimingFunction: Vivus.EASE
      });

      this.logo2 = new Vivus('logo-vizzuality2', {
        start: 'manual',
        duration: 40,
        type: 'async',
        pathTimingFunction: Vivus.EASE,
      });

      this.logo.play(1);
    },

    // UI EVENTS
    onMouseOverDraw: function(e) {
      var svgStatus = this.getSvgStatus();

      switch (svgStatus) {
        case 'start':
          this.logo.play(1);
          this.logo2.play(-1);
        break;

        case 'end':
          this.logo.play(-1);
          this.logo2.play(1);
        break;

        default:
          // console.log('Animation in progress');
      }
    },


    // HELPERS
    getSvgStatus: function() {
      var svg = this.logo;
      if (svg.currentFrame === 0) {
        return 'start'
      } else if (svg.currentFrame === svg.frameLength){
        return 'end'
      } else {
        return 'progress'
      }
    }


  });

})(this.App);
