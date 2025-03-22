
import React from 'react';
import { Trash, AlertTriangle, TrendingDown, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export interface WasteItem {
  id: string;
  name: string;
  amount: number;
  unit: string;
  date: Date;
  reason: 'expired' | 'excess' | 'other';
}

interface WasteCardProps {
  wasteItems: WasteItem[];
  className?: string;
  onRemove?: (id: string) => void;
}

export const WasteCard: React.FC<WasteCardProps> = ({ 
  wasteItems,
  className,
  onRemove
}) => {
  const totalWasteWeight = wasteItems
    .filter(item => item.unit === 'g')
    .reduce((total, item) => total + item.amount, 0);
  
  const totalWasteVolume = wasteItems
    .filter(item => item.unit === 'ml')
    .reduce((total, item) => total + item.amount, 0);

  // Group waste by date for the chart
  const chartData = wasteItems.reduce((acc: any[], item) => {
    const date = format(new Date(item.date), 'MMM d');
    const existingDay = acc.find(d => d.date === date);
    
    if (existingDay) {
      existingDay.amount += item.amount;
    } else {
      acc.push({ date, amount: item.amount });
    }
    
    return acc;
  }, []);

  // Sort by date
  chartData.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const renderIcon = (reason: string) => {
    switch (reason) {
      case 'expired':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'excess':
        return <TrendingDown className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-pink-500" />;
    }
  };

  const getReasonText = (reason: string) => {
    switch (reason) {
      case 'expired':
        return 'Expired';
      case 'excess':
        return 'Excess';
      default:
        return 'Other';
    }
  };

  return (
    <div className={cn(
      "rounded-xl border border-border bg-card shadow-sm overflow-hidden",
      className
    )}>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <Trash className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Food Waste Tracker</h3>
        </div>

        {wasteItems.length === 0 ? (
          <div className="text-center text-muted-foreground p-6">
            <p>No waste data yet. Start tracking to see insights.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-lg bg-muted/40 p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Total Solid Waste</p>
                <p className="text-2xl font-bold">
                  {totalWasteWeight < 1000 
                    ? `${totalWasteWeight}g` 
                    : `${(totalWasteWeight / 1000).toFixed(1)}kg`}
                </p>
              </div>
              <div className="rounded-lg bg-muted/40 p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Total Liquid Waste</p>
                <p className="text-2xl font-bold">
                  {totalWasteVolume < 1000 
                    ? `${totalWasteVolume}ml` 
                    : `${(totalWasteVolume / 1000).toFixed(1)}L`}
                </p>
              </div>
            </div>

            <div className="h-60 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    width={30}
                  />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#438b82" 
                    fill="#b6ded6" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm">Recent Waste Items</h4>
              {wasteItems.slice(0, 5).map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center justify-between py-2 px-3 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      {renderIcon(item.reason)}
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(item.date), 'MMM d, yyyy')}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground">
                          {getReasonText(item.reason)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">
                      {item.amount}{item.unit}
                    </span>
                    {onRemove && (
                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WasteCard;
