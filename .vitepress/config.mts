/*
 * @version: 1.0
 * @Author: wsh
 * @Date: 2024-08-18 13:43:03
 * @LastEditTime: 2024-08-19 21:23:18
 * @FilePath: \zero-simple-docs\.vitepress\config.mts
 * @Description:
 */
import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/zero-simple-docs/",
  title: "Zero-Simple Docs",
  description: "一个练习一年半的前端练习生",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/simple-99" }],

    footer: {
      // message: "Released under the MIT License.",
      copyright: "Copyright © 2024-Zero-Simple-Admin",
    },
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "没有找到结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
  },
});
