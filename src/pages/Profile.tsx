
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { FadeIn, FadeInStagger } from '@/components/FadeIn';
import TransitionLayout from '@/components/TransitionLayout';
import { User, Settings, Bell, Shield, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';

const Profile: React.FC = () => {
  const { currentUser, logout, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !currentUser) {
      navigate('/login');
    }
  }, [currentUser, loading, navigate]);

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully");
  };
  
  if (loading) {
    return <Loader fullScreen text="Loading profile..." />;
  }

  if (!currentUser) {
    return null; // Will redirect via useEffect
  }

  return (
    <>
      <Navbar />
      <TransitionLayout>
        <div className="container mx-auto px-4 pt-20 pb-24 md:pt-24 md:pb-32">
          <FadeInStagger className="space-y-8">
            <FadeIn>
              <div className="flex items-center space-x-3 mb-8">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold">Your Profile</h1>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <FadeIn className="lg:col-span-1">
                <div className="bg-card rounded-xl border border-border shadow-sm p-6 space-y-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={currentUser.photoURL || undefined} />
                      <AvatarFallback>{currentUser.displayName?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold">{currentUser.displayName || 'User'}</h2>
                    <p className="text-muted-foreground">{currentUser.email}</p>
                  </div>

                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Personal Info
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Preferences
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="mr-2 h-4 w-4" />
                      Privacy
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-destructive hover:text-destructive"
                      onClick={logout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </Button>
                  </div>
                </div>
              </FadeIn>

              <FadeIn className="lg:col-span-3">
                <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                  <div className="border-b border-border p-6">
                    <h2 className="text-xl font-semibold">Account Settings</h2>
                    <p className="text-muted-foreground">Manage your account preferences</p>
                  </div>

                  <div className="p-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Daily Nutrition Summary</p>
                            <p className="text-sm text-muted-foreground">Receive a daily summary of your nutrition intake</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Food Waste Alerts</p>
                            <p className="text-sm text-muted-foreground">Get notified when food items might expire soon</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Weekly Reports</p>
                            <p className="text-sm text-muted-foreground">Receive detailed weekly nutrition and waste reports</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-border pt-6">
                      <h3 className="text-lg font-medium mb-4">Privacy Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Share Nutrition Data</p>
                            <p className="text-sm text-muted-foreground">Allow anonymous data sharing for research</p>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Public Profile</p>
                            <p className="text-sm text-muted-foreground">Make your profile visible to community members</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-border pt-6">
                      <h3 className="text-lg font-medium mb-4">Dietary Goals</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Daily Calorie Target</p>
                            <p className="text-sm text-muted-foreground">Set your daily calorie intake goal</p>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="number"
                              defaultValue={2000}
                              className="w-20 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                            <span className="ml-2 text-muted-foreground">kcal</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Protein Goal</p>
                            <p className="text-sm text-muted-foreground">Set your daily protein intake goal</p>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="number"
                              defaultValue={120}
                              className="w-20 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                            <span className="ml-2 text-muted-foreground">g</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button onClick={handleSaveSettings} className="bg-nutrinet-600 hover:bg-nutrinet-700">
                        Save Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </FadeInStagger>
        </div>
        <Footer />
      </TransitionLayout>
    </>
  );
};

export default Profile;
