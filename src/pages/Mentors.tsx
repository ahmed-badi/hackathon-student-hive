import Navbar from "@/components/Navbar";

const Mentors = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Nos Mentors</h1>
        
        <div className="max-w-3xl mx-auto mb-8 text-center">
          <p className="text-lg text-gray-600">
            Nos mentors, issus des meilleures entreprises tech, vous accompagneront tout au long du hackathon 
            pour vous aider à réaliser votre projet.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Sophie Laurent",
              role: "Lead Developer @ Google",
              expertise: "Intelligence Artificielle",
              image: null
            },
            {
              name: "Thomas Dubois",
              role: "CTO @ TechStartup",
              expertise: "Web3 & Blockchain",
              image: null
            },
            {
              name: "Amélie Moreau",
              role: "Product Manager @ Amazon",
              expertise: "UX Design & Product",
              image: null
            },
            {
              name: "Maxime Petit",
              role: "Data Scientist @ IBM",
              expertise: "Big Data & Analytics",
              image: null
            },
            {
              name: "Claire Nguyen",
              role: "Security Expert @ Microsoft",
              expertise: "Cybersécurité",
              image: null
            },
            {
              name: "Lucas Martin",
              role: "Mobile Dev @ Spotify",
              expertise: "Développement Mobile",
              image: null
            },
          ].map((mentor, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                <span className="text-gray-400">{mentor.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <h3 className="text-xl font-semibold mb-1">{mentor.name}</h3>
              <p className="text-gray-600 mb-2">{mentor.role}</p>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {mentor.expertise}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Devenez Mentor</h2>
          <p className="max-w-2xl mx-auto text-gray-600 mb-6">
            Vous êtes un professionnel expérimenté et vous souhaitez partager vos connaissances avec les étudiants ? 
            Rejoignez notre équipe de mentors !
          </p>
          <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
            Postulez maintenant
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
                  <li><a href="#" className="hover:text-white">About</a></li>
                  <li><a href="#" className="hover:text-white">FAQ</a></li>
                  <li><a href="#" className="hover:text-white">Schedule</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-3">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white">Sponsors</a></li>
                  <li><a href="#" className="hover:text-white">Mentors</a></li>
                  <li><a href="#" className="hover:text-white">Prizes</a></li>
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

export default Mentors;
