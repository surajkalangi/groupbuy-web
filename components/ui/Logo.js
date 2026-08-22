import Link from 'next/link';
import styles from './Logo.module.css';

export function LogoIcon({ className = '', size = 28 }) {
    return (
        <svg
            className={`${styles.logoIconSvg} ${className}`}
            width={size}
            height={size}
            viewBox="0 0 36 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            {/* Top Stacking Block (Head/Top Unit) */}
            <rect x="11" y="1" width="14" height="10" rx="3.5" fill="currentColor" />

            {/* Middle Stacking Layer (Shoulders / Upper tier) */}
            <path
                d="M8.5 13.5H27.5C29.433 13.5 31 15.067 31 17V22.5C31 23.3284 30.3284 24 29.5 24H25.5C24.6716 24 24 23.3284 24 22.5V19C24 17.8954 23.1046 17 22 17H14C12.8954 17 12 17.8954 12 19V22.5C12 23.3284 11.3284 24 10.5 24H6.5C5.67157 24 5 23.3284 5 22.5V17C5 15.067 6.567 13.5 8.5 13.5Z"
                fill="currentColor"
            />

            {/* Bottom Stacking Layer (Base / Wide Foundation) */}
            <path
                d="M5.5 26.5H30.5C32.433 26.5 34 28.067 34 30V35C34 36.1046 33.1046 37 32 37H26C24.8954 37 24 36.1046 24 35V31.5C24 30.3954 23.1046 29.5 22 29.5H14C12.8954 29.5 12 30.3954 12 31.5V35C12 36.1046 11.1046 37 10 37H4C2.89543 37 2 36.1046 2 35V30C2 28.067 3.567 26.5 5.5 26.5Z"
                fill="currentColor"
            />
        </svg>
    );
}

export default function Logo({
    size = 'md',
    variant = 'full', // 'full' | 'icon' | 'wordmark'
    href = '/feed',
    className = '',
    withLink = true,
    accentColor = 'var(--primary, #00875A)',
    textColor = 'var(--on-surface, #191C1E)',
}) {
    const sizeConfig = {
        sm: { iconSize: 22, containerClass: styles.sizeSm, textClass: styles.textSm },
        md: { iconSize: 28, containerClass: styles.sizeMd, textClass: styles.textMd },
        lg: { iconSize: 36, containerClass: styles.sizeLg, textClass: styles.textLg },
        xl: { iconSize: 46, containerClass: styles.sizeXl, textClass: styles.textXl },
    };

    const currentSize = sizeConfig[size] || sizeConfig.md;

    const content = (
        <div className={`${styles.logoContainer} ${currentSize.containerClass} ${className}`}>
            {variant !== 'wordmark' && (
                <div className={styles.iconWrapper} style={{ color: accentColor }}>
                    <LogoIcon size={currentSize.iconSize} />
                </div>
            )}
            {variant !== 'icon' && (
                <span className={`${styles.brandText} ${currentSize.textClass}`} style={{ color: textColor }}>
                    <span className={styles.letsPart}>Lets</span>
                    <span className={styles.stackPart} style={{ color: accentColor }}>Stack</span>
                </span>
            )}
        </div>
    );

    if (!withLink) {
        return content;
    }

    return (
        <Link href={href} className={styles.logoLink} aria-label="LetsStack Home">
            {content}
        </Link>
    );
}
