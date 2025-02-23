import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa"

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-teal-400">Wign</h2>
            <p className="mt-2 text-sm">Discover, Read, Enjoy</p>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold text-teal-300 mb-4">Connect With Us</h3>
            <div className="flex justify-center space-x-4">
              <a href="#" className="hover:text-teal-400 transition-colors duration-300">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:text-teal-400 transition-colors duration-300">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="hover:text-teal-400 transition-colors duration-300">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="hover:text-teal-400 transition-colors duration-300">
                <FaGithub size={24} />
              </a>
            </div>
          </div>

          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold text-teal-300 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors duration-300">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors duration-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors duration-300">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Wign. All rights reserved. Created with ❤️ by{" "}
            <a href="?" className="text-teal-400 hover:underline">
              Wign Team
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

