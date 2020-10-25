<template>
  <div>
    <map-tools
      v-if="editable"
      class="absolute z-10 ml-4 mt-4"
      @restart-draw="$emit('restart-draw')"
    />
    <div ref="map" class="absolute inset-0 z-0"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import * as L from "leaflet";
import "leaflet-editable";

import MapTools from "@/components/MapTools";

export default {
  components: {
    MapTools,
  },
  props: {
    editable: { type: Boolean, default: false },
    interactivity: { type: Boolean, default: true },
    zoomControl: { type: Boolean, default: true },
    pathPreview: { type: Array, default: null },
    saveLocationOnMove: { type: Boolean, default: false },
  },
  static: () => ({
    defaultLayer: {
      url: `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token=${process.env.VUE_APP_MAPBOX_TOKEN}`,
      options: {
        attribution:
          '© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        tileSize: 512,
        zoomOffset: -1,
      },
    },
  }),
  computed: {
    isPathPreviewExist(){
      return this.pathPreview && Array.isArray(this.pathPreview) && this.pathPreview.length > 0;
    },
    ...mapState("app", ["mapLocation"]),
  },
  mounted() {
    this.map = L.map(this.$refs.map, {
      center: this.mapLocation.center,
      zoom: this.mapLocation.zoom,
      zoomControl: this.zoomControl,
      doubleClickZoom: false,
      editable: this.editable
    });

    // Add default layer
    L.tileLayer(this.defaultLayer.url, this.defaultLayer.options).addTo(
      this.map
    );

    // Define map controls
    if (this.zoomControl) {
      this.map.zoomControl.setPosition("bottomright");
    }

    // Remove interactivity
    if (!this.interactivity) {
      this.disableInteractivity(this.map);
    }

    // Draw a polyline when an array of points are given via props
    if (this.isPathPreviewExist) {
      this.drawPathPreview();
    }

    // Save location after every move if parent have decide to
    if (this.saveLocationOnMove) {
      this.map.on("moveend", () => {
        this.saveMapCenter(this.map.getCenter());
        this.saveMapZoom(this.map.getZoom());
      });
    }
  },
  beforeDestroy() {
    this.map.off("moveend");
  },
  methods: {
    disableInteractivity() {
      this.map.dragging.disable();
      this.map.touchZoom.disable();
      this.map.doubleClickZoom.disable();
      this.map.scrollWheelZoom.disable();
      this.map.boxZoom.disable();
      this.map.keyboard.disable();
    },
    drawPathPreview() {
      const markerIcon = L.divIcon({ className: 'leaflet-div-icon leaflet-vertex-icon' });

      // Add shape (marker|polyline) to the map
      this.shape = this.pathPreview.length === 1
        ? new L.marker(this.pathPreview[0], { icon: markerIcon })
        : new L.polyline(this.pathPreview);

      this.shape.addTo(this.map);

      // Set view to encompass shape
      const shapeBounds = L.latLngBounds(this.pathPreview);
      this.map.fitBounds(shapeBounds, { animate: false, padding: [15, 15] });
    },
    ...mapActions("app", ["saveMapCenter", "saveMapZoom"]),
  }
};
</script>

<style lang="postcss">
@import "~leaflet/dist/leaflet.css";

/*
  Polyline
*/

.leaflet-vertex-icon {
  @apply rounded-full bg-indigo-800 border-none;
  width: 16px !important;
  height: 16px !important;
  margin-left: -8px !important;
  margin-top: -8px !important;
}
.leaflet-vertex-icon--selected {
  @apply bg-blue-200 border-4 border-blue-600 border-solid;
  width: 24px !important;
  height: 24px !important;
  margin-left: -12px !important;
  margin-top: -12px !important;
}
.leaflet-middle-icon {
  @apply rounded;
  width: 14px !important;
  height: 14px !important;
  margin-left: -7px !important;
  margin-top: -7px !important;
}
.leaflet-overlay-pane svg path {
  stroke: theme("colors.indigo.500") !important;
  stroke-width: 6px !important;
}

/*
  Controls
*/

.leaflet-control-zoom {
  @apply border-none !important;
}

.leaflet-control-zoom-in {
  @apply mb-1;
}

.leaflet-control-zoom-in,
.leaflet-control-zoom-out {
  @apply text-indigo-600 border-none shadow !important;
}

/*
  Attribution
*/

.leaflet-control-attribution,
.leaflet-control-attribution a {
  @apply text-gray-600;
}
</style>
