
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { WasteCard, WasteItem } from '@/components/WasteCard';
import { FadeIn, FadeInStagger } from '@/components/FadeIn';
import TransitionLayout from '@/components/TransitionLayout';
import { Trash, PlusCircle, X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const WasteTracker: React.FC = () => {
  const [wasteItems, setWasteItems] = useState<WasteItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState<Partial<WasteItem>>({
    name: '',
    amount: 100,
    unit: 'g',
    reason: 'expired',
    date: new Date()
  });

  // Load mock data (in a real app this would come from backend)
  useEffect(() => {
    const mockData: WasteItem[] = [
      {
        id: '1',
        name: 'Spinach',
        amount: 150,
        unit: 'g',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        reason: 'expired'
      },
      {
        id: '2',
        name: 'Milk',
        amount: 250,
        unit: 'ml',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        reason: 'expired'
      },
      {
        id: '3',
        name: 'Bread',
        amount: 200,
        unit: 'g',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        reason: 'excess'
      }
    ];
    setWasteItems(mockData);
  }, []);

  const handleAddWasteItem = () => {
    if (newItem.name) {
      const item: WasteItem = {
        id: Date.now().toString(),
        name: newItem.name || '',
        amount: newItem.amount || 100,
        unit: newItem.unit || 'g',
        date: newItem.date || new Date(),
        reason: (newItem.reason as 'expired' | 'excess' | 'other') || 'other'
      };

      setWasteItems([item, ...wasteItems]);
      setNewItem({
        name: '',
        amount: 100,
        unit: 'g',
        reason: 'expired',
        date: new Date()
      });
      setIsAdding(false);
      toast.success("Food waste item added successfully");
    }
  };

  const handleRemoveWasteItem = (id: string) => {
    setWasteItems(wasteItems.filter(item => item.id !== id));
    toast.success("Item removed from waste tracker");
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
                  <Trash className="h-5 w-5 text-primary" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold">Food Waste Tracker</h1>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="mb-6">
                <Button 
                  onClick={() => setIsAdding(true)} 
                  className="bg-nutrinet-600 hover:bg-nutrinet-700"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Waste Item
                </Button>
              </div>
            </FadeIn>

            {isAdding && (
              <FadeIn className="bg-card rounded-xl border border-border shadow-sm p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Add Waste Item</h3>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsAdding(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Food Name
                    </label>
                    <Input
                      id="name"
                      placeholder="e.g. Spinach, Milk, Bread"
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="amount" className="block text-sm font-medium mb-1">
                        Amount
                      </label>
                      <Input
                        id="amount"
                        type="number"
                        value={newItem.amount}
                        onChange={(e) => setNewItem({ 
                          ...newItem, 
                          amount: parseInt(e.target.value) || 0 
                        })}
                        min="1"
                      />
                    </div>
                    <div>
                      <label htmlFor="unit" className="block text-sm font-medium mb-1">
                        Unit
                      </label>
                      <select
                        id="unit"
                        value={newItem.unit}
                        onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="g">grams (g)</option>
                        <option value="ml">milliliters (ml)</option>
                        <option value="cups">cups</option>
                        <option value="tbsp">tablespoons</option>
                        <option value="tsp">teaspoons</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium mb-1">
                        Date
                      </label>
                      <Input
                        id="date"
                        type="date"
                        value={newItem.date ? new Date(newItem.date).toISOString().split('T')[0] : ''}
                        onChange={(e) => setNewItem({ 
                          ...newItem, 
                          date: new Date(e.target.value) 
                        })}
                      />
                    </div>
                    <div>
                      <label htmlFor="reason" className="block text-sm font-medium mb-1">
                        Reason
                      </label>
                      <select
                        id="reason"
                        value={newItem.reason}
                        onChange={(e) => setNewItem({ 
                          ...newItem, 
                          reason: e.target.value as 'expired' | 'excess' | 'other'
                        })}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="expired">Expired</option>
                        <option value="excess">Excess Food</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleAddWasteItem}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Item
                    </Button>
                  </div>
                </div>
              </FadeIn>
            )}

            <FadeIn>
              <WasteCard 
                wasteItems={wasteItems} 
                onRemove={handleRemoveWasteItem}
              />
            </FadeIn>
          </FadeInStagger>
        </div>
      </TransitionLayout>
    </>
  );
};

export default WasteTracker;
