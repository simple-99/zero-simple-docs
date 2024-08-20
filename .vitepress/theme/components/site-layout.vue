<!--
 * @version: 1.0provide, 
 * @Author: wsh
 * @Date: 2024-08-20 14:14:04
 * @LastEditTime: 2024-08-20 18:02:12
 * @FilePath: \zero-simple-docs\.vitepress\theme\components\site-layout.vue
 * @Description: 
-->
<script lang="ts" setup>
import { nextTick, onMounted, watch, provide } from "vue";
import mediumZoom from "medium-zoom";
import { useRoute, useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from "@nolebase/vitepress-plugin-enhanced-readabilities/client";
import "@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css";
import { NolebaseHighlightTargetedHeading } from "@nolebase/vitepress-plugin-highlight-targeted-heading/client";
import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'

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

const { isDark } = useData();

const enableTransitions = () =>
  "startViewTransition" in document &&
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

provide("toggle-appearance", async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value;
    return;
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`,
  ];

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value;
    await nextTick();
  }).ready;

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: "ease-in",
      pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`,
    }
  );
});
</script>

<template>
  <Layout>
    <template #layout-top>
      <!-- 双向链接 -->
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
