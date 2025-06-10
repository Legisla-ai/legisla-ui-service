import { Button, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { FireOutlined } from '@ant-design/icons'; // Ícone de foguinho
import styles from './FeatureCard.module.css';

interface FeatureCardProps {
  title: string;
  description: string;
  buttonText: string;
  link: string;
  icon: React.ReactNode;
  mostUsed?: boolean;
}

export function FeatureCard({ title, description, buttonText, link, icon, mostUsed }: FeatureCardProps) {
  return (
    <div className={styles.featureCard}>
      {mostUsed && (
        <Tag color="volcano" className={styles.mostUsedTag}>
          <FireOutlined/>
          <p className={styles.mostUsedTagText}>Mais usado</p>
        </Tag>
      )}
      <div className={styles.title}>
        <div className={styles.featureIcon}>{icon}</div>
        <h3 className={styles.featureTitle}>{title}</h3>
      </div>
      <p className={styles.featureDescription}>{description}</p>
      <Link to={link}>
        <Button type="primary" className={`${styles.featureButton} btn-primary`}>
          {buttonText}
        </Button>
      </Link>
    </div>
  );
}