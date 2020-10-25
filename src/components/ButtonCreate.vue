<template>
  <router-link
    :to="{ name: 'CreateFlightPlan', query: { nextId } }"
    class="p-2 bg-indigo-700 items-center text-indigo-100 leading-none rounded-full inline-flex"
  >
    <span class="font-semibold ml-2 mr-2 mb-1 text-left text-xl flex-auto">
      Create a flight plan
    </span>
    <svg
      class="fill-current opacity-75 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path
        d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"
      />
    </svg>
  </router-link>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("flightPlans", ["nextId"]),
  },
};
</script>
