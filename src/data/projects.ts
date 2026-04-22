export type ProjectStatus = "completed" | "in-progress" | "planned";

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  techStack: { category: string; items: string }[];
  highlights: string[];
  images?: string[];
  githubUrl?: string;
  demoUrl?: string;
  downloadUrl?: string;
  status: ProjectStatus;
  category: string;
}

export const statusConfig: Record<ProjectStatus, { text: string; cls: string }> = {
  completed: { text: "已完成", cls: "bg-[#ebf5ff] text-[#0a72ef] border-[#0a72ef]/20" },
  "in-progress": { text: "开发中", cls: "bg-[#fafafa] text-[#666] border-[#ebebeb]" },
  planned: { text: "规划中", cls: "bg-[#fafafa] text-[#808080] border-[#ebebeb]" },
};

export const projects: Project[] = [
  {
    id: "art-gallery-ecommerce",
    name: "1st Art Gallery",
    tagline: "手工艺术复制品与定制肖像画电商平台",
    description:
      "一个完整的多语言电商网站，专注手工艺术复制品和定制肖像画销售。用户可以浏览大师名画复制品，也可以上传照片定制个人肖像画，支持画框选择和背景定制。平台支持五种语言，集成 Stripe 和 PayPal 安全支付，面向全球市场。",
    features: [
      "浏览大师名画复制品，按艺术家、风格筛选",
      "上传照片定制个人肖像画",
      "画框选择和背景定制",
      "多语言购物体验（英/德/法/西/中）",
      "Stripe + PayPal 安全支付",
      "订单追踪和账户管理",
      "后台管理系统，支持博客发布",
    ],
    techStack: [
      { category: "框架", items: "Next.js 14 App Router" },
      { category: "UI", items: "React + shadcn/ui + Tailwind CSS" },
      { category: "数据库", items: "PostgreSQL + Drizzle ORM" },
      { category: "支付", items: "Stripe + PayPal" },
      { category: "认证", items: "Google OAuth + JWT" },
      { category: "测试", items: "Playwright E2E" },
    ],
    highlights: [
      "五种语言支持，面向全球市场",
      "从照片到肖像画的完整定制流程",
      "Stripe + PayPal 双支付通道",
      "完整的后台订单和内容管理",
      "画框和背景可视化定制",
      "Google 一键登录",
    ],
    images: [
      "/images/art-gallery/1.png",
      "/images/art-gallery/2.png",
      "/images/art-gallery/3.png",
      "/images/art-gallery/5.png",
      "/images/art-gallery/6.png",
    ],
    status: "completed",
    category: "Web 应用",
  },
  {
    id: "rpi-love-calculator",
    name: "RPI 恋爱占有欲计算器",
    tagline: "基于心理学量表的专业恋爱占有欲评估工具",
    description:
      "一款专注于恋爱心理评估的桌面应用，帮助用户深入了解自己和伴侣的恋爱占有欲特点。完全本地运行，无需联网，数据不离开设备，确保隐私安全。",
    features: [
      "专业心理评估，多维度分析恋爱占有欲",
      "支持「自测」和「代测」两种视角",
      "结合星座特质提供个性化恋爱建议",
      "本地保存测试历史，随时回顾对比",
      "完全离线运行，所有数据存储在本地",
      "不上传任何个人数据到服务器",
    ],
    techStack: [
      { category: "桌面框架", items: "Tauri v2 (Rust)" },
      { category: "UI 框架", items: "React 18 + TypeScript" },
      { category: "构建工具", items: "Vite" },
      { category: "样式", items: "Tailwind CSS + shadcn/ui" },
      { category: "路由", items: "Wouter" },
      { category: "图表", items: "Recharts" },
      { category: "动画", items: "GSAP + Framer Motion" },
    ],
    highlights: [
      "基于心理学量表的科学评估体系",
      "40 道专业题目，多维度深度分析",
      "自测 / 代测双模式，覆盖不同场景",
      "完全离线运行，数据零上传",
      "雷达图可视化，四维度直观呈现",
      "跨平台支持 macOS & Windows",
    ],
    githubUrl: "https://github.com/liangnan93u16/rpi-love-calculator",
    status: "completed",
    category: "桌面应用",
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
