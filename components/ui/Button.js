import styles from './Button.module.css';

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    disabled = false,
    loading = false,
    icon,
    iconPosition = 'left',
    onClick,
    type = 'button',
    className = '',
    ...props
}) {
    const classes = [
        styles.button,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : '',
        loading ? styles.loading : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            className={classes}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {loading && <span className={styles.spinner} />}
            {icon && iconPosition === 'left' && (
                <span className={styles.icon}>{icon}</span>
            )}
            <span className={styles.label}>{children}</span>
            {icon && iconPosition === 'right' && (
                <span className={styles.icon}>{icon}</span>
            )}
        </button>
    );
}
