import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

interface SetGoalsProps {
  onBack: () => void;
  onSave: (goals: Goals) => void;
}

interface Goals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const SetGoals = ({ onBack, onSave }: SetGoalsProps) => {
  const [goals, setGoals] = useState<Goals>({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 67
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(goals);
    onBack();
  };

  const updateGoal = (field: keyof Goals, value: number) => {
    setGoals(prev => ({ ...prev, [field]: value }));
  };

  // Calculate percentages for macro goals
  const proteinCals = goals.protein * 4;
  const carbsCals = goals.carbs * 4;
  const fatCals = goals.fat * 9;
  const totalMacroCals = proteinCals + carbsCals + fatCals;

  const proteinPercent = Math.round((proteinCals / totalMacroCals) * 100);
  const carbsPercent = Math.round((carbsCals / totalMacroCals) * 100);
  const fatPercent = Math.round((fatCals / totalMacroCals) * 100);

  return (
    <div className="space-y-6 p-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-xl font-bold">Set Goals</h1>
      </div>

      {/* Goals Form */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Daily Nutrition Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Calories Goal */}
            <div className="space-y-2">
              <Label htmlFor="calories" className="text-base font-medium">
                Daily Calories
              </Label>
              <Input
                id="calories"
                type="number"
                value={goals.calories}
                onChange={(e) => updateGoal("calories", Number(e.target.value))}
                className="text-lg"
              />
              <p className="text-xs text-muted-foreground">
                Total daily calorie target
              </p>
            </div>

            {/* Macronutrient Goals */}
            <div className="space-y-4">
              <h3 className="font-medium">Macronutrient Goals</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="protein">Protein (grams)</Label>
                    <span className="text-sm text-nutrition-protein font-medium">
                      {proteinPercent}%
                    </span>
                  </div>
                  <Input
                    id="protein"
                    type="number"
                    value={goals.protein}
                    onChange={(e) => updateGoal("protein", Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="carbs">Carbohydrates (grams)</Label>
                    <span className="text-sm text-nutrition-carbs font-medium">
                      {carbsPercent}%
                    </span>
                  </div>
                  <Input
                    id="carbs"
                    type="number"
                    value={goals.carbs}
                    onChange={(e) => updateGoal("carbs", Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="fat">Fat (grams)</Label>
                    <span className="text-sm text-nutrition-fat font-medium">
                      {fatPercent}%
                    </span>
                  </div>
                  <Input
                    id="fat"
                    type="number"
                    value={goals.fat}
                    onChange={(e) => updateGoal("fat", Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            {/* Macro Distribution Visual */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Macro Distribution</p>
              <div className="h-3 bg-muted rounded-full overflow-hidden flex">
                <div 
                  className="bg-nutrition-protein"
                  style={{ width: `${proteinPercent}%` }}
                />
                <div 
                  className="bg-nutrition-carbs"
                  style={{ width: `${carbsPercent}%` }}
                />
                <div 
                  className="bg-nutrition-fat"
                  style={{ width: `${fatPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Protein {proteinPercent}%</span>
                <span>Carbs {carbsPercent}%</span>
                <span>Fat {fatPercent}%</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button 
                type="submit" 
                className="w-full bg-gradient-primary shadow-elevated"
              >
                Save Goals
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

      {/* Quick Preset Goals */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Quick Presets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-between"
              onClick={() => setGoals({ calories: 1800, protein: 135, carbs: 202, fat: 60 })}
            >
              <span>Weight Loss</span>
              <span className="text-xs text-muted-foreground">1,800 kcal</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-between"
              onClick={() => setGoals({ calories: 2200, protein: 165, carbs: 247, fat: 73 })}
            >
              <span>Maintenance</span>
              <span className="text-xs text-muted-foreground">2,200 kcal</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-between"
              onClick={() => setGoals({ calories: 2600, protein: 195, carbs: 292, fat: 87 })}
            >
              <span>Muscle Gain</span>
              <span className="text-xs text-muted-foreground">2,600 kcal</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SetGoals;