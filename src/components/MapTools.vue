<template>
  <div v-if="selectedVertex.vertex" class="flex">
    <button class="btn__maptools" @click="deleteCurrentVertex">
      Delete point
    </button>
    <button
      class="btn__maptools"
      v-if="selectedVertex.extendable"
      @click="extendCurrentVertex"
    >
      Extend path
    </button>
  </div>
</template>

<script>
import * as L from "leaflet";

export default {
  static: () => ({
    selectedClassName: "leaflet-vertex-icon--selected",
  }),
  data: () => ({
    selectedVertex: {
      vertex: undefined,
      extendable: false,
    },
  }),
  mounted() {
    this.$nextTick(() => {
      this.map = this.$parent.map;

      // Remove delete on click feature
      this.map.editTools.on("editable:vertex:rawclick", (e) => {
        e.cancel();
      });

      /*
        Select vertex
      */

      this.map.editTools.on("editable:vertex:click", (e) => {
        const vertex = e.vertex;
        const icon = e.vertex._icon;

        // Remove class on last vertex
        this.unselectVertex();

        // Define current vertex
        this.selectedVertex = { vertex, extendable: false };

        // Add class to new vertex
        L.DomUtil.addClass(icon, this.selectedClassName);

        // Define special features
        const isInitialVertex = typeof vertex.getPrevious() === "undefined";
        const isLastVertex = typeof vertex.getNext() === "undefined";

        if (isInitialVertex || isLastVertex) {
          this.selectedVertex.extendable = true;
        }
      });

      /*
        Unselect vertex
      */

      this.map.on("click", this.unselectVertex);
    });
  },
  beforeDestroy() {
    this.map.editTools.off("editable:vertex:click");
    this.map.off("click", this.unselectVertex);
  },
  methods: {
    deleteCurrentVertex() {
      const index = this.selectedVertex.vertex.getLastIndex();

      this.selectedVertex.vertex.delete();
      this.unselectVertex();

      // When deleting the last point, restart the drawing process
      // TODO Improve this double emit
      if (index === 0) {
        this.$emit("restart-draw");
      }
    },
    extendCurrentVertex() {
      this.selectedVertex.vertex.continue();
      this.unselectVertex();
    },
    unselectVertex() {
      const icon = this.selectedVertex.vertex?._icon;

      // Remove selection class
      if (icon) {
        L.DomUtil.removeClass(icon, this.selectedClassName);
      }
      // Reset reactive vertex data
      this.selectedVertex = { vertex: undefined, extendable: false };
    }
  }
};
</script>

<style lang="postcss">
.btn__maptools {
  @apply bg-blue-600 text-white rounded-full px-4 py-2;
}
.btn__maptools ~ .btn__maptools {
  @apply ml-4;
}
</style>
