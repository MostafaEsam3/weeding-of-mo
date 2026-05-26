import { useLayoutEffect, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div
        ref={contentRef}
        className="container mx-auto px-4 text-center relative z-10"
      >
        {/* Signature names */}
        <h3 className="font-ruqaa text-4xl md:text-6xl text-primary-foreground mb-6">
          مصطفى <span className="text-gold mx-2">&</span> هاجر
        </h3>

        {/* Romantic closing statement */}
        <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto leading-relaxed">
  
          <br />
          <span className="text-gold font-medium">شكراً ليكم   </span>
        </p>

        {/* Misk Al-Khitam */}
        <div className="inline-block">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary-foreground/30" />
            <svg className="w-6 h-6 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <div className="h-px w-12 bg-primary-foreground/30" />
          </div>
          
          <p className="font-ruqaa text-2xl md:text-3xl text-gold">
           الحمدالله والصلاة والسلام على رسول الله وعلى آله وصحبه أجمعين 
          </p>
        </div>

        {/* Copyright */}
        <p className="mt-12 text-sm text-primary-foreground/60">
      مصطفى  هاجر   ❤️
        </p>
      </div>
    </footer>
  );
};

export default Footer;
