---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Zero-Simple-Docs"
  text: "遇事不决，可问春风  春风不语，即随本心"
  tagline: 不破不立 大破大立
  image:
    src: https://unpkg.com/@vbenjs/static-source@0.1.6/source/logo-v1.webp
    alt: Zero Simple
  actions:
    - theme: brand
      text: 快速开始 ->
      link: /guide/introduction/vben
    - theme: alt
      text: 在 GitHub 查看
      link: https://github.com/simple-99/zero-simple-docs

features:
  - icon: 🚀
    title: 最新技术栈
    details: 基于 Vue3、Pinia、Vue Router、TypeScript、等最新技术栈。
    link: /guide/introduction/quick-start
    linkText: 快速开始
  - icon: 🦄
    title: Nólëbase 集成
    details: 为基于本地优先的知识库和静态生成器的文档工程提供更好的体验
    link: https://nolebase-integrations.ayaka.io/pages/zh-CN/
    linkText: 多元化的文档工程工具合集
  - icon: 🎨
    title: 主题定制
    details: 通过简单的配置，即可实现各种主题切换，满足个性化需求。
    link: /guide/in-depth/theme
    linkText: 主题文档
  - icon: 🌐
    title: 国际化
    details: 内置国际化方案，支持多语言切换，满足国际化需求。
    link: /guide/in-depth/locale
    linkText: 国际化文档
  - icon: 🔐
    title: 权限管理
    details: 内置权限管理方案，支持多种权限控制方式，满足各种权限需求。
    link: /guide/in-depth/access
    linkText: 权限文档
  - title: Vite
    icon:
      src: /logos/vite.svg
    details: 现代化的前端构建工具，快速冷启动，瞬间热更新。
    link: https://vitejs.dev/
    linkText: 官方站点
  - title: Shadcn UI
    icon:
      src: /logos/shadcn-ui.svg
    details: 核心基于 Shadcn UI + Tailwindcss，业务可支持任意的 UI 框架。
    link: https://www.shadcn-vue.com/
    linkText: 官方站点
  - title: Turbo Repo
    icon:
      src: /logos/turborepo.svg
    details: 规范且标准的大仓架构，使用 pnpm + monorepo + turbo 工程管理模式，提供企业级开发规范。
    link: https://turbo.build/
    linkText: 官方站点
  - title: Nitro Mock Server
    icon:
      src: /logos/nitro.svg
    details: 内置 Nitro Mock 服务，让你的 mock 服务更加强大。
    link: https://nitro.unjs.io/
    linkText: 官方站点
---
