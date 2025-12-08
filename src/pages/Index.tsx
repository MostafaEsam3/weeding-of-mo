import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Details from '@/components/Details';
import RSVP from '@/components/RSVP';
import FunNotes from '@/components/FunNotes';
import Footer from '@/components/Footer';
import FloatingHearts from '@/components/FloatingHearts';

const Index = () => {
  return (
    <main className="min-h-screen bg-background relative">
      {/* Floating hearts background effect */}
      <FloatingHearts />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main sections */}
      <Hero />
      <Details />
      <RSVP />
      <FunNotes />
      <Footer />
    </main>
  );
};

export default Index;
