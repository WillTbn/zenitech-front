<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal class="bg-deep-purple-10 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn flat to="/">
            <q-avatar>
              <img
                src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
              />
            </q-avatar>
            Zenitech
          </q-btn>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-deep-purple-10 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>{{ data.name }}</div>
        </q-toolbar-title>

        <q-space />
        <div>{{ data.author }}</div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import useSystemInfo from "src/composables/Requests/useSystemInfo";
import { useSystemStore } from "src/stores/system";
import { storeToRefs } from "pinia";
const { getInfo } = useSystemInfo();
const storeSystem = useSystemStore();
const { data } = storeToRefs(storeSystem);

onMounted(async () => {
  await getInfo();
});
defineOptions({
  name: "MainLayout",
});
const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
