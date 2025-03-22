
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Leaf, Info, Target, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

interface NutritionCardProps {
  data: NutritionData;
  className?: string;
}

export const NutritionCard: React.FC<NutritionCardProps> = ({ 
  data,
  className 
}) => {
  const { calories, protein, carbs, fat, fiber, sugar } = data;
  const [nutritionGoals, setNutritionGoals] = useState({
    calories: 2000,
    protein: 50,
    carbs: 275,
    fat: 65,
    fiber: 28,
    sugar: 25
  });

  const macroData = [
    { name: 'Protein', value: protein, color: '#7FD15A' },
    { name: 'Carbs', value: carbs, color: '#59BFDB' },
    { name: 'Fat', value: fat, color: '#FFB152' },
  ];

  const total = macroData.reduce((sum, item) => sum + item.value, 0);
  
  const renderNutrientBar = (
    label: string, 
    amount: number, 
    unit: string, 
    color: string,
    max: number,
    info?: string
  ) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="font-medium">{label}</span>
          {info && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" className="h-6 w-6 p-0">
                    <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-sm">{info}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">{amount}{unit}</span>
          <span className="text-xs text-muted-foreground">/ {label === 'Calories' ? nutritionGoals.calories : 
            label === 'Protein' ? nutritionGoals.protein : 
            label === 'Carbs' ? nutritionGoals.carbs : 
            label === 'Fat' ? nutritionGoals.fat : 
            label === 'Fiber' ? nutritionGoals.fiber : 
            nutritionGoals.sugar}{unit}</span>
        </div>
      </div>
      <Progress value={(amount / max) * 100} className={`h-2 ${color}`} />
    </div>
  );

  const handleGoalChange = (nutrient: keyof typeof nutritionGoals, value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      setNutritionGoals(prev => ({
        ...prev,
        [nutrient]: numValue
      }));
    }
  };

  return (
    <div className={cn(
      "rounded-xl border border-border bg-card shadow-sm overflow-hidden",
      className
    )}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <Leaf className="h-4 w-4 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Nutrition Facts</h3>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Target className="h-4 w-4" />
                <span>Set Goals</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Nutrition Goals</SheetTitle>
                <SheetDescription>
                  Set your personal nutrition targets based on your needs.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                {Object.entries(nutritionGoals).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor={key} className="text-right capitalize col-span-1">
                      {key}
                    </Label>
                    <div className="col-span-3 flex items-center gap-2">
                      <Input
                        id={key}
                        type="number"
                        value={value}
                        onChange={(e) => handleGoalChange(key as keyof typeof nutritionGoals, e.target.value)}
                        min="0"
                      />
                      <span className="text-sm text-muted-foreground">
                        {key === 'calories' ? 'kcal' : 'g'}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="mt-2 text-sm text-muted-foreground">
                  <p className="mt-4">AI personalized insights based on your goals, location, and season coming soon!</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-center mb-2">
              <p className="text-sm text-muted-foreground">Total Calories</p>
              <div className="flex items-center justify-center gap-1">
                <p className="text-3xl font-bold">{calories}</p>
                <span className="text-xs text-muted-foreground mt-2">/ {nutritionGoals.calories}</span>
              </div>
            </div>

            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {macroData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              {macroData.map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-center gap-1">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <p className="text-sm">{item.value}g</p>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(item.value / total * 100)}%
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {renderNutrientBar('Protein', protein, 'g', 'bg-emerald-400', nutritionGoals.protein, 'Recommended daily protein intake is 0.8g per kg of body weight')}
            {renderNutrientBar('Carbs', carbs, 'g', 'bg-blue-400', nutritionGoals.carbs, 'Carbohydrates should make up 45-65% of your total daily calories')}
            {renderNutrientBar('Fat', fat, 'g', 'bg-amber-400', nutritionGoals.fat, 'Fat should make up 20-35% of your total daily calories')}
            {renderNutrientBar('Fiber', fiber, 'g', 'bg-amber-400', nutritionGoals.fiber, 'Recommended daily fiber intake is 25-30g')}
            {renderNutrientBar('Sugar', sugar, 'g', 'bg-rose-400', nutritionGoals.sugar, 'Try to limit added sugar to less than 25g per day')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionCard;
