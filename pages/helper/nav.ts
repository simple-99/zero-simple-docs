/*
 * @version: 1.0
 * @Author: wsh
 * @Date: 2024-08-25 15:31:44
 * @LastEditTime: 2024-09-27 10:48:40
 * @FilePath: \zero-simple-docs\pages\helper\nav.ts
 * @Description:
 */
import type { DefaultTheme } from "vitepress";
import { version } from "../../package.json";

export const nav = (): DefaultTheme.NavItem[] => {
  return [
    {
      text: "web前端",
      items: [
        {
          text: "UI组件框架",
          items: [
            {
              link: "/uiComponents/tailwind",
              text: "Tailwind CSS",
            },
          ],
        },
        {
          text: "CesiumJS",
          items: [
            {
              link: "/cesium/customMaterial",
              text: "自定义材质",
            },
          ],
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
        {
          link: "/tutorial/airport",
          text: "机场服务",
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
      ],
    },
  ];
};
