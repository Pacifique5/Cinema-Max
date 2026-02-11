'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { 
  FilmIcon, 
  PlayIcon, 
  StarIcon, 
  TvIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  BoltIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'

export default function LandingPage() {
  const { user, isGuest } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (user && !isGuest) {
      router.push('/home')
    }
  }, [user, isGuest, router])

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/auth/signup')
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <FilmIcon className="h-10 w-10 text-red-600" />
              <span className="text-3xl font-bold text-red-600">CinemaMax</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/auth/login" 
                className="text-white hover:text-gray-300 transition-colors font-medium"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Video Background Effect */}
      <div className="relative h-screen">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-red-900/20 to-black"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
          </div>
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight animate-fade-in">
                Unlimited <span className="text-red-600">Movies</span>,<br />
                TV Shows & More
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-delay">
                Watch anywhere. Cancel anytime. Start your free trial today.
              </p>
              
              {/* Email Signup Form */}
              <form onSubmit={handleGetStarted} className="max-w-2xl mx-auto mb-8 animate-fade-in-delay-2">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="flex-1 px-6 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-lg"
                  />
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 text-lg"
                  >
                    <span>Get Started</span>
                    <ChevronRightIcon className="h-5 w-5" />
                  </button>
                </div>
              </form>

              <button
                onClick={() => router.push('/home')}
                className="text-gray-300 hover:text-white transition-colors underline text-lg"
              >
                or continue as guest
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-600 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Trending Section */}
      <div className="bg-black py-20 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">Trending Now</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-[2/3] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayIcon className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    #{i}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section - Netflix Style */}
      <div className="bg-black">
        {/* Feature 1 */}
        <div className="border-t border-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Enjoy on your TV
                </h2>
                <p className="text-xl text-gray-400">
                  Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.
                </p>
              </div>
              <div className="relative">
                <div className="relative z-10 bg-gradient-to-br from-red-600/20 to-purple-600/20 rounded-2xl p-12 backdrop-blur-sm border border-gray-800">
                  <TvIcon className="h-48 w-48 text-red-600 mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="border-t border-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 relative">
                <div className="relative z-10 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl p-12 backdrop-blur-sm border border-gray-800">
                  <DevicePhoneMobileIcon className="h-48 w-48 text-blue-600 mx-auto" />
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Download your shows to watch offline
                </h2>
                <p className="text-xl text-gray-400">
                  Save your favorites easily and always have something to watch.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="border-t border-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Watch everywhere
                </h2>
                <p className="text-xl text-gray-400">
                  Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.
                </p>
              </div>
              <div className="relative">
                <div className="relative z-10 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl p-12 backdrop-blur-sm border border-gray-800">
                  <GlobeAltIcon className="h-48 w-48 text-purple-600 mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="bg-black border-t border-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Choose the plan that's right for you
            </h2>
            <p className="text-xl text-gray-400">
              Join today and watch on all your devices
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-red-600 transition-all duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-bold text-white mb-4">Basic</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$9.99</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                  HD Quality
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                  Watch on 1 device
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                  Unlimited movies & TV shows
                </li>
              </ul>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-colors">
                Choose Basic
              </button>
            </div>

            {/* Standard Plan */}
            <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-2xl p-8 border-2 border-red-600 transform scale-105 shadow-2xl">
              <div className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Standard</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$14.99</span>
                <span className="text-gray-300">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-white">
                  <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3" />
                  Full HD Quality
                </li>
                <li className="flex items-center text-white">
                  <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3" />
                  Watch on 2 devices
                </li>
                <li className="flex items-center text-white">
                  <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3" />
                  Unlimited movies & TV shows
                </li>
                <li className="flex items-center text-white">
                  <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3" />
                  Download on 2 devices
                </li>
              </ul>
              <button className="w-full bg-white hover:bg-gray-100 text-red-600 font-bold py-3 rounded-lg transition-colors">
                Choose Standard
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-red-600 transition-all duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-bold text-white mb-4">Premium</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$19.99</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                  4K + HDR Quality
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                  Watch on 4 devices
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                  Unlimited movies & TV shows
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                  Download on 4 devices
                </li>
              </ul>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-colors">
                Choose Premium
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-black border-t border-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "What is CinemaMax?",
                a: "CinemaMax is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices."
              },
              {
                q: "How much does CinemaMax cost?",
                a: "Watch CinemaMax on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $9.99 to $19.99 a month."
              },
              {
                q: "Where can I watch?",
                a: "Watch anywhere, anytime. Sign in with your CinemaMax account to watch instantly on the web or on any internet-connected device."
              },
              {
                q: "What can I watch on CinemaMax?",
                a: "CinemaMax has an extensive library of feature films, documentaries, TV shows, anime, award-winning originals, and more. Watch as much as you want, anytime you want."
              }
            ].map((faq, i) => (
              <details key={i} className="bg-gray-900 rounded-lg group">
                <summary className="flex justify-between items-center cursor-pointer p-6 text-white text-xl font-semibold hover:bg-gray-800 transition-colors">
                  {faq.q}
                  <ChevronRightIcon className="h-6 w-6 transform group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-gray-400 text-lg">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-black border-t border-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to watch? Enter your email to create or restart your membership.
          </h2>
          <form onSubmit={handleGetStarted} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="flex-1 px-6 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-lg"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 text-lg"
              >
                <span>Get Started</span>
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Preferences</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Social</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <FilmIcon className="h-8 w-8 text-red-600" />
                <span className="text-2xl font-bold text-red-600">CinemaMax</span>
              </div>
              <div className="text-gray-400 text-sm">
                © 2026 CinemaMax, Inc. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 1s ease-out 0.6s both;
        }
      `}</style>
    </div>
  )
}
