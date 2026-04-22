export type ProjectStatus = "completed" | "delivered" | "in-progress" | "planned";

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  techStack: { category: string; items: string }[];
  highlights: string[];
  images?: { src: string; title: string; description: string }[];
  badges?: string[];
  githubUrl?: string;
  demoUrl?: string;
  downloadUrl?: string;
  status: ProjectStatus;
  category: string;
}

const onlineCls = "bg-[#ebf5ff] text-[#0a72ef] border-[#0a72ef]/20";

export const statusConfig: Record<ProjectStatus, { text: string; cls: string }> = {
  completed: { text: "已完成", cls: onlineCls },
  delivered: { text: "已交付", cls: onlineCls },
  "in-progress": { text: "开发中", cls: "bg-[#fafafa] text-[#666] border-[#ebebeb]" },
  planned: { text: "规划中", cls: "bg-[#fafafa] text-[#808080] border-[#ebebeb]" },
};

export const onlineStatuses: ProjectStatus[] = ["completed", "delivered"];

export const projects: Project[] = [
  {
    id: "art-gallery-ecommerce",
    name: "第一画廊",
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
    status: "delivered",
    category: "客户定制",
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
    images: [
      {
        src: "/images/rpi-love-calculator/1.webp",
        title: "简洁优雅的首页",
        description: "应用首页清晰展示核心功能，包括双视角智能评估、预计用时、核心维度数量等关键信息，让用户一目了然。",
      },
      {
        src: "/images/rpi-love-calculator/2.webp",
        title: "两种测评视角",
        description: "支持「给自己测」和「为恋人测」两种模式。给自己测深入了解自己的占有欲程度，为恋人测则从对方视角评估关系中的占有特点。",
      },
      {
        src: "/images/rpi-love-calculator/3.webp",
        title: "四大核心维度",
        description: "从控制欲望、婚恋强度、情感依赖、关系不安四个维度全面评估恋爱占有欲，每个维度都有专业的心理学量表支撑。",
      },
      {
        src: "/images/rpi-love-calculator/5.webp",
        title: "直观的评估结果",
        description: "完成测评后立即获得 RPI 指数得分和水平评级，配合渐变进度条直观展示你在占有欲光谱上的位置。",
      },
      {
        src: "/images/rpi-love-calculator/6.webp",
        title: "详细的分析报告",
        description: "不仅给出分数，更提供综合结果解释和关键发现，帮助你深入理解自己的恋爱心理特点，促进更健康的亲密关系。",
      },
    ],
    badges: ["开源", "免费软件"],
    status: "completed",
    category: "桌面应用",
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
