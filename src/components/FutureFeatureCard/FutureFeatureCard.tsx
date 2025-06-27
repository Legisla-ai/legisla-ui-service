import { Button } from 'antd';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: 'most-used' | 'coming-soon';
}

export function FutureFeatureCard({ title, description, icon }: Readonly<FeatureCardProps>) {
  return (
    <div
      className="relative p-6 transition-all duration-300 ease-in-out flex flex-col gap-4 h-full backdrop-blur-10 shadow-legisla-sm opacity-85 hover:-translate-y-px hover:shadow-legisla-md hover:opacity-100"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(249, 250, 251, 0.9))',
        borderRadius: '12px',
        border: '1px solid rgba(226, 232, 240, 0.6)',
      }}
    >
      <div className="text-xl font-semibold text-gray-900 flex items-center gap-2">
        <div
          className="text-gray-400 text-3xl p-3 transition-all duration-300 ease-in-out hover:scale-105 hover:text-gray-500"
          style={{
            background: 'linear-gradient(135deg, rgba(156, 163, 175, 0.1), rgba(107, 114, 128, 0.1))',
            borderRadius: '12px',
          }}
        >
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-500">{title}</h3>
      </div>
      <p className="text-gray-400 leading-relaxed text-base flex-grow">{description}</p>
      <Button
        type="primary"
        className="w-full !text-gray-600 text-base font-semibold !border-none py-4 px-6 transition-all duration-300 ease-out cursor-not-allowed mt-auto"
        style={{
          background: 'linear-gradient(135deg, #e5e7eb, #d1d5db)',
          border: 'none',
          color: '#6b7280',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(107, 114, 128, 0.1)',
        }}
        disabled={true}
      >
        Em breve
      </Button>
    </div>
  );
}
