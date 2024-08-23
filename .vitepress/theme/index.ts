/*
 * @version: 1.0
 * @Author: wsh
 * @Date: 2024-08-19 11:06:40
 * @LastEditTime: 2024-08-23 15:47:32
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
import { DocBox, DocLinks, DocBoxCube } from "@theojs/lumen";

export default {
  enhanceApp({ app }) {
    // ...
    app.use(NolebaseGitChangelogPlugin);
    // 优化文章页
    app.component("Box", DocBox);
    app.component("Links", DocLinks);
    app.component("BoxCube", DocBoxCube);
  },
  extends: DefaultTheme,
  Layout: SiteLayout,
} satisfies Theme;
