import { useLayoutEffect, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  {
    time: '٧:٠٠ م',
    title: 'استقبال الضيوف',
    description: 'نرحب بكم والله يا ولاد ',
    icon: '🌹',
  },
  {
    time: '٨:٠٠ م',
    title: 'الزفة',
    description: 'لحظة دخول اجمد اتنين ',
    icon: '💍',
  },
  {
    time: '٩:٠٠ م',
    title: 'العشاء',
    description: ' بالهنا و الشفا  ',
    icon: '🍽️',
  },
  {
    time: '١٠:٣٠ م',
    title: 'التورتة والرقص',
    description: '  في كيس اسود ولمو الاكل محدش واخد باله',
    icon: '🎂',
  },
];

const Details = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation on scroll
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger animation
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 60, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="details"
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-primary/10 to-background"
    >
      <div className="container mx-auto max-w-5xl">
        <h2
          ref={headingRef}
          className="heading-romantic text-center mb-16"
        >
          تفاصيل اليوم
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              className="card-wedding text-center group hover:shadow-wedding-lg transition-all duration-500 hover:-translate-y-2"
            >
              {/* Timeline connector for larger screens */}
              {index < timelineEvents.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -left-3 w-6 h-0.5 bg-gold/30" />
              )}

              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {event.icon}
              </div>

              <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-3">
                {event.time}
              </div>

              <h3 className="text-xl font-ruqaa text-foreground mb-2">
                {event.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Details;
