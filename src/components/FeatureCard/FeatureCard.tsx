import styles from './FeatureCard.module.css'

interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    badge?: 'most-used' | 'coming-soon';
}

export function FeatureCard({ title, description, icon, badge }: FeatureCardProps) {
    return (
        <div className={styles.featureCard}>
            {badge && (
                <span className={`${styles.featureBadge} ${badge === 'most-used' ? styles.badgeMostUsed : styles.badgeComingSoon
                    }`}>
                    {badge === 'most-used' ? 'Mais usado' : 'Em breve'}
                </span>
            )}
            <div className={styles.featureIcon}>{icon}</div>
            <h3 className={styles.featureTitle}>{title}</h3>
            <p className={styles.featureDescription}>{description}</p>
        </div>
    )
}
