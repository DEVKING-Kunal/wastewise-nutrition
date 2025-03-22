
import React, { useEffect } from 'react';
import { FadeIn } from '@/components/FadeIn';
import { Hero } from '@/components/Hero';
import { Navbar } from '@/components/Navbar';
import TransitionLayout from '@/components/TransitionLayout';

const Index: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <TransitionLayout>
        <Hero />
      </TransitionLayout>
    </>
  );
};

export default Index;
