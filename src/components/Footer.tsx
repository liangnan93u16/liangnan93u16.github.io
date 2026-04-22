export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p> liangnan93u16 · 个人项目展示</p>
          <a
            href="https://github.com/liangnan93u16"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors"
          >
            github.com/liangnan93u16
          </a>
        </div>
      </div>
    </footer>
  );
}
