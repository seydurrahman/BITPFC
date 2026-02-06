import {
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  ChevronDown,
  Info,
  MessageSquare,
  Users,
  Briefcase,
  Target,
  Eye,
} from "lucide-react";
import {
  List,
  ClipboardList,
  DollarSign,
  FileText,
  Newspaper,
  Image,
  Video,
  BookOpen,
  Monitor,
  Calendar,
  Activity,
} from "lucide-react";
import Logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 bg-green-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 bg-white">
        {/* Left: logo */}
        <div className="flex items-center gap-3">
          <img src={Logo} className="h-14" alt="logo" />
        </div>

        {/* Center Menu */}
        <nav className="hidden md:flex md:flex-nowrap md:whitespace-nowrap gap-3 font-bold text-slate-700 dark:text-slate-300 items-center">
          <a href="/" className="hover:text-brand-600">
            HOME
          </a>
          <div className="relative group">
            <button
              aria-haspopup="true"
              className="flex items-center gap-1 hover:text-brand-600 focus:outline-none"
            >
              <span>ABOUT US</span>
              <ChevronDown size={14} />
            </button>

            <div className="absolute left-0 top-full mt-0 w-52 rounded-md bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-lg invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-opacity transition-transform duration-200 ease-out z-50">
              <ul className="py-2">
                <li className="relative group/item">
                  <a
                    href="/about"
                    className="flex items-center justify-between gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <span className="flex items-center gap-2">
                      <Info size={16} />
                      About BITPFC
                    </span>
                    <ChevronDown size={14} className="-rotate-90" />
                  </a>

                  {/* RIGHT SIDE SUBMENU */}
                  <div className="absolute top-0 left-full ml-1 w-44 rounded-md bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-lg opacity-0 invisible translate-x-2 group-hover/item:visible group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 z-50">
                    <ul className="py-1">
                      <li>
                        <a
                          href="/about/mission"
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                          <Target size={16} />
                          Mission
                        </a>
                      </li>

                      <li>
                        <a
                          href="/about/vision"
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                          <Eye size={16} />
                          Vision
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li>
                  <a
                    href="/founder"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <MessageSquare size={16} />
                    Founder Message
                  </a>
                </li>
                <li>
                  <a
                    href="/advisor-team"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <Users size={16} />
                    Advisor Team
                  </a>
                </li>
                <li>
                  <a
                    href="/executive-committee"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <Briefcase size={16} />
                    Executive Committee
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative group">
            <button
              aria-haspopup="true"
              className="flex items-center gap-1 hover:text-brand-600 focus:outline-none"
            >
              <span>MEMBERSHIP</span>
              <ChevronDown size={14} />
            </button>

            <div className="absolute left-0 top-full mt-0 w-52 rounded-md bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-lg invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-opacity transition-transform duration-200 ease-out z-50">
              <ul className="py-1">
                <li>
                  <a
                    href="/membership/list"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <List size={16} />
                    Membership List
                  </a>
                </li>
                <li>
                  <a
                    href="/membership/criteria"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <ClipboardList size={16} />
                    Membership Criteria
                  </a>
                </li>
                <li>
                  <a
                    href="/membership/fee"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <DollarSign size={16} />
                    Membership Fee
                  </a>
                </li>
                <li>
                  <a
                    href="/membership/code-of-conduct"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <FileText size={16} />
                    Code of Conduct
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative group">
            <button
              aria-haspopup="true"
              className="flex items-center gap-1 hover:text-brand-600 focus:outline-none"
            >
              <span>MEDIA CENTER</span>
              <ChevronDown size={14} />
            </button>

            <div className="absolute left-0 top-full mt-0 w-52 rounded-md bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-lg invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-opacity transition-transform duration-200 ease-out z-50">
              <ul className="py-1">
                <li>
                  <a
                    href="/media/news"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <Newspaper size={16} />
                    News
                  </a>
                </li>
                <li>
                  <a
                    href="/media/photos"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <Image size={16} />
                    Photo Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="/media/videos"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <Video size={16} />
                    Video Gallery
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative group">
            <button
              aria-haspopup="true"
              className="flex items-center gap-1 hover:text-brand-600 focus:outline-none"
            >
              <span>STUDY CENTER</span>
              <ChevronDown size={14} />
            </button>

            <div className="absolute left-0 top-full mt-0 w-44 rounded-md bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-lg invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-opacity transition-transform duration-200 ease-out z-50">
              <ul className="py-1">
                <li>
                  <a
                    href="/study/training"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <BookOpen size={16} />
                    Training
                  </a>
                </li>
                <li>
                  <a
                    href="/study/webinar"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <Monitor size={16} />
                    Webinar
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative group">
            <button
              aria-haspopup="true"
              className="flex items-center gap-1 hover:text-brand-600 focus:outline-none"
            >
              <span>INITIATIVES</span>
              <ChevronDown size={14} />
            </button>

            <div className="absolute left-0 top-full mt-0 w-52 rounded-md bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-lg invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out z-50">
              <ul className="py-1">
                {/* Events */}
                <li className="relative group/item">
                  <a
                    href="/initiatives/events"
                    className="flex items-center justify-between gap-2 px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <span className="flex items-center gap-2">
                      <Calendar size={16} />
                      Events
                    </span>
                    <ChevronDown size={14} className="-rotate-90" />
                  </a>

                  {/* RIGHT submenu */}
                  <div className="absolute top-0 left-full ml-1 w-52 rounded-md bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-lg opacity-0 invisible translate-x-2 group-hover/item:visible group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 z-50">
                    <ul className="py-1">
                      <li>
                        <a
                          href="/initiatives/events/knowledge-sharing"
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                          <BookOpen size={16} />
                          Knowledge Sharing Session
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                {/* Initiatives */}
                <li className="relative group/item">
                  <a
                    href="/initiatives"
                    className="flex items-center justify-between gap-2 px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <span className="flex items-center gap-2">
                      <Activity size={16} />
                      Initiatives
                    </span>
                    <ChevronDown size={14} className="-rotate-90" />
                  </a>

                  {/* RIGHT submenu */}
                  <div className="absolute top-0 left-full ml-1 w-52 rounded-md bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-lg opacity-0 invisible translate-x-2 group-hover/item:visible group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 z-50">
                    <ul className="py-1">
                      <li>
                        <a
                          href="/initiatives/tech-professional"
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                          <Users size={16} />
                          Tech Professional Icon
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <a href="/contact" className="hover:text-brand-600">
            CONTACT
          </a>
        </nav>

        {/* Right: Social icons */}
        <div className="flex items-center gap-3 text-purple-600 dark:text-slate-800">
          <a
            href="#"
            aria-label="Facebook"
            className="p-2 rounded-full border-2 hover:bg-blue-500 dark:hover:bg-slate-700 transition-colors"
          >
            <Facebook size={18} />
          </a>
          <a
            href="#"
            aria-label="Linkedin"
            className="p-2 rounded-full border-2 hover:bg-blue-500 dark:hover:bg-slate-700 transition-colors"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="p-2 rounded-full border-2 hover:bg-blue-500 dark:hover:bg-slate-700 transition-colors"
          >
            <Twitter size={18} />
          </a>
          <a
            href="#"
            aria-label="Youtube"
            className="p-2 rounded-full border-2 hover:bg-blue-500 dark:hover:bg-slate-700 transition-colors"
          >
            <Youtube size={18} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
