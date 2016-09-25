(function(App) {

  'use strict';

  App.Controller.Logo = function() {};

  _.extend(App.Controller.Logo.prototype, {

    index: function(params) {
      new App.View.Logo({
        params: params,
        el: '#logoView'
      });
    }

  });

})(this.App);
