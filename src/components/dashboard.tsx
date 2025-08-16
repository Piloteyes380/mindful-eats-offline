import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { getFoodEntries, getGoals, getWaterIntake } from "@/lib/storage";
import { useEffect, useState } from "react";
import type { FoodEntry, Goals } from "@/lib/storage";

interface DashboardProps {
  onAddFood: () => void;
  onViewLog: () => void;
  onSetGoals: () => void;
  onSearchFood: (category?: string, query?: string) => void;
}

const Dashboard = ({ onAddFood, onViewLog, onSetGoals, onSearchFood }: DashboardProps) => {
  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [goals, setGoals] = useState<Goals>({ calories: 2000, protein: 150, carbs: 200, fat: 65 });
  const [waterIntake, setWaterIntake] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setEntries(getFoodEntries());
    setGoals(getGoals());
    setWaterIntake(6); // Default water intake
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const todayEntries = entries.filter(entry => entry.date === today);
  
  const totalCalories = todayEntries.reduce((sum, entry) => sum + entry.calories, 0);
  const totalProtein = todayEntries.reduce((sum, entry) => sum + entry.protein, 0);
  const totalCarbs = todayEntries.reduce((sum, entry) => sum + entry.carbs, 0);
  const totalFat = todayEntries.reduce((sum, entry) => sum + entry.fat, 0);

  const calorieProgress = (totalCalories / goals.calories) * 100;

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="p-6 space-y-6 max-w-md mx-auto">
        {/* Header */}
        <div className="pt-4 pb-2">
          <h1 className="text-3xl font-bold text-foreground">Hey, Chef!</h1>
          <p className="text-muted-foreground text-lg">What are you eating today?</p>
        </div>

        {/* Quick Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            className="w-full pl-12 pr-4 py-4 bg-muted rounded-2xl border-0 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            placeholder="Search foods..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={() => onSearchFood('all', searchQuery)}
            type="text"
          />
        </div>

        {/* Food Categories */}
        <Carousel className="w-full">
          <CarouselContent className="-ml-2">
            {[
              { id: "all", name: "All", icon: "🍽️", color: "bg-[hsl(var(--category-all))]" },
              { id: "protein", name: "Protein", icon: "🥩", color: "bg-[hsl(var(--category-protein))]" },
              { id: "grains", name: "Grains", icon: "🌾", color: "bg-[hsl(var(--category-grains))]" },
              { id: "veggies", name: "Veggies", icon: "🥬", color: "bg-[hsl(var(--category-veggies))]" },
              { id: "dairy", name: "Dairy", icon: "🥛", color: "bg-[hsl(var(--category-dairy))]" }
            ].map((category) => (
              <CarouselItem key={category.name} className="basis-1/5 pl-2">
                <div 
                  className="flex flex-col items-center space-y-2 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => onSearchFood(category.id)}
                >
                  <div className={`w-14 h-14 ${category.color} rounded-full flex items-center justify-center text-xl shadow-md`}>
                    {category.icon}
                  </div>
                  <span className="text-xs font-medium text-muted-foreground text-center">{category.name}</span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Main Calorie Card */}
        <Card className="shadow-card border-0 bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Today's Progress</h3>
                <p className="text-sm text-muted-foreground">Keep up the great work!</p>
              </div>
              <div className="w-16 h-16">
                <ProgressRing 
                  progress={calorieProgress} 
                  size={64} 
                  strokeWidth={6}
                  className="text-primary"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{totalCalories}</p>
                <p className="text-sm text-muted-foreground">consumed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{goals.calories - totalCalories}</p>
                <p className="text-sm text-muted-foreground">remaining</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Quick Actions */}
        <Card className="shadow-card border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              <span className="text-sm text-primary font-medium">View All</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div 
              onClick={onAddFood}
              className="relative bg-gradient-primary rounded-2xl p-6 text-white cursor-pointer overflow-hidden"
            >
              <div className="absolute top-2 left-2">
                <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">Quick Add</span>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-2">Log Your Meal</h3>
                <div className="flex items-center space-x-4 text-sm opacity-90">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    2 mins
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Easy
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={onViewLog}
                className="bg-muted/50 rounded-xl p-4 cursor-pointer hover:bg-muted transition-colors"
              >
                <div className="w-12 h-12 bg-[hsl(var(--category-veggies))] rounded-xl flex items-center justify-center mb-3">
                  <span className="text-lg">📝</span>
                </div>
                <h4 className="font-medium text-foreground">Food Log</h4>
                <p className="text-xs text-muted-foreground mt-1">View entries</p>
              </div>
              
              <div 
                onClick={onSetGoals}
                className="bg-muted/50 rounded-xl p-4 cursor-pointer hover:bg-muted transition-colors"
              >
                <div className="w-12 h-12 bg-[hsl(var(--category-protein))] rounded-xl flex items-center justify-center mb-3">
                  <span className="text-lg">🎯</span>
                </div>
                <h4 className="font-medium text-foreground">Set Goals</h4>
                <p className="text-xs text-muted-foreground mt-1">Customize targets</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Macro Breakdown */}
        <Card className="shadow-card border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Macronutrients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-primary rounded-full"></div>
                  <span className="text-sm font-medium">Protein</span>
                </div>
                <span className="text-sm font-semibold">{totalProtein}g / {goals.protein}g</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-500" 
                  style={{width: `${Math.min((totalProtein / goals.protein) * 100, 100)}%`}}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-[hsl(var(--category-grains))] rounded-full"></div>
                  <span className="text-sm font-medium">Carbs</span>
                </div>
                <span className="text-sm font-semibold">{totalCarbs}g / {goals.carbs}g</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-[hsl(var(--category-grains))] h-2 rounded-full transition-all duration-500" 
                  style={{width: `${Math.min((totalCarbs / goals.carbs) * 100, 100)}%`}}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-[hsl(var(--category-dairy))] rounded-full"></div>
                  <span className="text-sm font-medium">Fat</span>
                </div>
                <span className="text-sm font-semibold">{totalFat}g / {goals.fat}g</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-[hsl(var(--category-dairy))] h-2 rounded-full transition-all duration-500" 
                  style={{width: `${Math.min((totalFat / goals.fat) * 100, 100)}%`}}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;