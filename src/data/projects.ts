import type { LucideIcon } from "lucide-react";
import {
  Globe,
  Paintbrush,
  CreditCard,
  Package,
  Image as ImageIcon,
  LogIn,
  FileText,
  Radio,
  MessageSquare,
  UserCircle,
  CalendarCheck,
  Brain,
  ListChecks,
  Users,
  WifiOff,
  CircleDot,
  Monitor,
  LayoutGrid,
  Wand2,
  AlertCircle,
} from "lucide-react";

export type ProjectStatus = "completed" | "delivered" | "in-progress" | "planned";

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  techStack: { category: string; items: string }[];
  highlights: { text: string; icon: LucideIcon }[];
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

const onlineCls = "bg-[#ebf5ff] text-[#0a72ef] border-[#0a72ef]/20 dark:bg-[#1e3a5f] dark:text-[#60a5fa] dark:border-[#60a5fa]/30";

export const statusConfig: Record<ProjectStatus, { text: string; cls: string }> = {
  completed: { text: "已完成", cls: onlineCls },
  delivered: { text: "已交付", cls: onlineCls },
  "in-progress": { text: "开发中", cls: "bg-[#fafafa] text-[#666] border-[#ebebeb] dark:bg-[#262626] dark:text-[#a3a3a3] dark:border-[#404040]" },
  planned: { text: "规划中", cls: "bg-[#fafafa] text-[#808080] border-[#ebebeb] dark:bg-[#262626] dark:text-[#737373] dark:border-[#404040]" },
};

export const onlineStatuses: ProjectStatus[] = ["completed", "delivered"];

export const badgeConfig: Record<string, string> = {
  "开源": "bg-green-50 text-green-600 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
  "免费软件": "bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800",
  "电商平台": "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
  "客户定制": "bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800",
};
export const badgeDefaultCls = "bg-[#fafafa] text-[#666] border-[#ebebeb] dark:bg-[#262626] dark:text-[#a3a3a3] dark:border-[#404040]";

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
      { text: "五种语言支持，面向全球市场", icon: Globe },
      { text: "从照片到肖像画的完整定制流程", icon: Paintbrush },
      { text: "Stripe + PayPal 双支付通道", icon: CreditCard },
      { text: "完整的后台订单和内容管理", icon: Package },
      { text: "画框和背景可视化定制", icon: ImageIcon },
      { text: "Google 一键登录", icon: LogIn },
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
      { text: "专家解盘与定位解析文章系统", icon: FileText },
      { text: "付费内参订阅与订单管理", icon: CreditCard },
      { text: "实时直播室与互动评论", icon: Radio },
      { text: "完整的私信系统", icon: MessageSquare },
      { text: "个人中心订阅管理", icon: UserCircle },
      { text: "签到排名系统", icon: CalendarCheck },
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
      { text: "基于心理学量表的科学评估体系", icon: Brain },
      { text: "40 道专业题目，多维度深度分析", icon: ListChecks },
      { text: "自测 / 代测双模式，覆盖不同场景", icon: Users },
      { text: "完全离线运行，数据零上传", icon: WifiOff },
      { text: "雷达图可视化，四维度直观呈现", icon: CircleDot },
      { text: "跨平台支持 macOS & Windows", icon: Monitor },
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
  {
    id: "classroom-seating-system",
    name: "智能排座系统",
    tagline: "面向中小学教师的智能教室座位编排工具",
    description:
      "一款专为中小学教师设计的智能座位编排工具，帮助教师高效管理班级学生信息并自动生成合理的座位安排。系统记录学生的姓名、性别、身高、视力、性格、各科成绩等多维数据，支持可视化拖拽调整座位，内置多种智能排座算法（随机、身高优先、视力关怀、男女混排、互助小组），自动检测并规避学生冲突关系。所有数据存储在本地 IndexedDB，无需联网即可使用，充分保护学生隐私。",
    features: [
      "班级创建与管理，实时统计男生/女生/视力不佳/优秀学生人数",
      "学生多维信息管理：姓名、性别、身高、视力、性格、学号、各科成绩",
      "自定义学科设置，灵活配置需要记录的科目",
      "同学关系与冲突关系标记，排座时自动规避",
      "可视化教室座位网格，支持拖拽调整与座位锁定",
      "多种智能排座算法：随机、身高优先、视力关怀、男女混排、成绩互助",
      "冲突关系自动检测，高亮显示相邻冲突学生",
      "Excel 模板导入与批量导出学生数据",
      "座位方案保存与加载，支持多次调整对比",
      "完全本地运行，所有数据存储在 IndexedDB",
    ],
    techStack: [
      { category: "框架", items: "React 18 + TypeScript + Vite" },
      { category: "UI", items: "Tailwind CSS + shadcn/ui" },
      { category: "数据库", items: "IndexedDB" },
      { category: "数据处理", items: "xlsx (Excel 导入导出)" },
      { category: "算法", items: "模拟退火等启发式算法" },
    ],
    highlights: [
      { text: "全面的学生多维档案管理", icon: Users },
      { text: "可视化拖拽座位编排", icon: LayoutGrid },
      { text: "模拟退火等智能排座算法", icon: Wand2 },
      { text: "冲突关系自动检测与规避", icon: AlertCircle },
      { text: "完全本地运行，数据零上传", icon: WifiOff },
      { text: "Excel 批量导入导出", icon: FileText },
    ],
    images: [
      {
        src: "/images/classroom-seating-system/1.webp",
        title: "班级学生列表",
        description: "班级详情页展示学生统计概览（男生/女生人数、视力不佳、优秀学生），以及完整的学生信息表格，支持排序和搜索。",
      },
      {
        src: "/images/classroom-seating-system/2.webp",
        title: "学生详情与雷达图",
        description: "点击学生后展开右侧详情面板，展示身体素质、学科成绩雷达图、性格特点、同学关系等多维度信息，支持编辑和删除。",
      },
      {
        src: "/images/classroom-seating-system/3.webp",
        title: "添加学生信息",
        description: "完整的学生信息录入表单，包含姓名、学号、性别、身高、视力、性格、各科成绩等字段，同时支持设置同学关系。",
      },
      {
        src: "/images/classroom-seating-system/4.webp",
        title: "可视化座位排班",
        description: "教室座位网格可视化界面，左侧提供布局设置和多种智能排座算法选项，右侧为待安排学生列表，支持拖拽调整与座位锁定。",
      },
      {
        src: "/images/classroom-seating-system/5.webp",
        title: "学科自定义设置",
        description: "灵活管理班级学科，可添加、编辑、删除需要记录的学科成绩，满足不同学校和年级的个性化需求。",
      },
    ],
    badges: ["免费软件"],
    status: "completed",
    category: "教育工具",
    hideStatusBadge: true,
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
