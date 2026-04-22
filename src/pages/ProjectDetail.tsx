import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Code2, ExternalLink, Download } from "lucide-react";
import { getProjectById } from "../data/projects";
import StatusBadge from "../components/StatusBadge";
import Lightbox from "../components/Lightbox";

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
      ? `${base} bg-[#171717] text-white hover:bg-black`
      : `${base} bg-white text-[#171717] border border-[#ebebeb] hover:border-[#171717]`;
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
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-semibold text-[#171717] mb-4">项目未找到</h1>
        <p className="text-[#666] mb-6">该项目不存在或已被移除。</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#171717] hover:text-black font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col min-h-[calc(100svh-56px)]">
        <div className="max-w-6xl mx-auto px-6 py-8 w-full flex-1">
          {/* Breadcrumb */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-[#666] hover:text-[#171717] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            返回项目列表
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs font-medium text-[#666] bg-[#fafafa] px-3 py-1 rounded-full border border-[#ebebeb]">
                {project.category}
              </span>
              {!project.hideStatusBadge && <StatusBadge status={project.status} />}
              {project.badges?.map((badge) => {
                const cls =
                  badge === "开源"
                    ? "bg-green-50 text-green-600 border-green-200"
                    : badge === "免费软件"
                      ? "bg-orange-50 text-orange-600 border-orange-200"
                      : "bg-[#fafafa] text-[#666] border-[#ebebeb]";
                return (
                  <span
                    key={badge}
                    className={`text-xs font-medium px-3 py-1 rounded-full border ${cls}`}
                  >
                    {badge}
                  </span>
                );
              })}
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[#171717] mb-4 tracking-[-2px] leading-[1.1]">
              {project.name}
            </h1>
            <p className="text-xl text-[#666] leading-relaxed max-w-3xl">
              {project.tagline}
            </p>
          </div>

          {/* Links */}
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
          </div>

          <div className="space-y-10">
            {/* Images */}
            {project.images && project.images.length > 0 && (
              <section className="space-y-12">
                {project.images.map((img, i) => (
                  <div
                    key={img.src}
                    className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-6 md:gap-8 items-center`}
                  >
                    <div className="w-full md:w-1/2 rounded-xl border border-[#e5e7eb] shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden">
                      <img
                        src={img.src}
                        alt={img.title}
                        className="w-full aspect-video object-cover cursor-pointer"
                        loading="lazy"
                        onClick={() => setLightboxIndex(i)}
                      />
                    </div>
                    <div className="w-full md:w-1/2 space-y-3">
                      <h3 className="text-xl font-semibold text-[#171717] tracking-tight">
                        {img.title}
                      </h3>
                      <p className="text-[#666] leading-relaxed">
                        {img.description}
                      </p>
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* Description */}
            <section>
              <h2 className="text-xl font-semibold text-[#171717] mb-4 tracking-tight">项目介绍</h2>
              <p className="text-[#666] leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="text-2xl font-semibold text-[#171717] mb-6 tracking-tight">核心亮点</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="bg-white border border-[#ebebeb] rounded-xl p-6 hover:border-[#171717] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-200"
                  >
                    <p className="text-[#171717] font-medium leading-relaxed">{h}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-2xl font-semibold text-[#171717] mb-6 tracking-tight">功能特性</h2>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                {project.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#171717] mt-2 shrink-0" />
                    <span className="text-[#666] leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* Lightbox */}
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
