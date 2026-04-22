import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Code2 } from "lucide-react";
import { getProjectById } from "../data/projects";

const DEFAULT_GITHUB_URL = "https://github.com/liangnan93u16";
const PROJECT_GITHUB_URLS: Record<string, string> = {
  "rpi-love-calculator": "https://github.com/liangnan93u16/LoveCalculatorApp",
};

export default function Header() {
  const location = useLocation();
  const githubUrl = useMemo(() => {
    const match = location.pathname.match(/^\/project\/([^/]+)$/);
    const projectId = match ? match[1] : null;
    if (projectId && PROJECT_GITHUB_URLS[projectId]) {
      return PROJECT_GITHUB_URLS[projectId];
    }
    const project = projectId ? getProjectById(projectId) : null;
    return project?.githubUrl ?? DEFAULT_GITHUB_URL;
  }, [location.pathname]);

  return (
    <header className="border-b border-[#ebebeb] bg-white/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-[#171717] hover:text-black transition-colors">
          <Code2 className="w-5 h-5" />
          <span className="font-semibold text-lg tracking-tight">灵动工作室</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <a
            href="https://www.xiaohongshu.com/user/profile/62b01cca00000000190288cc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#666] hover:text-[#171717] transition-colors"
          >
            小红书
          </a>
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
