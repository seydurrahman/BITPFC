import Logo from "../assets/Logo.png";

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-start md:w-[25%]">
          <img src={Logo} alt="logo" className="h-14 mb-3" />
          <div className="text-lg">
            <p>
              Bangladesh IT Professional Friends Club is leading platform for IT
              professionals in the country, committed to providing leadership
              through continuous education, extensive networking, and the
              sharing of knowledge across all industries.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full md:w-[75%]">

  {/* Quick Links */}
  <div>
    <h4 className="font-semibold text-2xl mb-3">Quick Links</h4>
    <ul className="space-y-2 text-sm text-white">
      <li><a href="/about" className="hover:text-gray-200">About Us</a></li>
      <li><a href="/membership" className="hover:text-gray-200">Membership</a></li>
      <li><a href="/media" className="hover:text-gray-200">Tech Interview</a></li>
      <li><a href="/training" className="hover:text-gray-200">Training</a></li>
      <li><a href="/terms" className="hover:text-gray-200">Terms & Conditions</a></li>
      <li><a href="/refund" className="hover:text-gray-200">Refund Policy</a></li>
    </ul>
  </div>

  {/* Member */}
  <div>
    <h4 className="font-semibold text-2xl mb-3">Member</h4>
    <ul className="space-y-2 text-sm text-white">
      <li><a href="/login" className="hover:text-gray-200">Member Benefits</a></li>
      <li><a href="/register" className="hover:text-gray-200">Become a Member</a></li>
      <li><a href="/membership/list" className="hover:text-gray-200">All Club Members</a></li>
      <li><a href="/login" className="hover:text-gray-200">Club Member Login</a></li>
      <li><a href="/membership/founding" className="hover:text-gray-200">Founding Members</a></li>
      <li><a href="/cv-upload" className="hover:text-gray-200">CV Upload</a></li>
    </ul>
  </div>

  {/* Address */}
  <div>
    <h4 className="font-semibold text-2xl mb-3">Address</h4>
    <address className="not-italic text-sm text-white space-y-2">
      <div>457/1</div>
      <div>Mirpur-10, Pallabi</div>
      <div>Dhaka, Bangladesh</div>
      <a href="mailto:info@bitpfc.org" className="hover:text-gray-200 mt-2 block">
        info@bitpfc.org
      </a>
    </address>
  </div>

  {/* Visitors Counter */}
  <div>
    <h4 className="font-semibold text-2xl mb-3">Visitors Counter</h4>
    <div className="space-y-3 text-white">
      <div className="text-lg px-4 py-2 bg-purple-600 rounded-md">
        Total Visitors: <span className="text-xl font-bold">12,345</span>
      </div>
      <div className="text-lg px-4 py-2 bg-purple-600 rounded-md">
        Today Visits: <span className="text-xl font-bold">123</span>
      </div>
    </div>
  </div>

</div>

      </div>

      <div className="border-t border-slate-800 py-4">
        <div className="max-w-7xl mx-auto px-6 text-center text-white text-lg font-bold">
          © {new Date().getFullYear()} Copyright @ 2026 BITPFC. Designed &
          Developed By <span className="text-purple-600">RS Technovo</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
