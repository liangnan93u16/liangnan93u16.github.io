import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  Code2,
  ExternalLink,
  Download,
} from "lucide-react";
import { getProjectById, badgeConfig, badgeDefaultCls } from "../data/projects";
import StatusBadge from "../components/StatusBadge";
import Lightbox from "../components/Lightbox";

const SITE_URL = "https://liangnan93u16.github.io";

function getApplicationCategory(category: string): string {
  const map: Record<string, string> = {
    "桌面应用": "UtilitiesApplication",
    "教育工具": "EducationalApplication",
    "客户定制": "BusinessApplication",
  };
  return map[category] ?? "SoftwareApplication";
}

function ProjectLink({
  href,
  icon: Icon,
  children,
  variant = "secondary",
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base = "inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-colors";
  const cls =
    variant === "primary"
      ? `${base} bg-[#171717] text-white hover:bg-black dark:bg-[#f5f5f5] dark:text-[#0a0a0a] dark:hover:bg-white`
      : `${base} bg-white text-[#171717] border border-[#ebebeb] hover:border-[#171717] dark:bg-[#171717] dark:text-[#f5f5f5] dark:border-[#262626] dark:hover:border-[#f5f5f5]`;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      <Icon className="w-4 h-4" />
      {children}
    </a>
  );
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = getProjectById(id || "");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!project) {
    const notFoundTitle = "项目未找到 · 灵动工作室产品集";
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <Helmet>
          <title>{notFoundTitle}</title>
          <meta name="description" content="该项目不存在或已被移除。" />
          <meta property="og:title" content={notFoundTitle} />
          <meta property="og:description" content="该项目不存在或已被移除。" />
        </Helmet>
        <h1 className="text-2xl font-semibold text-[#171717] mb-4 dark:text-[#f5f5f5] transition-colors">项目未找到</h1>
        <p className="text-[#666] mb-6 dark:text-[#a3a3a3] transition-colors">该项目不存在或已被移除。</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#171717] hover:text-black font-medium transition-colors dark:text-[#f5f5f5] dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </Link>
      </div>
    );
  }

  const pageUrl = `${SITE_URL}/project/${project.id}`;
  const pageTitle = `${project.name} · 灵动工作室产品集`;
  const pageDesc = project.description;
  const ogImage = project.images?.[0]?.src ? `${SITE_URL}${project.images[0].src}` : undefined;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.description,
    applicationCategory: getApplicationCategory(project.category),
    url: pageUrl,
    screenshot: project.images?.map((img) => `${SITE_URL}${img.src}`) ?? [],
  };

  if (project.category === "桌面应用") {
    jsonLd.operatingSystem = "macOS, Windows";
  }

  if (project.badges?.some((b) => b === "免费软件" || b === "开源")) {
    jsonLd.offers = {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CNY",
    };
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        {ogImage && <meta property="og:image" content={ogImage} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        {ogImage && <meta name="twitter:image" content={ogImage} />}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="flex flex-col min-h-[calc(100svh-56px)]">
        <div className="max-w-6xl mx-auto px-6 py-8 w-full flex-1">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-[#666] hover:text-[#171717] transition-colors mb-8 dark:text-[#a3a3a3] dark:hover:text-[#f5f5f5]"
          >
            <ArrowLeft className="w-4 h-4" />
            返回项目列表
          </Link>

          <div className="mb-12">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {!project.hideCategory && (
                <span className="text-xs font-medium text-[#666] bg-[#fafafa] px-3 py-1 rounded-full border border-[#ebebeb] dark:text-[#a3a3a3] dark:bg-[#0a0a0a] dark:border-[#404040] transition-colors">
                  {project.category}
                </span>
              )}
              {!project.hideStatusBadge && <StatusBadge status={project.status} />}
              {project.badges?.map((badge) => (
                <span
                  key={badge}
                  className={`text-xs font-medium px-3 py-1 rounded-full border ${badgeConfig[badge] ?? badgeDefaultCls}`}
                >
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[#171717] mb-4 tracking-[-2px] leading-[1.1] dark:text-[#f5f5f5] transition-colors">
              {project.name}
            </h1>
            <p className="text-xl text-[#666] leading-relaxed max-w-3xl dark:text-[#a3a3a3] transition-colors">
              {project.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-12">
            {project.githubUrl && (
              <ProjectLink href={project.githubUrl} icon={Code2} variant="primary">
                GitHub 仓库
              </ProjectLink>
            )}
            {project.demoUrl && (
              <ProjectLink href={project.demoUrl} icon={ExternalLink}>
                在线演示
              </ProjectLink>
            )}
            {project.downloadUrl && (
              <ProjectLink href={project.downloadUrl} icon={Download}>
                下载安装
              </ProjectLink>
            )}
            {project.downloads?.map(({ label, url }) => (
              <ProjectLink key={label} href={url} icon={Download}>
                {label}
              </ProjectLink>
            ))}
          </div>

          <div className="space-y-10">
            {project.images && project.images.length > 0 && (
              <section className="space-y-12">
                {project.images.map((img, i) => (
                  <div
                    key={img.src}
                    className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-6 md:gap-8 items-center`}
                  >
                    <div className="w-full md:w-1/2 rounded-xl border border-[#e5e7eb] shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden dark:border-[#404040] dark:shadow-[0_4px_24px_rgba(255,255,255,0.04)] transition-colors">
                      <img
                        src={img.src}
                        alt={img.title}
                        className="w-full aspect-video object-cover cursor-pointer"
                        loading="lazy"
                        onClick={() => setLightboxIndex(i)}
                      />
                    </div>
                    <div className="w-full md:w-1/2 space-y-3">
                      <h3 className="text-xl font-semibold text-[#171717] tracking-tight dark:text-[#f5f5f5] transition-colors">
                        {img.title}
                      </h3>
                      <p className="text-[#666] leading-relaxed dark:text-[#a3a3a3] transition-colors">
                        {img.description}
                      </p>
                    </div>
                  </div>
                ))}
              </section>
            )}

            <section>
              <h2 className="text-2xl font-semibold text-[#171717] mb-6 tracking-tight dark:text-[#f5f5f5] transition-colors">项目介绍</h2>
              <p className="text-[#666] leading-relaxed whitespace-pre-line dark:text-[#a3a3a3] transition-colors">
                {project.description}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#171717] mb-6 tracking-tight dark:text-[#f5f5f5] transition-colors">核心亮点</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.highlights.map(({ text, icon: Icon }) => (
                  <div
                    key={text}
                    className="bg-white border border-[#ebebeb] rounded-xl p-6 hover:border-[#171717] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-200 dark:bg-[#171717] dark:border-[#262626] dark:hover:border-[#f5f5f5] dark:hover:shadow-[0_4px_16px_rgba(255,255,255,0.06)]"
                  >
                    <div className="flex items-center gap-2 text-[#171717] font-medium leading-relaxed dark:text-[#f5f5f5] transition-colors">
                      <Icon className="w-4 h-4 text-[#0a72ef] shrink-0 dark:text-[#60a5fa] transition-colors" />
                      <span>{text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#171717] mb-6 tracking-tight dark:text-[#f5f5f5] transition-colors">功能特性</h2>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#171717] mt-2 shrink-0 dark:bg-[#f5f5f5] transition-colors" />
                    <span className="text-[#666] leading-relaxed dark:text-[#a3a3a3] transition-colors">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

          </div>
        </div>
      </div>

      {lightboxIndex !== null && project.images && (
        <Lightbox
          images={project.images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
        />
      )}
    </>
  );
}
