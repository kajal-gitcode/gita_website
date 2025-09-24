import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, BookOpen } from "lucide-react";
import ContentMenu from "./ContentMenu";
import SearchBar from "./SearchBar";   

export default function Header() {
  const [showContentMenu, setShowContentMenu] = useState(false);
  const menuRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowContentMenu(false);
      }
    }
    if (showContentMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showContentMenu]);

  return (
    <header className="flex items-center justify-between gap-6 p-2 bg-white shadow relative">
      {/* Home */}
      <Link
        to="/"
        className="flex flex-col items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
      >
        <Home className="w-6 h-6 mb-1" />
        <span>Home</span>
      </Link>

      {/* Content */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setShowContentMenu((prev) => !prev)}
          className="flex flex-col items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
        >
          <BookOpen className="w-6 h-6 mb-1" />
          <span>Content</span>
        </button>

        {showContentMenu && (
          <div
            className="absolute left-0 mt-2 bg-white shadow-lg rounded p-4 z-50
             w-64 sm:w-80 md:w-[400px] lg:w-[500px] xl:w-[600px] max-h-[80vh] overflow-y-auto"
          >
            <ContentMenu onSelect={() => setShowContentMenu(false)} />
          </div>
        )}
      </div>

      {/* 🔍 Search bar */}
      <div className="flex-1 flex justify-end">
        <SearchBar />
      </div>
    </header>
  );
}
