export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  techStack: { category: string; items: string }[];
  highlights: string[];
  githubUrl?: string;
  demoUrl?: string;
  downloadUrl?: string;
  status: "completed" | "in-progress" | "planned";
  category: string;
}

export const projects: Project[] = [
  {
    id: "rpi-love-calculator",
    name: "RPI 恋爱占有欲计算器",
    tagline: "基于心理学量表的专业恋爱占有欲评估工具",
    description:
      "一款完全本地化运行的心理评估桌面应用，基于科学的心理测量量表，通过 40 道专业题目多维度分析恋爱占有欲特点。支持自测和代测双模式，结合星座特质提供个性化恋爱建议，所有数据存储在本地，不上传任何个人隐私数据。",
    features: [
      "专业心理评估：基于科学的心理测量量表，多维度分析恋爱占有欲特点",
      "双模式测试：支持「自测」和「代测（给恋人测）」两种视角",
      "星座运势结合：结合星座特质提供个性化恋爱建议",
      "历史报告管理：本地保存测试历史，随时回顾对比",
      "完全离线运行：无需网络连接，所有数据存储在本地",
      "隐私保护：不上传任何个人数据到服务器",
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
      "完全离线运行，保护用户隐私",
      "基于 Z-score 算法的科学计算模型",
      "四维度雷达图可视化分析结果",
      "支持 macOS (Intel/Apple Silicon) 和 Windows",
    ],
    githubUrl: "https://github.com/liangnan93u16/rpi-love-calculator",
    status: "completed",
    category: "桌面应用",
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
