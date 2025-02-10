// src/components/BloomBackground/BloomBackground.tsx
import { useEffect, useRef } from 'react';
import Logo from '@/components/Logo/Logo';

const BloomBackground = () => {
  const bloom1Ref = useRef<HTMLDivElement>(null);
  const bloom2Ref = useRef<HTMLDivElement>(null);
  const bloom3Ref = useRef<HTMLDivElement>(null);
  const bloom4Ref = useRef<HTMLDivElement>(null);
  const bloom5Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTransformAndBrightness = (element: HTMLDivElement | null, blurValue: string, range = 50) => {
      if (element) {
        const randomX = Math.floor(Math.random() * (range * 2)) - range;
        const randomY = Math.floor(Math.random() * (range * 2)) - range;
        const randomBrightness = (Math.random() * 0.4 + 0.8).toFixed(2);
        element.style.transform = `translate(${randomX}px, ${randomY}px)`;
        element.style.filter = `blur(${blurValue}) brightness(${randomBrightness})`;
      }
    };

    if (bloom1Ref.current) {
      bloom1Ref.current.style.transition = 'transform 4s ease-in-out, filter 4s ease-in-out';
      updateTransformAndBrightness(bloom1Ref.current, '18px', 50);
    }
    if (bloom2Ref.current) {
      bloom2Ref.current.style.transition = 'transform 5s ease-in-out, filter 5s ease-in-out';
      updateTransformAndBrightness(bloom2Ref.current, '20px', 50);
    }
    if (bloom3Ref.current) {
      bloom3Ref.current.style.transition = 'transform 4.5s ease-in-out, filter 4.5s ease-in-out';
      updateTransformAndBrightness(bloom3Ref.current, '22px', 50);
    }
    if (bloom4Ref.current) {
      bloom4Ref.current.style.transition = 'transform 5.5s ease-in-out, filter 5.5s ease-in-out';
      updateTransformAndBrightness(bloom4Ref.current, '24px', 50);
    }
    if (bloom5Ref.current) {
      bloom5Ref.current.style.transition = 'transform 3.5s ease-in-out, filter 3.5s ease-in-out';
      updateTransformAndBrightness(bloom5Ref.current, '26px', 50);
    }

    const interval1 = setInterval(() => updateTransformAndBrightness(bloom1Ref.current, '24px', 50), 4000);
    const interval2 = setInterval(() => updateTransformAndBrightness(bloom2Ref.current, '28px', 50), 5000);
    const interval3 = setInterval(() => updateTransformAndBrightness(bloom3Ref.current, '24px', 50), 4500);
    const interval4 = setInterval(() => updateTransformAndBrightness(bloom4Ref.current, '20px', 50), 5500);
    const interval5 = setInterval(() => updateTransformAndBrightness(bloom5Ref.current, '22px', 50), 3500);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
      clearInterval(interval4);
      clearInterval(interval5);
    };
  }, []);

  return (
    <div className="hidden lg:flex flex-1 items-center justify-center bg-black p-8 relative overflow-hidden">
      <div
        ref={bloom1Ref}
        style={{ filter: 'blur(14px) brightness(1)' }}
        className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] opacity-70"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#026490] via-transparent to-transparent" />
      </div>
      <div
        ref={bloom2Ref}
        style={{ filter: 'blur(14px) brightness(1)' }}
        className="absolute top-[30%] left-[70%] w-[300px] h-[300px] opacity-60"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#026490] via-transparent to-transparent" />
      </div>
      <div
        ref={bloom3Ref}
        style={{ filter: 'blur(14px) brightness(1)' }}
        className="absolute bottom-[-20%] right-[-5%] w-[350px] h-[350px] opacity-60"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-bl from-[#026490] via-transparent to-transparent" />
      </div>
      <div
        ref={bloom4Ref}
        style={{ filter: 'blur(14px) brightness(1)' }}
        className="absolute top-[-10%] right-[-10%] w-[350px] h-[250px] opacity-50"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-tl from-[#026490] via-transparent to-transparent" />
      </div>
      <div
        ref={bloom5Ref}
        style={{ filter: 'blur(14px) brightness(1)' }}
        className="absolute bottom-[5%] left-[5%] w-[300px] h-[300px] opacity-55"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#026490] via-transparent to-transparent" />
      </div>
      <div className="flex items-end space-x-4 relative z-10">
        <Logo className="w-16 h-16" />
        <h1 className="text-white text-5xl font-bold">Legisla.ai</h1>
      </div>
    </div>
  );
};

export default BloomBackground;
