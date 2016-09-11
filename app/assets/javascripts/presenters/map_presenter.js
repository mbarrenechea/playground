(function(App) {

  'use strict';

  var StateModel = Backbone.Model.extend();

  App.Presenter.Map = function() {
    this.initialize.apply(this, arguments);
  };

  _.extend(App.Presenter.Map.prototype, {

    initialize: function(params) {
      this.fc = App.facade.layer;

      this.state = new StateModel();
      this.layersSpec = new App.Collection.LayersSpec();
      this.map = new App.View.Map({
        el: '#map',
        options: {
          minZoom: 2,
          maxZoom: 8
        }
        // options: this.getMapOptions()
      });

      this.setSubscriptions();
      this.setEvents();

      // Setting firs state
      this.setState(params);
    },

    setEvents: function() {
      this.state.on('change', function() {
        this.drawLayer();
        App.trigger('Map:change', this.getState());
      }, this);

      this.fc.on('region:change', function(state) {
        if (state.type === 'region') {
          this.setState({ region: state.iso, data: state.data });
        }
      }, this);
    },

    setSubscriptions: function() {
      App.on('Router:change', this.setState, this);
      App.on('TabNav:change', function(state) {
        this.setState(state, true);
      }, this);
    },

    getState: function() {
      return this.state.attributes;
    },

    setState: function(params, merge) {
      var newState = merge ?
        Object.assign({}, this.getState(), params) : params;

      if (!newState.data) {
        newState.data = 'projects';
      }

      this.state.clear({ silent: true }).set(newState);
    },

    /**
     * Render layer
     * @param {params} Object
     */
    drawLayer: function() {
      if (this.currentLayer) {
        this.map.removeLayer(this.currentLayer);
      }
      this.fc.getLayer(this.getState()).done(function(layer) {
        this.currentLayer = layer;
        this.map.addLayer(this.currentLayer);
        layer.FitBounds(); // Cluster prune method to fitbounds
      }.bind(this));
    },

    /**
     * Get default map options from params
     * @return {Object}
     */
    // getMapOptions: function() {
    //   var mapSettings = _.pick(this.state.attributes, 'zoom', 'lat', 'lng');
    //   if (Object.keys(mapSettings).length > 0) {
    //     return {
    //       center: [mapSettings.lat, mapSettings.lng],
    //       zoom: mapSettings.zoom
    //     };
    //   }
    //   return {};
    // }

  });

})(this.App);