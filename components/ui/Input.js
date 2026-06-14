import styles from './Input.module.css';

export default function Input({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    helperText,
    icon,
    required = false,
    disabled = false,
    multiline = false,
    rows = 3,
    maxLength,
    className = '',
    id,
    ...props
}) {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

    const InputTag = multiline ? 'textarea' : 'input';

    return (
        <div className={`${styles.wrapper} ${error ? styles.hasError : ''} ${className}`}>
            {label && (
                <label htmlFor={inputId} className={styles.label}>
                    {label}
                    {required && <span className={styles.required}>*</span>}
                </label>
            )}
            <div className={styles.inputContainer}>
                {icon && <span className={styles.icon}>{icon}</span>}
                <InputTag
                    id={inputId}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    maxLength={maxLength}
                    rows={multiline ? rows : undefined}
                    className={`${styles.input} ${icon ? styles.hasIcon : ''} ${multiline ? styles.textarea : ''}`}
                    {...props}
                />
            </div>
            {(error || helperText) && (
                <span className={`${styles.helper} ${error ? styles.errorText : ''}`}>
                    {error || helperText}
                </span>
            )}
            {maxLength && (
                <span className={styles.counter}>
                    {(value || '').length}/{maxLength}
                </span>
            )}
        </div>
    );
}
