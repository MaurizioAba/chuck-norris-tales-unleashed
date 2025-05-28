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
    <div className="min-h-screen bg-black relative overflow-hidden font-mono">
      {/* Pixelated Grid Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(90deg, #00ff00 1px, transparent 1px),
            linear-gradient(#00ff00 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      ></div>
      
      {/* Animated Neon Lines */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-magenta-500 to-transparent animate-pulse delay-500"></div>
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-yellow-400 to-transparent animate-pulse delay-1000"></div>
        <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-pink-500 to-transparent animate-pulse delay-1500"></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          {/* Chuck Norris Pixelated Avatar */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-magenta-500 to-yellow-400 blur-lg animate-pulse"></div>
              <img 
                src="/lovable-uploads/deffd0e0-0488-4930-85a2-783f5d972005.png"
                alt="Chuck Norris"
                className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg border-4 border-cyan-400 shadow-2xl object-cover pixelated"
                style={{
                  imageRendering: 'pixelated',
                  filter: 'contrast(1.2) saturate(1.5)'
                }}
              />
            </div>
          </div>

          {/* Neon Title */}
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-wider">
            <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse">
              CHUCK
            </span>
            <br />
            <span className="text-magenta-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)] animate-pulse delay-500">
              NORRIS
            </span>
            <br />
            <span className="text-yellow-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)] animate-pulse delay-1000">
              JOKES
            </span>
          </h1>
          
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-1 rounded-lg mb-6">
            <div className="bg-black p-4 rounded-lg border border-cyan-400">
              <p className="text-green-400 font-bold text-lg tracking-wide">
                &gt; LOADING LEGENDARY FACTS...
              </p>
            </div>
          </div>
        </div>

        {/* Category Selector */}
        <div className="mb-8">
          <h3 className="text-2xl font-black text-center mb-6 text-yellow-400 tracking-wider drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">
            [SELECT CATEGORY]
          </h3>
          
          {loadingCategories ? (
            <div className="flex justify-center">
              <div className="text-cyan-400 text-xl animate-pulse">LOADING...</div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  disabled={loading}
                  className={`capitalize font-black text-sm border-2 transition-all duration-200 ${
                    selectedCategory === category 
                      ? 'bg-gradient-to-r from-magenta-500 to-purple-600 text-white border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-pulse' 
                      : 'bg-black text-green-400 border-green-400 hover:bg-green-400 hover:text-black hover:shadow-[0_0_10px_rgba(34,197,94,0.8)]'
                  }`}
                >
                  {category.toUpperCase()}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button 
            onClick={handleRandomJoke}
            disabled={loading}
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-black hover:from-cyan-400 hover:to-blue-500 font-black text-lg px-8 py-4 border-2 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] transition-all duration-300 hover:scale-110"
          >
            {loading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Shuffle className="mr-2 h-5 w-5" />
            )}
            RANDOM JOKE
          </Button>
          
          <Button 
            size="lg"
            className="bg-gradient-to-r from-magenta-500 to-pink-600 text-white hover:from-magenta-400 hover:to-pink-500 font-black text-lg px-8 py-4 border-2 border-magenta-400 shadow-[0_0_20px_rgba(236,72,153,0.8)] transition-all duration-300 hover:scale-110"
            onClick={() => joke && fetchRandomJoke(selectedCategory)}
            disabled={loading}
          >
            <Zap className="mr-2 h-5 w-5" />
            ANOTHER ONE!
          </Button>
        </div>

        {/* Joke Display */}
        {joke && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-1 rounded-lg">
              <Card className="bg-black border-4 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                <CardHeader className="bg-gradient-to-r from-green-500 to-cyan-500 text-black rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-black tracking-wider">
                      CHUCK NORRIS FACT
                    </CardTitle>
                    {joke.categories.length > 0 && (
                      <div className="flex gap-2">
                        {joke.categories.map((cat) => (
                          <Badge key={cat} className="bg-yellow-400 text-black font-black border-2 border-black">
                            {cat.toUpperCase()}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="bg-gray-900 p-6 rounded-lg border-2 border-green-400">
                    <blockquote className="text-lg md:text-xl font-bold text-green-400 leading-relaxed text-center font-mono">
                      &gt; {joke.value}
                    </blockquote>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm font-bold text-cyan-400 bg-black inline-block px-4 py-2 rounded border border-cyan-400">
                      ID: {joke.id.slice(-8).toUpperCase()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Initial State */}
        {!joke && !loading && (
          <div className="text-center py-8">
            <div className="max-w-md mx-auto bg-gradient-to-r from-purple-600 to-pink-600 p-1 rounded-lg">
              <div className="bg-black p-8 rounded-lg border-2 border-yellow-400">
                <div className="text-6xl mb-6 animate-bounce">🥋</div>
                <h3 className="text-xl font-black text-yellow-400 mb-4 tracking-wider">
                  READY FOR A CHUCK NORRIS FACT?
                </h3>
                <p className="text-green-400 font-bold">
                  &gt; PRESS "RANDOM JOKE" TO BEGIN
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-black text-green-400 py-6 border-t-2 border-cyan-400 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-bold mb-2">
            POWERED BY{' '}
            <a 
              href="https://api.chucknorris.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-yellow-400 transition-colors font-black underline"
            >
              CHUCK NORRIS API
            </a>
          </p>
          <p className="text-xs text-magenta-400 font-bold">
            © 1990s STYLE WEBPAGE - CHUCK NORRIS APPROVED
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
