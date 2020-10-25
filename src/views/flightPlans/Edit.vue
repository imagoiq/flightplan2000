<template>
  <map-viewer
    ref="editMap"
    :editable="true"
    :save-location-on-move="true"
    class="h-full w-full"
    @restart-draw="createPolyline"
  />
</template>

<script>
import { mapState } from "vuex";

import Draw from "@/mixins/Draw";

import MapViewer from "@/components/MapViewer";

export default {
  components: {
    MapViewer,
  },
  mixins: [Draw],
  computed: {
    ...mapState("flightPlans", ["list"]),
  },
  mounted() {
    this.map = this.$refs.editMap.map;

    // Find given flight plan
    const paramsId = parseInt(this.$route.params?.flightPlanId, 10);
    const flightPlan = this.list.find(fp => fp.id === paramsId);
    const numberOfPoints = flightPlan?.points.length;

    if(!flightPlan) {
      // TODO Make a real error and a feedback to the user
      throw 'No flight plan found with this id';
    }

    // Define current flight plan id
    if(flightPlan?.id){
      this.currentId = flightPlan.id;
    }

    // Start edition of the polyline
    if(numberOfPoints > 0){
      this.editPolyline(flightPlan);
    }

    // TODO Improve usability if user delete all the points. (Probably with a modal)
    if(numberOfPoints === 0){
      this.createPolyline();
    }
  }
};
</script>
