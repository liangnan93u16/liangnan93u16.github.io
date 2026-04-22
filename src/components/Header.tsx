import { Link, useLocation } from "react-router-dom";
import { Code2 } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const PROJECT_GITHUB_URLS: Record<string, string> = {
  "rpi-love-calculator": "https://github.com/liangnan93u16/LoveCalculatorApp",
};
const PROJECT_PATH_RE = /^\/project\/([^/]+)$/;

export default function Header() {
  const location = useLocation();
  const match = PROJECT_PATH_RE.exec(location.pathname);
  const projectId = match ? match[1] : null;
  const githubUrl = projectId ? PROJECT_GITHUB_URLS[projectId] : undefined;
  const showGitHub = !!githubUrl;

  return (
    <header className="border-b border-black/5 bg-white/80 backdrop-blur-md sticky top-0 z-50 dark:border-white/10 dark:bg-[#0a0a0a]/80 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 text-[#171717] hover:text-black transition-colors dark:text-[#f5f5f5] dark:hover:text-white shrink-0">
          <Code2 className="w-5 h-5" />
          <span className="font-semibold text-lg tracking-tight">灵动工作室产品集</span>
        </Link>
        <p className="text-sm text-[#666] truncate dark:text-[#a3a3a3] transition-colors hidden sm:block">
          每一款产品都源于真实需求，致力于提供简单好用的解决方案
        </p>
        <nav className="flex items-center gap-6 text-sm shrink-0">
          <a
            href="https://www.xiaohongshu.com/user/profile/62b01cca00000000190288cc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#666] hover:text-[#171717] transition-colors dark:text-[#a3a3a3] dark:hover:text-[#f5f5f5]"
          >
            小红书
          </a>
          {showGitHub && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#666] hover:text-[#171717] transition-colors dark:text-[#a3a3a3] dark:hover:text-[#f5f5f5]"
            >
              GitHub
            </a>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
