
import { FadeIn, FadeInStagger } from '@/components/FadeIn';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, Apple, Utensils, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard = ({ icon: Icon, title, description, className }: FeatureCardProps) => {
  return (
    <div className={cn(
      "p-6 rounded-2xl bg-white border border-border shadow-sm card-hover",
      className
    )}>
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export const Hero = () => {
  return (
    <div className="overflow-hidden">
      <div className="relative pt-20 pb-16 md:pt-32 md:pb-24">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-30">
            <div className="absolute top-0 left-0 w-full h-full rounded-full bg-nutrinet-200 blur-3xl" />
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-nutrinet-400/30 blur-2xl" />
          </div>
        </div>

        <div className="container mx-auto px-4">
          <FadeInStagger className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm">
                A smarter approach to nutrition
              </div>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 bg-gradient-to-r from-nutrinet-800 to-nutrinet-600 bg-clip-text text-transparent">
                Nourish Your Body, Reduce Waste
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                Track nutrition, plan meals, and minimize food waste—all in one intuitive platform for a healthier you and planet.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="rounded-full px-6 py-6 bg-nutrinet-600 hover:bg-nutrinet-700">
                  <Link to="/calculator">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-6 py-6">
                  <Link to="/waste-tracker">Track Food Waste</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-nutrinet-100 to-nutrinet-50 opacity-80" />
                <img 
                  src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2940&auto=format&fit=crop" 
                  alt="Healthy food bowl" 
                  className="absolute inset-0 w-full h-full object-cover rounded-3xl mix-blend-overlay"
                  loading="lazy"
                />
                <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/10" />
                
                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 glass p-4 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-nutrinet-100 flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-nutrinet-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Daily Goal</p>
                      <p className="text-xs text-muted-foreground">86% complete</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 glass p-4 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-nutrinet-100 flex items-center justify-center">
                      <Utensils className="w-5 h-5 text-nutrinet-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Waste Saved</p>
                      <p className="text-xs text-muted-foreground">2.3kg this month</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInStagger>

          <div className="mt-24">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
                Everything you need for mindful eating
              </h2>
            </FadeIn>

            <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={Apple}
                title="Nutrition Tracking"
                description="Calculate precise nutritional values from ingredients and portion sizes."
              />
              <FeatureCard
                icon={Utensils}
                title="Meal Planning"
                description="Create personalized meal plans based on your nutritional goals."
                className="md:translate-y-8"
              />
              <FeatureCard
                icon={BarChart2}
                title="Waste Reduction"
                description="Track and minimize your food waste with smart suggestions."
              />
            </FadeInStagger>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
