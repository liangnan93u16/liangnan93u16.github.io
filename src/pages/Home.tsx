import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Heart, Layers, Sparkles } from "lucide-react";
import { projects } from "../data/projects";
import StatusBadge from "../components/StatusBadge";

const stats = [
  { icon: Layers, label: "项目总数", value: () => String(projects.length) },
  { icon: Heart, label: "已完成", value: () => String(projects.filter((p) => p.status === "completed").length) },
  { icon: Sparkles, label: "开发中", value: () => String(projects.filter((p) => p.status === "in-progress").length) },
  { icon: ExternalLink, label: "开源项目", value: () => String(projects.filter((p) => p.githubUrl).length) },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100svh-56px)]">
      {/* Hero */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#fafafa] border border-[#ebebeb] rounded-full px-4 py-1.5 text-sm text-[#666] mb-8">
            <Sparkles className="w-4 h-4 text-[#0a72ef]" />
            独立开发者的项目集合
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[48px] font-semibold text-[#171717] tracking-[-2.4px] mb-6 leading-[1]">
            构建有价值的产品
          </h1>
          <p className="text-lg sm:text-xl text-[#666] max-w-2xl mx-auto leading-relaxed">
            这里记录了我独立开发的各类项目，从桌面应用到 Web 工具，
            每一个都源于真实需求，追求极致的用户体验。
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-[#ebebeb]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-5 h-5 text-[#171717] mx-auto mb-2" />
                <div className="text-2xl font-semibold text-[#171717] tracking-tight">{stat.value()}</div>
                <div className="text-sm text-[#666]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 flex-1">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-[#171717] tracking-tight">项目展示</h2>
            <span className="text-sm text-[#666]">共 {projects.length} 个项目</span>
          </div>

          <div className="grid gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-white border border-[#ebebeb] rounded-lg p-6 sm:p-8 hover:border-[#171717] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-[#171717] group-hover:text-black transition-colors tracking-tight">
                        {project.name}
                      </h3>
                      <StatusBadge status={project.status} />
                    </div>
                    <p className="text-[#666] leading-relaxed">{project.tagline}</p>
                  </div>
                  <span className="text-xs text-[#808080] bg-[#fafafa] px-3 py-1 rounded-full border border-[#ebebeb] whitespace-nowrap">
                    {project.category}
                  </span>
                </div>

                <p className="text-[#666] text-sm leading-relaxed mb-5 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech.category}
                      className="text-xs bg-[#fafafa] text-[#666] px-2.5 py-1 rounded-md border border-[#ebebeb]"
                    >
                      {tech.items}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="text-xs text-[#808080] px-2 py-1">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <Link
                    to={`/project/${project.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#171717] hover:text-black transition-colors"
                  >
                    查看详情
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
