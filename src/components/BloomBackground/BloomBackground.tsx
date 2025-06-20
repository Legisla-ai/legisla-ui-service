// src/components/BloomBackground/BloomBackground.tsx
import { useEffect, useRef } from 'react';
import Logo from '@/components/Logo/Logo';

const BloomBackground = () => {
  const bloom1Ref = useRef<HTMLDivElement>(null);
  const bloom2Ref = useRef<HTMLDivElement>(null);
  const bloom3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTransform = (element: HTMLDivElement | null, range = 20) => {
      if (element) {
        const randomX = Math.floor(Math.random() * (range * 2)) - range;
        const randomY = Math.floor(Math.random() * (range * 2)) - range;
        element.style.transform = `translate(${randomX}px, ${randomY}px)`;
      }
    };

    // Set initial transitions - slower and more subtle
    if (bloom1Ref.current) {
      bloom1Ref.current.style.transition = 'transform 8s ease-in-out';
      updateTransform(bloom1Ref.current, 15);
    }
    if (bloom2Ref.current) {
      bloom2Ref.current.style.transition = 'transform 10s ease-in-out';
      updateTransform(bloom2Ref.current, 20);
    }
    if (bloom3Ref.current) {
      bloom3Ref.current.style.transition = 'transform 12s ease-in-out';
      updateTransform(bloom3Ref.current, 18);
    }

    // More subtle intervals with longer durations
    const interval1 = setInterval(() => updateTransform(bloom1Ref.current, 15), 8000);
    const interval2 = setInterval(() => updateTransform(bloom2Ref.current, 20), 10000);
    const interval3 = setInterval(() => updateTransform(bloom3Ref.current, 18), 12000);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, []);

  return (
    <div className="min-h-screen hidden lg:flex flex-1 items-center justify-center bg-black p-8 relative overflow-hidden">
      {/* Primary gradient bloom */}
      <div
        ref={bloom1Ref}
        style={{ filter: 'blur(40px)' }}
        className="absolute top-[20%] left-[10%] w-[300px] h-[300px] opacity-40"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#026490] via-[#4fe0e0] to-transparent" />
      </div>

      {/* Secondary gradient bloom */}
      <div
        ref={bloom2Ref}
        style={{ filter: 'blur(50px)' }}
        className="absolute bottom-[25%] right-[15%] w-[250px] h-[250px] opacity-30"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-bl from-[#4fe0e0] via-[#026490] to-transparent" />
      </div>

      {/* Accent bloom */}
      <div
        ref={bloom3Ref}
        style={{ filter: 'blur(35px)' }}
        className="absolute top-[60%] left-[60%] w-[200px] h-[200px] opacity-25"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#22d3ee] to-transparent" />
      </div>

      {/* Logo and title */}
      <div className="flex items-end space-x-4 relative z-10">
        <Logo className="w-16 h-16" />
        <h1 className="text-white text-5xl font-bold">Legisla.ai</h1>
      </div>
    </div>
  );
};

export default BloomBackground;
