(function(App) {

  'use strict';

  App.Controller.CircleMenu = function() {};

  _.extend(App.Controller.CircleMenu.prototype, {

    index: function(params) {
      new App.View.CircleMenu({
        params: params,
        el: '#circlemenuView'
      });
    }

  });

})(this.App);
