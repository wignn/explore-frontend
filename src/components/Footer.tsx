import Link from "next/link"
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
              <Link href="#" className="hover:text-teal-400 transition-colors duration-300">
                <FaFacebook size={24} />
              </Link>
              <Link href="#" className="hover:text-teal-400 transition-colors duration-300">
                <FaTwitter size={24} />
              </Link>
              <Link href="#" className="hover:text-teal-400 transition-colors duration-300">
                <FaInstagram size={24} />
              </Link>
              <Link href="#" className="hover:text-teal-400 transition-colors duration-300">
                <FaGithub size={24} />
              </Link>
            </div>
          </div>

          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold text-teal-300 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-teal-400 transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-teal-400 transition-colors duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-teal-400 transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-teal-400 transition-colors duration-300">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <div className="text-sm">
            © {new Date().getFullYear()} Wign. All rights reserved. Created with ❤️ by{" "}
            <Link href="?" className="text-teal-400 hover:underline">
              Wign Team
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

