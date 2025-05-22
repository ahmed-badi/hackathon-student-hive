
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Timer, Calendar, Users, Award, Lightning, BookOpen, Laptop } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const EVENT_DATE = new Date("2025-06-12T00:00:00"); 

const Index = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [isVisible, setIsVisible] = useState({
    categories: false,
    tracks: false,
    cta: false
  });
  
  const categoriesRef = useRef(null);
  const tracksRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = EVENT_DATE.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === categoriesRef.current) {
            setIsVisible(prev => ({ ...prev, categories: true }));
          } else if (entry.target === tracksRef.current) {
            setIsVisible(prev => ({ ...prev, tracks: true }));
          } else if (entry.target === ctaRef.current) {
            setIsVisible(prev => ({ ...prev, cta: true }));
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    if (categoriesRef.current) observer.observe(categoriesRef.current);
    if (tracksRef.current) observer.observe(tracksRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <div className="flex-1 flex flex-col">
        {/* Hero Section */}
        <div className="relative hero-gradient py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in-up">Hackazzon 2025</h1>
              <p className="text-lg md:text-xl mb-8 fade-in-up" style={{ animationDelay: "0.2s" }}>Participez au hackathon étudiant le plus innovant et transformez vos idées en réalité</p>
              
              {/* Countdown Timer */}
              <div className="glass rounded-lg p-6 mb-8 fade-in-up" style={{ animationDelay: "0.4s" }}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Timer className="w-5 h-5" />
                  <span className="font-semibold">Temps restant jusqu'au hackathon</span>
                </div>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="floating" style={{ animationDelay: "0s" }}>
                    <div className="text-3xl font-bold">{timeLeft.days}</div>
                    <div className="text-sm opacity-80">Jours</div>
                  </div>
                  <div className="floating" style={{ animationDelay: "0.5s" }}>
                    <div className="text-3xl font-bold">{timeLeft.hours}</div>
                    <div className="text-sm opacity-80">Heures</div>
                  </div>
                  <div className="floating" style={{ animationDelay: "1s" }}>
                    <div className="text-3xl font-bold">{timeLeft.minutes}</div>
                    <div className="text-sm opacity-80">Minutes</div>
                  </div>
                  <div className="floating" style={{ animationDelay: "1.5s" }}>
                    <div className="text-3xl font-bold">{timeLeft.seconds}</div>
                    <div className="text-sm opacity-80">Secondes</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up" style={{ animationDelay: "0.6s" }}>
                <Link to="/register">
                  <Button size="lg" variant="outline" className="bg-white text-accent hover:bg-gray-100 pulse-blue">
                    S'inscrire maintenant
                  </Button>
                </Link>
                <Button size="lg" className="border-white border text-white hover:bg-white/20">
                  <Link to="/about">En savoir plus</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}></div>
        </div>

        {/* Info Cards */}
        <div ref={categoriesRef} className="container mx-auto px-4 py-16 -mt-12 relative z-10">
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 staggered-fade-in ${isVisible.categories ? 'visible' : ''}`}>
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow card-hover-effect">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Apprendre & Évoluer</h3>
              <p className="text-gray-600">Développez vos compétences avec des ateliers et le mentorat d'experts de l'industrie.</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow card-hover-effect">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Timer className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">48 Heures</h3>
              <p className="text-gray-600">Deux jours de codage, de collaboration et de créativité pour construire des projets incroyables.</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow card-hover-effect">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Construire Votre Réseau</h3>
              <p className="text-gray-600">Connectez-vous avec d'autres participants, mentors et employeurs potentiels.</p>
            </div>
          </div>
        </div>

        {/* Tracks Section */}
        <div ref={tracksRef} className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 blue-gradient-text">Catégories du Hackathon</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Choisissez parmi plusieurs catégories d'innovation en fonction de vos intérêts et de votre expertise</p>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto staggered-fade-in ${isVisible.tracks ? 'visible' : ''}`}>
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100 card-hover-effect">
                <div className="text-accent text-xl mb-3 font-semibold flex items-center gap-2">
                  <div className="bg-accent/10 p-2 rounded-full">
                    <Lightning size={20} className="text-accent" />
                  </div>
                  <span>IA & Machine Learning</span>
                </div>
                <p className="text-gray-600">Développez des solutions innovantes à l'aide d'intelligence artificielle et d'algorithmes d'apprentissage automatique.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100 card-hover-effect">
                <div className="text-accent text-xl mb-3 font-semibold flex items-center gap-2">
                  <div className="bg-accent/10 p-2 rounded-full">
                    <Laptop size={20} className="text-accent" />
                  </div>
                  <span>Cybersécurité</span>
                </div>
                <p className="text-gray-600">Créez des applications et solutions pour améliorer la sécurité informatique et la protection des données.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100 card-hover-effect">
                <div className="text-accent text-xl mb-3 font-semibold flex items-center gap-2">
                  <div className="bg-accent/10 p-2 rounded-full">
                    <Award size={20} className="text-accent" />
                  </div>
                  <span>Analyse de Données</span>
                </div>
                <p className="text-gray-600">Développez des applications qui abordent les défis d'analyse et de visualisation des données.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100 card-hover-effect">
                <div className="text-accent text-xl mb-3 font-semibold flex items-center gap-2">
                  <div className="bg-accent/10 p-2 rounded-full">
                    <Calendar size={20} className="text-accent" />
                  </div>
                  <span>Durabilité & RSE</span>
                </div>
                <p className="text-gray-600">Construisez des solutions pour les défis environnementaux et le développement durable.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100 card-hover-effect">
                <div className="text-accent text-xl mb-3 font-semibold flex items-center gap-2">
                  <div className="bg-accent/10 p-2 rounded-full">
                    <Laptop size={20} className="text-accent" />
                  </div>
                  <span>Développement Web</span>
                </div>
                <p className="text-gray-600">Créez des outils et plateformes web innovants pour résoudre des problèmes réels.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100 card-hover-effect">
                <div className="text-accent text-xl mb-3 font-semibold flex items-center gap-2">
                  <div className="bg-accent/10 p-2 rounded-full">
                    <Lightning size={20} className="text-accent" />
                  </div>
                  <span>Blockchain</span>
                </div>
                <p className="text-gray-600">Développez des applications décentralisées, des contrats intelligents ou des solutions basées sur la blockchain.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div ref={ctaRef} className={`hero-gradient text-white py-16 ${isVisible.cta ? 'visible fade-in-up' : 'opacity-0'}`}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Prêt à Hacker?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Rejoignez des centaines d'étudiants innovants et créez quelque chose d'incroyable en 48 heures</p>
            <Link to="/register">
              <Button size="lg" className="bg-white text-accent hover:bg-gray-100 pulse-blue">
                S'inscrire Maintenant
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
                      <path d="M9 17.5a3 3 0 0 0-2.5 5 3 3 0 0 0 5.5-1.5 3 3 0 0 0 2.5-5 3 3 0 0 0-5-2.5Z" />
                      <path d="M7.5 6.5a3 3 0 0 0-5 2.5 3 3 0 0 0 5 2.5 3 3 0 0 0 5-2.5 3 3 0 0 0-5-2.5Z" />
                    </svg>
                  </div>
                  <div className="text-lg font-bold text-white">Hackazzon</div>
                </div>
                <p className="text-sm text-gray-400 max-w-xs">Hackathon organisé dans le cadre d'un projet de management de l'ISIMA. Une occasion unique d'innovation et de collaboration entre étudiants.</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-white font-semibold mb-3">Événement</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link to="/about" className="hover:text-white transition-colors">À propos</Link></li>
                    <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                    <li><Link to="/schedule" className="hover:text-white transition-colors">Programme</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-white font-semibold mb-3">Ressources</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link to="/sponsors" className="hover:text-white transition-colors">Sponsors</Link></li>
                    <li><Link to="/mentors" className="hover:text-white transition-colors">Mentors</Link></li>
                    <li><Link to="/prizes" className="hover:text-white transition-colors">Prix</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-white font-semibold mb-3">Connexion</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-500 text-center">
              <p>&copy; {new Date().getFullYear()} Hackazzon. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
