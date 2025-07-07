import { Button } from "../../src/components/ui/Button"

export default function Hero() {
  return (
    <section className="w-full px-4 py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">Connect with Expert Mentors</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Accelerate your career growth with personalized guidance from industry leaders. Find your perfect mentor and
          unlock your potential.
        </p>

        <div className="w-full max-w-md mx-auto mb-12 bg-gray-200 rounded-2xl aspect-video flex items-center justify-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-gray-400 ml-1"></div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8">
            Find Mentor
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 bg-transparent"
          >
            Become a Mentor
          </Button>
        </div>
      </div>
    </section>
  )
}
