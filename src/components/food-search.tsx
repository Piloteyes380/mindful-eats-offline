import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { searchFoods, getFoodsByCategory, type Food } from "@/lib/foods-database";

interface FoodSearchProps {
  onBack: () => void;
  onSelectFood: (food: Food) => void;
  initialCategory?: string;
  initialQuery?: string;
}

const FoodSearch = ({ onBack, onSelectFood, initialCategory = 'all', initialQuery = '' }: FoodSearchProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    if (query.trim() || selectedCategory !== 'all') {
      setFoods(searchFoods(query, selectedCategory));
    } else {
      setFoods(getFoodsByCategory('all'));
    }
  }, [query, selectedCategory]);

  const categories = [
    { id: 'all', name: "All", icon: "🍽️" },
    { id: 'protein', name: "Protein", icon: "🥩" },
    { id: 'grains', name: "Grains", icon: "🌾" },
    { id: 'veggies', name: "Veggies", icon: "🥬" },
    { id: 'dairy', name: "Dairy", icon: "🥛" }
  ];

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="p-6 space-y-6 max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 pt-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-10 w-10 rounded-full bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Search Foods</h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            className="w-full pl-12 pr-4 py-4 bg-muted rounded-2xl border-0 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Search foods..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
          />
        </div>

        {/* Categories */}
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="flex flex-col items-center space-y-2 flex-shrink-0 cursor-pointer"
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all ${
                selectedCategory === category.id 
                  ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2' 
                  : 'bg-muted hover:bg-muted/80'
              }`}>
                {category.icon}
              </div>
              <span className={`text-xs font-medium ${
                selectedCategory === category.id ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {category.name}
              </span>
            </div>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              {query ? `Results for "${query}"` : selectedCategory === 'all' ? 'All Foods' : `${categories.find(c => c.id === selectedCategory)?.name} Foods`}
            </h2>
            <span className="text-sm text-muted-foreground">{foods.length} items</span>
          </div>

          {foods.length === 0 ? (
            <Card className="shadow-card border-0">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No foods found</h3>
                <p className="text-muted-foreground">Try searching for something else</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {foods.map((food) => (
                <Card 
                  key={food.id} 
                  className="shadow-card border-0 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => onSelectFood(food)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{food.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{food.serving}</p>
                        <div className="flex space-x-4 text-xs text-muted-foreground">
                          <span>{food.calories} cal</span>
                          <span>{food.protein}g protein</span>
                          <span>{food.carbs}g carbs</span>
                          <span>{food.fat}g fat</span>
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodSearch;