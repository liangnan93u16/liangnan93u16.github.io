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
  hideStatusBadge?: boolean;
  hideCategory?: boolean;
}

const onlineCls = "bg-[#ebf5ff] text-[#0a72ef] border-[#0a72ef]/20";

export const statusConfig: Record<ProjectStatus, { text: string; cls: string }> = {
  completed: { text: "已完成", cls: onlineCls },
  delivered: { text: "已交付", cls: onlineCls },
  "in-progress": { text: "开发中", cls: "bg-[#fafafa] text-[#666] border-[#ebebeb]" },
  planned: { text: "规划中", cls: "bg-[#fafafa] text-[#808080] border-[#ebebeb]" },
};

export const onlineStatuses: ProjectStatus[] = ["completed", "delivered"];

export const badgeConfig: Record<string, string> = {
  "开源": "bg-green-50 text-green-600 border-green-200",
  "免费软件": "bg-orange-50 text-orange-600 border-orange-200",
  "电商平台": "bg-blue-50 text-blue-600 border-blue-200",
  "客户定制": "bg-purple-50 text-purple-600 border-purple-200",
};
export const badgeDefaultCls = "bg-[#fafafa] text-[#666] border-[#ebebeb]";

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
    images: [
      {
        src: "/images/art-gallery-ecommerce/1.webp",
        title: "网站首页",
        description: "精美的首页设计，展示手工艺术复制品与定制艺术服务，配有梵高《星夜》等经典作品展示，传达专业艺术电商的品牌形象。",
      },
      {
        src: "/images/art-gallery-ecommerce/2.webp",
        title: "四大核心服务",
        description: "清晰呈现四大服务板块：艺术品复制品、定制肖像、照片风格化艺术作品、角色扮演艺术，让用户快速找到所需服务。",
      },
      {
        src: "/images/art-gallery-ecommerce/3.webp",
        title: "畅销复制品展示",
        description: "展示销量最高的500幅艺术复制品，涵盖马蒂斯、莫奈等大师作品，配有轮播浏览和查看全部作品入口。",
      },
      {
        src: "/images/art-gallery-ecommerce/4.webp",
        title: "肖像类别选择",
        description: "丰富的肖像定制类别，包括婚礼、情侣、个人、儿童、家庭、宠物等，满足不同场景的照片转艺术需求。",
      },
      {
        src: "/images/art-gallery-ecommerce/5.webp",
        title: "风格化艺术作品",
        description: "多种艺术风格转换选项：梵高风、油画风、漫画风、动漫风、波普艺术风等，将照片转化为独特艺术作品。",
      },
      {
        src: "/images/art-gallery-ecommerce/6.webp",
        title: "角色扮演艺术",
        description: "创意十足的角色扮演定制服务，用户可选择皇家文艺复兴、电影电视、职业等多种主题，让自己成为画中主角。",
      },
      {
        src: "/images/art-gallery-ecommerce/9.webp",
        title: "商品详情与购物车",
        description: "完整的商品详情页，支持尺寸选择、价格展示、颜色选择、加入购物车等功能，购物流程清晰流畅。",
      },
      {
        src: "/images/art-gallery-ecommerce/10.webp",
        title: "艺术家与品质保证",
        description: "展示资深艺术家团队、最高品质材料、严格质量控制和始终手绘风格的四大核心优势，建立用户信任。",
      },
      {
        src: "/images/art-gallery-ecommerce/14.webp",
        title: "绘画媒介选择",
        description: "支持多种绘画媒介选择：油画、亚克力、炭笔、铅笔、粉彩等，用户可根据喜好定制，右侧实时显示订单摘要。",
      },
      {
        src: "/images/art-gallery-ecommerce/15.webp",
        title: "背景与签名定制",
        description: "灵活的背景选择方案：让艺术家决定、预设实心背景、保留原始照片背景、上传自定义背景，还可添加艺术家签名和绘画过程视频。",
      },
      {
        src: "/images/art-gallery-ecommerce/19.webp",
        title: "宠物角色扮演服装",
        description: "为宠物提供丰富的角色扮演服装选择，包括维京人、绿箭侠、美国队长、金刚狼等趣味造型，让爱宠也能成为艺术主角。",
      },
      {
        src: "/images/art-gallery-ecommerce/22.webp",
        title: "人物服装选择",
        description: "人物角色扮演的精美服装选项，从王后女王到玛丽女王、皇家公爵夫人等历史主题服装，打造独一无二的艺术肖像。",
      },
    ],
    status: "delivered",
    category: "客户定制",
    hideStatusBadge: true,
    hideCategory: true,
    badges: ["客户定制", "电商平台"],
  },
  {
    id: "stock-analysis-platform",
    name: "约牛解盘",
    tagline: "连接投资者与专家分析师的股票市场解盘平台",
    description:
      "一个全栈股票分析平台，连接投资者与专业分析师。用户可以浏览专家档案、查看市场解盘和定位解析文章、订阅付费内参报告，并通过评论和私信与专家互动。平台支持实时直播、订单管理、签到系统等功能，采用中国金融平台的红色主题设计风格。",
    features: [
      "浏览专家档案，查看解盘文章和定位解析",
      "订阅付费内参报告，支持多种订阅周期",
      "专家直播室实时互动",
      "私信系统，支持收发私信",
      "个人中心管理订阅、消息和资料",
      "签到系统，累积签到次数和排名",
      "评论互动区，24小时自动清理",
    ],
    techStack: [
      { category: "前端", items: "React 18 + TypeScript + Vite" },
      { category: "后端", items: "Express + Node.js" },
      { category: "UI", items: "Tailwind CSS + shadcn/ui + Radix UI" },
      { category: "数据库", items: "PostgreSQL + Drizzle ORM" },
      { category: "状态管理", items: "TanStack Query" },
      { category: "路由", items: "Wouter" },
    ],
    highlights: [
      "专家解盘与定位解析文章系统",
      "付费内参订阅与订单管理",
      "实时直播室与互动评论",
      "完整的私信系统",
      "个人中心订阅管理",
      "签到排名系统",
    ],
    images: [
      {
        src: "/images/stock-analysis-platform/1.webp",
        title: "专家详情页",
        description: "专家个人主页，展示解盘、内参、定位解析三大板块，右侧显示最新定位文章和用户签到互动区。",
      },
      {
        src: "/images/stock-analysis-platform/2.webp",
        title: "定位解析文章列表",
        description: "专家发布的定位解析文章列表，包含文章标题、摘要和发布时间，方便用户快速浏览市场分析内容。",
      },
      {
        src: "/images/stock-analysis-platform/3.webp",
        title: "个人中心 - 我的内参",
        description: "用户个人中心页面，展示当前有效的内参订阅状态，左侧导航栏提供订阅记录、消息、资料设置等入口。",
      },
      {
        src: "/images/stock-analysis-platform/4.webp",
        title: "文章详情页",
        description: "完整的市场分析文章阅读页面，展示专家对市场走势的详细解读，右侧保留专家简介和导航入口。",
      },
      {
        src: "/images/stock-analysis-platform/5.webp",
        title: "私信系统",
        description: "用户与专家之间的私信对话界面，支持收发私信、查看收件箱和发件箱，内容限500字。",
      },
      {
        src: "/images/stock-analysis-platform/6.webp",
        title: "专家直播室",
        description: "专家直播页面，左侧为直播视频区域，右侧为直播互动区和在线名单，实现实时交流互动。",
      },
    ],
    status: "delivered",
    category: "客户定制",
    hideStatusBadge: true,
    hideCategory: true,
    badges: ["客户定制"],
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
    hideStatusBadge: true,
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
