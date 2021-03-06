var ZOOMS = {
  25: 10,
  50: 8,
  75: 7,
  100: 6,
  200: 4,
  350: 3,
  500: 2
};

var Map = Discourse.Model.extend({
  results: [],
  lat: 47.6097,
  lon: -122.3331,
  radius: 25,

  zoomIn: Em.computed('radius', function() {
    return ZOOMS[this.get('radius')] || 7;
  }),

  initialZoom: Em.computed(function() {
    return ZOOMS[Discourse.SiteSettings.initial_map_zoom] || 4;
  }),

  setPropertiesFromJson: function(meta, results) {
    var lat = meta.lat || this.get('lat');
    var lon = meta.lon || this.get('lon');

    this.setProperties({ lat: lat, lon: lon, results: results });
  }
});

export default Map;
