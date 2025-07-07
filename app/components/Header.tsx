import { Link } from "react-router-dom";
import { Button } from "../../src/components/ui/Button"

export default function Header() {
  return (
    <header className="w-full px-4 py-4 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">MentorConnect</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="#" className="text-gray-600 hover:text-gray-900 transition-colors">
            Home
          </Link>
          <Link to="#" className="text-gray-600 hover:text-gray-900 transition-colors">
            Get Started
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
            Log in
          </Button>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white">Get Started</Button>
        </div>
      </div>
    </header>
  )
}
