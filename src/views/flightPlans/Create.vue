<template>
  <map-viewer
    ref="createMap"
    :editable="true"
    :save-location-on-move="true"
    class="h-full w-full"
    @restart-draw="createPolyline"
  />
</template>

<script>
import Draw from "@/mixins/Draw";

import MapViewer from "@/components/MapViewer";

export default {
  components: {
    MapViewer,
  },
  mixins: [Draw],
  mounted() {
    this.map = this.$refs.createMap.map;

    this.createPolyline();
  }
};
</script>
