export const MODULES = [
  { slug: "闲聊", name: "闲聊区", desc: "日常闲聊、校园生活分享" },
  { slug: "技术", name: "技术交流", desc: "编程、课程、工具讨论" },
  { slug: "求助", name: "求助区", desc: "学习、生活问题互助" },
  { slug: "公告", name: "活动公告", desc: "社团活动与官方通知" },
] as const;

export type ModuleSlug = (typeof MODULES)[number]["slug"];

export function isModuleSlug(value: string): value is ModuleSlug {
  return MODULES.some((m) => m.slug === value);
}
