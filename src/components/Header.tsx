import { Link, useLocation } from "react-router-dom";
import { Code2 } from "lucide-react";
import { getProjectById } from "../data/projects";

export default function Header() {
  const location = useLocation();
  const projectMatch = location.pathname.match(/^\/project\/([^/]+)$/);
  const projectId = projectMatch ? projectMatch[1] : null;
  const project = projectId ? getProjectById(projectId) : null;
  const projectGithubUrl = projectId === "rpi-love-calculator"
    ? "https://github.com/liangnan93u16/LoveCalculatorApp"
    : null;
  const githubUrl = projectGithubUrl ?? project?.githubUrl ?? "https://github.com/liangnan93u16";

  return (
    <header className="border-b border-[#ebebeb] bg-white/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-[#171717] hover:text-black transition-colors">
          <Code2 className="w-5 h-5" />
          <span className="font-semibold text-lg tracking-tight">灵动工作室</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link to="/" className="text-[#666] hover:text-[#171717] transition-colors">
            首页
          </Link>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#666] hover:text-[#171717] transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
