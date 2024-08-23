/*
 * @version: 1.0
 * @Author: wsh
 * @Date: 2024-08-23 16:07:33
 * @LastEditTime: 2024-08-23 16:17:17
 * @FilePath: \zero-simple-docs\pages\helper\sidebar.ts
 * @Description:
 */
import type { DefaultTheme } from "vitepress";

export default {
  sidebarGuide: (): DefaultTheme.SidebarItem[] => [
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
  ],
  sidebarCommercial: (): DefaultTheme.SidebarItem[] => [
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
  ],
  sidebarTutorial: (): DefaultTheme.SidebarItem[] => [
    {
      link: "vitepress",
      text: "vitepress 教程",
    },
    {
      link: "airport",
      text: "机场推荐",
    },
  ],
};
