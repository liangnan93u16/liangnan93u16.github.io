import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { projects, onlineStatuses } from "../data/projects";
import StatusBadge from "../components/StatusBadge";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100svh-56px)]">
      {/* Hero */}
      <section className="pt-16 pb-10 sm:pt-24 sm:pb-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-semibold text-[#171717] tracking-[-2.5px] mb-5 leading-[1.08]">
              实用的工具，解决真实问题
            </h1>
            <p className="text-lg sm:text-xl text-[#666] max-w-2xl mx-auto leading-relaxed">
              每一款产品都源于真实需求，致力于提供简单好用的解决方案
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 sm:gap-14">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-semibold text-[#171717] tracking-tight">{projects.length}</div>
              <div className="text-sm text-[#666] mt-1">款产品</div>
            </div>
            <div className="w-px h-10 bg-[#ebebeb]" />
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-semibold text-[#171717] tracking-tight">{projects.filter((p) => onlineStatuses.includes(p.status)).length}</div>
              <div className="text-sm text-[#666] mt-1">已上线</div>
            </div>
            <div className="w-px h-10 bg-[#ebebeb] hidden sm:block" />
            <div className="text-center hidden sm:block">
              <div className="text-2xl sm:text-3xl font-semibold text-[#171717] tracking-tight">2+</div>
              <div className="text-sm text-[#666] mt-1">平台</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-6 flex-1">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-4">
            {projects.map((project) => {
              const projectUrl = `/project/${project.id}`;
              return (
                <div
                  key={project.id}
                  className="group bg-white border border-[#ebebeb] rounded-lg p-5 sm:p-6 hover:border-[#171717] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <Link
                          to={projectUrl}
                          className="text-lg font-semibold text-[#171717] group-hover:text-black transition-colors tracking-tight hover:underline"
                        >
                          {project.name}
                        </Link>
                      {!project.hideStatusBadge && <StatusBadge status={project.status} />}
                    </div>
                    <p className="text-[#666] text-sm leading-relaxed">{project.tagline}</p>
                  </div>
                  <span className="text-xs text-[#808080] bg-[#fafafa] px-2.5 py-0.5 rounded-full border border-[#ebebeb] whitespace-nowrap self-start">
                    {project.category}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  {project.images?.[0] && (
                    <img
                      src={project.images[0].src}
                      alt={project.images[0].title}
                      className="w-full sm:w-36 rounded-lg border border-[#ebebeb] aspect-video object-cover shrink-0"
                      loading="lazy"
                    />
                  )}
                  <p className="text-[#666] text-sm leading-relaxed line-clamp-2 flex-1">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.highlights.slice(0, 3).map((h, i) => (
                    <span
                      key={i}
                      className="text-xs bg-[#ebf5ff] text-[#0a72ef] px-2 py-0.5 rounded-full font-medium"
                    >
                      {h}
                    </span>
                  ))}
                  {project.highlights.length > 3 && (
                    <span className="text-xs text-[#808080] px-1.5 py-0.5">
                      +{project.highlights.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-[#666] hover:text-[#171717] transition-colors"
                    >
                      GitHub
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <Link
                    to={projectUrl}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#171717] hover:text-black transition-colors ml-auto"
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
