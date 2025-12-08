import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const navLinks = [
  { href: '#hero', label: 'الرئيسية' },
  { href: '#details', label: 'التفاصيل' },
  { href: '#rsvp', label: 'الحضور' },
  { href: '#notes', label: 'ملاحظات' },
];

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useLayoutEffect(() => {
    // Animate navbar on load
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

  useEffect(() => {
    // Handle scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-md shadow-wedding py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <ul className="flex justify-center gap-6 md:gap-12">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="relative text-foreground/80 hover:text-primary font-medium text-sm md:text-base
                  transition-colors duration-300 py-2 px-1
                  after:content-[''] after:absolute after:bottom-0 after:right-0 
                  after:w-0 after:h-0.5 after:bg-gold after:transition-all after:duration-300
                  hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
