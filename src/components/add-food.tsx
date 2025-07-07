import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";

interface AddFoodProps {
  onBack: () => void;
  onSave: (food: FoodEntry) => void;
}

interface FoodEntry {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meal: string;
  serving: string;
}

const AddFood = ({ onBack, onSave }: AddFoodProps) => {
  const [food, setFood] = useState<FoodEntry>({
    name: "",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    meal: "breakfast",
    serving: "1 serving"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (food.name && food.calories > 0) {
      onSave(food);
      onBack();
    }
  };

  const updateField = (field: keyof FoodEntry, value: string | number) => {
    setFood(prev => ({ ...prev, [field]: value }));
  };

  // Quick food suggestions
  const quickFoods = [
    { name: "Banana", calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
    { name: "Chicken Breast (100g)", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { name: "Brown Rice (1 cup)", calories: 216, protein: 5, carbs: 45, fat: 1.8 },
    { name: "Avocado (half)", calories: 234, protein: 3, carbs: 12, fat: 21 },
  ];

  return (
    <div className="space-y-6 p-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-xl font-bold">Add Food</h1>
      </div>

      {/* Quick Add */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Quick Add</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {quickFoods.map((quickFood, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-between text-left h-auto p-3"
                onClick={() => setFood(prev => ({ ...prev, ...quickFood }))}
              >
                <div>
                  <p className="font-medium">{quickFood.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {quickFood.calories} kcal • P: {quickFood.protein}g • C: {quickFood.carbs}g • F: {quickFood.fat}g
                  </p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Manual Entry */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Manual Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Food Name</Label>
              <Input
                id="name"
                value={food.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="e.g. Grilled Chicken"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="meal">Meal</Label>
                <Select value={food.meal} onValueChange={(value) => updateField("meal", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="snacks">Snacks</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="serving">Serving</Label>
                <Input
                  id="serving"
                  value={food.serving}
                  onChange={(e) => updateField("serving", e.target.value)}
                  placeholder="1 cup"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="calories">Calories</Label>
                <Input
                  id="calories"
                  type="number"
                  value={food.calories || ""}
                  onChange={(e) => updateField("calories", Number(e.target.value))}
                  placeholder="0"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="protein">Protein (g)</Label>
                <Input
                  id="protein"
                  type="number"
                  step="0.1"
                  value={food.protein || ""}
                  onChange={(e) => updateField("protein", Number(e.target.value))}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="carbs">Carbs (g)</Label>
                <Input
                  id="carbs"
                  type="number"
                  step="0.1"
                  value={food.carbs || ""}
                  onChange={(e) => updateField("carbs", Number(e.target.value))}
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fat">Fat (g)</Label>
                <Input
                  id="fat"
                  type="number"
                  step="0.1"
                  value={food.fat || ""}
                  onChange={(e) => updateField("fat", Number(e.target.value))}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <Button 
                type="submit" 
                className="w-full bg-gradient-primary shadow-elevated"
                disabled={!food.name || food.calories <= 0}
              >
                Add to Log
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={onBack}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddFood;