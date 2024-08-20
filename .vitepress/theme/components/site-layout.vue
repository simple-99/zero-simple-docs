<!--
 * @version: 1.0
 * @Author: wsh
 * @Date: 2024-08-20 14:14:04
 * @LastEditTime: 2024-08-20 15:57:11
 * @FilePath: \zero-simple-docs\.vitepress\theme\components\site-layout.vue
 * @Description: 
-->
<script lang="ts" setup>
import { nextTick, onMounted, watch } from "vue";
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from "@nolebase/vitepress-plugin-enhanced-readabilities/client";
import "@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css";
import { NolebaseHighlightTargetedHeading } from "@nolebase/vitepress-plugin-highlight-targeted-heading/client";
import "@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css";
import mediumZoom from "medium-zoom";
import { useRoute } from "vitepress";
import DefaultTheme from "vitepress/theme";

const { Layout } = DefaultTheme;
const route = useRoute();

const initZoom = () => {
  // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' });
  mediumZoom(".VPContent img", { background: "var(--vp-c-bg)" });
};

watch(
  () => route.path,
  () => nextTick(() => initZoom())
);

onMounted(() => {
  initZoom();
});
</script>

<template>
  <Layout>
    <template #layout-top>
      <NolebaseHighlightTargetedHeading />
    </template>
    <template #nav-bar-content-after>
      <!-- 阅读增强菜单 -->
      <NolebaseEnhancedReadabilitiesMenu />
    </template>

    <template #nav-screen-content-after>
      <!-- 阅读增强菜单 -->
      <NolebaseEnhancedReadabilitiesScreenMenu />
    </template>
  </Layout>
</template>

<style>
.medium-zoom-overlay,
.medium-zoom-image--opened {
  z-index: 2147483647;
}
</style>
