/*
 * @version: 1.0
 * @Author: wsh
 * @Date: 2024-08-18 13:43:03
 * @LastEditTime: 2024-08-20 18:31:31
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
import { version } from "../package.json";

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
        pattern: "https://github.com/simple-99/zero-simple-docs/:path",
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
      logo: "https://unpkg.com/@vbenjs/static-source@0.1.6/source/logo-v1.webp",
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
        "/commercial/": { base: "/commercial/", items: sidebarCommercial() },
        "/guide/": { base: "/guide/", items: sidebarGuide() },
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
  return [["link", { href: "/favicon.ico", rel: "icon" }]];
}

function pwa(): PwaOptions {
  return {
    includeManifestIcons: false,
    manifest: {
      description:
        "Vben Admin is a modern admin dashboard template based on Vue 3. ",
      icons: [
        {
          sizes: "192x192",
          src: "https://unpkg.com/@vbenjs/static-source@0.1.6/source/pwa-icon-192.png",
          type: "image/png",
        },
        {
          sizes: "512x512",
          src: "https://unpkg.com/@vbenjs/static-source@0.1.6/source/pwa-icon-512.png",
          type: "image/png",
        },
      ],
      id: "/",
      name: "Vben Admin Doc",
      short_name: "vben_admin_doc",
      theme_color: "#ffffff",
    },
    outDir: resolve(process.cwd(), ".vitepress/dist"),
    registerType: "autoUpdate",
    workbox: {
      globPatterns: ["**/*.{css,js,html,svg,png,ico,txt,woff2}"],
    },
  };
}

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: "文档",
      items: [
        {
          link: "/guide/introduction/vben",
          text: "指南",
        },
        {
          text: "历史版本",
          items: [
            {
              link: "https://doc.vvbin.cn",
              text: "2.x版本文档",
            },
          ],
        },
      ],
    },
    {
      text: version,
      items: [
        {
          link: "https://github.com/vbenjs/vue-vben-admin/releases",
          text: "更新日志",
        },
        {
          link: "https://github.com/orgs/vbenjs/projects/5",
          text: "路线图",
        },
        {
          link: "https://github.com/vbenjs/vue-vben-admin/blob/main/.github/contributing.md",
          text: "贡献",
        },
      ],
    },
    {
      text: "🦄 教程",
      items: [
        {
          link: "/tutorial/vitepress",
          text: "vitepress搭建并部署网站",
        },
      ],
    },
  ];
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      collapsed: false,
      text: "简介",
      items: [
        {
          link: "introduction/vben",
          text: "关于 Vben Admin",
        },
        {
          link: "introduction/why",
          text: "为什么选择我们?",
        },
        { link: "introduction/quick-start", text: "快速开始" },
        { link: "introduction/thin", text: "精简版本" },
      ],
    },
    {
      text: "基础",
      items: [
        { link: "essentials/concept", text: "基础概念" },
        { link: "essentials/development", text: "本地开发" },
        { link: "essentials/route", text: "路由和菜单" },
        { link: "essentials/settings", text: "配置" },
        { link: "essentials/icons", text: "图标" },
        { link: "essentials/styles", text: "样式" },
        { link: "essentials/external-module", text: "外部模块" },
        { link: "essentials/build", text: "构建与部署" },
        { link: "essentials/server", text: "服务端交互与数据Mock" },
      ],
    },
    {
      text: "深入",
      items: [
        // { link: 'in-depth/layout', text: '布局' },
        { link: "in-depth/theme", text: "主题" },
        { link: "in-depth/access", text: "权限" },
        { link: "in-depth/locale", text: "国际化" },
        { link: "in-depth/features", text: "常用功能" },
        { link: "in-depth/check-updates", text: "检查更新" },
        { link: "in-depth/loading", text: "全局loading" },
        { link: "in-depth/ui-framework", text: "组件库切换" },
      ],
    },
    {
      text: "工程",
      items: [
        { link: "project/standard", text: "规范" },
        { link: "project/cli", text: "CLI" },
        { link: "project/dir", text: "目录说明" },
        { link: "project/test", text: "单元测试" },
        { link: "project/tailwindcss", text: "Tailwind CSS" },
        { link: "project/changeset", text: "Changeset" },
        { link: "project/vite", text: "Vite Config" },
      ],
    },
    {
      text: "其他",
      items: [
        { link: "other/project-update", text: "项目更新" },
        { link: "other/remove-code", text: "移除代码" },
        { link: "other/faq", text: "常见问题" },
      ],
    },
  ];
}
function sidebarCommercial(): DefaultTheme.SidebarItem[] {
  return [
    {
      link: "community",
      text: "社区交流",
    },
    {
      link: "technical-support",
      text: "技术支持",
    },
    {
      link: "customized",
      text: "定制开发",
    },
  ];
}
