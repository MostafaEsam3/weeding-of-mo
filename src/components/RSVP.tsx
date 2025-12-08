import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type AttendanceStatus = 'yes' | 'no' | null;

const foodOptions = [
  { value: 'yes', label: 'أكيد طبعاً! 🍖', emoji: '😋' },
  { value: 'menu', label: 'حسب المنيو', emoji: '🤔' },
  { value: 'cake', label: 'عشان التورتة بس 🎂', emoji: '🍰' },
];

const danceOptions = [
  { value: 'pro', label: 'أنا ملك الدانس فلور 💃', emoji: '🕺' },
  { value: 'shy', label: 'بس لو حد جرني 😅', emoji: '🙈' },
  { value: 'no', label: 'هشجع من بعيد 👏', emoji: '😎' },
];

const arrivalOptions = [
  { value: 'early', label: 'من أول ما الباب يتفتح ⏰', emoji: '🏃' },
  { value: 'ontime', label: 'في الميعاد بالظبط', emoji: '✅' },
];



const RSVP = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLDivElement>(null);

  const [attendance, setAttendance] = useState<AttendanceStatus>(null);
  const [foodChoice, setFoodChoice] = useState('');
  const [danceChoice, setDanceChoice] = useState('');
  const [arrivalChoice, setArrivalChoice] = useState('');
  const [giftChoice, setGiftChoice] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(
        cardRef.current,
        {
          y: 80,
          opacity: 0,
          scale: 0.95,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate response after selection
  useEffect(() => {
    if (attendance !== null) {
      gsap.from(
        '.response-message',
        { y: 20, opacity: 0, scale: 0.9, duration: 0.5, ease: 'back.out(1.7)' }
      );
    }
  }, [attendance]);

  // Animate new questions when they appear
  useEffect(() => {
    if (attendance === 'yes') {
      gsap.from('.question-card', {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }
  }, [attendance]);

  // Animate confirmation
  useEffect(() => {
    if (isSubmitted && confirmRef.current) {
      gsap.from(
        confirmRef.current,
        { 
          scale: 0, 
          opacity: 0, 
          rotation: -10, 
          duration: 0.8, 
          ease: 'elastic.out(1, 0.5)' 
        }
      );

      // Confetti-like particles
      const particles = confirmRef.current.querySelectorAll('.particle');
      gsap.from(
        particles,
        {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );
    }
  }, [isSubmitted]);

  const handleSubmit = () => {
    // Store in localStorage (no backend)
    const rsvpData = {
      attendance,
      foodChoice,
      danceChoice,
      arrivalChoice,
      giftChoice,
      message,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('wedding-rsvp', JSON.stringify(rsvpData));
    setIsSubmitted(true);
  };

  const getResponseMessage = () => {
    if (attendance === 'yes') {
      return '🎉 يا سلاااام! فرحتونا والله، هنستناكم !';
    }
    return '😢 يا خسارة! هتوحشونا بجد، بس إن شاء الله نشوفكم قريب';
  };

  if (isSubmitted) {
    return (
      <section
        id="rsvp"
        ref={sectionRef}
        className="section-padding bg-gradient-to-b from-primary/5 to-background"
      >
        <div className="container mx-auto max-w-xl">
          <div
            ref={confirmRef}
            className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-wedding-lg"
          >
            {/* Decorative particles */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="particle absolute top-4 right-4 w-3 h-3 bg-gold rounded-full" />
              <div className="particle absolute top-8 left-8 w-2 h-2 bg-gold-light rounded-full" />
              <div className="particle absolute bottom-6 right-12 w-4 h-4 bg-rose/50 rounded-full" />
              <div className="particle absolute bottom-10 left-6 w-2 h-2 bg-gold rounded-full" />
            </div>

            <div className="text-6xl mb-6">
              {attendance === 'yes' ? '💝' : '💕'}
            </div>

            <h3 className="font-ruqaa text-2xl md:text-3xl mb-4">
              شكراً لردكم!
            </h3>

            <p className="text-primary-foreground/90 text-lg">
              {attendance === 'yes'
                ? 'تم تسجيل حضوركم، منورين والله!'
                : 'قدرنا ردكم، ويا رب نشوفكم في فرحة تانية'}
            </p>

            {message && (
              <div className="mt-6 p-4 bg-primary-foreground/10 rounded-xl">
                <p className="text-sm text-primary-foreground/70 mb-1">رسالتكم:</p>
                <p className="text-primary-foreground italic">"{message}"</p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="rsvp"
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-primary/5 to-background"
    >
      <div className="container mx-auto max-w-2xl">
        <div
          ref={cardRef}
          className="bg-primary text-primary-foreground rounded-3xl p-6 md:p-10 shadow-wedding-lg"
        >
          <h2 className="font-ruqaa text-center text-3xl md:text-5xl mb-8">
            جاي ولا مش جاي؟ 💍
          </h2>

          {/* Attendance buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => setAttendance('yes')}
              className={`flex-1 py-5 px-8 rounded-2xl font-bold text-xl transition-all duration-300
                flex items-center justify-center gap-3 ${
                attendance === 'yes'
                  ? 'bg-green-500 text-white scale-105 shadow-lg'
                  : 'bg-primary-foreground text-primary hover:bg-primary-foreground/90 hover:scale-105'
              }`}
            >
              <span className="text-2xl">✓</span>
              أيوه جاي/ة 🎉
            </button>

            <button
              onClick={() => setAttendance('no')}
              className={`flex-1 py-5 px-8 rounded-2xl font-bold text-xl transition-all duration-300
                flex items-center justify-center gap-3 ${
                attendance === 'no'
                  ? 'bg-primary-foreground text-primary scale-105 shadow-lg'
                  : 'bg-primary-foreground/20 text-primary-foreground border-2 border-primary-foreground/30 hover:bg-primary-foreground/30 hover:scale-105'
              }`}
            >
              <span className="text-2xl">✗</span>
              للأسف مش هقدر 😢
            </button>
          </div>

          {/* Response message */}
          {attendance !== null && (
            <div className="response-message text-center p-5 bg-primary-foreground/10 rounded-2xl mb-8">
              <p className="text-xl font-medium text-primary-foreground">
                {getResponseMessage()}
              </p>
            </div>
          )}

          {/* Additional fun questions (only if attending) */}
          {attendance === 'yes' && (
            <div className="space-y-6">
              {/* Food question */}
              <div className="question-card bg-primary-foreground/10 rounded-2xl p-5">
                <label className="block text-primary-foreground font-bold text-lg mb-4">
                  🍽️ هتيجي لو فيه أكل؟
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {foodOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFoodChoice(option.value)}
                      className={`p-4 rounded-xl transition-all duration-300 text-base font-medium ${
                        foodChoice === option.value
                          ? 'bg-gold text-primary scale-105 shadow-lg'
                          : 'bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{option.emoji}</span>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dance question */}
              <div className="question-card bg-primary-foreground/10 rounded-2xl p-5">
                <label className="block text-primary-foreground font-bold text-lg mb-4">
                  💃 هترقص معانا؟
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {danceOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setDanceChoice(option.value)}
                      className={`p-4 rounded-xl transition-all duration-300 text-base font-medium ${
                        danceChoice === option.value
                          ? 'bg-gold text-primary scale-105 shadow-lg'
                          : 'bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{option.emoji}</span>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Arrival time question */}
              <div className="question-card bg-primary-foreground/10 rounded-2xl p-5">
                <label className="block text-primary-foreground font-bold text-lg mb-4">
                  ⏰ هتيجي امتى؟
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {arrivalOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setArrivalChoice(option.value)}
                      className={`p-4 rounded-xl transition-all duration-300 text-base font-medium ${
                        arrivalChoice === option.value
                          ? 'bg-gold text-primary scale-105 shadow-lg'
                          : 'bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{option.emoji}</span>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gift question */}
            

              {/* Message field */}
              <div className="question-card bg-primary-foreground/10 rounded-2xl p-5">
                <label className="block text-primary-foreground font-bold text-lg mb-4">
  قولو كلمه حلوه ل هاجر                      (فرحووها  )
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="اكتبوا لنا كلمة حلوة..."
                  className="w-full p-4 rounded-xl border-2 border-primary-foreground/20 bg-primary-foreground/10 
                    focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300
                    resize-none h-28 text-primary-foreground placeholder:text-primary-foreground/50"
                />
              </div>
            </div>
          )}

          {/* Submit button */}
          {attendance !== null && (
            <button
              onClick={handleSubmit}
              className="w-full mt-8 py-5 px-8 rounded-2xl font-bold text-xl 
                bg-gold text-primary hover:bg-gold-light transition-all duration-300
                hover:scale-105 shadow-lg"
            >
              تأكيد الرد ✨
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default RSVP;
