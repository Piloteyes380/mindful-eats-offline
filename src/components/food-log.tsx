import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface FoodLogProps {
  onBack: () => void;
  onAddFood: () => void;
}

interface LogEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meal: string;
  serving: string;
  time: string;
}

const FoodLog = ({ onBack, onAddFood }: FoodLogProps) => {
  // Mock data - will be replaced with actual data from local storage
  const todayLog: LogEntry[] = [
    {
      id: "1",
      name: "Oatmeal with Berries",
      calories: 320,
      protein: 12,
      carbs: 58,
      fat: 6,
      meal: "breakfast",
      serving: "1 bowl",
      time: "8:30 AM"
    },
    {
      id: "2", 
      name: "Grilled Chicken Salad",
      calories: 425,
      protein: 35,
      carbs: 12,
      fat: 18,
      meal: "lunch",
      serving: "1 large",
      time: "1:15 PM"
    },
    {
      id: "3",
      name: "Almonds",
      calories: 164,
      protein: 6,
      carbs: 6,
      fat: 14,
      meal: "snacks",
      serving: "1 oz",
      time: "3:45 PM"
    },
    {
      id: "4",
      name: "Salmon with Rice",
      calories: 338,
      protein: 32,
      carbs: 80,
      fat: 4,
      meal: "dinner",
      serving: "1 portion",
      time: "7:20 PM"
    }
  ];

  const groupedLog = todayLog.reduce((acc, entry) => {
    if (!acc[entry.meal]) {
      acc[entry.meal] = [];
    }
    acc[entry.meal].push(entry);
    return acc;
  }, {} as Record<string, LogEntry[]>);

  const mealTotals = Object.keys(groupedLog).reduce((acc, meal) => {
    const entries = groupedLog[meal];
    acc[meal] = {
      calories: entries.reduce((sum, entry) => sum + entry.calories, 0),
      protein: entries.reduce((sum, entry) => sum + entry.protein, 0),
      carbs: entries.reduce((sum, entry) => sum + entry.carbs, 0),
      fat: entries.reduce((sum, entry) => sum + entry.fat, 0),
    };
    return acc;
  }, {} as Record<string, { calories: number; protein: number; carbs: number; fat: number }>);

  const mealNames = {
    breakfast: "Breakfast",
    lunch: "Lunch", 
    dinner: "Dinner",
    snacks: "Snacks"
  };

  return (
    <div className="space-y-6 p-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-bold">Food Log</h1>
        </div>
        <Button 
          onClick={onAddFood}
          size="sm"
          className="bg-gradient-primary"
        >
          Add Food
        </Button>
      </div>

      {/* Date */}
      <div className="text-center">
        <p className="text-muted-foreground">Sunday, July 7</p>
      </div>

      {/* Meals */}
      <div className="space-y-4">
        {Object.keys(mealNames).map((meal) => {
          const entries = groupedLog[meal] || [];
          const totals = mealTotals[meal] || { calories: 0, protein: 0, carbs: 0, fat: 0 };
          
          return (
            <Card key={meal} className="shadow-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{mealNames[meal as keyof typeof mealNames]}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {totals.calories} kcal
                  </p>
                </div>
                {totals.calories > 0 && (
                  <p className="text-xs text-muted-foreground">
                    P: {totals.protein}g • C: {totals.carbs}g • F: {totals.fat}g
                  </p>
                )}
              </CardHeader>
              
              {entries.length > 0 ? (
                <CardContent className="space-y-3">
                  {entries.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{entry.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {entry.serving} • {entry.time}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          P: {entry.protein}g • C: {entry.carbs}g • F: {entry.fat}g
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{entry.calories}</p>
                        <p className="text-xs text-muted-foreground">kcal</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              ) : (
                <CardContent>
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground">No food logged yet</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={onAddFood}
                      className="mt-2"
                    >
                      Add food to {mealNames[meal as keyof typeof mealNames].toLowerCase()}
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Daily Summary */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Daily Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-nutrition-calories">1,247</p>
              <p className="text-xs text-muted-foreground">Calories</p>
            </div>
            <div>
              <p className="text-lg font-bold text-nutrition-protein">85g</p>
              <p className="text-xs text-muted-foreground">Protein</p>
            </div>
            <div>
              <p className="text-lg font-bold text-nutrition-carbs">156g</p>
              <p className="text-xs text-muted-foreground">Carbs</p>
            </div>
            <div>
              <p className="text-lg font-bold text-nutrition-fat">42g</p>
              <p className="text-xs text-muted-foreground">Fat</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FoodLog;