import Navbar from "@/components/Navbar";

const Prizes = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Prix et Récompenses</h1>
        
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <p className="text-lg text-gray-600">
            Le Student Hive Hackathon récompense l'innovation, la créativité et l'excellence technique. 
            Découvrez les prix qui seront attribués aux meilleures équipes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Premier Prix */}
          <div className="bg-gradient-to-br from-amber-300 to-amber-500 rounded-lg shadow-xl p-8 transform md:scale-105 -rotate-1">
            <div className="bg-white/90 rounded-lg p-6 flex flex-col items-center h-full">
              <h3 className="text-2xl font-bold mb-2">1er Prix</h3>
              <div className="text-4xl font-bold my-4 text-amber-600">5 000 €</div>
              <div className="bg-amber-100 w-24 h-24 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                  <path d="M4 22h16"></path>
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                </svg>
              </div>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>Prix en espèces de 5 000 €</li>
                <li>Incubation de 6 mois</li>
                <li>Mentorat personnalisé</li>
                <li>Visibilité médiatique</li>
              </ul>
            </div>
          </div>
          
          {/* Deuxième Prix */}
          <div className="bg-gradient-to-br from-gray-300 to-gray-500 rounded-lg shadow-lg p-8">
            <div className="bg-white/90 rounded-lg p-6 flex flex-col items-center h-full">
              <h3 className="text-2xl font-bold mb-2">2ème Prix</h3>
              <div className="text-4xl font-bold my-4 text-gray-600">3 000 €</div>
              <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                  <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"></path>
                  <path d="M11 12 5.12 2.2"></path>
                  <path d="m13 12 5.88-9.8"></path>
                  <path d="M8 7h8"></path>
                  <path d="m7 15 3.5 7h3l3.5-7"></path>
                </svg>
              </div>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>Prix en espèces de 3 000 €</li>
                <li>Accompagnement de 3 mois</li>
                <li>Accès privilégié aux investisseurs</li>
              </ul>
            </div>
          </div>
          
          {/* Troisième Prix */}
          <div className="bg-gradient-to-br from-amber-700 to-amber-900 rounded-lg shadow-lg p-8 rotate-1">
            <div className="bg-white/90 rounded-lg p-6 flex flex-col items-center h-full">
              <h3 className="text-2xl font-bold mb-2">3ème Prix</h3>
              <div className="text-4xl font-bold my-4 text-amber-800">1 500 €</div>
              <div className="bg-amber-100 w-24 h-24 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-800">
                  <path d="M12.5 2h-1V1h1zm3.034 3.034-1.225 1.225 2.449-.259-1.225-1.225.354.065-.354-.065ZM19 12.5v1h1v-1zm-3.034 3.034-1.225 1.225 2.449-.259-1.225-1.225.354.065-.354-.065ZM12.5 19h-1v1h1zm-3.034-3.034 1.225-1.225-2.449.259 1.225 1.225-.354-.065.354.065ZM5 12.5v-1H4v1zm3.034-3.034 1.225-1.225-2.449.259 1.225 1.225-.354-.065.354.065Z"></path>
                  <path d="M6.5 10.5a6 6 0 0 0 11 0 6 6 0 0 0-11 0Z"></path>
                </svg>
              </div>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>Prix en espèces de 1 500 €</li>
                <li>Mentorat technique</li>
                <li>Accès à des ressources cloud</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Prix Spéciaux */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Prix Spéciaux</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Prix Innovation",
                prize: "1 000 €",
                description: "Pour la solution la plus innovante"
              },
              {
                title: "Prix Impact Social",
                prize: "1 000 €",
                description: "Pour le projet avec le meilleur impact sociétal"
              },
              {
                title: "Prix Design UX",
                prize: "1 000 €",
                description: "Pour l'interface utilisateur la plus intuitive"
              },
              {
                title: "Prix Technique",
                prize: "1 000 €",
                description: "Pour la solution avec la meilleure implémentation technique"
              }
            ].map((prize, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                <h3 className="font-semibold text-lg mb-2">{prize.title}</h3>
                <div className="text-2xl font-bold text-primary mb-3">{prize.prize}</div>
                <p className="text-gray-600 text-sm">{prize.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Autres Avantages */}
        <div className="mt-16 bg-gray-50 rounded-xl p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Avantages pour Tous les Participants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Formation Continue</h3>
                <p className="text-gray-600 text-sm">Accès à des cours et formations en ligne pendant 3 mois</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Services Cloud</h3>
                <p className="text-gray-600 text-sm">Crédits Cloud pour héberger votre projet</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5Z"></path>
                  <path d="M12 12v.01"></path>
                  <path d="M17 12v.01"></path>
                  <path d="M7 12v.01"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Communauté</h3>
                <p className="text-gray-600 text-sm">Accès exclusif à la communauté Student Hive</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M15 6h1a2 2 0 0 1 2 2v8.5c0 .83-.67 1.5-1.5 1.5h-9A1.5 1.5 0 0 1 6 16.5V8a2 2 0 0 1 2-2h1"></path>
                  <path d="M10 15v-2"></path>
                  <path d="M14 15v-2"></path>
                  <path d="M12 15v-2"></path>
                  <path d="M8 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                  <path d="M16 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                  <path d="M12 6h0"></path>
                  <path d="M12 2v4"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Goodies Tech</h3>
                <p className="text-gray-600 text-sm">Kit de bienvenue et cadeaux surprises</p>
              </div>
            </div>
          </div>
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

export default Prizes;
