<template>
  <nav class="navigationmain">
    <button-create class="mb-4" />

    <ul class="navigationmain__list">
      <li class="navigationmain__item" v-for="link in links" :key="link.text">
        <router-link
          class="navigationmain__link"
          :to="{ name: link.routeName }"
          v-tooltip.right="link.routeName === '' && 'Work in Progress'"
        >
          {{ link.text }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import ButtonCreate from "@/components/ButtonCreate";

export default {
  static: () => ({
    links: [
      { routeName: "ListFlightPlans", text: "List of flight plans" },
      { routeName: "", text: "Settings" },
      { routeName: "", text: "Credits" },
      { routeName: "", text: "Contact" },
    ],
  }),
  components: {
    ButtonCreate,
  }
};
</script>

<style lang="postcss">
.navigationmain {
  @apply flex flex-col;
}
.navigationmain__list {
  @apply text-gray-700 text-lg;
}
.navigationmain__link {
  @apply block px-4 py-3 text-left;
}
.navigationmain__item:not(:last-child) {
  @apply border-b-2 border-gray-300;
}
</style>
