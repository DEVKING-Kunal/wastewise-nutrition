
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Leaf, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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

  const macroData = [
    { name: 'Protein', value: protein, color: '#4ADE80' },
    { name: 'Carbs', value: carbs, color: '#60A5FA' },
    { name: 'Fat', value: fat, color: '#F97316' },
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
        <span className="text-sm font-medium">{amount}{unit}</span>
      </div>
      <Progress value={(amount / max) * 100} className="h-2" indicatorClassName={color} />
    </div>
  );

  return (
    <div className={cn(
      "rounded-xl border border-border bg-card shadow-sm overflow-hidden",
      className
    )}>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <Leaf className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Nutrition Facts</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-center mb-2">
              <p className="text-sm text-muted-foreground">Total Calories</p>
              <p className="text-3xl font-bold">{calories}</p>
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
            {renderNutrientBar('Protein', protein, 'g', 'bg-emerald-500', 50, 'Recommended daily protein intake is 0.8g per kg of body weight')}
            {renderNutrientBar('Carbs', carbs, 'g', 'bg-blue-500', 300, 'Carbohydrates should make up 45-65% of your total daily calories')}
            {renderNutrientBar('Fat', fat, 'g', 'bg-orange-500', 70, 'Fat should make up 20-35% of your total daily calories')}
            {renderNutrientBar('Fiber', fiber, 'g', 'bg-amber-500', 30, 'Recommended daily fiber intake is 25-30g')}
            {renderNutrientBar('Sugar', sugar, 'g', 'bg-pink-500', 25, 'Try to limit added sugar to less than 25g per day')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionCard;
