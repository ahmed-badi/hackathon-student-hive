
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <div className="flex-1 flex flex-col">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-primary to-accent py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Student Hive Hackathon 2025</h1>
              <p className="text-lg md:text-xl mb-8">Join the most innovative student hackathon and turn your ideas into reality</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" className="bg-white text-accent hover:bg-gray-100">
                    Register Now
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}></div>
        </div>

        {/* Info Cards */}
        <div className="container mx-auto px-4 py-16 -mt-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M2 3h20"></path>
                  <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"></path>
                  <path d="m7 21 5-5 5 5"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Learn & Grow</h3>
              <p className="text-gray-600">Expand your skills with workshops and mentoring from industry experts.</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" x2="12" y1="8" y2="12"></line>
                  <line x1="12" x2="15.5" y1="12" y2="14"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">48 Hours</h3>
              <p className="text-gray-600">Two days of coding, collaboration, and creativity to build amazing projects.</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <circle cx="12" cy="8" r="5"></circle>
                  <path d="M20 21v-2a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Build Your Network</h3>
              <p className="text-gray-600">Connect with fellow hackers, mentors and potential employers.</p>
            </div>
          </div>
        </div>

        {/* Tracks Section */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Hackathon Tracks</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Choose from multiple innovation tracks based on your interests and expertise</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                <div className="text-accent text-xl mb-3 font-semibold">AI & Machine Learning</div>
                <p className="text-gray-600">Build innovative solutions using artificial intelligence and machine learning algorithms.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                <div className="text-accent text-xl mb-3 font-semibold">Web3 & Blockchain</div>
                <p className="text-gray-600">Create decentralized applications, smart contracts, or blockchain-based solutions.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                <div className="text-accent text-xl mb-3 font-semibold">HealthTech</div>
                <p className="text-gray-600">Develop applications that address healthcare challenges and improve patient outcomes.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                <div className="text-accent text-xl mb-3 font-semibold">Sustainability</div>
                <p className="text-gray-600">Build solutions for environmental challenges and sustainable development.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                <div className="text-accent text-xl mb-3 font-semibold">EdTech</div>
                <p className="text-gray-600">Create tools and platforms to improve learning experiences and educational outcomes.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                <div className="text-accent text-xl mb-3 font-semibold">Open Innovation</div>
                <p className="text-gray-600">Have a different idea? Join the open track and innovate without boundaries.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-accent to-primary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Hack?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Join hundreds of student innovators and build something amazing in 48 hours</p>
            <Link to="/register">
              <Button size="lg" className="bg-white text-accent hover:bg-gray-100">
                Register Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-8 md:mb-0">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="bg-primary rounded-md p-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M17 6.5a3 3 0 0 0-5.5-1.5 3 3 0 0 0-2.5 5 3 3 0 0 0 5.5 1.5 3 3 0 0 0 2.5-5Z" />
                      <path d="M9 17.5a3 3 0 0 0-2.5 5 3 3 0 0 0 5.5-1.5 3 3 0 0 0 2.5-5 3 3 0 0 0-5.5 1.5Z" />
                      <path d="M7.5 6.5a3 3 0 0 0-5 2.5 3 3 0 0 0 5 2.5 3 3 0 0 0 5-2.5 3 3 0 0 0-5-2.5Z" />
                    </svg>
                  </div>
                  <div className="text-lg font-bold text-white">Student Hive</div>
                </div>
                <p className="text-sm text-gray-400 max-w-xs">The premier hackathon platform for students to collaborate, innovate, and build amazing projects.</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-white font-semibold mb-3">Event</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link to="/about" className="hover:text-white">About</Link></li>
                    <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
                    <li><Link to="/schedule" className="hover:text-white">Schedule</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-white font-semibold mb-3">Resources</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link to="/sponsors" className="hover:text-white">Sponsors</Link></li>
                    <li><Link to="/mentors" className="hover:text-white">Mentors</Link></li>
                    <li><Link to="/prizes" className="hover:text-white">Prizes</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-white font-semibold mb-3">Connect</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white">Twitter</a></li>
                    <li><a href="#" className="hover:text-white">Instagram</a></li>
                    <li><a href="#" className="hover:text-white">Discord</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-500 text-center">
              <p>&copy; {new Date().getFullYear()} Student Hive. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
