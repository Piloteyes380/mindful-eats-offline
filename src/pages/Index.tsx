import { useState } from "react";
import Dashboard from "@/components/dashboard";
import AddFood from "@/components/add-food";
import FoodLog from "@/components/food-log";
import SetGoals from "@/components/set-goals";

type View = "dashboard" | "add-food" | "food-log" | "set-goals";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("dashboard");

  const handleAddFood = () => setCurrentView("add-food");
  const handleViewLog = () => setCurrentView("food-log");
  const handleSetGoals = () => setCurrentView("set-goals");
  const handleBack = () => setCurrentView("dashboard");

  const handleSaveFood = (food: any) => {
    // TODO: Save to localStorage
    console.log("Saving food:", food);
  };

  const handleSaveGoals = (goals: any) => {
    // TODO: Save to localStorage
    console.log("Saving goals:", goals);
  };

  return (
    <div className="min-h-screen bg-gradient-data">
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
      </div>
    </div>
  );
};

export default Index;
