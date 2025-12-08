import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import mostafaImg from '@/assets/mostafa.jpg';
import hagerImg from '@/assets/hager.jpg';

// Wedding details - easy to update
const WEDDING_DATE = '19 ديسمبر ٢٠٢٥';
const WEDDING_TIME = 'السابعة مساءً';
const WEDDING_LOCATION = '    قصر ابو الدهب ';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const photo1Ref = useRef<HTMLDivElement>(null);
  const photo2Ref = useRef<HTMLDivElement>(null);
  const ampersandRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Create main timeline for hero animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Photos fade in and scale
      tl.from(
        [photo1Ref.current, photo2Ref.current],
        { scale: 0.5, opacity: 0, y: 50, duration: 1.2, stagger: 0.2 }
      );

      // Ampersand animates
      tl.from(
        ampersandRef.current,
        { scale: 0, opacity: 0, rotation: -180, duration: 0.8 },
        '-=0.5'
      );

      // Heading reveal
      tl.from(
        headingRef.current,
        { y: 60, opacity: 0, duration: 1 },
        '-=0.3'
      );

      // Subheading
      tl.from(
        subHeadingRef.current,
        { y: 40, opacity: 0, duration: 0.8 },
        '-=0.5'
      );

      // Details cards
      if (detailsRef.current?.children) {
        tl.from(
          detailsRef.current.children,
          { y: 30, opacity: 0, scale: 0.9, duration: 0.6, stagger: 0.15 },
          '-=0.3'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center section-padding pt-24 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-rose/10 rounded-full blur-2xl" />
      </div>

      {/* Photos section with floating animation */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-12 relative z-10">
        {/* Groom photo */}
        <div
          ref={photo1Ref}
          className="photo-frame w-40 h-40 md:w-56 md:h-56 animate-float"
        >
          <img
            src={mostafaImg}
            alt="مصطفى"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Heart connector */}
        <div
          ref={ampersandRef}
          className="absolute md:relative z-10 bg-gold text-background w-14 h-14 md:w-20 md:h-20 
            rounded-full flex items-center justify-center shadow-wedding animate-pulse-glow"
        >
          <svg
            className="w-7 h-7 md:w-10 md:h-10"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        {/* Bride photo */}
        <div
          ref={photo2Ref}
          className="photo-frame w-40 h-40 md:w-56 md:h-56 animate-float-reverse"
        >
          <img
            src={hagerImg}
            alt="هاجر"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Wedding text */}
      <div className="text-center max-w-3xl mx-auto relative z-10">
        <h1
          ref={headingRef}
          className="font-ruqaa text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight text-primary"
        >
          مصطفى <span className="text-gold">&</span> هاجر
        </h1>

        <p
          ref={subHeadingRef}
          className="text-lg md:text-2xl text-muted-foreground mb-10 font-light leading-relaxed"
        >
          بقلوب ملؤها الفرح والسعادة، ندعوكم لمشاركتنا أجمل لحظات حياتنا
          <br />
          <span className="text-primary font-medium">يوم خطوبتنا  </span>
        </p>

        {/* Details cards */}
        <div
          ref={detailsRef}
          className="flex flex-wrap justify-center gap-4 md:gap-6"
        >
          <div className="card-wedding flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">التاريخ</p>
              <p className="font-medium text-foreground">{WEDDING_DATE}</p>
            </div>
          </div>

          <div className="card-wedding flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">الوقت</p>
              <p className="font-medium text-foreground">{WEDDING_TIME}</p>
            </div>
          </div>

          <div className="card-wedding flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">المكان</p>
              <p className="font-medium text-foreground">{WEDDING_LOCATION}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
