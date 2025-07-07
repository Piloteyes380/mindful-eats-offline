import { useState } from "react";
import Dashboard from "@/components/dashboard";
import AddFood from "@/components/add-food";
import FoodLog from "@/components/food-log";
import SetGoals from "@/components/set-goals";
import Analytics from "@/components/analytics";
import Settings from "@/components/settings";
import BottomNav from "@/components/bottom-nav";
import { saveFoodEntry, saveGoals } from "@/lib/storage";
import type { FoodEntry, Goals } from "@/lib/storage";

type View = "dashboard" | "add-food" | "food-log" | "set-goals" | "analytics" | "settings";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("dashboard");

  const handleViewChange = (view: string) => {
    setCurrentView(view as View);
  };

  const handleAddFood = () => setCurrentView("add-food");
  const handleViewLog = () => setCurrentView("food-log");
  const handleSetGoals = () => setCurrentView("set-goals");
  const handleBack = () => setCurrentView("dashboard");

  const handleSaveFood = (food: Omit<FoodEntry, 'id' | 'date' | 'time'>) => {
    const savedEntry = saveFoodEntry({
      ...food,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })
    });
    console.log("Food saved to localStorage:", savedEntry);
  };

  const handleSaveGoals = (goals: Goals) => {
    saveGoals(goals);
    console.log("Goals saved to localStorage:", goals);
  };

  return (
    <div className="min-h-screen bg-gradient-data pb-20">
      <div className="animate-fade-in">
        {currentView === "dashboard" && (
          <Dashboard
            onAddFood={handleAddFood}
            onViewLog={handleViewLog}
            onSetGoals={handleSetGoals}
          />
        )}
        
        {currentView === "add-food" && (
          <AddFood
            onBack={handleBack}
            onSave={handleSaveFood}
          />
        )}
        
        {currentView === "food-log" && (
          <FoodLog
            onBack={handleBack}
            onAddFood={handleAddFood}
          />
        )}
        
        {currentView === "set-goals" && (
          <SetGoals
            onBack={handleBack}
            onSave={handleSaveGoals}
          />
        )}

        {currentView === "analytics" && (
          <Analytics
            onBack={handleBack}
          />
        )}

        {currentView === "settings" && (
          <Settings
            onBack={handleBack}
          />
        )}
      </div>

      <BottomNav 
        currentView={currentView} 
        onViewChange={handleViewChange} 
      />
    </div>
  );
};

export default Index;
