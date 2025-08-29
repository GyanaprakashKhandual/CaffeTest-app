'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaCoffee, FaCode, FaRocket, FaBug, FaChartLine, FaGithub, FaTwitter, FaLinkedin, FaCheckCircle, FaArrowRight, FaPlay } from 'react-icons/fa'

export default function CaffetestLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.9])
  const headerBlur = useTransform(scrollY, [0, 100], [0, 10])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const features = [
    {
      icon: FaCode,
      title: "VS Code Integration",
      description: "Seamless integration with Visual Studio Code through our CAPTEST extension for effortless test automation."
    },
    {
      icon: FaRocket,
      title: "AI-Powered Analysis",
      description: "OpenAI integration automatically refines test data and generates intelligent pass/fail results."
    },
    {
      icon: FaChartLine,
      title: "Smart Dashboard",
      description: "Comprehensive dashboards with multiple view options and real-time analytics for better insights."
    },
    {
      icon: FaBug,
      title: "Bug Tracking",
      description: "Advanced bug tracking features with automated detection and detailed reporting capabilities."
    }
  ]

  const benefits = [
    "Automated test case generation",
    "Real-time pass/fail results",
    "Multiple project separation", 
    "Cucumber syntax support",
    "OpenAI-powered insights",
    "Dashboard integration"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <motion.header 
        className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/80 border-b border-purple-200/20"
        style={{ 
          opacity: headerOpacity,
          backdropFilter: `blur(${headerBlur}px)`
        }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
             <FaCoffee className="h-8 w-8 text-blue-900" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Caffetest
              </span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              <nav className="flex items-center space-x-8">
                {['Features', 'Benefits', 'Pricing', 'Contact'].map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </nav>
              
              <motion.button
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            </div>

            <motion.button
              className="md:hidden p-2 rounded-lg bg-purple-100 text-purple-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <span className={`block w-full h-0.5 bg-current transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
                <span className={`block w-full h-0.5 bg-current transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-full h-0.5 bg-current transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent"
              variants={fadeInUp}
            >
              Revolutionize Your
              <br />
              <span className="text-6xl md:text-8xl">Testing</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              AI-powered automation testing that transforms your VS Code workflow with intelligent 
              test generation, real-time analytics, and seamless bug tracking.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
              variants={fadeInUp}
            >
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 text-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlay />
                <span>Get Started Free</span>
              </motion.button>
              
              <motion.button
                className="px-8 py-4 border-2 border-purple-300 text-purple-700 font-semibold rounded-full hover:bg-purple-50 transition-all duration-300 flex items-center space-x-3 text-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Watch Demo</span>
                <FaArrowRight />
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-16 relative"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="w-full max-w-5xl mx-auto bg-gradient-to-br from-purple-900 to-blue-900 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 animate-pulse" />
              <div className="relative bg-gray-900 rounded-xl p-6 font-mono text-green-400 text-left">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-gray-400 ml-4">caffetest-demo.js</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div>// CAPTEST Extension Active 🚀</div>
                  <div className="text-blue-400">describe('User Login Test', () = {`{`}</div>
                  <div className="pl-4 text-yellow-400">it('should login successfully', () = {`{`}</div>
                  <div className="pl-8">// AI analyzing test data...</div>
                  <div className="pl-8 text-green-300">✅ Test passed - Generated by Caffetest AI</div>
                  <div className="pl-4 text-yellow-400">{`}`});</div>
                  <div className="text-blue-400">{`}`});</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to streamline your testing workflow and boost productivity
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-200/30"
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <feature.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-6 bg-gradient-to-r from-purple-100 to-blue-100">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Why Choose Caffetest?
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Transform your testing workflow with AI-powered automation that saves time, 
                reduces errors, and provides actionable insights for better software quality.
              </p>
              
              <motion.div 
                className="space-y-4"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-4"
                    variants={fadeInUp}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaCheckCircle className="text-white text-sm" />
                    </div>
                    <span className="text-gray-700 font-medium text-lg">{benefit}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">Test Analytics</h3>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <FaChartLine className="text-white text-xl" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Success Rate</span>
                      <span className="font-bold text-green-600">94.2%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div 
                        className="h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "94.2%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="text-center p-4 bg-purple-50 rounded-xl">
                        <div className="text-2xl font-bold text-purple-600">1,247</div>
                        <div className="text-gray-600 text-sm">Tests Automated</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-xl">
                        <div className="text-2xl font-bold text-blue-600">89%</div>
                        <div className="text-gray-600 text-sm">Time Saved</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple 3-step process to transform your testing workflow
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Install CAPTEST Extension",
                description: "Add our VS Code extension and start writing your automation tests with Cucumber syntax support.",
                color: "from-purple-500 to-purple-600"
              },
              {
                step: "02", 
                title: "AI Analysis & Tracking",
                description: "Our system tracks test data, analyzes results using OpenAI, and generates intelligent insights.",
                color: "from-blue-500 to-blue-600"
              },
              {
                step: "03",
                title: "Dashboard & Reports",
                description: "View comprehensive analytics, manage multiple projects, and track bugs with our intuitive dashboard.",
                color: "from-indigo-500 to-indigo-600"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-200/30 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 group-hover:from-purple-500/10 group-hover:to-blue-500/10 transition-all duration-300" />
                  
                  <div className="relative">
                    <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center mb-6 text-white font-bold text-xl`}>
                      {step.step}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
                
                {index < 2 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 text-purple-400">
                    <FaArrowRight className="w-full h-full" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <motion.div
          className="container mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Testing?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who have revolutionized their testing workflow with Caffetest
          </p>
          
          <motion.button
            className="px-10 py-4 bg-white text-purple-600 font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Free Trial
          </motion.button>
        </motion.div>
        
        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full"
          animate={{ 
            y: [-10, 10, -10],
            rotate: [0, 180, 360] 
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full"
          animate={{ 
            y: [10, -10, 10],
            rotate: [360, 180, 0] 
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-gradient-to-br from-gray-900 to-purple-900">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-6">
                  <FaCoffee className="h-8 w-8 text-blue-900" />
                <span className="text-2xl font-bold text-white">Caffetest</span>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                AI-powered automation testing for modern development teams. 
                Streamline your workflow with intelligent test generation and analytics.
              </p>
              <div className="flex space-x-4">
                {[FaTwitter, FaGithub, FaLinkedin].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center text-purple-300 hover:bg-purple-600 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {[
              {
                title: "Product",
                links: ["Features", "Integrations", "Pricing", "Documentation"]
              },
              {
                title: "Company", 
                links: ["About Us", "Careers", "Blog", "Contact"]
              },
              {
                title: "Support",
                links: ["Help Center", "API Docs", "Community", "Status"]
              }
            ].map((column, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-white font-semibold text-lg mb-6">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href="#" 
                        className="text-gray-300 hover:text-purple-300 transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="border-t border-gray-700 pt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400">
              © 2025 Caffetest. All rights reserved. Made with ❤️ for developers worldwide.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}