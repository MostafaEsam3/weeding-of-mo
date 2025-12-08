import { useLayoutEffect, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const notes = [
  {
    emoji: '👗',
    title: 'الدريس كود',
    content: 'الأناقة مطلوبة! ممنوع الشبشب والترنج مش عاوزين فلاحين (بنهزر... أو لأ 😅)',
  },
  {
    emoji: '⏰',
    title: 'الميعاد',
    content: 'لو جيتوا متأخرين، هتلاقوا التورتة خلصت! ⚠️',
  },
  {
    emoji: '📱',
    title: 'السوشيال ميديا',
    content: 'صوروا براحتكم بس متنزلوش حاجه ! 📸',
  },
  {
    emoji: '💃',
    title: 'الرقص',
    content: 'الدانس فلور مفتوح للجميع، حتى لو مش بتعرفوا ترقصوا 🕺',
  },
];

const FunNotes = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
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

      // Notes cards animation with stagger
      if (notesRef.current) {
        gsap.fromTo(
          notesRef.current.children,
          { 
            x: (index) => (index % 2 === 0 ? -50 : 50), 
            opacity: 0,
            rotation: (index) => (index % 2 === 0 ? -5 : 5),
          },
          {
            x: 0,
            opacity: 1,
            rotation: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: notesRef.current,
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
      id="notes"
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-background to-primary/10"
    >
      <div className="container mx-auto max-w-4xl">
        <h2
          ref={headingRef}
          className="heading-romantic text-center mb-16"
        >
          ملاحظات لطيفة 📝
        </h2>

        <div
          ref={notesRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {notes.map((note, index) => (
            <div
              key={index}
              className="card-wedding flex gap-4 hover:shadow-wedding-lg transition-all duration-500 
                hover:-translate-y-1 group"
            >
              <div className="text-4xl flex-shrink-0 transform group-hover:scale-110 
                group-hover:rotate-12 transition-transform duration-300">
                {note.emoji}
              </div>
              <div>
                <h3 className="text-lg font-ruqaa text-foreground mb-2">
                  {note.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {note.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FunNotes;
