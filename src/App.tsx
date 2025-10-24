import React, { useState, useEffect, useRef } from 'react';

// --- KOMPONENTY POMOCNICZE ---

interface FeatureCardProps {
  title: string;
  description: React.ReactNode;
  imageUrl: string;
  reverse?: boolean;
}

/**
 * Karta prezentująca pojedynczą cechę serwera z obrazem i tekstem.
 * Używa Intersection Observera do animacji pojawiania się przy przewijaniu.
 */
const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, imageUrl, reverse = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = cardRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  
  const direction = reverse ? 'md:flex-row-reverse' : 'md:flex-row';

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} flex flex-col ${direction} items-center gap-8 bg-gray-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg shadow-black/30 border border-gray-700/50`}
    >
      <div className="md:w-1/2 w-full image-hover-wrapper rounded-lg">
        <img 
            src={imageUrl} 
            alt={title} 
            className="rounded-lg shadow-xl w-full h-auto" 
            loading="lazy" 
        />
      </div>
      <div className="md:w-1/2 w-full text-center md:text-left">
        <h3 className="text-3xl font-bold font-orbitron text-purple-300 mb-4">{title}</h3>
        <div className="text-gray-300 text-lg leading-relaxed space-y-2">{description}</div>
      </div>
    </div>
  );
};

/**
 * Stylowany tytuł sekcji.
 */
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-center mb-12 text-shadow text-white">
        {children}
    </h2>
);

// --- GŁÓWNY KOMPONENT APLIKACJI ---

const App: React.FC = () => {
    const [copyButtonText, setCopyButtonText] = useState('Skopiuj IP');
    const headerContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (headerContentRef.current) {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                headerContentRef.current.style.transform = `translateY(${scrollTop * 0.4}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleCopyIp = () => {
        navigator.clipboard.writeText('ARGONCRAFT.PL').then(() => {
            setCopyButtonText('Skopiowano!');
            setTimeout(() => {
                setCopyButtonText('Skopiuj IP');
            }, 2000);
        });
    };

    const features = [
        {
            title: "Wbudowana Wikipedia (/guide)",
            description: "Na serwerze znajduje się rozbudowana wikipedia, która szczegółowo opisuje wszystkie unikalne mechaniki i możliwości dostępne w grze. Wpisz /guide, aby odkryć pełnię ArgonCraft!",
            imageUrl: "https://i.imgur.com/tjMCSaS.png",
            reverse: true,
        },
        {
            title: "Łatwa Nawigacja",
            description: "Poruszanie po spawnie jest niezwykle proste dzięki systemowi warpów. Z łatwością dotrzesz do kopalni, farmy, areny PvP czy kasyna. Szybkość i wygoda to nasz priorytet!",
            imageUrl: "https://i.imgur.com/AGFTFjg.png",
            reverse: false,
        },
        {
            title: "Przepustka Bojowa i Misje RIFT",
            description: (
                <>
                    <p>Podejmij wyzwanie w naszym unikalnym systemie misji RIFT i zdobywaj punkty do Przepustki Bojowej!</p>
                    <p className="mt-2">Każde ukończone zadanie przybliża Cię do odblokowania potężnych nagród głównych. Czeka na Ciebie mnóstwo ekscytujących wyzwań i epickich skarbów.</p>
                </>
            ),
            imageUrl: "https://i.imgur.com/8puKojo.png",
            reverse: true,
        },
        {
            title: "Interaktywni NPC",
            description: "Zagubiłeś się lub nie wiesz, co dalej robić? Nic straconego! Każdy NPC na serwerze jest interaktywny. Porozmawiaj z nimi, a z pewnością wskażą Ci właściwą drogę, opowiedzą historię lub zlecą ciekawe zadanie.",
            imageUrl: "https://i.imgur.com/bDlpfbA.png",
            reverse: false,
        },
    ];

    const newPlayerFeatures = [
        {
            title: "Darmowa Kopalnia",
            description: "Na start otrzymujesz dostęp do specjalnej kopalni przez pierwsze 5 godzin gry! To idealna okazja, by zdobyć pierwsze surowce i szybko się rozwinąć bez żadnego ryzyka.",
            imageUrl: "https://i.imgur.com/yPLuDNj.png",
        },
        {
            title: "Darmowe Farmy",
            description: "Potrzebujesz jedzenia lub materiałów do hodowli? Skorzystaj z darmowych farm dostępnych dla każdego nowego gracza przez pierwsze 5 godzin gry. Zapewnij sobie stały dopływ zasobów od samego początku!",
            imageUrl: "https://i.imgur.com/Va3hsBA.png",
        },
    ];

    const economyFeatures = [
         {
            title: "System Ulepszeń",
            description: "Rozwijaj swoją postać i przekraczaj granice! Nasz system ulepszeń pozwoli Ci zwiększyć statystyki, odblokować nowe umiejętności i podnieść limity, stając się potężniejszym z każdym dniem.",
            imageUrl: "https://i.imgur.com/BGm4sEQ.png",
            reverse: true,
        },
        {
            title: "Wybierz Swoją Pracę",
            description: "Zostań górnikiem, drwalem, a może rolnikiem? Na ArgonCraft.pl możesz wybrać jedną z wielu dostępnych prac, aby zarabiać pieniądze i rozwijać swoje umiejętności w wybranej dziedzinie.",
            imageUrl: "https://i.imgur.com/nCAAckO.png",
            reverse: false,
        },
        {
            title: "Nowoczesny Dom Aukcyjny",
            description: "Handluj z innymi graczami w wygodny i bezpieczny sposób. Nasz nowoczesny system aukcji pozwala na łatwe wystawianie przedmiotów na sprzedaż i licytowanie unikalnych skarbów.",
            imageUrl: "https://i.imgur.com/Gl2fqa9.png",
            reverse: true,
        },
    ];
    
    const activityFeatures = [
        {
            title: "Arena PvP",
            description: "Myślisz, że jesteś najlepszy? Udowodnij to na naszej arenie PvP! Walcz z innymi graczami, testuj swoje umiejętności i zdobywaj chwałę oraz cenne nagrody.",
            imageUrl: "https://i.imgur.com/MbORvlA.png",
            reverse: false,
        },
        {
            title: "Kasyno",
            description: "Czujesz, że szczęście Ci sprzyja? Odwiedź nasze kasyno i spróbuj swojego szczęścia w różnorodnych grach. Możesz wyjść z niego jako bogacz... albo stracić wszystko!",
            imageUrl: "https://i.imgur.com/b1IfiX1.png",
            reverse: true,
        },
    ];

  return (
      <div className="text-white min-h-screen overflow-x-hidden">
        {/* Sekcja Nagłówka */}
        <header className="flex flex-col items-center justify-center min-h-screen text-center p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
          <div ref={headerContentRef} className="relative z-10 flex flex-col items-center">
              <img src="https://i.imgur.com/NMg3Pgj.png" alt="ArgonCraft Logo" className="w-48 md:w-64 mb-6 drop-shadow-lg" />
              <div className="mb-2 animate-pulse">
                  <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-orbitron tracking-widest uppercase bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
                      IP: ARGONCRAFT.PL
                  </h1>
              </div>
              <button 
                  onClick={handleCopyIp} 
                  className={`mb-4 px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300 ${copyButtonText === 'Skopiowano!' ? 'bg-green-600 text-white' : 'bg-purple-600/50 text-purple-200 hover:bg-purple-600'}`}
              >
                  {copyButtonText}
              </button>
              <p className="text-lg md:text-2xl text-gray-300 font-bold mb-1">Wersja: 1.21.4</p>
              <p className="text-md md:text-xl text-purple-300 font-semibold mb-8">Tryb: Full Custom Survival + RPG</p>
              <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://vishop.pl/shop/15347/server/14526" target="_blank" rel="noopener noreferrer" className="px-6 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl font-bold text-white bg-gradient-to-r from-green-500 to-lime-500 rounded-lg shadow-lg hover:scale-105 hover:shadow-green-500/50 transform transition-all duration-300">
                  SKLEP
              </a>
              <a href="https://discord.com/invite/vnEcVcMBzA" target="_blank" rel="noopener noreferrer" className="px-6 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-500 rounded-lg shadow-lg hover:scale-105 hover:shadow-blue-500/50 transform transition-all duration-300">
                  DISCORD
              </a>
              </div>
          </div>
          {/* Wskazówka do przewijania */}
          <div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce-subtle text-gray-400 cursor-pointer transition-colors hover:text-white"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            <span className="sr-only">Przewiń w dół</span>
          </div>
        </header>
        
        {/* Główna Zawartość Strony */}
        <main className="py-16 sm:py-20 px-4 sm:px-6 bg-black/40 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto space-y-20 sm:space-y-24">
              {/* Sekcja Wprowadzająca */}
              <section className="text-center">
                  <SectionTitle>Witaj na ArgonCraft.pl!</SectionTitle>
                  <p className="max-w-4xl mx-auto text-lg sm:text-xl text-gray-300 leading-relaxed bg-gray-900/50 p-6 rounded-xl">
                      Zanurz się w świecie pełnym przygód, gdzie granice wyznacza tylko Twoja wyobraźnia. Nasz serwer Survival + RPG został stworzony z pasją, oferując unikalne mechaniki, wciągające misje i społeczność, która czeka na Ciebie. Nie wiesz od czego zacząć? Spokojnie! Na serwerze dostępna jest dedykowana Wikipedia, która opisuje wszystkie nasze systemy i możliwości. Dołącz do nas i rozpocznij swoją legendę!
                  </p>
              </section>
              
              {/* Główne Cechy */}
              <section className="space-y-12">
                  {features.map((feature, index) => (
                      <FeatureCard key={index} {...feature} />
                  ))}
              </section>

               {/* Sekcja Dungeonów */}
              <section>
                  <SectionTitle>Czekają na Ciebie Wyjątkowe Dungeony</SectionTitle>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                      <div className="image-hover-wrapper rounded-xl"><img src="https://i.imgur.com/lnvgaAG.jpeg" alt="Dungeon 1" className="w-full h-auto rounded-xl shadow-lg" loading="lazy" /></div>
                      <div className="image-hover-wrapper rounded-xl"><img src="https://i.imgur.com/aTm61S5.jpeg" alt="Dungeon 2" className="w-full h-auto rounded-xl shadow-lg" loading="lazy" /></div>
                      <div className="image-hover-wrapper rounded-xl"><img src="https://i.imgur.com/gX2XxoP.jpeg" alt="Dungeon 3" className="w-full h-auto rounded-xl shadow-lg" loading="lazy" /></div>
                  </div>
              </section>

               {/* Benefity dla Nowych Graczy */}
              <section>
                  <SectionTitle>Benefity dla Nowych Graczy</SectionTitle>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {newPlayerFeatures.map((feature, index) => (
                       <div key={index} className="bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-700/50 text-center transition-transform duration-300 hover:-translate-y-2 backdrop-blur-sm">
                           <div className="image-hover-wrapper rounded-lg mb-4">
                              <img src={feature.imageUrl} alt={feature.title} className="rounded-lg w-full h-auto"/>
                           </div>
                           <h3 className="text-2xl font-bold font-orbitron text-purple-300 mb-2">{feature.title}</h3>
                           <p className="text-gray-300">{feature.description}</p>
                       </div>
                  ))}
                  </div>
              </section>
              
              {/* Rozwój i Ekonomia */}
              <section className="space-y-12">
                   <SectionTitle>Rozwój i Ekonomia</SectionTitle>
                   {economyFeatures.map((feature, index) => (
                      <FeatureCard key={index} {...feature} />
                  ))}
              </section>
              
              {/* Rywalizacja i Zabawa */}
              <section className="space-y-12">
                   <SectionTitle>Rywalizacja i Zabawa</SectionTitle>
                   {activityFeatures.map((feature, index) => (
                      <FeatureCard key={index} {...feature} />
                  ))}
              </section>
          </div>
        </main>

        {/* Wezwanie do Działania (CTA) w Stopce */}
        <section className="py-16 sm:py-20 bg-black/50 backdrop-blur-lg">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
              <div className="image-hover-wrapper rounded-lg max-w-md mx-auto mb-8">
                  <img src="https://i.imgur.com/v12ZocS.png" alt="ArgonCraft Zapowiedź" className="w-full h-auto rounded-lg shadow-2xl shadow-purple-500/20"/>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-orbitron text-white text-shadow mb-4">To dopiero początek!</h2>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8">
                  Odkryłeś tylko ułamek tego, co oferuje ArgonCraft.pl. Dołącz do naszej społeczności na Discordzie, wejdź na serwer i zapisz się na beta testy, aby jako pierwszy doświadczyć nadchodzących nowości i kształtować przyszłość serwera!
              </p>
              <a href="https://discord.com/invite/vnEcVcMBzA" target="_blank" rel="noopener noreferrer" className="inline-block px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg hover:scale-105 hover:shadow-purple-500/50 transform transition-all duration-300">
                  Dołącz do Discorda i Zapisz się na Testy!
              </a>
          </div>
        </section>

        {/* Stopka z Prawami Autorskimi */}
        <footer className="bg-gray-900/50 border-t border-gray-800 py-6 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} ArgonCraft.pl. Wszelkie prawa zastrzeżone.</p>
        </footer>
      </div>
  );
};

export default App;
