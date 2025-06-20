import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { FireOutlined } from '@ant-design/icons'; // Ícone de foguinho

interface FeatureCardProps {
  title: string;
  description: string;
  buttonText: string;
  link: string;
  icon: React.ReactNode;
  mostUsed?: boolean;
}

export function FeatureCard({ title, description, buttonText, link, icon, mostUsed }: Readonly<FeatureCardProps>) {
  return (
    <div className="relative p-6 bg-white transition-all duration-300 ease-in-out flex flex-col gap-4 h-full backdrop-blur-10 shadow-legisla-sm hover:shadow-legisla-lg group"
         style={{
           borderRadius: '12px',
           border: '1px solid rgba(226, 232, 240, 0.6)',
         }}>
      {mostUsed && (
        <div className="absolute -top-2 -right-2 px-3 py-1.5 text-white flex items-center text-xs font-semibold shadow-badge"
             style={{ 
               background: 'linear-gradient(135deg, #f59e0b, #d97706)',
               borderRadius: '12px'
             }}>
          <FireOutlined />
          <p className="ml-1 text-xs">Mais usado</p>
        </div>
      )}
      <div className="text-xl font-semibold text-gray-900 flex items-center gap-2">
        <div className="text-legisla-turquoise-2 text-3xl p-3"
             style={{ 
               background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.1), rgba(2, 100, 144, 0.1))',
               borderRadius: '12px'
             }}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 leading-relaxed text-base flex-grow">{description}</p>
      <Link to={link}>
        <Button 
          type="primary" 
          className="w-full !text-white text-base font-semibold !border-none py-4 px-6 transition-all duration-300 ease-in-out mt-auto"
          style={{
            background: 'linear-gradient(135deg, #026490, #22d3ee)',
            border: 'none',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(2, 100, 144, 0.2)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #22d3ee, #026490)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(2, 100, 144, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #026490, #22d3ee)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(2, 100, 144, 0.2)';
          }}
        >
          {buttonText}
        </Button>
      </Link>
    </div>
  );
}
