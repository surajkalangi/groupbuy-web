import styles from './ProgressBar.module.css';

export default function ProgressBar({
    value = 0,
    max = 100,
    variant = 'primary',
    size = 'md',
    showLabel = false,
    label,
    animated = true,
    className = '',
}) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
        <div className={`${styles.wrapper} ${className}`}>
            {(showLabel || label) && (
                <div className={styles.labelRow}>
                    {label && <span className={styles.label}>{label}</span>}
                    {showLabel && (
                        <span className={styles.percentage}>{Math.round(percentage)}%</span>
                    )}
                </div>
            )}
            <div className={`${styles.track} ${styles[size]}`}>
                <div
                    className={`${styles.fill} ${styles[variant]} ${animated ? styles.animated : ''}`}
                    style={{ width: `${percentage}%` }}
                    role="progressbar"
                    aria-valuenow={value}
                    aria-valuemin={0}
                    aria-valuemax={max}
                />
            </div>
        </div>
    );
}
