<template>
  <div class="sidelayout">
    <aside class="sidelayout__sidebar">
      <logo class="sidebar__item" />
      <navigation-main class="sidebar__item" />
    </aside>
    <main class="sidelayout__main">
      <router-view :key="$route.fullPath" />
    </main>
  </div>
</template>

<script>
import Logo from "@/components/Logo";
import NavigationMain from "@/components/NavigationMain";

export default {
  components: {
    Logo,
    NavigationMain,
  }
};
</script>

<style lang="postcss">
.sidelayout {
  @apply flex h-full;
}
.sidelayout__sidebar {
  @apply flex flex-col flex-shrink-0 pt-10 px-10 h-full shadow-lg z-10;
}
.sidebar__item ~ .sidebar__item {
  @apply mt-4;
}
.sidelayout__main {
  @apply relative w-full overflow-y-auto overflow-x-hidden;
}
</style>
