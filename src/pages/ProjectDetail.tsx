import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Code2, ExternalLink, Download, CheckCircle2 } from "lucide-react";
import { getProjectById, statusConfig } from "../data/projects";
import StatusBadge from "../components/StatusBadge";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = getProjectById(id || "");

  if (!project) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">项目未找到</h1>
        <p className="text-gray-600 mb-6">该项目不存在或已被移除。</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </Link>
      </div>
    );
  }

  const status = statusConfig[project.status];

  return (
    <div className="flex flex-col min-h-[calc(100svh-56px)]">
      <div className="max-w-6xl mx-auto px-6 py-8 w-full flex-1">
        {/* Breadcrumb */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          返回项目列表
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full border border-gray-200">
              {project.category}
            </span>
            <StatusBadge status={project.status} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            {project.name}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
            {project.tagline}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3 mb-12">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              <Code2 className="w-4 h-4" />
              GitHub 仓库
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              在线演示
            </a>
          )}
          {project.downloadUrl && (
            <a
              href={project.downloadUrl}
              className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-300 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              下载安装
            </a>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">项目介绍</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">功能特性</h2>
              <ul className="space-y-3">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-gray-600 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">核心亮点</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="bg-indigo-50 border border-indigo-100 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-indigo-500" />
                      <span className="font-medium text-gray-900 text-sm">亮点 {i + 1}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{h}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">技术栈</h3>
              <div className="space-y-3">
                {project.techStack.map((tech) => (
                  <div key={tech.category}>
                    <div className="text-xs text-gray-500 mb-1">{tech.category}</div>
                    <div className="text-sm font-medium text-gray-900">{tech.items}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">项目信息</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">状态</span>
                  <span className="font-medium text-gray-900">{status.text}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">分类</span>
                  <span className="font-medium text-gray-900">{project.category}</span>
                </div>
                {project.githubUrl && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">开源</span>
                    <span className="font-medium text-emerald-600">是</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
