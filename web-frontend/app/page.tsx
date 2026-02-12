'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  FilmIcon, 
  PlayIcon, 
  StarIcon,
  DevicePhoneMobileIcon,
  TvIcon,
  ComputerDesktopIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface Movie {
  id: string
  title: string
  poster_path: string
  backdrop_path: string
  vote_average: number
  overview: string
}

export default function LandingPage() {
  const router = useRouter()
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    fetchFeaturedMovies()
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchFeaturedMovies = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies?limit=6`)
      if (response.ok) {
        const data = await response.json()
        setFeaturedMovies(data.movies || [])
      }
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  }

  const faqs = [
    {
      question: "What is CinemaMax?",
      answer: "CinemaMax is your ultimate streaming destination for movies and entertainment. Watch thousands of movies, from classics to the latest releases, all in stunning HD quality."
    },
    {
      question: "How much does CinemaMax cost?",
      answer: "We offer flexible plans starting from $9.99/month for Basic, $14.99/month for Standard, and $19.99/month for Premium. All plans include unlimited streaming with no ads."
    },
    {
      question: "Where can I watch?",
      answer: "Watch anywhere, anytime. Stream on your smartphone, tablet, laptop, smart TV, and gaming console. Download your favorite movies to watch offline on mobile devices."
    },
    {
      question: "Can I download movies to watch offline?",
      answer: "Yes! With our Standard and Premium plans, you can download unlimited movies to watch offline on your mobile devices. Perfect for travel or areas with limited internet."
    },
    {
      question: "How do I cancel?",
      answer: "CinemaMax is flexible. No contracts, no cancellation fees, no commitments. You can easily cancel your account online in just two clicks. Your account will remain active until the end of your billing period."
    },
    {
      question: "What can I watch on CinemaMax?",
      answer: "CinemaMax has an extensive library of feature films, documentaries, and exclusive content. Our catalog is constantly updated with new releases and timeless classics across all genres."
    }
  ]

  const features = [
    {
      icon: <DevicePhoneMobileIcon className="h-12 w-12" />,
      title: "Watch on Mobile",
      description: "Stream on your phone or tablet with our mobile app"
    },
    {
      icon: <TvIcon className="h-12 w-12" />,
      title: "Watch on TV",
      description: "Enjoy on your smart TV, streaming device, or gaming console"
    },
    {
      icon: <ComputerDesktopIcon className="h-12 w-12" />,
      title: "Watch on Computer",
      description: "Stream directly from your browser on any computer"
    }
  ]

  const plans = [
    {
      name: "Basic",
      price: "$9.99",
      features: [
        "Unlimited movies and shows",
        "Watch on 1 device at a time",
        "HD available",
        "Cancel anytime"
      ]
    },
    {
      name: "Standard",
      price: "$14.99",
      popular: true,
      features: [
        "Unlimited movies and shows",
        "Watch on 2 devices at a time",
        "Full HD available",
        "Download on 2 devices",
        "Cancel anytime"
      ]
    },
    {
      name: "Premium",
      price: "$19.99",
      features: [
        "Unlimited movies and shows",
        "Watch on 4 devices at a time",
        "Ultra HD + HDR available",
        "Download on 4 devices",
        "Premium audio",
        "Cancel anytime"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Slideshow */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Slideshow */}
        <div className="absolute inset-0">
          {featuredMovies.slice(0, 3).map((movie, index) => (
            <div
              key={movie.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE}/original${movie.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <nav className="relative z-20 flex items-center justify-between px-8 py-6">
          <div className="flex items-center space-x-2">
            <FilmIcon className="h-10 w-10 text-red-600" />
            <span className="text-3xl font-bold text-white">CinemaMax</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/auth/login"
              className="text-white hover:text-gray-300 font-semibold transition-colors"
            >
              Sign In
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center h-full px-8 max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Unlimited movies, TV shows, and more
            </h1>
            <p className="text-2xl text-white mb-4">
              Watch anywhere. Cancel anytime.
            </p>
            <p className="text-xl text-gray-300 mb-8">
              Ready to watch? Enter your email to create or restart your membership.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/auth/signup"
                className="bg-red-600 hover:bg-red-700 text-white text-xl font-bold py-4 px-10 rounded-lg transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-2"
              >
                <span>Get Started</span>
                <PlayIcon className="h-6 w-6" />
              </Link>
              <Link
                href="/auth/login"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white text-xl font-bold py-4 px-10 rounded-lg transition-all border-2 border-white/30 flex items-center justify-center"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-red-600 w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Trending Movies Section */}
      <div className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Trending Now
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {featuredMovies.map((movie) => (
              <div
                key={movie.id}
                className="group relative overflow-hidden rounded-lg shadow-xl transition-transform duration-300 hover:scale-105 cursor-pointer"
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE}/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-sm mb-1 line-clamp-2">
                      {movie.title}
                    </h3>
                    <div className="flex items-center">
                      <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-white text-sm">
                        {movie.vote_average ? Number(movie.vote_average).toFixed(1) : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-white mb-16 text-center">
            Watch Everywhere
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-6 text-red-600">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-lg">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-5xl font-bold text-white mb-6">
                Download your shows to watch offline
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Save your favorites easily and always have something to watch.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-white text-lg">
                  <CheckIcon className="h-6 w-6 text-green-500 mr-3" />
                  Download on mobile and tablet
                </li>
                <li className="flex items-center text-white text-lg">
                  <CheckIcon className="h-6 w-6 text-green-500 mr-3" />
                  Watch offline anytime
                </li>
                <li className="flex items-center text-white text-lg">
                  <CheckIcon className="h-6 w-6 text-green-500 mr-3" />
                  Unlimited downloads with Premium
                </li>
              </ul>
            </div>
            <div className="flex-1">
              <div className="relative">
                <DevicePhoneMobileIcon className="h-96 w-96 text-red-600 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">
            Choose the plan that's right for you
          </h2>
          <p className="text-xl text-gray-400 mb-12 text-center">
            Upgrade, downgrade, or cancel anytime
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? 'bg-gradient-to-b from-red-600 to-red-700 transform scale-105'
                    : 'bg-gray-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black text-sm font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-3xl font-bold text-white mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-300">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-white">
                      <CheckIcon className="h-6 w-6 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/signup"
                  className={`block w-full text-center py-3 rounded-lg font-bold transition-all ${
                    plan.popular
                      ? 'bg-white text-red-600 hover:bg-gray-100'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-900 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-800 transition-colors"
                >
                  <span className="text-xl font-semibold text-white">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUpIcon className="h-6 w-6 text-white flex-shrink-0" />
                  ) : (
                    <ChevronDownIcon className="h-6 w-6 text-white flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-300 text-lg">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-20 bg-gradient-to-t from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to watch? Get started today.
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join millions of movie lovers on CinemaMax
          </p>
          <Link
            href="/auth/signup"
            className="inline-block bg-red-600 hover:bg-red-700 text-white text-xl font-bold py-4 px-12 rounded-lg transition-all transform hover:scale-105 shadow-2xl"
          >
            Start Your Free Trial
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Follow Us</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Facebook</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500">
              © 2026 CinemaMax. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
