import styles from './Avatar.module.css';

export default function Avatar({
    src,
    alt = '',
    name = '',
    size = 'md',
    online = false,
    badge,
    className = '',
}) {
    const initials = name
        ? name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
        : '?';

    const colorIndex = name ? name.charCodeAt(0) % 5 : 0;

    return (
        <div className={`${styles.wrapper} ${styles[size]} ${className}`}>
            {src ? (
                <img src={src} alt={alt || name} className={styles.image} />
            ) : (
                <div className={`${styles.fallback} ${styles[`color${colorIndex}`]}`}>
                    {initials}
                </div>
            )}
            {online && <span className={styles.onlineIndicator} />}
            {badge && <span className={styles.badge}>{badge}</span>}
        </div>
    );
}
