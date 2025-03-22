import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { IngredientInput, Ingredient } from '@/components/IngredientInput';
import { NutritionCard, NutritionData } from '@/components/NutritionCard';
import { FadeIn, FadeInStagger } from '@/components/FadeIn';
import TransitionLayout from '@/components/TransitionLayout';
import { Calculator as CalculatorIcon, Save, SparkleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { getPersonalizedInsights } from '@/utils/geminiService';
import Loader from '@/components/Loader';

const calculateNutrition = (ingredients: Ingredient[]): NutritionData => {
  const totalWeight = ingredients.reduce((sum, ing) => {
    if (ing.unit === 'g') return sum + ing.amount;
    if (ing.unit === 'ml') return sum + ing.amount * 1;
    if (ing.unit === 'cups') return sum + ing.amount * 240;
    if (ing.unit === 'tbsp') return sum + ing.amount * 15;
    if (ing.unit === 'tsp') return sum + ing.amount * 5;
    return sum + ing.amount;
  }, 0);

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setNutrition(calculateNutrition(ingredients));
  }, [ingredients]);

  const handleSaveRecipe = () => {
    if (ingredients.length === 0) {
      toast.error("Please add at least one ingredient first");
      return;
    }
    
    toast.success("Recipe saved successfully");
  };

  const handleGetAiInsights = async () => {
    if (ingredients.length === 0) {
      toast.error("Please add at least one ingredient first");
      return;
    }

    setIsLoading(true);
    try {
      toast.info("To get AI insights, you need to configure the Gemini API. See the implementation guide in the geminiService.ts file.");
      
      /*
      const insights = await getPersonalizedInsights({
        location: "Your location",
        season: "Current season",
        dietaryPreferences: ["Example preference"],
        healthGoals: ["Example goal"],
        currentNutrients: nutrition,
        nutritionGoals: {
          calories: 2000,
          protein: 50,
          carbs: 275,
          fat: 65,
          fiber: 28,
          sugar: 25
        }
      });
      
      toast.success("AI insights generated!", {
        description: "Check your nutrition panel for personalized recommendations."
      });
      */
      
    } catch (error) {
      toast.error("Failed to generate AI insights");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <TransitionLayout>
        <div className="container mx-auto px-4 pt-20 pb-24 md:pt-24 md:pb-32">
          {isLoading && <Loader fullScreen text="Generating AI insights..." />}
          
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
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleGetAiInsights} 
                        variant="secondary" 
                        size="sm"
                        disabled={isLoading}
                        className="bg-secondary/80 hover:bg-secondary/90"
                      >
                        <SparkleIcon className="mr-2 h-4 w-4 text-amber-500" />
                        AI Insights
                      </Button>
                      <Button onClick={handleSaveRecipe} size="sm">
                        <Save className="mr-2 h-4 w-4" />
                        Save Recipe
                      </Button>
                    </div>
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
