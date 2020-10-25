<template>
  <div class="px-10 py-6 pt-12">
    <h1>List of flight plans</h1>
    <ul v-if="reversedList.length > 0" class="flightplans__list">
      <li
        v-for="flightPlan in reversedList"
        :key="flightPlan.id"
        class="flightplans__item"
      >
        <router-link
          :to="{ path: `/edit/${flightPlan.id}` }"
          class="flightplans__link"
        >
          <map-viewer
            class="flightplans__map"
            :interactivity="false"
            :zoom-control="false"
            :path-preview="flightPlan.points"
          ></map-viewer>
          <h2 class="flightplans__number">
            <span class="sr-only">Flight number: </span>{{ flightPlan.id }}
          </h2>
        </router-link>
        <div class="flightplans__associated">
          <p class="flightplans__date">
            <span class="sr-only">Created on: </span>
            <time :datetime="toParsedDate(flightPlan.creationTimestamp)">
              {{ toDisplayDate(flightPlan.creationTimestamp) }}
            </time>
          </p>
          <button
            class="flightplans__btntools"
            @click="deleteFlightPlan(flightPlan.id)"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
    <div v-else>
      <p>
        Welcome to the flight plan 2000! All your creation will be automatically
        saved and displayed here.
      </p>
      <p>Get started by clicking on "Create a flight plan"</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import MapViewer from "@/components/MapViewer";

export default {
  computed: {
    reversedList() {
      return [...this.list].reverse();
    },
    ...mapState("flightPlans", ["list"]),
  },
  components: {
    MapViewer,
  },
  methods: {
    toParsedDate(datestring) {
      return new Date(datestring);
    },
    toDisplayDate(datestring) {
      const parsedDate = new Date(datestring);
      return parsedDate.toLocaleString("en", { day: "numeric", month: "long" });
    },
    ...mapActions("flightPlans", ["deleteFlightPlan"]),
  }
};
</script>

<style lang="postcss">
/*
  List of flight plans
*/

.flightplans__list {
  @apply grid gap-10;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
.flightplans__item {
  @apply relative;
}
.flightplans__number {
  @apply absolute top-0 rounded bg-indigo-600 text-white px-3 text-xl z-10;
  border-bottom-left-radius: 0;
}
.flightplans__link {
  @apply block w-full text-left mb-2;
}
.flightplans__map {
  @apply relative rounded-lg;
  height: 200px;
}
.flightplans__associated {
  @apply flex justify-between;
}
.flightplans__date {
  @apply text-gray-600 text-sm;
}
.flightplans__btntools {
  @apply rounded-full px-3 text-gray-800 bg-gray-200 text-sm;
}
/*
  Map Viewer
*/

.leaflet-control-attribution {
  @apply text-xxs !important;
}
</style>
