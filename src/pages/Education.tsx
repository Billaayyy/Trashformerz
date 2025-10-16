import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const allTips = [
  {
    id: 1,
    content: "Sampah plastik membutuhkan hingga 1000 tahun untuk terurai secara alami di lingkungan?"
  },
  {
    id: 2,
    content: "Mengurangi 1 kg sampah makanan bisa menghemat 4.2 kg emisi CO2?"
  },
  {
    id: 3,
    content: "Daur ulang 1 ton kertas bisa menyelamatkan 17 pohon dewasa?"
  },
  {
    id: 4,
    content: "Menggunakan tumbler pribadi bisa mengurangi hingga 500 gelas plastik per tahun?"
  },
  {
    id: 5,
    content: "Composting dapat mengurangi 30% dari total sampah rumah tangga?"
  },
  {
    id: 6,
    content: "Kantong plastik membutuhkan 10-20 tahun untuk terurai di tanah?"
  },
  {
    id: 7,
    content: "LED menggunakan 75% lebih sedikit energi dibanding lampu pijar tradisional?"
  },
  {
    id: 8,
    content: "Mematikan perangkat elektronik saat tidak digunakan bisa menghemat 10% tagihan listrik?"
  },
  {
    id: 9,
    content: "Air laut naik 3.3 mm per tahun akibat pemanasan global?"
  },
  {
    id: 10,
    content: "Satu pohon dewasa dapat menyerap 22 kg CO2 per tahun?"
  },
  {
    id: 11,
    content: "Botol plastik sekali pakai membutuhkan 450 tahun untuk terurai?"
  },
  {
    id: 12,
    content: "Menggunakan transportasi umum dapat mengurangi emisi karbon hingga 45%?"
  },
  {
    id: 13,
    content: "Setiap menit, 1 juta botol plastik dibeli di seluruh dunia?"
  },
  {
    id: 14,
    content: "Makan vegetarian satu hari seminggu setara dengan tidak berkendara sejauh 1.770 km?"
  },
  {
    id: 15,
    content: "Panel surya dapat mengurangi tagihan listrik hingga 90%?"
  },
  {
    id: 16,
    content: "Menggunakan tas belanja kain dapat menggantikan hingga 1000 kantong plastik?"
  },
  {
    id: 17,
    content: "Air keran 1000 kali lebih murah daripada air kemasan?"
  },
  {
    id: 18,
    content: "Mencuci pakaian dengan air dingin menghemat 90% energi dibanding air panas?"
  },
  {
    id: 19,
    content: "E-waste tumbuh 3 kali lebih cepat daripada populasi dunia?"
  },
  {
    id: 20,
    content: "Mengurangi suhu AC 1 derajat dapat menghemat 10% energi?"
  },
  {
    id: 21,
    content: "Fast fashion menghasilkan 10% dari emisi karbon global?"
  },
  {
    id: 22,
    content: "Kaca dapat didaur ulang tanpa batas tanpa kehilangan kualitas?"
  },
  {
    id: 23,
    content: "Setiap orang menggunakan rata-rata 11.000 lembar tissue per tahun?"
  },
  {
    id: 24,
    content: "Menanam taman vertikal dapat mengurangi suhu ruangan hingga 5 derajat?"
  },
  {
    id: 25,
    content: "Bersepeda 10 km sama dengan menanam 1 pohon dalam hal pengurangan CO2?"
  },
  {
    id: 26,
    content: "Menggunakan shower selama 1 menit lebih singkat menghemat 2.5 galon air?"
  },
  {
    id: 27,
    content: "Produksi daging sapi menggunakan 1.800 galon air per pon?"
  },
  {
    id: 28,
    content: "Baterai yang tidak dibuang dengan benar dapat mencemari 20.000 galon air?"
  },
  {
    id: 29,
    content: "Menggunakan power strip dapat menghemat hingga $100 per tahun?"
  },
  {
    id: 30,
    content: "Ocean plastic akan melebihi jumlah ikan di laut pada tahun 2050?"
  }
];

const getRandomTips = () => {
  const shuffled = [...allTips].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 10).map((tip, index) => ({ ...tip, id: index + 1 }));
};

