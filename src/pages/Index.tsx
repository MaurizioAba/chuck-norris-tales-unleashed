
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Zap, Shuffle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChuckNorrisJoke {
  categories: string[];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
}

const Index = () => {
  const [joke, setJoke] = useState<ChuckNorrisJoke | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const { toast } = useToast();

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://api.chucknorris.io/jokes/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile caricare le categorie",
        variant: "destructive",
      });
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchRandomJoke = async (category?: string) => {
    setLoading(true);
    try {
      const url = category 
        ? `https://api.chucknorris.io/jokes/random?category=${category}`
        : 'https://api.chucknorris.io/jokes/random';
      
      const response = await fetch(url);
      const data = await response.json();
      setJoke(data);
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile caricare la battuta",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    fetchRandomJoke(category);
  };

  const handleRandomJoke = () => {
    setSelectedCategory('');
    fetchRandomJoke();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-cyan-400 relative overflow-hidden">
      {/* 90s Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255,255,255,0.1) 10px,
            rgba(255,255,255,0.1) 20px
          )`
        }}></div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 shadow-2xl">
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Neon glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-cyan-400/20 blur-xl"></div>
        
        <div className="relative container mx-auto px-4 py-12 text-center">
          {/* Chuck Norris Image */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 blur-lg opacity-75 animate-pulse"></div>
              <img 
                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80"
                alt="Chuck Norris"
                className="relative w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-yellow-400 shadow-2xl object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 mb-4 drop-shadow-2xl transform skew-y-1 animate-pulse">
              CHUCK NORRIS
            </h1>
            <h2 className="text-xl md:text-3xl font-bold text-cyan-200 mb-6 transform -skew-y-1 drop-shadow-lg">
              🥋 FACT GENERATOR 🥋
            </h2>
            <p className="text-lg text-white max-w-2xl mx-auto bg-black/20 rounded-lg p-4 border border-cyan-300 shadow-xl">
              Scopri i fatti più incredibili su Chuck Norris! 
              <br />
              <span className="text-yellow-300 font-bold">Perché Chuck Norris non legge libri, li fissa fino a quando non gli danno le informazioni che vuole.</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleRandomJoke}
              disabled={loading}
              size="lg"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-300 hover:to-orange-400 font-black text-lg px-8 py-4 shadow-2xl transform hover:scale-110 transition-all duration-300 border-2 border-yellow-300 animate-bounce"
            >
              {loading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Shuffle className="mr-2 h-5 w-5" />
              )}
              🎲 BATTUTA CASUALE 🎲
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-cyan-300 bg-purple-600/80 text-white hover:bg-cyan-400 hover:text-black font-black text-lg px-8 py-4 shadow-2xl transform hover:scale-110 transition-all duration-300"
              onClick={() => joke && fetchRandomJoke(selectedCategory)}
              disabled={loading}
            >
              <Zap className="mr-2 h-5 w-5" />
              ⚡ UN'ALTRA! ⚡
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Categories Section */}
        <div className="mb-12">
          <h3 className="text-3xl font-black text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 drop-shadow-lg transform skew-y-1">
            🎯 SCEGLI UNA CATEGORIA 🎯
          </h3>
          
          {loadingCategories ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            </div>
          ) : (
            <div className="flex flex-wrap gap-3 justify-center max-w-5xl mx-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => handleCategorySelect(category)}
                  disabled={loading}
                  className={`capitalize font-black text-sm transition-all duration-300 transform hover:scale-110 border-2 shadow-lg ${
                    selectedCategory === category 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-yellow-400 shadow-2xl animate-pulse' 
                      : 'border-purple-500 bg-white/90 text-purple-700 hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-500 hover:text-white hover:border-yellow-400'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Joke Display */}
        {joke && (
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-2xl border-4 border-yellow-400 bg-gradient-to-br from-white to-cyan-50 backdrop-blur-sm animate-in slide-in-from-bottom-4 duration-500 transform hover:scale-105 transition-transform">
              <CardHeader className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white rounded-t-lg border-b-4 border-yellow-400">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-black transform skew-y-1 drop-shadow-lg">
                    🔥 CHUCK NORRIS FACT 🔥
                  </CardTitle>
                  {joke.categories.length > 0 && (
                    <div className="flex gap-2">
                      {joke.categories.map((cat) => (
                        <Badge key={cat} className="bg-yellow-400 text-black font-bold border-2 border-black shadow-lg">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-8 bg-gradient-to-br from-yellow-50 to-pink-50">
                <blockquote className="text-xl md:text-2xl font-bold text-purple-800 leading-relaxed text-center italic border-l-4 border-purple-600 pl-6 bg-white/80 p-6 rounded-lg shadow-inner">
                  "⭐ {joke.value} ⭐"
                </blockquote>
                <div className="mt-6 text-center">
                  <p className="text-sm font-bold text-purple-600 bg-yellow-200 inline-block px-4 py-2 rounded-full border-2 border-purple-400 shadow-lg">
                    🎯 Fatto #{joke.id.slice(-8).toUpperCase()} 🎯
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Initial State */}
        {!joke && !loading && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto bg-white/90 rounded-2xl p-8 border-4 border-purple-500 shadow-2xl transform hover:scale-105 transition-transform">
              <div className="text-6xl mb-6 animate-bounce">🥋</div>
              <h3 className="text-2xl font-black text-purple-700 mb-4 transform skew-y-1">
                Pronto per un fatto su Chuck Norris?
              </h3>
              <p className="text-purple-600 font-bold mb-6">
                Clicca su "BATTUTA CASUALE" o scegli una categoria per iniziare!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-800 via-pink-800 to-cyan-800 text-white py-8 mt-16 border-t-4 border-yellow-400">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-bold text-yellow-300 mb-2">
            🚀 Powered by{' '}
            <a 
              href="https://api.chucknorris.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-300 hover:text-yellow-300 transition-colors font-black underline"
            >
              Chuck Norris API
            </a>
            {' '}🚀
          </p>
          <p className="text-xs text-cyan-200 font-bold bg-black/20 inline-block px-4 py-2 rounded-full">
            💪 Chuck Norris non usa questo sito web. Questo sito web usa Chuck Norris. 💪
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
