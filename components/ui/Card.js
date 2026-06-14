import styles from './Card.module.css';

export default function Card({
    children,
    variant = 'default',
    padding = 'md',
    hover = false,
    onClick,
    className = '',
    ...props
}) {
    const classes = [
        styles.card,
        styles[variant],
        styles[`pad-${padding}`],
        hover ? styles.hoverable : '',
        onClick ? styles.clickable : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <div className={classes} onClick={onClick} {...props}>
            {children}
        </div>
    );
}
