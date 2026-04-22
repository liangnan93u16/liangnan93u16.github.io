import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Code2 } from "lucide-react";
import { getProjectById } from "../data/projects";

const DEFAULT_GITHUB_URL = "https://github.com/liangnan93u16";
const PROJECT_GITHUB_URLS: Record<string, string> = {
  "rpi-love-calculator": "https://github.com/liangnan93u16/LoveCalculatorApp",
};
const HIDE_GITHUB_FOR_PROJECTS = new Set(["art-gallery-ecommerce"]);
const PROJECT_PATH_RE = /^\/project\/([^/]+)$/;

export default function Header() {
  const location = useLocation();
  const { githubUrl, showGitHub } = useMemo(() => {
    const match = PROJECT_PATH_RE.exec(location.pathname);
    const projectId = match ? match[1] : null;
    const hide = projectId ? HIDE_GITHUB_FOR_PROJECTS.has(projectId) : false;
    if (projectId && PROJECT_GITHUB_URLS[projectId]) {
      return { githubUrl: PROJECT_GITHUB_URLS[projectId], showGitHub: !hide };
    }
    const project = projectId ? getProjectById(projectId) : null;
    return { githubUrl: project?.githubUrl ?? DEFAULT_GITHUB_URL, showGitHub: !hide };
  }, [location.pathname]);

  return (
    <header className="border-b border-black/5 bg-white/80 backdrop-blur-md sticky top-0 z-50">
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
          {showGitHub && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#666] hover:text-[#171717] transition-colors"
            >
              GitHub
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
