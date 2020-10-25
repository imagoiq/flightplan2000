import * as L from "leaflet";

import { mapActions } from "vuex";

export default {
  data: () => ({
    currentId: null,
  }),
  beforeDestroy() {
    this.map.editTools.off("editable:editing");
  },
  methods: {
    editPolyline(flightPlan) {
      // Restore polyine from flight plan
      const polyline = new L.polyline(flightPlan.points);
      polyline.addTo(this.map);
      polyline.enableEdit();

      // Set view to encompass polyline
      const polylineBounds = L.latLngBounds(flightPlan.points);
      this.map.fitBounds(polylineBounds, { animate: false, padding: [15, 15] });

      // Initiate save
      this.saveAutoPolyline(polyline);
    },
    createPolyline() {
      // Start drawing tool directly on load
      const polyline = this.map.editTools.startPolyline();

      // Auto-save at each edit
      this.saveAutoPolyline(polyline);
    },
    saveAutoPolyline(leafletLayer) {
      this.map.editTools.on("editable:editing", async () => {
        // Create a new flight plan if no flightPlan have been created
        if (this.currentId === null) {
          this.currentId = await this.createFlightPlan();
        }

        const points = leafletLayer
          .getLatLngs()
          .map((point) => [point.lat, point.lng]);
        this.savePoints({ id: this.currentId, points });
      });
    },
    ...mapActions("flightPlans", ["createFlightPlan", "savePoints"]),
  }
};
