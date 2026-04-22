import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { projects, badgeConfig, badgeDefaultCls } from "../data/projects";
import StatusBadge from "../components/StatusBadge";

const SITE_URL = "https://liangnan93u16.github.io";
const SITE_TITLE = "灵动工作室产品集 · 个人开发者项目展示";
const SITE_DESC = "灵动工作室产品集 — 个人开发者项目展示，涵盖电商平台、桌面应用、教育工具等领域，每一款产品都源于真实需求，致力于提供简单好用的解决方案。";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "灵动工作室",
        url: SITE_URL,
        description: SITE_DESC,
        sameAs: ["https://github.com/liangnan93u16"],
      },
      {
        "@type": "ItemList",
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_URL}/project/${project.id}`,
          name: project.name,
          description: project.tagline,
        })),
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-[calc(100svh-56px)]">
      <Helmet>
        <title>{SITE_TITLE}</title>
        <meta name="description" content={SITE_DESC} />
        <link rel="canonical" href={SITE_URL} />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={SITE_DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:locale" content="zh_CN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESC} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Products */}
      <section className="py-6 flex-1">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-4">
            {projects.map((project) => {
              const projectUrl = `/project/${project.id}`;
              return (
                <div
                  key={project.id}
                  className="group bg-white border border-[#ebebeb] rounded-lg p-5 sm:p-6 hover:border-[#171717] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all duration-200 dark:bg-[#171717] dark:border-[#262626] dark:hover:border-[#f5f5f5] dark:hover:shadow-[0_4px_16px_rgba(255,255,255,0.06)]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <Link
                          to={projectUrl}
                          className="text-lg font-semibold text-[#171717] group-hover:text-black transition-colors tracking-tight hover:underline dark:text-[#f5f5f5] dark:group-hover:text-white"
                        >
                          {project.name}
                        </Link>
                        {!project.hideStatusBadge && <StatusBadge status={project.status} />}
                        {project.badges?.map((badge) => (
                          <span
                            key={badge}
                            className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${badgeConfig[badge] ?? badgeDefaultCls}`}
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                      <p className="text-[#666] text-sm leading-relaxed dark:text-[#a3a3a3] transition-colors">{project.tagline}</p>
                    </div>
                    {!project.hideCategory && (
                      <span className="text-xs text-[#808080] bg-[#fafafa] px-2.5 py-0.5 rounded-full border border-[#ebebeb] whitespace-nowrap self-start dark:text-[#737373] dark:bg-[#0a0a0a] dark:border-[#404040] transition-colors">
                        {project.category}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    {project.images?.[0] && (
                      <img
                        src={project.images[0].src}
                        alt={project.images[0].title}
                        className="w-full sm:w-36 rounded-lg border border-[#ebebeb] aspect-video object-cover shrink-0 dark:border-[#262626]"
                        loading="lazy"
                      />
                    )}
                    <p className="text-[#666] text-sm leading-relaxed line-clamp-2 flex-1 dark:text-[#a3a3a3] transition-colors">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3 flex-wrap">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-[#666] hover:text-[#171717] transition-colors dark:text-[#a3a3a3] dark:hover:text-[#f5f5f5]"
                        >
                          GitHub
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.downloads?.map(({ label, url }) => (
                        <a
                          key={label}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-[#666] hover:text-[#171717] transition-colors dark:text-[#a3a3a3] dark:hover:text-[#f5f5f5]"
                        >
                          {label}
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ))}
                      {project.highlights.slice(0, 3).map(({ text }) => (
                        <span
                          key={text}
                          className="text-xs bg-[#ebf5ff] text-[#0a72ef] px-2 py-0.5 rounded-full font-medium dark:bg-[#1e3a5f] dark:text-[#60a5fa] transition-colors"
                        >
                          {text}
                        </span>
                      ))}
                      {project.highlights.length > 3 && (
                        <span className="text-xs text-[#808080] px-1.5 py-0.5 dark:text-[#737373] transition-colors">
                          +{project.highlights.length - 3}
                        </span>
                      )}
                    </div>
                    <Link
                      to={projectUrl}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#171717] hover:text-black transition-colors dark:text-[#f5f5f5] dark:hover:text-white"
                    >
                      了解更多
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
