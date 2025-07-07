import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Plus } from "lucide-react";

interface DashboardProps {
  onAddFood: () => void;
  onViewLog: () => void;
  onSetGoals: () => void;
}

const Dashboard = ({ onAddFood, onViewLog, onSetGoals }: DashboardProps) => {
  // Mock data - will be replaced with actual data from local storage
  const todayData = {
    calories: { consumed: 1247, goal: 2000 },
    protein: { consumed: 85, goal: 150 },
    carbs: { consumed: 156, goal: 250 },
    fat: { consumed: 42, goal: 67 },
    water: 6 // glasses
  };

  const calorieProgress = (todayData.calories.consumed / todayData.calories.goal) * 100;

  return (
    <div className="space-y-6 p-4 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Today</h1>
        <p className="text-muted-foreground">Sunday, July 7</p>
      </div>

      {/* Main Calorie Ring */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-4">
            <ProgressRing 
              progress={calorieProgress} 
              size={150} 
              color="calories"
              className="animate-scale-in"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {todayData.calories.consumed}
                </div>
                <div className="text-sm text-muted-foreground">
                  / {todayData.calories.goal} kcal
                </div>
              </div>
            </ProgressRing>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {todayData.calories.goal - todayData.calories.consumed} calories remaining
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Macronutrients */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Macronutrients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <ProgressRing 
                progress={(todayData.protein.consumed / todayData.protein.goal) * 100}
                size={80}
                strokeWidth={6}
                color="protein"
              >
                <div className="text-center">
                  <div className="text-sm font-semibold">{todayData.protein.consumed}g</div>
                </div>
              </ProgressRing>
              <div>
                <p className="text-xs font-medium">Protein</p>
                <p className="text-xs text-muted-foreground">{todayData.protein.goal}g goal</p>
              </div>
            </div>

            <div className="text-center space-y-2">
              <ProgressRing 
                progress={(todayData.carbs.consumed / todayData.carbs.goal) * 100}
                size={80}
                strokeWidth={6}
                color="carbs"
              >
                <div className="text-center">
                  <div className="text-sm font-semibold">{todayData.carbs.consumed}g</div>
                </div>
              </ProgressRing>
              <div>
                <p className="text-xs font-medium">Carbs</p>
                <p className="text-xs text-muted-foreground">{todayData.carbs.goal}g goal</p>
              </div>
            </div>

            <div className="text-center space-y-2">
              <ProgressRing 
                progress={(todayData.fat.consumed / todayData.fat.goal) * 100}
                size={80}
                strokeWidth={6}
                color="fat"
              >
                <div className="text-center">
                  <div className="text-sm font-semibold">{todayData.fat.consumed}g</div>
                </div>
              </ProgressRing>
              <div>
                <p className="text-xs font-medium">Fat</p>
                <p className="text-xs text-muted-foreground">{todayData.fat.goal}g goal</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Water Intake */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Water Intake</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-8 rounded-full border-2 transition-colors ${
                    i < todayData.water
                      ? 'bg-primary border-primary'
                      : 'border-muted bg-background'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{todayData.water}/8 glasses</p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          onClick={onAddFood}
          className="w-full bg-gradient-primary shadow-elevated"
          size="lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Food
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            onClick={onViewLog}
            className="border-primary/20 hover:bg-primary/5"
          >
            View Log
          </Button>
          <Button 
            variant="outline" 
            onClick={onSetGoals}
            className="border-primary/20 hover:bg-primary/5"
          >
            Set Goals
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;