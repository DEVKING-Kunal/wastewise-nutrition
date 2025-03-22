
import React, { useState } from 'react';
import { PlusCircle, MinusCircle, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FadeIn } from '@/components/FadeIn';
import { cn } from '@/lib/utils';

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
}

interface IngredientInputProps {
  ingredients: Ingredient[];
  onChange: (ingredients: Ingredient[]) => void;
  className?: string;
}

export const IngredientInput: React.FC<IngredientInputProps> = ({ 
  ingredients,
  onChange,
  className
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newIngredient, setNewIngredient] = useState<Partial<Ingredient>>({
    name: '',
    amount: 100,
    unit: 'g'
  });

  const handleAddIngredient = () => {
    if (newIngredient.name) {
      const ingredient: Ingredient = {
        id: Date.now().toString(),
        name: newIngredient.name,
        amount: newIngredient.amount || 100,
        unit: newIngredient.unit || 'g'
      };

      onChange([...ingredients, ingredient]);
      setNewIngredient({ name: '', amount: 100, unit: 'g' });
      setIsAdding(false);
    }
  };

  const handleRemoveIngredient = (id: string) => {
    onChange(ingredients.filter(ing => ing.id !== id));
  };

  const handleUpdateAmount = (id: string, amount: number) => {
    onChange(
      ingredients.map(ing => 
        ing.id === id 
          ? { ...ing, amount: Math.max(1, amount) } 
          : ing
      )
    );
  };

  const filteredIngredients = searchValue
    ? ingredients.filter(ing => 
        ing.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    : ingredients;

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search ingredients..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setIsAdding(true)}
          className="shrink-0"
        >
          <PlusCircle className="h-5 w-5" />
        </Button>
      </div>

      {isAdding && (
        <FadeIn className="p-4 rounded-lg border border-border bg-muted/30">
          <div className="space-y-4">
            <div className="flex justify-between">
              <h3 className="font-medium">Add new ingredient</h3>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsAdding(false)}
                className="h-6 w-6"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              <Input
                placeholder="Ingredient name"
                value={newIngredient.name}
                onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
              />
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={newIngredient.amount}
                  onChange={(e) => setNewIngredient({ 
                    ...newIngredient, 
                    amount: parseInt(e.target.value) || 0 
                  })}
                  className="w-24"
                  min="1"
                />
                <select
                  value={newIngredient.unit}
                  onChange={(e) => setNewIngredient({ ...newIngredient, unit: e.target.value })}
                  className="flex h-10 w-20 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="g">g</option>
                  <option value="ml">ml</option>
                  <option value="cups">cups</option>
                  <option value="tbsp">tbsp</option>
                  <option value="tsp">tsp</option>
                </select>
                <Button onClick={handleAddIngredient} className="ml-auto">
                  Add
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      )}

      <div className="space-y-3">
        {filteredIngredients.length === 0 ? (
          <div className="text-center p-6 text-muted-foreground">
            {searchValue 
              ? 'No ingredients match your search' 
              : 'Add ingredients to get started'}
          </div>
        ) : (
          filteredIngredients.map((ingredient) => (
            <div 
              key={ingredient.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors group"
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium truncate">{ingredient.name}</p>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => handleUpdateAmount(ingredient.id, ingredient.amount - 10)}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
                <div className="w-16 text-center">
                  {ingredient.amount}{ingredient.unit}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => handleUpdateAmount(ingredient.id, ingredient.amount + 10)}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive"
                  onClick={() => handleRemoveIngredient(ingredient.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default IngredientInput;
