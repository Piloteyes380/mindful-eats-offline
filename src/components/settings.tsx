import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";

interface SettingsProps {
  onBack: () => void;
}

const Settings = ({ onBack }: SettingsProps) => {
  const [settings, setSettings] = useState({
    notifications: true,
    reminderTime: "8:00",
    waterReminders: true,
    darkMode: false,
    units: "metric", // metric or imperial
    weekStartsOn: "monday" // monday or sunday
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    // TODO: Save to localStorage
    console.log("Updated setting:", key, value);
  };

  const handleExportData = () => {
    // TODO: Implement data export
    console.log("Exporting data...");
  };

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      // TODO: Clear localStorage
      console.log("Clearing all data...");
    }
  };

  return (
    <div className="space-y-6 p-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-xl font-bold">Settings</h1>
      </div>

      {/* Notifications */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Daily Reminders</p>
              <p className="text-sm text-muted-foreground">Get reminded to log your meals</p>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(checked) => updateSetting("notifications", checked)}
            />
          </div>

          {settings.notifications && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Reminder Time</p>
              <Select 
                value={settings.reminderTime} 
                onValueChange={(value) => updateSetting("reminderTime", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7:00">7:00 AM</SelectItem>
                  <SelectItem value="8:00">8:00 AM</SelectItem>
                  <SelectItem value="9:00">9:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="12:00">12:00 PM</SelectItem>
                  <SelectItem value="18:00">6:00 PM</SelectItem>
                  <SelectItem value="20:00">8:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Water Reminders</p>
              <p className="text-sm text-muted-foreground">Get reminded to drink water</p>
            </div>
            <Switch
              checked={settings.waterReminders}
              onCheckedChange={(checked) => updateSetting("waterReminders", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="font-medium">Units</p>
            <Select 
              value={settings.units} 
              onValueChange={(value) => updateSetting("units", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                <SelectItem value="imperial">Imperial (lbs, ft)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <p className="font-medium">Week Starts On</p>
            <Select 
              value={settings.weekStartsOn} 
              onValueChange={(value) => updateSetting("weekStartsOn", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monday">Monday</SelectItem>
                <SelectItem value="sunday">Sunday</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Data Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={handleExportData}
            >
              <span>Export Data to CSV</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start text-destructive border-destructive/20 hover:bg-destructive/5"
              onClick={handleClearData}
            >
              <span>Clear All Data</span>
            </Button>
          </div>

          <div className="pt-2">
            <p className="text-xs text-muted-foreground">
              Export includes all your food logs, goals, and preferences. 
              All data is stored locally on your device.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">About</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <p className="font-medium">CalorieTracker</p>
            <p className="text-sm text-muted-foreground">Version 1.0.0</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium">Privacy First</p>
            <p className="text-xs text-muted-foreground">
              Your data never leaves your device. No account required, 
              no tracking, no ads.
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium">Open Source</p>
            <p className="text-xs text-muted-foreground">
              Built with React, TypeScript, and Tailwind CSS.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="space-y-3">
        <Button 
          onClick={onBack}
          className="w-full bg-gradient-primary shadow-elevated"
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;