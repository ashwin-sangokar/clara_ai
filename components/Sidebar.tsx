import React from "react";
import { FileEdit } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 fixed top-0 left-0 h-screen bg-[#0D1117] border-r border-white/5 text-white">

      {/* Header */}
      <div className="p-5 text-2xl font-bold tracking-wide">
        Clara AI
      </div>

      {/* New Chat Button */}
      <div className="group flex items-center px-5 py-3 mb-2 gap-3 text-lg font-medium cursor-pointer hover:text-[#6366F1] transition">
        <FileEdit className="w-5 h-5 group-hover:text-[#6366F1] transition" />
        <span>New Chat</span>
      </div>

      {/* Recent Section */}
      <div className="flex-1 overflow-y-auto">
        <h1 className="px-5 mt-4 text-[#9CA3AF] text-xs uppercase tracking-wide">
          Recent History
        </h1>

        <ul className="mt-2">
          {[
            "Complete DSA Roadmap",
            "Code Error Fix",
            "Hackathon Ideas",
            "What is Axios?",
            "Fix Homebrew Installation",
          ].map((item) => (
            <li
              key={item}
              className="px-5 py-2 text-sm cursor-pointer hover:bg-[rgba(79,70,229,0.15)] rounded-md transition"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="p-5 text-xs text-[#9CA3AF]">
        Settings & Help
      </div>
    </div>
  );
};

export default Sidebar;
