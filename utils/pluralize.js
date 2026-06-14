/**
 * Returns the correct singular or plural form of a unit label based on count.
 * 
 * @param {number} count - The quantity to check
 * @param {string} unit - The singular unit label (e.g., "kit", "box", "litre")
 * @returns {string} - The unit label with correct plural form (e.g., "kit" or "kits")
 * 
 * Examples:
 *   pluralizeUnit(1, 'kit')   → 'kit'
 *   pluralizeUnit(3, 'kit')   → 'kits'
 *   pluralizeUnit(1, 'box')   → 'box'
 *   pluralizeUnit(5, 'box')   → 'boxes'
 *   pluralizeUnit(0, 'litre') → 'litres'
 */
export function pluralizeUnit(count, unit) {
    if (!unit) return 'units';
    if (count === 1) return unit;

    const lower = unit.toLowerCase();

    // Words ending in s, sh, ch, x, z → add "es"
    if (/(?:s|sh|ch|x|z)$/i.test(unit)) {
        return unit + 'es';
    }

    // Words ending in consonant + y → replace y with "ies"
    if (/[^aeiou]y$/i.test(unit)) {
        return unit.slice(0, -1) + 'ies';
    }

    // Default: add "s"
    return unit + 's';
}
