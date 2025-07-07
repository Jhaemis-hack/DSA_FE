import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

const footerSections = [
  {
    title: "Features",
    links: ["Find a Mentor", "Become a Mentor", "Pricing Plans", "Success Stories"],
  },
  {
    title: "Support",
    links: ["Help Center", "Contact Us", "Community", "Resources"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Press", "Blog"],
  },
]

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Instagram, href: "#" },
]

export default function Footer() {
  return (
    <footer className="w-full px-4 py-12 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-semibold">MentorConnect</span>
            </div>
            <p className="text-gray-400 mb-4">
              Connecting ambitious professionals with expert mentors to accelerate career growth.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link key={index} to={social.href} className="text-gray-400 hover:text-white transition-colors">
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} MentorConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
