import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/progress-ring";
import { ArrowLeft } from "lucide-react";

interface AnalyticsProps {
  onBack: () => void;
}

const Analytics = ({ onBack }: AnalyticsProps) => {
  // Mock analytics data - will be replaced with actual data from localStorage
  const weeklyData = {
    currentWeek: {
      averageCalories: 1847,
      totalCalories: 12929,
      averageProtein: 142,
      averageCarbs: 185,
      averageFat: 68,
      daysLogged: 7
    },
    previousWeek: {
      averageCalories: 1923,
      totalCalories: 13461,
      averageProtein: 138,
      averageCarbs: 201,
      averageFat: 71,
      daysLogged: 7
    },
    goals: {
      calories: 2000,
      protein: 150,
      carbs: 250,
      fat: 67
    }
  };

  const weeklyTrend = [
    { day: "Mon", calories: 1850, protein: 145, carbs: 180, fat: 70 },
    { day: "Tue", calories: 1650, protein: 120, carbs: 165, fat: 55 },
    { day: "Wed", calories: 2100, protein: 160, carbs: 210, fat: 85 },
    { day: "Thu", calories: 1780, protein: 135, carbs: 175, fat: 62 },
    { day: "Fri", calories: 1950, protein: 148, carbs: 195, fat: 72 },
    { day: "Sat", calories: 2200, protein: 165, carbs: 220, fat: 88 },
    { day: "Sun", calories: 1630, protein: 125, carbs: 150, fat: 58 }
  ];

  const calculateProgress = (current: number, goal: number) => 
    Math.min((current / goal) * 100, 100);

  const calorieChange = weeklyData.currentWeek.averageCalories - weeklyData.previousWeek.averageCalories;
  const proteinChange = weeklyData.currentWeek.averageProtein - weeklyData.previousWeek.averageProtein;

  return (
    <div className="space-y-6 p-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-xl font-bold">Analytics</h1>
      </div>

      {/* Weekly Overview */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <ProgressRing 
                progress={calculateProgress(weeklyData.currentWeek.averageCalories, weeklyData.goals.calories)}
                size={100}
                color="calories"
              >
                <div className="text-center">
                  <div className="text-lg font-bold">{weeklyData.currentWeek.averageCalories}</div>
                  <div className="text-xs text-muted-foreground">avg kcal</div>
                </div>
              </ProgressRing>
              <div className="mt-2">
                <p className="text-xs text-muted-foreground">
                  {calorieChange > 0 ? '+' : ''}{calorieChange} vs last week
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Protein</span>
                <div className="text-right">
                  <p className="text-sm font-semibold text-nutrition-protein">
                    {weeklyData.currentWeek.averageProtein}g
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {proteinChange > 0 ? '+' : ''}{proteinChange}g
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Carbs</span>
                <div className="text-right">
                  <p className="text-sm font-semibold text-nutrition-carbs">
                    {weeklyData.currentWeek.averageCarbs}g
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Fat</span>
                <div className="text-right">
                  <p className="text-sm font-semibold text-nutrition-fat">
                    {weeklyData.currentWeek.averageFat}g
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Days Logged</span>
                <div className="text-right">
                  <p className="text-sm font-semibold">
                    {weeklyData.currentWeek.daysLogged}/7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Breakdown */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Daily Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weeklyTrend.map((day, index) => (
              <div key={day.day} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center space-x-3">
                  <div className="w-10 text-center">
                    <p className="text-sm font-medium">{day.day}</p>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-nutrition-calories rounded-full transition-all duration-300"
                        style={{ 
                          width: `${Math.min((day.calories / weeklyData.goals.calories) * 100, 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{day.calories}</p>
                  <p className="text-xs text-muted-foreground">kcal</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Goal Achievement */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Goal Achievement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Calories</span>
                <span className="text-sm font-medium">
                  {Math.round(calculateProgress(weeklyData.currentWeek.averageCalories, weeklyData.goals.calories))}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-nutrition-calories rounded-full transition-all duration-500"
                  style={{ 
                    width: `${calculateProgress(weeklyData.currentWeek.averageCalories, weeklyData.goals.calories)}%` 
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Protein</span>
                <span className="text-sm font-medium">
                  {Math.round(calculateProgress(weeklyData.currentWeek.averageProtein, weeklyData.goals.protein))}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-nutrition-protein rounded-full transition-all duration-500"
                  style={{ 
                    width: `${calculateProgress(weeklyData.currentWeek.averageProtein, weeklyData.goals.protein)}%` 
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Carbs</span>
                <span className="text-sm font-medium">
                  {Math.round(calculateProgress(weeklyData.currentWeek.averageCarbs, weeklyData.goals.carbs))}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-nutrition-carbs rounded-full transition-all duration-500"
                  style={{ 
                    width: `${calculateProgress(weeklyData.currentWeek.averageCarbs, weeklyData.goals.carbs)}%` 
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Fat</span>
                <span className="text-sm font-medium">
                  {Math.round(calculateProgress(weeklyData.currentWeek.averageFat, weeklyData.goals.fat))}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-nutrition-fat rounded-full transition-all duration-500"
                  style={{ 
                    width: `${calculateProgress(weeklyData.currentWeek.averageFat, weeklyData.goals.fat)}%` 
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Weekly Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-nutrition-calories">
                {weeklyData.currentWeek.totalCalories.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Total Calories</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">
                {weeklyData.currentWeek.daysLogged}
              </p>
              <p className="text-xs text-muted-foreground">Days Logged</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;