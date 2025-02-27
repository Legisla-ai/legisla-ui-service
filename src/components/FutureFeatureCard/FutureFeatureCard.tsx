import { Button } from 'antd';
import styles from './FutureFeatureCard.module.css';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: 'most-used' | 'coming-soon';
}

export function FutureFeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.title}>
        <div className={styles.featureIcon}>{icon}</div>
        <h3 className={styles.featureTitle}>{title}</h3>
      </div>
      <p className={styles.featureDescription}>{description}</p>
      <Button type="primary" className={styles.featureButton} disabled={true}>
        {' '}
        Em breve
      </Button>
    </div>
  );
}
