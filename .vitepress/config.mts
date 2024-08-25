/*
 * @version: 1.0
 * @Author: wsh
 * @Date: 2024-08-18 13:43:03
 * @LastEditTime: 2024-08-25 15:31:33
 * @FilePath: \zero-simple-docs\.vitepress\config.mts
 * @Description:
 */
import type { DefaultTheme, HeadConfig } from "vitepress";

import { resolve } from "node:path";

import { type PwaOptions, withPwa } from "@vite-pwa/vitepress";
import { defineConfigWithTheme } from "vitepress";

import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from "@nolebase/vitepress-plugin-git-changelog/vite";
import { BiDirectionalLinks } from "@nolebase/markdown-it-bi-directional-links";

import sidebar from "../pages/helper/sidebar";
import { nav } from "../pages/helper/nav";

// https://vitepress.dev/reference/site-config
export default withPwa(
  defineConfigWithTheme({
    base: "/zero-simple-docs/",
    title: "Zero Simple Docs",
    description: "遇事不决，可问春风。春风不语，即随本心",
    head: head(),
    lang: "zh",
    pwa: pwa(),
    // locales: {
    //   en: {
    //     label: 'English',
    //     lang: 'en',
    //     link: '/en/',
    //   },
    //   root: {
    //     label: '简体中文',
    //     lang: 'zh-CN',
    srcDir: "pages",
    themeConfig: {
      darkModeSwitchLabel: "主题",
      darkModeSwitchTitle: "切换到深色模式",
      docFooter: {
        next: "下一页",
        prev: "上一页",
      },
      editLink: {
        pattern:
          "https://github.com/simple-99/zero-simple-docs/blob/main/pages/:path",
        text: "在 GitHub 上编辑此页面",
      },
      footer: {
        copyright: `Copyright © ${new Date().getFullYear()}-Zero-Simple-Docs`,
        message: "基于 MIT 许可发布.",
      },
      i18nRouting: true,
      langMenuLabel: "多语言",
      lastUpdated: {
        formatOptions: {
          dateStyle: "short",
          timeStyle: "medium",
        },
        text: "最后更新于",
      },
      lightModeSwitchTitle: "切换到浅色模式",
      logo: "/logos/zero-logo.svg",
      nav: nav(),
      outline: "deep",
      outlineTitle: "页面导航",
      returnToTopLabel: "回到顶部",
      search: {
        options: {
          locales: {
            zh: {
              translations: {
                button: {
                  buttonAriaLabel: "搜索文档",
                  buttonText: "搜索文档",
                },
                modal: {
                  footer: {
                    navigateText: "切换",
                    selectText: "选择",
                  },
                  noResultsText: "无法找到相关结果",
                  resetButtonTitle: "清除查询条件",
                },
              },
            },
          },
        },
        provider: "local",
      },
      sidebar: {
        "/commercial/": {
          base: "/commercial/",
          items: sidebar.sidebarCommercial(),
        },
        "/guide/": { base: "/guide/", items: sidebar.sidebarGuide() },
        "/tutorial/": { base: "/tutorial/", items: sidebar.sidebarTutorial() },
      },
      sidebarMenuLabel: "菜单",
      siteTitle: "Zero Simple Docs",
      socialLinks: [
        {
          icon: "github",
          link: "https://github.com/simple-99/zero-simple-docs",
        },
      ],
    },
    vite: {
      build: {
        chunkSizeWarningLimit: Infinity,
        minify: "terser",
      },
      json: {
        stringify: true,
      },
      plugins: [
        GitChangelog({
          repoURL: () => "https://github.com/simple-99/zero-simple-docs",
        }),
        GitChangelogMarkdownSection(),
      ],
      server: {
        fs: {
          allow: ["../.."],
        },
        host: true,
        port: 6173,
      },
      optimizeDeps: {
        exclude: ["@nolebase/vitepress-plugin-enhanced-readabilities/client"],
      },
      ssr: {
        noExternal: [
          // 如果还有别的依赖需要添加的话，并排填写和配置到这里即可
          "@nolebase/vitepress-plugin-enhanced-readabilities",
          "@nolebase/vitepress-plugin-highlight-targeted-heading",
        ],
        external: ["@vue/repl"],
      },
    },
    markdown: {
      config: (md) => {
        md.use(BiDirectionalLinks());
      },
      theme: {
        light: "github-light",
        dark: "vitesse-dark",
      },
      image: {
        lazyLoading: true,
      },
      lineNumbers: true,
    },
  })
);

function head(): HeadConfig[] {
  return [
    ["link", { href: "/zero-simple-docs/logos/zero-logo1.svg", rel: "icon" }],
  ];
}

function pwa(): PwaOptions {
  return {
    includeManifestIcons: false,
    manifest: {
      description: "遇事不决，可问春风。春风不语，即随本心",
      icons: [
        {
          sizes: "192x192",
          src: "/zero-simple-docs/logos/zero-logo1.svg",
          type: "image/svg+xml",
        },
        {
          sizes: "512x512",
          src: "/zero-simple-docs/logos/zero-logo1.svg",
          type: "image/svg+xml",
        },
      ],
      id: "/",
      name: "Zero Simple Docs",
      short_name: "Zero Simple Docs",
      theme_color: "#ffffff",
    },
    outDir: resolve(process.cwd(), ".vitepress/dist"),
    registerType: "autoUpdate",
    workbox: {
      globPatterns: ["**/*.{css,js,html,svg,png,ico,txt,woff2}"],
    },
  };
}
