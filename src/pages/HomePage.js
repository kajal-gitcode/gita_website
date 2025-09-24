
import React from "react";
import { Link } from "react-router-dom";

const chapters = Array.from({ length: 18 }, (_, i) => i + 1);

export default function HomePage() {
  return (
    <section className="relative bg-gradient-to-br from-yellow-100 via-orange-50 to-white min-h-screen px-6 py-12">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Experience the Timeless Wisdom
          <br />
          of the <span className="text-orange-600">Bhagavad Gita</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
          The Bhagavad Gita is not just a scripture, it’s a companion. <br />
          A guiding light for every step, every challenge, every moment of your life.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#chapters"
            className="px-6 py-3 bg-orange-600 text-white rounded-2xl shadow-lg hover:bg-orange-700 transition"
          >
            Explore Chapters
          </a>
          <Link
            to="/chapter/1"
            className="px-6 py-3 bg-white border border-orange-600 text-orange-600 rounded-2xl shadow hover:bg-orange-50 transition"
          >
            Read a Verse
          </Link>
        </div>
      </div>

      {/* Chapters Grid */}
      <div id="chapters" className="p-6">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
          📘 Bhagavad Gita Chapters
        </h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {chapters.map((num) => (
            <li key={num}>
              <Link
                to={`/chapter/${num}`}
                className="block bg-blue-100 hover:bg-blue-300 text-center p-4 rounded-xl shadow-md transition"
              >
                Chapter {num}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-16 right-16 w-28 h-28 bg-yellow-300 rounded-full opacity-20 animate-bounce"></div>
    </section>
  );
}

