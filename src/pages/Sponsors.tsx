import Navbar from "@/components/Navbar";

const Sponsors = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Nos Sponsors</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Gold Sponsors */}
          <div className="col-span-full">
            <h2 className="text-2xl font-semibold mb-4 text-amber-600">Sponsors Or</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
                <div className="bg-gray-100 w-40 h-40 rounded-full flex items-center justify-center mb-4">
                  <p className="text-gray-400 text-sm">Logo</p>
                </div>
                <h3 className="text-xl font-semibold mb-2">TechGlobal</h3>
                <p className="text-gray-600 text-center">Leader mondial dans les solutions technologiques innovantes.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
                <div className="bg-gray-100 w-40 h-40 rounded-full flex items-center justify-center mb-4">
                  <p className="text-gray-400 text-sm">Logo</p>
                </div>
                <h3 className="text-xl font-semibold mb-2">InnovateCorp</h3>
                <p className="text-gray-600 text-center">Spécialiste de l'innovation et du développement de produits numériques.</p>
              </div>
            </div>
          </div>
          
          {/* Silver Sponsors */}
          <div className="col-span-full mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-500">Sponsors Argent</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
                <div className="bg-gray-100 w-32 h-32 rounded-full flex items-center justify-center mb-4">
                  <p className="text-gray-400 text-sm">Logo</p>
                </div>
                <h3 className="text-lg font-semibold mb-2">DataSmart</h3>
                <p className="text-gray-600 text-center">Solutions d'analyse de données de pointe.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
                <div className="bg-gray-100 w-32 h-32 rounded-full flex items-center justify-center mb-4">
                  <p className="text-gray-400 text-sm">Logo</p>
                </div>
                <h3 className="text-lg font-semibold mb-2">CloudNexus</h3>
                <p className="text-gray-600 text-center">Services cloud pour entreprises innovantes.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
                <div className="bg-gray-100 w-32 h-32 rounded-full flex items-center justify-center mb-4">
                  <p className="text-gray-400 text-sm">Logo</p>
                </div>
                <h3 className="text-lg font-semibold mb-2">SecureTech</h3>
                <p className="text-gray-600 text-center">Experts en cybersécurité et protection des données.</p>
              </div>
            </div>
          </div>
          
          {/* Bronze Sponsors */}
          <div className="col-span-full mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-amber-800">Sponsors Bronze</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                  <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mb-3">
                    <p className="text-gray-400 text-sm">Logo</p>
                  </div>
                  <h3 className="text-md font-semibold mb-1">Startup {i}</h3>
                  <p className="text-gray-600 text-center text-sm">Support technique et innovation.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Devenez Sponsor</h2>
          <p className="max-w-2xl mx-auto text-gray-600 mb-6">
            Vous souhaitez soutenir l'innovation étudiante et valoriser votre marque auprès des talents de demain ? 
            Découvrez nos différentes formules de partenariat.
          </p>
          <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
            Contactez-nous
          </button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
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
                  <li><a href="/about" className="hover:text-white">About</a></li>
                  <li><a href="/faq" className="hover:text-white">FAQ</a></li>
                  <li><a href="/schedule" className="hover:text-white">Schedule</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-3">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/sponsors" className="hover:text-white">Sponsors</a></li>
                  <li><a href="/mentors" className="hover:text-white">Mentors</a></li>
                  <li><a href="/prizes" className="hover:text-white">Prizes</a></li>
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
  );
};

export default Sponsors;
