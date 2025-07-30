import React, { useState, useEffect } from 'react';
import { ChevronDown, Star, Check, X, Menu, ArrowRight, Zap, Target, BarChart3, Users, Shield, Sparkles, Play, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

// Reusable Components Library
const Button = ({ children, variant = 'primary', size = 'md', className = '', onClick, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95';
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-blue-700',
    secondary: 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
    outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = '', glass = false }) => {
  const glassClasses = glass ? 'bg-white/10 backdrop-blur-md border border-white/20' : 'bg-white';
  return (
    <div className={`rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 ${glassClasses} ${className}`}>
      {children}
    </div>
  );
};

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-6">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

const Input = ({ label, error, ...props }) => (
  <div className="space-y-2">
    {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
    <input 
      className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200`}
      {...props}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-purple-100 text-purple-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800'
  };
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

const Avatar = ({ src, alt, size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };
  
  return (
    <img 
      src={src} 
      alt={alt}
      className={`${sizes[size]} rounded-full object-cover border-2 border-white shadow-lg`}
    />
  );
};

const ProgressBar = ({ value, max = 100, className = '' }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
    <div 
      className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-500"
      style={{ width: `${(value / max) * 100}%` }}
    />
  </div>
);

const Toggle = ({ checked, onChange, label }) => (
  <label className="flex items-center space-x-3 cursor-pointer">
    <div className="relative">
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={onChange}
        className="sr-only"
      />
      <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${checked ? 'bg-purple-600' : 'bg-gray-300'}`}>
        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 mt-0.5 ${checked ? 'translate-x-6 ml-0.5' : 'ml-0.5'}`} />
      </div>
    </div>
    {label && <span className="text-gray-700">{label}</span>}
  </label>
);

// Animation hook for scroll-triggered animations
const useScrollAnimation = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return visibleElements;
};

// Main Landing Page Component
const ADmyBRANDLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calculatorInputs, setCalculatorInputs] = useState({ users: 10, campaigns: 5 });
  
  const visibleElements = useScrollAnimation();

  const features = [
    { icon: <Zap className="w-8 h-8" />, title: 'AI-Powered Content', description: 'Generate compelling ad copy and visuals with advanced AI algorithms' },
    { icon: <Target className="w-8 h-8" />, title: 'Smart Targeting', description: 'Reach your ideal audience with precision targeting and behavioral analysis' },
    { icon: <BarChart3 className="w-8 h-8" />, title: 'Real-time Analytics', description: 'Track performance metrics and optimize campaigns in real-time' },
    { icon: <Users className="w-8 h-8" />, title: 'Team Collaboration', description: 'Seamless workflow management for marketing teams of any size' },
    { icon: <Shield className="w-8 h-8" />, title: 'Brand Safety', description: 'Ensure brand consistency and compliance across all marketing channels' },
    { icon: <Sparkles className="w-8 h-8" />, title: 'Creative Studio', description: 'Professional design tools powered by AI for stunning visuals' }
  ];

  const testimonials = [
    { name: 'Sarah Johnson', role: 'CMO at TechStart', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150', rating: 5, text: 'ADmyBRAND transformed our marketing ROI by 300%. The AI insights are game-changing!' },
    { name: 'Michael Chen', role: 'Marketing Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', rating: 5, text: 'Best marketing tool we\'ve ever used. The automation features saved us 20 hours per week.' },
    { name: 'Emily Rodriguez', role: 'Brand Manager', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', rating: 5, text: 'The creative studio is incredible. We\'re producing professional campaigns in minutes, not days.' }
  ];

  const pricingTiers = [
    {
      name: 'Starter',
      price: 49,
      description: 'Perfect for small businesses',
      features: ['5 AI-generated campaigns/month', 'Basic analytics', 'Email support', '1 team member'],
      popular: false
    },
    {
      name: 'Professional',
      price: 149,
      description: 'Ideal for growing companies',
      features: ['25 AI-generated campaigns/month', 'Advanced analytics', 'Priority support', '5 team members', 'Custom branding'],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 399,
      description: 'For large organizations',
      features: ['Unlimited campaigns', 'Enterprise analytics', '24/7 dedicated support', 'Unlimited team members', 'Custom integrations', 'White-label solution'],
      popular: false
    }
  ];

  const faqs = [
    { question: 'How does the AI content generation work?', answer: 'Our AI analyzes your brand voice, target audience, and campaign goals to generate personalized content that resonates with your customers.' },
    { question: 'Can I integrate with existing marketing tools?', answer: 'Yes! We offer integrations with 50+ popular marketing platforms including Google Ads, Facebook, HubSpot, and Salesforce.' },
    { question: 'Is there a free trial available?', answer: 'Absolutely! We offer a 14-day free trial with full access to all features. No credit card required.' },
    { question: 'How secure is my data?', answer: 'We use enterprise-grade encryption and comply with GDPR, CCPA, and SOC 2 standards to ensure your data is completely secure.' }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!contactForm.name.trim()) errors.name = 'Name is required';
    if (!contactForm.email.trim()) errors.email = 'Email is required';
    if (!contactForm.message.trim()) errors.message = 'Message is required';
    
    if (Object.keys(errors).length === 0) {
      alert('Thank you for your message! We\'ll get back to you soon.');
      setContactForm({ name: '', email: '', message: '' });
      setIsContactModalOpen(false);
    } else {
      setFormErrors(errors);
    }
  };

  const calculatePrice = () => {
    const basePrice = 49;
    const userCost = calculatorInputs.users * 5;
    const campaignCost = calculatorInputs.campaigns * 10;
    return basePrice + userCost + campaignCost;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">ADmyBRAND AI</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-white/80 hover:text-white transition-colors">Pricing</a>
              <a href="#testimonials" className="text-white/80 hover:text-white transition-colors">Reviews</a>
              <Button variant="secondary" onClick={() => setIsContactModalOpen(true)}>
                Get Started
              </Button>
            </div>

            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-md border-t border-white/20">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-white/80 hover:text-white">Features</a>
              <a href="#pricing" className="block text-white/80 hover:text-white">Pricing</a>
              <a href="#testimonials" className="block text-white/80 hover:text-white">Reviews</a>
              <Button variant="secondary" className="w-full">Get Started</Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div 
            className="text-center animate-fade-in-up"
            data-animate
            id="hero"
          >
            <Badge className="mb-6">🚀 New: AI Creative Studio 2.0</Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Marketing Magic with
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> AI Power</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              Transform your marketing campaigns with cutting-edge AI. Generate compelling content, target precisely, and scale your brand like never before.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" onClick={() => setIsContactModalOpen(true)}>
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="secondary" size="lg">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <Card glass className="p-8 transform hover:scale-105 transition-all duration-500">
                <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
                    <div className="text-center">
                      <div className="text-3xl font-bold">300%</div>
                      <div className="text-white/80">ROI Increase</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">10M+</div>
                      <div className="text-white/80">Campaigns Created</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">50K+</div>
                      <div className="text-white/80">Happy Customers</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${visibleElements.has('features-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            data-animate
            id="features-header"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Powerful Features for Modern Marketers
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Everything you need to create, optimize, and scale your marketing campaigns with the power of AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                glass 
                className={`p-8 text-center transition-all duration-1000 delay-${index * 100} ${visibleElements.has('features-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <div className="text-purple-400 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${visibleElements.has('pricing-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            data-animate
            id="pricing-header"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Choose the perfect plan for your business. All plans include a 14-day free trial.
            </p>
            
            <Button 
              variant="secondary" 
              onClick={() => setIsCalculatorOpen(true)}
              className="mb-8"
            >
              💰 Pricing Calculator
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card 
                key={index}
                glass
                className={`p-8 relative ${tier.popular ? 'ring-2 ring-purple-400' : ''} transition-all duration-1000 delay-${index * 200} ${visibleElements.has('pricing-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                {tier.popular && (
                  <Badge variant="success" className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-white/80 mb-6">{tier.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">${tier.price}</span>
                    <span className="text-white/80">/month</span>
                  </div>

                  <Button 
                    variant={tier.popular ? "primary" : "secondary"} 
                    className="w-full mb-6"
                    onClick={() => setIsContactModalOpen(true)}
                  >
                    Start Free Trial
                  </Button>

                  <ul className="space-y-3 text-left">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-white/80">
                        <Check className="w-5 h-5 text-green-400 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${visibleElements.has('testimonials-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            data-animate
            id="testimonials-header"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Loved by Marketing Teams Worldwide
            </h2>
          </div>

          <Card glass className="p-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-xl md:text-2xl text-white mb-6 italic">
                "{testimonials[activeTestimonial].text}"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-4">
                <Avatar 
                  src={testimonials[activeTestimonial].avatar} 
                  alt={testimonials[activeTestimonial].name}
                  size="lg"
                />
                <div className="text-left">
                  <div className="text-white font-semibold">{testimonials[activeTestimonial].name}</div>
                  <div className="text-white/80">{testimonials[activeTestimonial].role}</div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all ${index === activeTestimonial ? 'bg-purple-400' : 'bg-white/30'}`}
                    onClick={() => setActiveTestimonial(index)}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${visibleElements.has('faq-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            data-animate
            id="faq-header"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} glass className="overflow-hidden">
                <button
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                >
                  <span className="text-lg font-semibold text-white">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-white transition-transform ${expandedFAQ === index ? 'rotate-180' : ''}`} 
                  />
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-6">
                    <p className="text-white/80">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-md border-t border-white/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">ADmyBRAND AI</span>
              </div>
              <p className="text-white/80 mb-4">
                Revolutionizing marketing with AI-powered solutions for modern businesses.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6 text-white/60 hover:text-white cursor-pointer" />
                <Twitter className="w-6 h-6 text-white/60 hover:text-white cursor-pointer" />
                <Linkedin className="w-6 h-6 text-white/60 hover:text-white cursor-pointer" />
                <Instagram className="w-6 h-6 text-white/60 hover:text-white cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <div className="space-y-2">
                <a href="#" className="block text-white/80 hover:text-white">Features</a>
                <a href="#" className="block text-white/80 hover:text-white">Pricing</a>
                <a href="#" className="block text-white/80 hover:text-white">API</a>
                <a href="#" className="block text-white/80 hover:text-white">Integrations</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <div className="space-y-2">
                <a href="#" className="block text-white/80 hover:text-white">About</a>
                <a href="#" className="block text-white/80 hover:text-white">Blog</a>
                <a href="#" className="block text-white/80 hover:text-white">Careers</a>
                <a href="#" className="block text-white/80 hover:text-white">Press</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-white/80">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>hello@admybrand.ai</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>&copy; 2025 ADmyBRAND AI Suite. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)}>
        <h3 className="text-2xl font-bold mb-6">Start Your Free Trial</h3>
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <Input
            label="Full Name"
            value={contactForm.name}
            onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
            error={formErrors.name}
          />
          <Input
            label="Email Address"
            type="email"
            value={contactForm.email}
            onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
            error={formErrors.email}
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 h-32"
              value={contactForm.message}
              onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
              placeholder="Tell us about your marketing goals..."
            />
            {formErrors.message && <p className="text-red-500 text-sm">{formErrors.message}</p>}
          </div>
          <Button type="submit" className="w-full">
            Start Free Trial
          </Button>
        </form>
      </Modal>

      {/* Pricing Calculator Modal */}
      <Modal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)}>
        <h3 className="text-2xl font-bold mb-6">💰 Pricing Calculator</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Users: {calculatorInputs.users}
            </label>
            <input
              type="range"
              min="1"
              max="100"
              value={calculatorInputs.users}
              onChange={(e) => setCalculatorInputs({...calculatorInputs, users: parseInt(e.target.value)})}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>1</span>
              <span>100</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Campaigns per Month: {calculatorInputs.campaigns}
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={calculatorInputs.campaigns}
              onChange={(e) => setCalculatorInputs({...calculatorInputs, campaigns: parseInt(e.target.value)})}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>1</span>
              <span>50</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                ${calculatePrice()}
              </div>
              <div className="text-gray-600">per month</div>
              <div className="text-sm text-gray-500 mt-2">
                Based on {calculatorInputs.users} users and {calculatorInputs.campaigns} campaigns
              </div>
            </div>
          </div>

          <Button className="w-full" onClick={() => {
            setIsCalculatorOpen(false);
            setIsContactModalOpen(true);
          }}>
            Get Started with This Plan
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ADmyBRANDLanding;