const Education = () => {
  const [tips, setTips] = useState(() => getRandomTips());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    setTips(getRandomTips());
  }, []);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isAnimating || currentIndex >= tips.length - 1) return;
    
    setIsAnimating(true);
    setSwipeDirection(direction);
    
    setTimeout(() => {
      setCurrentIndex(prev => Math.min(prev + 1, tips.length - 1));
      setIsAnimating(false);
      setSwipeDirection(null);
    }, 300);
  };

  const resetCards = () => {
    setTips(getRandomTips());
    setCurrentIndex(0);
    setIsAnimating(false);
    setSwipeDirection(null);
  };

  return (
    <>
      <Helmet>
        <title>Education — TRASHFORMERS Green Tips</title>
        <meta name="description" content="Learn environmental tips and sustainable living practices with TRASHFORMERS interactive flashcards." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Mobile Header */}
        <div className="md:hidden border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container flex items-center justify-between py-4">
            <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-semibold">TRASHFORMERS</span>
            </Link>
          </div>
        </div>

        <div className="container py-8 md:py-16">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Environmental Tips
            </h1>
            
            {/* Card Stack Container */}
            <div className="relative h-80 mb-8">
              {tips.slice(currentIndex, currentIndex + 3).map((tip, index) => (
                <div
                  key={tip.id}
                  className={`absolute inset-0 bg-card border rounded-lg shadow-lg transition-all duration-300 cursor-pointer ${
                    index === 0 
                      ? `z-20 ${isAnimating && swipeDirection === 'left' ? 'transform -translate-x-full rotate-12' : isAnimating && swipeDirection === 'right' ? 'transform translate-x-full rotate-12' : ''}`
                      : index === 1 
                      ? 'z-10 transform translate-y-3 translate-x-1 scale-95 rotate-1' 
                      : 'z-0 transform translate-y-6 translate-x-2 scale-90 rotate-2'
                  }`}
                  style={{
                    boxShadow: index === 0 ? '0 20px 40px rgba(0,0,0,0.15)' : index === 1 ? '0 10px 20px rgba(0,0,0,0.1)' : '0 5px 10px rgba(0,0,0,0.05)'
                  }}
                  onClick={() => index === 0 && handleSwipe('right')}
                  onTouchStart={(e) => {
                    if (index !== 0) return;
                    const touch = e.touches[0];
                    const startX = touch.clientX;
                    
                    const handleTouchEnd = (endEvent: TouchEvent) => {
                      const endTouch = endEvent.changedTouches[0];
                      const diff = endTouch.clientX - startX;
                      
                      if (Math.abs(diff) > 50) {
                        handleSwipe(diff > 0 ? 'right' : 'left');
                      }
                      
                      document.removeEventListener('touchend', handleTouchEnd);
                    };
                    
                    document.addEventListener('touchend', handleTouchEnd);
                  }}
                >
                  <div className="p-8 h-full flex flex-col justify-center">
                    <h2 className="text-xl font-semibold text-primary mb-6 text-center">
                      Did you know?
                    </h2>
                    <p className="text-lg text-center leading-relaxed">
                      {tip.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress and Controls */}
            <div className="text-center space-y-4">
              <div className="flex justify-center gap-2">
                {tips.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index <= currentIndex ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
              
              {/* Desktop Controls Only */}
              <div className="hidden md:flex justify-center gap-4">
                <button
                  onClick={() => handleSwipe('right')}
                  disabled={isAnimating || currentIndex >= tips.length - 1}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-primary/90"
                >
                  Next
                </button>
              </div>

              {currentIndex >= tips.length - 1 && (
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-center mb-4">🎉 You've learned all tips!</p>
                  <button
                    onClick={resetCards}
                    className="w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all"
                  >
                    Start Over
                  </button>
                </div>
              )}
              
              {/* Mobile Instructions */}
              <p className="text-sm text-muted-foreground text-center md:hidden">
                Tap the card to continue • {currentIndex + 1} of {tips.length}
              </p>
              
              {/* Desktop Instructions */}
              <p className="text-sm text-muted-foreground text-center hidden md:block">
                Click Next or swipe to continue • {currentIndex + 1} of {tips.length}
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Education;