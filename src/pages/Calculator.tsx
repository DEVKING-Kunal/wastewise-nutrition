
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { IngredientInput, Ingredient } from '@/components/IngredientInput';
import { NutritionCard, NutritionData } from '@/components/NutritionCard';
import { FadeIn, FadeInStagger } from '@/components/FadeIn';
import TransitionLayout from '@/components/TransitionLayout';
import { Calculator as CalculatorIcon, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Mock nutrition data calculation - in a real app this would fetch from an API
const calculateNutrition = (ingredients: Ingredient[]): NutritionData => {
  // Simple mock calculation based on ingredient amounts
  const totalWeight = ingredients.reduce((sum, ing) => {
    if (ing.unit === 'g') return sum + ing.amount;
    // Convert other units to grams (just for demo)
    if (ing.unit === 'ml') return sum + ing.amount * 1;
    if (ing.unit === 'cups') return sum + ing.amount * 240;
    if (ing.unit === 'tbsp') return sum + ing.amount * 15;
    if (ing.unit === 'tsp') return sum + ing.amount * 5;
    return sum + ing.amount;
  }, 0);

  // Mock calculation - in reality would be based on a food database
  return {
    calories: Math.round(totalWeight * 1.5),
    protein: Math.round(totalWeight * 0.05),
    carbs: Math.round(totalWeight * 0.15),
    fat: Math.round(totalWeight * 0.03),
    fiber: Math.round(totalWeight * 0.02),
    sugar: Math.round(totalWeight * 0.04)
  };
};

const Calculator: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [nutrition, setNutrition] = useState<NutritionData>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0
  });

  useEffect(() => {
    // Recalculate nutrition whenever ingredients change
    setNutrition(calculateNutrition(ingredients));
  }, [ingredients]);

  const handleSaveRecipe = () => {
    if (ingredients.length === 0) {
      toast.error("Please add at least one ingredient first");
      return;
    }
    
    // In a real app, this would save to database
    toast.success("Recipe saved successfully");
  };

  return (
    <>
      <Navbar />
      <TransitionLayout>
        <div className="container mx-auto px-4 pt-20 pb-24 md:pt-24 md:pb-32">
          <FadeInStagger className="space-y-6">
            <FadeIn>
              <div className="flex items-center space-x-3 mb-8">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CalculatorIcon className="h-5 w-5 text-primary" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold">Nutrition Calculator</h1>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2">
                <FadeIn className="bg-card rounded-xl border border-border shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Ingredients</h2>
                    <Button onClick={handleSaveRecipe} size="sm">
                      <Save className="mr-2 h-4 w-4" />
                      Save Recipe
                    </Button>
                  </div>
                  <IngredientInput 
                    ingredients={ingredients} 
                    onChange={setIngredients} 
                  />
                </FadeIn>
              </div>

              <div className="lg:col-span-3">
                <FadeIn>
                  <NutritionCard data={nutrition} />
                </FadeIn>
              </div>
            </div>
          </FadeInStagger>
        </div>
      </TransitionLayout>
    </>
  );
};

export default Calculator;
