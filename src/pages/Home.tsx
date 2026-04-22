import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Layers, Sparkles } from "lucide-react";
import { projects } from "../data/projects";
import StatusBadge from "../components/StatusBadge";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100svh-56px)]">
      {/* Compact Hero + Stats */}
      <section className="pt-10 pb-6 sm:pt-14 sm:pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-[#fafafa] border border-[#ebebeb] rounded-full px-3 py-1 text-xs text-[#666] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#0a72ef]" />
              独立开发者的产品集合
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-[#171717] tracking-[-2px] mb-3 leading-[1.1]">
              实用的工具，解决真实问题
            </h1>
            <p className="text-base sm:text-lg text-[#666] max-w-xl mx-auto leading-relaxed">
              每一款产品都源于真实需求，致力于提供简单好用的解决方案
            </p>
          </div>

          {/* Inline stats */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 text-sm">
            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#171717]" />
              <span className="font-semibold text-[#171717]">{projects.length}</span>
              <span className="text-[#666]">款产品</span>
            </div>
            <div className="w-px h-4 bg-[#ebebeb]" />
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[#171717]">{projects.filter((p) => p.status === "completed").length}</span>
              <span className="text-[#666]">已上线</span>
            </div>
            <div className="w-px h-4 bg-[#ebebeb] hidden sm:block" />
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="font-semibold text-[#171717]">2+</span>
              <span className="text-[#666]">平台</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-6 flex-1">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-white border border-[#ebebeb] rounded-lg p-5 sm:p-6 hover:border-[#171717] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <h3 className="text-lg font-semibold text-[#171717] group-hover:text-black transition-colors tracking-tight">
                        {project.name}
                      </h3>
                      <StatusBadge status={project.status} />
                    </div>
                    <p className="text-[#666] text-sm leading-relaxed">{project.tagline}</p>
                  </div>
                  <span className="text-xs text-[#808080] bg-[#fafafa] px-2.5 py-0.5 rounded-full border border-[#ebebeb] whitespace-nowrap self-start">
                    {project.category}
                  </span>
                </div>

                <p className="text-[#666] text-sm leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

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

                <div className="flex items-center gap-4">
                  <Link
                    to={`/project/${project.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#171717] hover:text-black transition-colors"
                  >
                    了解更多
                    <ArrowRight className="w-4 h-4" />
                  </Link>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
