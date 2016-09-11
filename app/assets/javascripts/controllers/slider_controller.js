(function(App) {

  'use strict';

  App.Controller.Slider = function() {};

  _.extend(App.Controller.Slider.prototype, {

    index: function(params) {
      new App.View.Slider({
        params: params,
        el: '#sliderView'
      });
    }

  });

})(this.App);
