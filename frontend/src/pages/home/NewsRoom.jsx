import { useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  User,
  ArrowRight as Arrow,
} from "lucide-react";
import img1 from "../../assets/Screenshot_1.png";
import img2 from "../../assets/Screenshot_2.png";
import img3 from "../../assets/Screenshot_3.png";

const news = [
  {
    id: 1,
    date: "August 26, 2024",
    author: "Admin",
    title: "Fostering collaboration between BITPCL and BCS",
    excerpt:
      "On the 17th of March, 2024, Bangladesh IT Professionals Club paid a courtesy visit to the Bangladesh...",
    image: img1,
  },
  {
    id: 2,
    date: "August 26, 2024",
    author: "Admin",
    title:
      "3rd IT Conference by the Bangladesh IT Professionals Club was successfully held",
    excerpt:
      "The 3rd IT conference of Bangladesh IT Professionals Club, the largest organization of IT profess...",
    image: img2,
  },
  {
    id: 3,
    date: "August 26, 2024",
    author: "Admin",
    title: "BITPCL congratulates BASIS newly elected President Russell T Ahmed",
    excerpt:
      "On June 29, 2024, Bangladesh IT Professionals Club extended felicitations to Mr. Russell T. Ahmed...",
    image: img3,
  },
  {
    id: 4,
    date: "August 26, 2024",
    author: "Admin",
    title:
      "Axentec welcomed the BITPCL’s new executive committee for a courtesy meeting",
    excerpt:
      "The new executive committee of Bangladesh IT Professionals Club recently paid a courtesy visit to...",
    image: img1,
  },
  {
    id: 5,
    date: "August 26, 2024",
    author: "Admin",
    title: "Another news item",
    excerpt: "Short excerpt for the item...",
    image: img2,
  },
];

export default function NewsRoom() {
  const containerRef = useRef(null);

  const page = (dir = 1) => {
    const el = containerRef.current;
    if (!el) return;
    const amount = el.clientWidth; // page by visible width
    el.scrollBy({ left: amount * dir, behavior: "smooth" });
  };

  return (
    <section className="w-full py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-6">
          News Room
        </h2>

        <div className="relative">
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto no-scrollbar py-2 scroll-smooth"
          >
            {news.map((n) => (
              <article
                key={n.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-shrink-0"
                style={{
                  flexBasis:
                    "calc((100% - 72px) / 4)" /* large: 4 cards, gap-6 -> 72px */,
                }}
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={n.image}
                    alt={n.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{n.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={16} />
                      <span>By {n.author}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-green-800 mt-3 mb-2">
                    {n.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{n.excerpt}</p>

                  <a
                    href="#"
                    className="inline-flex items-center text-green-800 font-medium hover:underline"
                  >
                    Read more
                    <Arrow className="ml-2" size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* pager buttons */}
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3">
            <button
              aria-label="previous"
              onClick={() => page(-1)}
              className="w-10 h-10 bg-green-100 text-green-800 rounded-full flex items-center justify-center shadow-md"
            >
              <ArrowLeft />
            </button>

            <button
              aria-label="next"
              onClick={() => page(1)}
              className="w-10 h-10 bg-purple-100 text-purple-800 rounded-full flex items-center justify-center shadow-md"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
