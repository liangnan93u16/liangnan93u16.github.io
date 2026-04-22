import type { ProjectStatus } from "../data/projects";
import { statusConfig } from "../data/projects";

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  const s = statusConfig[status];
  return (
    <span className={`text-xs px-2.5 py-0.5 rounded-full border ${s.cls}`}>
      {s.text}
    </span>
  );
}
