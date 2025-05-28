
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-red-600 to-orange-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="mb-6">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-lg">
              CHUCK NORRIS
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-orange-200 mb-6">
              FACT GENERATOR
            </h2>
            <p className="text-lg text-orange-100 max-w-2xl mx-auto">
              Scopri i fatti più incredibili su Chuck Norris. Perché Chuck Norris non legge libri, li fissa fino a quando non gli danno le informazioni che vuole.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleRandomJoke}
              disabled={loading}
              size="lg"
              className="bg-white text-orange-600 hover:bg-orange-50 font-bold text-lg px-8 py-3 shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              {loading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Shuffle className="mr-2 h-5 w-5" />
              )}
              Battuta Casuale
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-orange-600 font-bold text-lg px-8 py-3 shadow-lg transform hover:scale-105 transition-all duration-200"
              onClick={() => joke && fetchRandomJoke(selectedCategory)}
              disabled={loading}
            >
              <Zap className="mr-2 h-5 w-5" />
              Un'altra!
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Categories Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Scegli una Categoria
          </h3>
          
          {loadingCategories ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            </div>
          ) : (
            <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => handleCategorySelect(category)}
                  disabled={loading}
                  className={`capitalize font-semibold transition-all duration-200 transform hover:scale-105 ${
                    selectedCategory === category 
                      ? 'bg-orange-600 text-white shadow-lg' 
                      : 'border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
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
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm animate-in slide-in-from-bottom-4 duration-500">
              <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-black">
                    CHUCK NORRIS FACT
                  </CardTitle>
                  {joke.categories.length > 0 && (
                    <div className="flex gap-2">
                      {joke.categories.map((cat) => (
                        <Badge key={cat} variant="secondary" className="bg-white/20 text-white border-0">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <blockquote className="text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed text-center italic">
                  "{joke.value}"
                </blockquote>
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    Fatto #{joke.id.slice(-8).toUpperCase()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Initial State */}
        {!joke && !loading && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-6">🥋</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-4">
                Pronto per un fatto su Chuck Norris?
              </h3>
              <p className="text-gray-600 mb-6">
                Clicca su "Battuta Casuale" o scegli una categoria per iniziare!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            Powered by{' '}
            <a 
              href="https://api.chucknorris.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 transition-colors"
            >
              Chuck Norris API
            </a>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Chuck Norris non usa questo sito web. Questo sito web usa Chuck Norris.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
