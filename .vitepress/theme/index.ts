/*
 * @version: 1.0
 * @Author: wsh
 * @Date: 2024-08-19 11:06:40
 * @LastEditTime: 2024-08-20 14:56:14
 * @FilePath: \zero-simple-docs\.vitepress\theme\index.ts
 * @Description:
 */
// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";

import { NolebaseGitChangelogPlugin } from "@nolebase/vitepress-plugin-git-changelog/client";

import DefaultTheme from "vitepress/theme";

import SiteLayout from "./components/site-layout.vue";

import "./styles";

import "@nolebase/vitepress-plugin-git-changelog/client/style.css";

export default {
  enhanceApp({ app }) {
    // ...
    app.use(NolebaseGitChangelogPlugin);
  },
  extends: DefaultTheme,
  Layout: SiteLayout,
} satisfies Theme;
