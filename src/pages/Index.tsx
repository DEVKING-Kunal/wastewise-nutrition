
import React, { useEffect } from 'react';
import { FadeIn } from '@/components/FadeIn';
import { Hero } from '@/components/Hero';
import { Navbar } from '@/components/Navbar';
import TransitionLayout from '@/components/TransitionLayout';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <TransitionLayout>
        <Hero />
        <Footer />
      </TransitionLayout>
    </>
  );
};

export default Index;
