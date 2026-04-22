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
      <section className="bg-gradient-to-b from-indigo-50 to-white py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm text-gray-600 mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-500" />
            独立开发者的项目集合
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">
            构建有价值的产品
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            这里记录了我独立开发的各类项目，从桌面应用到 Web 工具，
            每一个都源于真实需求，追求极致的用户体验。
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-5 h-5 text-indigo-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stat.value()}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 flex-1">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">项目展示</h2>
            <span className="text-sm text-gray-500">共 {projects.length} 个项目</span>
          </div>

          <div className="grid gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:border-indigo-300 hover:shadow-lg transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {project.name}
                      </h3>
                      <StatusBadge status={project.status} />
                    </div>
                    <p className="text-gray-600 leading-relaxed">{project.tagline}</p>
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100 whitespace-nowrap">
                    {project.category}
                  </span>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech.category}
                      className="text-xs bg-gray-50 text-gray-600 px-2.5 py-1 rounded-md border border-gray-100"
                    >
                      {tech.items}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="text-xs text-gray-400 px-2 py-1">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <Link
                    to={`/project/${project.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                  >
                    查看详情
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
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
