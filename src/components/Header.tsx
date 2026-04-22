import { Link } from "react-router-dom";
import { Code2 } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-gray-900 hover:text-indigo-600 transition-colors">
          <Code2 className="w-5 h-5" />
          <span className="font-semibold text-lg tracking-tight">liangnan93u16</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
            首页
          </Link>
          <a
            href="https://github.com/liangnan93u16"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
