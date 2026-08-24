'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import { mockClans } from '@/data/clans';
import { mockPitches } from '@/data/pitches';
import { pluralizeUnit } from '@/utils/pluralize';
import styles from './page.module.css';
import AuthGuard from '@/components/auth/AuthGuard';
import { useAuth } from '@/context/AuthContext';

const CATEGORIES = [
    { id: 'groceries', label: '🌾 Farm Produce & Groceries' },
    { id: 'home', label: '🏠 Home Setup & Utilities' },
    { id: 'fitness', label: '💪 Gym & Fitness Nutrition' },
    { id: 'baby', label: '👶 Baby & Parenting' },
    { id: 'pets', label: '🐾 Pets & Dog Care' },
    { id: 'wedding', label: '💍 Weddings & Traditional Gifts' },
    { id: 'gourmet', label: '🧁 Gourmet & Home Bakers' },
    { id: 'service', label: '🛠️ Home Services & Deep Cleaning' },
    { id: 'digital', label: '💻 Digital Subscriptions & Software' },
    { id: 'travel', label: '✈️ Group Trips & Experiences' },
];

const LOCALITY_PRESETS = [
    { name: 'Hitec City', city: 'Hyderabad', lat: 17.4435, lng: 78.3772 },
    { name: 'Gachibowli', city: 'Hyderabad', lat: 17.4401, lng: 78.3489 },
    { name: 'Madhapur', city: 'Hyderabad', lat: 17.4483, lng: 78.3915 },
    { name: 'Jubilee Hills', city: 'Hyderabad', lat: 17.4319, lng: 78.4073 },
    { name: 'Banjara Hills', city: 'Hyderabad', lat: 17.4156, lng: 78.4354 },
    { name: 'Tellapur', city: 'Hyderabad', lat: 17.4812, lng: 78.2914 },
    { name: 'Kondapur', city: 'Hyderabad', lat: 17.4699, lng: 78.3578 },
    { name: 'Financial District', city: 'Hyderabad', lat: 17.4190, lng: 78.3490 },
    { name: 'Whitefield', city: 'Bengaluru', lat: 12.9698, lng: 77.7499 },
    { name: 'HSR Layout', city: 'Bengaluru', lat: 12.9121, lng: 77.6446 },
    { name: 'Indiranagar', city: 'Bengaluru', lat: 12.9784, lng: 77.6408 },
    { name: 'Koramangala', city: 'Bengaluru', lat: 12.9352, lng: 77.6245 },
    { name: 'Bandra Kurla Complex (BKC)', city: 'Mumbai', lat: 19.0664, lng: 72.8687 },
    { name: 'Powai (Hiranandani)', city: 'Mumbai', lat: 19.1176, lng: 72.9060 },
];

function CreatePitchForm() {
    const router = useRouter();
    const { currentUser } = useAuth();
    const searchParams = useSearchParams();
    const draftId = searchParams.get('draftId');
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // ── Step 1: Product & Sourcing Details ──
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('groceries');
    const [description, setDescription] = useState('');
    const [productLink, setProductLink] = useState('');
    const [photos, setPhotos] = useState([null, null, null]);
    const [photoPreviews, setPhotoPreviews] = useState([null, null, null]);
    const [retailPrice, setRetailPrice] = useState('');
    const [sellerName, setSellerName] = useState('');
    const [sellerId, setSellerId] = useState('');
    const [isVerifiedVendor, setIsVerifiedVendor] = useState(false);

    // ── Step 2: Pricing & Capacity Economics ──
    const [minOrder, setMinOrder] = useState('');
    const [maxCapacity, setMaxCapacity] = useState('');
    const [unitType, setUnitType] = useState('');
    const [costPerUnit, setCostPerUnit] = useState('');

    // ── Step 3: Rules, Delivery Logistics & Policies ──
    const [deadline, setDeadline] = useState('');
    const [deliveryType, setDeliveryType] = useState('pickup'); // 'pickup' | 'doorstep' | 'pan_india' | 'digital'
    const [doorstepScope, setDoorstepScope] = useState('localities'); // 'localities' | 'city'
    const [doorstepLocations, setDoorstepLocations] = useState(['Hitec City', 'Gachibowli', 'Madhapur', 'Tellapur']);
    const [customLocalityInput, setCustomLocalityInput] = useState('');

    // Hub & Pickup Geolocation Point
    const [pickupAddress, setPickupAddress] = useState('');
    const [pickupTiming, setPickupTiming] = useState('Saturday 10:00 AM – 1:00 PM');
    const [pickupLocality, setPickupLocality] = useState('Hitec City');
    const [pickupCity, setPickupCity] = useState('Hyderabad');
    const [geoLat, setGeoLat] = useState(17.4435);
    const [geoLng, setGeoLng] = useState(78.3772);
    const [isDetectingGeo, setIsDetectingGeo] = useState(false);
    const [geoStatusMsg, setGeoStatusMsg] = useState('');

    // PRD Pitch Policies
    const [returnPolicy, setReturnPolicy] = useState('instant_rejection_at_delivery');
    const [returnPolicyCustom, setReturnPolicyCustom] = useState('');
    const [cancellationFeePercent, setCancellationFeePercent] = useState(0);
    const [paymentMode, setPaymentMode] = useState('upi');
    const [hostParticipates, setHostParticipates] = useState(true);

    // Clan Selection
    const [selectedClans, setSelectedClans] = useState(['clan-1']);
    const [showClanDropdown, setShowClanDropdown] = useState(false);
    const clanDropdownRef = useRef(null);

    const handleDetectGps = () => {
        if (typeof window === 'undefined' || !navigator.geolocation) {
            setGeoStatusMsg('Geolocation not supported by browser');
            return;
        }
        setIsDetectingGeo(true);
        setGeoStatusMsg('');
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setGeoLat(latitude);
                setGeoLng(longitude);
                setIsDetectingGeo(false);
                setGeoStatusMsg(`✓ GPS Locked: (${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°)`);
            },
            () => {
                setIsDetectingGeo(false);
                setGeoStatusMsg('GPS permission denied. Please choose your locality preset.');
            },
            { enableHighAccuracy: true, timeout: 8000 }
        );
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (clanDropdownRef.current && !clanDropdownRef.current.contains(e.target)) {
                setShowClanDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Load draft data if available
    useEffect(() => {
        if (draftId) {
            let draft = mockPitches.find(p => p.id === draftId);
            if (!draft) {
                if (draftId === 'host-draft-1') {
                    draft = {
                        title: 'A2 Desi Milk Subscription',
                        category: 'groceries',
                        description: 'Farm-fresh A2 milk sourced directly from free-grazing Gir cows. Untouched by hands, unadulterated, and delivered to your doorstep every morning.',
                        unitType: 'Litre',
                        costPerUnit: 85,
                        minOrder: 10,
                        maxCapacity: 25,
                        deliveryType: 'doorstep',
                        pickupInfo: { address: 'Doorstep morning milk delivery', locality: 'Tellapur', city: 'Hyderabad', lat: 17.4812, lng: 78.2914, time: 'Daily 6:30 AM', isDoorstep: true, doorstepLocations: ['Tellapur', 'Gachibowli', 'Madhapur'] }
                    };
                } else if (draftId === 'host-draft-2') {
                    draft = {
                        title: 'Cold Pressed Oil',
                        category: 'groceries',
                        description: 'Authentic wood-pressed oil. Pure and unrefined.',
                        unitType: 'Litre',
                        costPerUnit: 185,
                        minOrder: 8,
                        maxCapacity: 20,
                        image: '/images/wood_pressed_oil.png'
                    };
                }
            }
            if (draft) {
                setProductName(draft.title || '');
                setCategory(draft.category || 'groceries');
                setDescription(draft.description || '');
                setMinOrder(draft.minOrder?.toString() || '');
                setMaxCapacity(draft.maxCapacity?.toString() || '');
                setCostPerUnit(draft.costPerUnit?.toString() || '');
                setUnitType(draft.unitType || '');
                if (draft.image) {
                    const newPreviews = [...photoPreviews];
                    newPreviews[0] = draft.image;
                    setPhotoPreviews(newPreviews);
                }
                if (draft.clanId) {
                    setSelectedClans([draft.clanId]);
                }
                if (draft.deliveryType) setDeliveryType(draft.deliveryType);
                if (draft.pickupInfo?.address) setPickupAddress(draft.pickupInfo.address);
                if (draft.pickupInfo?.locality) setPickupLocality(draft.pickupInfo.locality);
                if (draft.pickupInfo?.city) setPickupCity(draft.pickupInfo.city);
                if (draft.pickupInfo?.doorstepLocations) setDoorstepLocations(draft.pickupInfo.doorstepLocations);
            }
        }
    }, [draftId]);

    const toggleClan = (clanId) => {
        setSelectedClans(prev =>
            prev.includes(clanId) ? prev.filter(id => id !== clanId) : [...prev, clanId]
        );
    };

    const removeClan = (clanId) => {
        setSelectedClans(prev => prev.filter(id => id !== clanId));
    };

    const toggleDoorstepLocation = (locName) => {
        setDoorstepLocations(prev =>
            prev.includes(locName) ? prev.filter(l => l !== locName) : [...prev, locName]
        );
    };

    const addCustomDoorstepLocation = (e) => {
        e?.preventDefault();
        const trimmed = customLocalityInput.trim();
        if (trimmed && !doorstepLocations.includes(trimmed)) {
            setDoorstepLocations(prev => [...prev, trimmed]);
            setCustomLocalityInput('');
        }
    };

    const removeDoorstepLocation = (locName) => {
        setDoorstepLocations(prev => prev.filter(l => l !== locName));
    };

    const stepProgress = { 1: 33, 2: 66, 3: 100 };

    const handlePhotoChange = (index, e) => {
        const file = e.target.files[0];
        if (!file || !file.type.startsWith('image/')) return;
        const newPhotos = [...photos];
        newPhotos[index] = file;
        setPhotos(newPhotos);
        const reader = new FileReader();
        reader.onloadend = () => {
            const newPreviews = [...photoPreviews];
            newPreviews[index] = reader.result;
            setPhotoPreviews(newPreviews);
        };
        reader.readAsDataURL(file);
    };

    const removePhoto = (index) => {
        const newPhotos = [...photos];
        newPhotos[index] = null;
        setPhotos(newPhotos);
        const newPreviews = [...photoPreviews];
        newPreviews[index] = null;
        setPhotoPreviews(newPreviews);
    };

    const compileDraftPayload = () => {
        return {
            title: productName || 'Untitled Pool',
            category,
            description,
            productLink,
            price: Number(costPerUnit) || 0,
            costPerUnit: Number(costPerUnit) || 0,
            retailPrice: Number(retailPrice) || 0,
            unitType: unitType || 'unit',
            minOrder: Number(minOrder) || 5,
            maxCapacity: Number(maxCapacity) || 20,
            deadline: deadline || new Date(Date.now() + 5 * 86400000).toISOString(),
            deliveryType,
            isDoorstep: deliveryType === 'doorstep',
            doorstepLocations: deliveryType === 'doorstep' ? doorstepLocations : [],
            pickupInfo: {
                address: pickupAddress || `${pickupLocality} Hub Gate`,
                locality: pickupLocality,
                city: pickupCity,
                lat: geoLat,
                lng: geoLng,
                time: pickupTiming,
                isDoorstep: deliveryType === 'doorstep',
                doorstepLocations: deliveryType === 'doorstep' ? doorstepLocations : [],
                deliveryType,
            },
            pitchPolicies: {
                returnPolicy,
                returnPolicyCustom,
                cancellationFeePercent,
                platformFeePercent: 0,
                sellerName: sellerName || currentUser?.name || 'Community Host Sourcing',
                sellerId,
                isVerifiedVendor,
            },
            paymentMode,
            hostParticipates,
            clanIds: selectedClans,
            photos: photoPreviews.filter(Boolean),
            image: photoPreviews[0] || '/images/farm-mango-crates.jpg',
            host: {
                name: currentUser?.name || 'You (Host)',
                rating: currentUser?.rating || 5.0,
                isVerifiedVendor,
            },
        };
    };

    const handlePublish = () => {
        setLoading(true);
        const payload = compileDraftPayload();
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('letsstack_published_pitch', JSON.stringify(payload));
        }
        setTimeout(() => {
            router.push('/pitches/pitch-1/published');
        }, 900);
    };

    const handlePreview = () => {
        const payload = compileDraftPayload();
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('letsstack_draft_pitch', JSON.stringify(payload));
        }
        router.push('/pitches/create/preview');
    };

    const handleSaveDraft = () => {
        const payload = compileDraftPayload();
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('letsstack_draft_pitch', JSON.stringify(payload));
        }
        router.push('/pitches/create/draft-saved');
    };

    const photoSlotIcons = ['add_a_photo', 'add', 'image'];
    const photoSlotLabels = ['COVER PHOTO (16:9)', 'PHOTO 2', 'PHOTO 3'];

    // Calculate dynamic savings %
    const unitPriceNum = Number(costPerUnit) || 0;
    const retailPriceNum = Number(retailPrice) || 0;
    const savingsPercent = retailPriceNum > unitPriceNum && unitPriceNum > 0
        ? Math.round(((retailPriceNum - unitPriceNum) / retailPriceNum) * 100)
        : null;

    return (
        <>
            <Navbar />
            <main className={styles.page}>
                <div className={styles.container}>

                    {step === 1 && (
                        <div className={styles.pageHeader}>
                            <h1 className={styles.pageTitle}>Create a new Pool</h1>
                            <p className={styles.pageSubtitle}>
                                Initiate a community group buy. Pool orders with your trusted circle to unlock better pricing on quality products and services.
                            </p>
                        </div>
                    )}

                    {/* Progress Bar */}
                    <div className={styles.progressSection}>
                        <div className={styles.progressTop}>
                            <div>
                                <span className={styles.stepLabel}>Step {step} of 3</span>
                                <h1 className={styles.stepTitle}>
                                    {step === 1 && 'Product & Sourcing Details'}
                                    {step === 2 && 'Pricing & Capacity Economics'}
                                    {step === 3 && 'Fulfillment, Clans & Policies'}
                                </h1>
                            </div>
                            <span className={styles.progressLabel}>{stepProgress[step]}% Complete</span>
                        </div>
                        <div className={styles.progressTrack}>
                            <div className={styles.progressFill} style={{ width: `${stepProgress[step]}%` }} />
                        </div>
                    </div>

                    {/* ── STEP 1: Product & Sourcing Details ── */}
                    {step === 1 && (
                        <div className={styles.formCanvas}>
                            <section className={styles.field}>
                                <label className={styles.label}>Product / Service Title *</label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="e.g. Alphonso Mangoes (5kg Crate) / Split AC Jet Wash Combo"
                                    value={productName}
                                    onChange={e => setProductName(e.target.value)}
                                    required
                                />
                            </section>

                            <section className={styles.field}>
                                <label className={styles.label}>Category *</label>
                                <select
                                    className={styles.select}
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                >
                                    {CATEGORIES.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                                    ))}
                                </select>
                            </section>

                            <section className={styles.field}>
                                <label className={styles.label}>Description & Sourcing Rationale *</label>
                                <textarea
                                    className={styles.textarea}
                                    rows={5}
                                    placeholder="Describe product quality, origin, why group buying unlocks wholesale prices, and fulfillment specifics..."
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    required
                                />
                            </section>

                            <section className={styles.field}>
                                <label className={styles.label}>Product Photos (Up to 3, 16:9 Landscape Aspect)</label>
                                <div className={styles.photoGrid}>
                                    {[0, 1, 2].map(i => (
                                        <div key={i} className={`${styles.photoSlot} ${i === 0 ? styles.photoSlotPrimary : i === 1 ? styles.photoSlotSecondary : styles.photoSlotEmpty}`}>
                                            {photoPreviews[i] ? (
                                                <>
                                                    <img src={photoPreviews[i]} alt={`Photo ${i + 1}`} className={styles.photoPreviewImg} />
                                                    <button className={styles.removePhotoBtn} onClick={() => removePhoto(i)} type="button">
                                                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>close</span>
                                                    </button>
                                                </>
                                            ) : (
                                                <label className={styles.photoSlotLabel} htmlFor={`photo-${i}`}>
                                                    <span className={`material-symbols-outlined ${styles.photoIcon}`}>{photoSlotIcons[i]}</span>
                                                    {photoSlotLabels[i] && <span className={styles.photoSlotText}>{photoSlotLabels[i]}</span>}
                                                    <input id={`photo-${i}`} type="file" accept="image/*" className={styles.fileInput} onChange={e => handlePhotoChange(i, e)} />
                                                </label>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <p className={styles.photoHint}>Clean, photorealistic product photos build trust and drive faster clan commitments.</p>
                            </section>

                            <section className={styles.field}>
                                <div className={styles.labelRow}>
                                    <label className={styles.label}>Product / Reference Link</label>
                                    <span className={styles.optionalBadge}>OPTIONAL</span>
                                </div>
                                <div className={styles.inputWithIcon}>
                                    <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-muted)' }}>link</span>
                                    <input
                                        className={styles.inputPlain}
                                        type="url"
                                        placeholder="https://seller.com/product-specs"
                                        value={productLink}
                                        onChange={e => setProductLink(e.target.value)}
                                    />
                                </div>
                            </section>

                            <section className={styles.field}>
                                <div className={styles.labelRow}>
                                    <label className={styles.label}>Estimated Market Retail MRP (Per Unit)</label>
                                    <span className={styles.optionalBadge}>OPTIONAL</span>
                                </div>
                                <div className={styles.currencyInput}>
                                    <span className={styles.currencySymbol}>₹</span>
                                    <input
                                        className={styles.inputPlain}
                                        type="number"
                                        placeholder="e.g. 1200 (Used to calculate community savings %)"
                                        value={retailPrice}
                                        onChange={e => setRetailPrice(e.target.value)}
                                    />
                                </div>
                            </section>

                            {/* Seller & Verification Details */}
                            <div className={styles.sectionCard}>
                                <div className={styles.sectionCardTitle}>
                                    <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>store</span>
                                    <span>Seller & Brand Sourcing</span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.75rem', flexDirection: 'column' }}>
                                    <input
                                        className={styles.input}
                                        type="text"
                                        placeholder="Seller / Sourcing Entity Name (e.g. Ratnagiri Orchards Direct Co.)"
                                        value={sellerName}
                                        onChange={e => setSellerName(e.target.value)}
                                    />
                                    <input
                                        className={styles.input}
                                        type="text"
                                        placeholder="Business Registration No. (GSTIN / FSSAI / Trade License)"
                                        value={sellerId}
                                        onChange={e => setSellerId(e.target.value)}
                                    />
                                </div>

                                <div
                                    className={styles.verifiedVendorToggle}
                                    onClick={() => setIsVerifiedVendor(prev => !prev)}
                                >
                                    <div className={styles.verifiedVendorMeta}>
                                        <span className="material-symbols-outlined" style={{ color: isVerifiedVendor ? '#2563eb' : 'var(--on-surface-variant)', fontSize: '22px' }}>
                                            {isVerifiedVendor ? 'verified' : 'verified_user'}
                                        </span>
                                        <div>
                                            <div style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--on-surface)' }}>
                                                Verified Brand / Distributor Pool
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}>
                                                Enables Verified Partner blue badge on pool card & detail view.
                                            </div>
                                        </div>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={isVerifiedVendor}
                                        onChange={e => setIsVerifiedVendor(e.target.checked)}
                                        style={{ width: '18px', height: '18px', accentColor: '#2563eb' }}
                                    />
                                </div>
                            </div>

                            <button
                                className={styles.ctaBtn}
                                disabled={!productName.trim() || !description.trim()}
                                onClick={() => setStep(2)}
                            >
                                Continue to Pricing & Quantity
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                    )}

                    {/* ── STEP 2: Pricing & Capacity Economics ── */}
                    {step === 2 && (
                        <div className={styles.formCanvas}>
                            {/* Row 1: Min Order Goal + Max Capacity side by side */}
                            <div className={styles.priceGrid}>
                                <div className={styles.field}>
                                    <label className={styles.label}>Minimum Order (Goal) *</label>
                                    <input className={styles.input} type="number" placeholder="10" value={minOrder} onChange={e => setMinOrder(e.target.value)} min={1} />
                                    <p className={styles.fieldHint}>Minimum quantity needed for pool success</p>
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>Maximum Capacity *</label>
                                    <input className={styles.input} type="number" placeholder="20" value={maxCapacity} onChange={e => setMaxCapacity(e.target.value)} min={minOrder || 1} />
                                    <p className={styles.fieldHint}>Upper limit of available units / slots</p>
                                </div>
                            </div>

                            {/* Row 2: Cost Per Unit */}
                            <div className={styles.field}>
                                <label className={styles.label}>Pool Cost Per Unit (₹) *</label>
                                <div className={styles.currencyInput}>
                                    <span className={styles.currencySymbol}>₹</span>
                                    <input className={styles.inputPlain} type="number" placeholder="600" value={costPerUnit} onChange={e => setCostPerUnit(e.target.value)} />
                                </div>
                                <p className={styles.fieldHint}>Wholesale price per unit for clan participants</p>
                            </div>

                            {/* Row 3: Unit Type */}
                            <div className={styles.field}>
                                <label className={styles.label}>Unit Type *</label>
                                <input className={styles.input} type="text" placeholder="kg, crate, tub, pair, set, piece, litre, slot..." value={unitType} onChange={e => setUnitType(e.target.value)} />
                                <p className={styles.fieldHint}>How is the product or service slot measured?</p>
                            </div>

                            {/* Live Price Economics Preview */}
                            {costPerUnit && unitType && (
                                <div className={styles.pricePreview}>
                                    <div className={styles.previewEyebrow}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--primary)' }}>visibility</span>
                                        <span>PRICING & CAPACITY PREVIEW</span>
                                        {savingsPercent !== null && (
                                            <span className={styles.savingsPill} style={{ marginLeft: 'auto' }}>
                                                🏷️ Save {savingsPercent}% vs Retail
                                            </span>
                                        )}
                                    </div>
                                    <div className={styles.previewRow}>
                                        <div className={styles.previewPrice}>
                                            <span className={styles.previewBigPrice}>₹{Number(costPerUnit).toLocaleString('en-IN')}</span>
                                            <span className={styles.previewUnit}>/{unitType}</span>
                                        </div>
                                        <div className={styles.previewMid}>
                                            <span className={styles.previewAvail}>{minOrder || '–'} {pluralizeUnit(Number(minOrder) || 2, unitType)} Goal Threshold</span>
                                            <span className={styles.previewMinNote}>Up to {maxCapacity || '–'} {pluralizeUnit(Number(maxCapacity) || 2, unitType)} Max Inventory</span>
                                        </div>
                                    </div>
                                    <div className={styles.lockNote}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'var(--primary)' }}>lock</span>
                                        <span>Total Goal Target: <strong>₹{(Number(costPerUnit) * Number(minOrder || 0)).toLocaleString('en-IN')}</strong> held safely in escrow.</span>
                                    </div>
                                </div>
                            )}

                            <div className={styles.stepBtns}>
                                <button className={styles.backBtn} onClick={() => setStep(1)} type="button">Back</button>
                                <button
                                    className={styles.nextBtn}
                                    disabled={!costPerUnit || !unitType || !minOrder || !maxCapacity}
                                    onClick={() => setStep(3)}
                                    type="button"
                                >
                                    Next: Fulfillment & Rules
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── STEP 3: Fulfillment, Geolocation, Clans & Policies ── */}
                    {step === 3 && (() => {
                        const activeUserId = currentUser?.id || 'user-1';
                        // Restrict available clans in dropdown strictly to clans the host belongs to
                        const hostClans = mockClans.filter(c => 
                            c.members?.includes(activeUserId) || currentUser?.clans?.includes(c.id)
                        );

                        const selectedClanObjects = selectedClans.map(id => mockClans.find(c => c.id === id)).filter(Boolean);
                        const openClans = selectedClanObjects.filter(c => c.privacy === 'open');
                        const privateClans = selectedClanObjects.filter(c => c.privacy !== 'open');
                        
                        let derivedVisibility = 'unlisted';
                        if (selectedClanObjects.length === 0) {
                            derivedVisibility = 'unlisted';
                        } else if (openClans.length > 0) {
                            derivedVisibility = 'public';
                        } else {
                            derivedVisibility = 'restricted';
                        }

                        // Localities list for active city presets
                        const activeCityLocalities = LOCALITY_PRESETS
                            .filter(p => p.city.toLowerCase() === pickupCity.toLowerCase())
                            .map(p => p.name);

                        return (
                            <div className={styles.formCanvas}>
                                {/* 1. Target Clan(s) & Visibility Engine */}
                                <div className={styles.sectionCard}>
                                    <div className={styles.sectionCardTitle}>
                                        <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>groups</span>
                                        <span>Target Clan(s) & Visibility</span>
                                    </div>
                                    <label className={styles.limitLabel}>TAG CLAN(S) TO POOL ORDERS</label>
                                    <p className={styles.fieldHint} style={{ marginTop: '-0.25rem', marginBottom: '0.75rem', lineHeight: '1.4' }}>
                                        Select from your joined clans to pool demand together. Pool visibility is derived automatically from the clan types you select.
                                    </p>
                                    
                                    <div className={styles.clanDropdownWrapper} ref={clanDropdownRef}>
                                        <button
                                            type="button"
                                            className={styles.clanDropdownTrigger}
                                            onClick={() => setShowClanDropdown(prev => !prev)}
                                            id="clan-select-trigger"
                                        >
                                            <div className={styles.clanChipsArea}>
                                                {selectedClans.length === 0 && (
                                                    <span className={styles.clanPlaceholder}>No clans selected (Direct Link Only)...</span>
                                                )}
                                                {selectedClans.map(clanId => {
                                                    const clan = mockClans.find(c => c.id === clanId);
                                                    return clan ? (
                                                        <span key={clanId} className={styles.clanChip}>
                                                            {clan.name}
                                                            <span
                                                                className="material-symbols-outlined"
                                                                style={{ fontSize: '14px', cursor: 'pointer' }}
                                                                onClick={(e) => { e.stopPropagation(); removeClan(clanId); }}
                                                                aria-label={`Remove ${clan.name}`}
                                                            >close</span>
                                                        </span>
                                                    ) : null;
                                                })}
                                            </div>
                                            <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)' }}>unfold_more</span>
                                        </button>

                                        {showClanDropdown && (
                                            <div className={styles.clanDropdownMenu}>
                                                <div className={styles.clanDropdownList}>
                                                    {hostClans.length === 0 ? (
                                                        <div className={styles.clanDropdownEmpty} style={{ padding: '0.75rem 1rem', fontSize: '0.85rem', color: 'var(--on-surface-variant)' }}>
                                                            You haven&apos;t joined any clans yet.
                                                        </div>
                                                    ) : (
                                                        hostClans.map(clan => {
                                                            const isSelected = selectedClans.includes(clan.id);
                                                            const isOpen = clan.privacy === 'open';
                                                            return (
                                                                <div
                                                                    key={clan.id}
                                                                    className={`${styles.clanDropdownItem} ${isSelected ? styles.clanDropdownItemSelected : ''}`}
                                                                    onClick={() => toggleClan(clan.id)}
                                                                >
                                                                    <div className={styles.clanDropdownItemMeta}>
                                                                        <span className={styles.clanDropdownItemName}>{clan.name}</span>
                                                                        <span className={isOpen ? styles.clanTypeBadgeOpen : styles.clanTypeBadgePrivate}>
                                                                            <span className="material-symbols-outlined" style={{ fontSize: '11px' }}>
                                                                                {isOpen ? 'public' : 'lock'}
                                                                            </span>
                                                                            {isOpen ? 'Public' : 'Private'}
                                                                        </span>
                                                                    </div>
                                                                    {isSelected && (
                                                                        <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--primary)' }}>check_circle</span>
                                                                    )}
                                                                </div>
                                                            );
                                                        })
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Dynamic Visibility Derived Banner */}
                                    {derivedVisibility === 'public' && (
                                        <div className={styles.visibilityDerivedCard} data-type="public">
                                            <div className={styles.visHeader}>
                                                <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '20px' }}>public</span>
                                                <span className={styles.visTitle}>Public Discovery Pool</span>
                                                <span className={styles.visBadgePublic}>PUBLIC DISCOVERY</span>
                                            </div>
                                            <p className={styles.visDesc}>
                                                Because this pool is tagged to public clans ({openClans.map(c => c.name).join(', ')}), it will be discoverable across public search, feeds, and the tagged clan hubs.
                                            </p>
                                        </div>
                                    )}

                                    {derivedVisibility === 'restricted' && (
                                        <div className={styles.visibilityDerivedCard} data-type="restricted">
                                            <div className={styles.visHeader}>
                                                <span className="material-symbols-outlined" style={{ color: '#1e40af', fontSize: '20px' }}>lock</span>
                                                <span className={styles.visTitle}>Private Clan Pool</span>
                                                <span className={styles.visBadgeRestricted}>PRIVATE CLANS ONLY</span>
                                            </div>
                                            <p className={styles.visDesc}>
                                                Tagged strictly to your private clans ({privateClans.map(c => c.name).join(', ')}). Only verified members of these communities will be able to search, view, and participate.
                                            </p>
                                        </div>
                                    )}

                                    {derivedVisibility === 'unlisted' && (
                                        <div className={styles.visibilityDerivedCard} data-type="unlisted">
                                            <div className={styles.visHeader}>
                                                <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)', fontSize: '20px' }}>link</span>
                                                <span className={styles.visTitle}>Direct Link Only</span>
                                                <span className={styles.visBadgeUnlisted}>UNLISTED</span>
                                            </div>
                                            <p className={styles.visDesc}>
                                                No clans tagged. This pool will be unlisted and hidden from public search and discovery. Only people with your direct invite link can access it.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* 2. Pool Deadline */}
                                <div className={styles.sectionCard}>
                                    <div className={styles.sectionCardTitle}>
                                        <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>schedule</span>
                                        <span>Pool Deadline</span>
                                    </div>
                                    <div className={styles.field}>
                                        <label className={styles.limitLabel}>DEADLINE DATE & TIME *</label>
                                        <div className={styles.dateInputWrap}>
                                            <input className={styles.input} type="datetime-local" value={deadline} onChange={e => setDeadline(e.target.value)} />
                                            <span className={`material-symbols-outlined ${styles.dateIcon}`}>calendar_clock</span>
                                        </div>
                                        <p className={styles.fieldHint}>If goal is not reached by this date, all escrow authorizations are canceled automatically with zero charges.</p>
                                    </div>
                                </div>

                                {/* 3. Fulfillment, Delivery Type & Geolocation Hub */}
                                <div className={styles.sectionCard}>
                                    <div className={styles.sectionCardTitle}>
                                        <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>local_shipping</span>
                                        <span>Fulfillment & Delivery Architecture</span>
                                    </div>
                                    <label className={styles.limitLabel}>CHOOSE DELIVERY MODE</label>

                                    {/* 4-Card Delivery Selector */}
                                    <div className={styles.deliveryModeGrid}>
                                        <div
                                            className={`${styles.deliveryModeCard} ${deliveryType === 'pickup' ? styles.deliveryModeCardActive : ''}`}
                                            onClick={() => setDeliveryType('pickup')}
                                        >
                                            <div className={styles.deliveryModeCardTop}>
                                                <span className={`material-symbols-outlined ${styles.deliveryModeIcon}`}>location_on</span>
                                                {deliveryType === 'pickup' && <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '20px' }}>check_circle</span>}
                                            </div>
                                            <span className={styles.deliveryModeTitle}>📍 Community Pickup Hub</span>
                                            <p className={styles.deliveryModeDesc}>Members collect items from a common society gate, office reception, or clubhouse drop.</p>
                                        </div>

                                        <div
                                            className={`${styles.deliveryModeCard} ${deliveryType === 'doorstep' ? styles.deliveryModeCardActive : ''}`}
                                            onClick={() => setDeliveryType('doorstep')}
                                        >
                                            <div className={styles.deliveryModeCardTop}>
                                                <span className={`material-symbols-outlined ${styles.deliveryModeIcon}`}>doorbell</span>
                                                {deliveryType === 'doorstep' && <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '20px' }}>check_circle</span>}
                                            </div>
                                            <span className={styles.deliveryModeTitle}>🚚 Doorstep Delivery</span>
                                            <p className={styles.deliveryModeDesc}>Direct delivery or technician service visit to the member&apos;s home across designated localities.</p>
                                        </div>

                                        <div
                                            className={`${styles.deliveryModeCard} ${deliveryType === 'pan_india' ? styles.deliveryModeCardActive : ''}`}
                                            onClick={() => setDeliveryType('pan_india')}
                                        >
                                            <div className={styles.deliveryModeCardTop}>
                                                <span className={`material-symbols-outlined ${styles.deliveryModeIcon}`}>package_2</span>
                                                {deliveryType === 'pan_india' && <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '20px' }}>check_circle</span>}
                                            </div>
                                            <span className={styles.deliveryModeTitle}>📦 Pan-India Courier</span>
                                            <p className={styles.deliveryModeDesc}>Dispatched via Speed Post / courier to any address across India without local hub limits.</p>
                                        </div>

                                        <div
                                            className={`${styles.deliveryModeCard} ${deliveryType === 'digital' ? styles.deliveryModeCardActive : ''}`}
                                            onClick={() => setDeliveryType('digital')}
                                        >
                                            <div className={styles.deliveryModeCardTop}>
                                                <span className={`material-symbols-outlined ${styles.deliveryModeIcon}`}>devices</span>
                                                {deliveryType === 'digital' && <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '20px' }}>check_circle</span>}
                                            </div>
                                            <span className={styles.deliveryModeTitle}>💻 Digital Delivery</span>
                                            <p className={styles.deliveryModeDesc}>Instant cloud invites, license keys, or subscriptions delivered digitally.</p>
                                        </div>
                                    </div>

                                    {/* Doorstep Delivery Zone Configuration (For Vendor/Service Pools) */}
                                    {deliveryType === 'doorstep' && (
                                        <div className={styles.doorstepZoneBox}>
                                            <div className={styles.sectionCardTitle} style={{ fontSize: '0.875rem' }}>
                                                <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '18px' }}>map</span>
                                                <span>Serviced Doorstep Localities & Zones</span>
                                            </div>
                                            <p className={styles.fieldHint} style={{ margin: 0 }}>
                                                Select all neighborhood zones where you/your vendor provide doorstep drop or on-site installation:
                                            </p>

                                            <div className={styles.geoLocalityChips}>
                                                {activeCityLocalities.map(loc => {
                                                    const isChecked = doorstepLocations.includes(loc);
                                                    return (
                                                        <button
                                                            key={loc}
                                                            type="button"
                                                            className={`${styles.geoLocalityChip} ${isChecked ? styles.geoLocalityChipActive : ''}`}
                                                            onClick={() => toggleDoorstepLocation(loc)}
                                                        >
                                                            {isChecked ? '✓ ' : '+ '}{loc}
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            <div className={styles.doorstepAddRow}>
                                                <input
                                                    className={styles.input}
                                                    type="text"
                                                    placeholder="Add custom locality (e.g. Financial District, Whitefield Sector 2)"
                                                    value={customLocalityInput}
                                                    onChange={e => setCustomLocalityInput(e.target.value)}
                                                    onKeyDown={e => { if (e.key === 'Enter') addCustomDoorstepLocation(e); }}
                                                />
                                                <button type="button" className={styles.doorstepAddBtn} onClick={addCustomDoorstepLocation}>
                                                    Add Zone
                                                </button>
                                            </div>

                                            {doorstepLocations.length > 0 && (
                                                <div>
                                                    <label className={styles.limitLabel} style={{ fontSize: '0.6875rem' }}>ACTIVE DOORSTEP ZONES ({doorstepLocations.length})</label>
                                                    <div className={styles.selectedZonesArea}>
                                                        {doorstepLocations.map(loc => (
                                                            <span key={loc} className={styles.selectedZoneChip}>
                                                                📍 {loc}
                                                                <button type="button" className={styles.removeZoneBtn} onClick={() => removeDoorstepLocation(loc)}>
                                                                    <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>close</span>
                                                                </button>
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Physical Hub & Coordinates (Required for Pickup & Doorstep) */}
                                    {(deliveryType === 'pickup' || deliveryType === 'doorstep') && (
                                        <div className={styles.geoPickerBox}>
                                            <div className={styles.geoDetectRow}>
                                                <div>
                                                    <label className={styles.limitLabel} style={{ marginBottom: '0.15rem' }}>PHYSICAL HUB & GEOLOCATION ANCHOR</label>
                                                    <p className={styles.fieldHint} style={{ margin: 0 }}>
                                                        Used by the Geolocation Proximity Engine to compute distance from participants.
                                                    </p>
                                                </div>
                                                <button 
                                                    type="button" 
                                                    className={styles.geoDetectBtn}
                                                    onClick={handleDetectGps}
                                                >
                                                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                                                        {isDetectingGeo ? 'sync' : 'my_location'}
                                                    </span>
                                                    {isDetectingGeo ? 'Detecting GPS...' : 'Use Current Device GPS'}
                                                </button>
                                            </div>

                                            {geoStatusMsg && (
                                                <div className={styles.geoCoordsNote}>
                                                    <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>pin_drop</span>
                                                    <span>{geoStatusMsg}</span>
                                                </div>
                                            )}

                                            <div className={styles.field}>
                                                <label className={styles.limitLabel}>PICKUP HUB LANDMARK / ADDRESS *</label>
                                                <input 
                                                    className={styles.input} 
                                                    type="text" 
                                                    placeholder="e.g. Main Clubhouse Lobby / Gate 2, DLF CyberCity" 
                                                    value={pickupAddress} 
                                                    onChange={e => setPickupAddress(e.target.value)} 
                                                />
                                            </div>

                                            <div className={styles.field}>
                                                <label className={styles.limitLabel}>PICKUP / DELIVERY TIMING WINDOW</label>
                                                <input 
                                                    className={styles.input} 
                                                    type="text" 
                                                    placeholder="e.g. Saturday morning 10:00 AM – 1:00 PM" 
                                                    value={pickupTiming} 
                                                    onChange={e => setPickupTiming(e.target.value)} 
                                                />
                                            </div>

                                            <div className={styles.field}>
                                                <label className={styles.limitLabel}>NEIGHBORHOOD HUB PRESET</label>
                                                <select
                                                    className={styles.select}
                                                    value={pickupLocality}
                                                    onChange={(e) => {
                                                        const targetVal = e.target.value;
                                                        const found = LOCALITY_PRESETS.find(p => p.name === targetVal);
                                                        if (found) {
                                                            setPickupLocality(found.name);
                                                            setPickupCity(found.city);
                                                            setGeoLat(found.lat);
                                                            setGeoLng(found.lng);
                                                            setGeoStatusMsg(`Locality set to ${found.name}, ${found.city}`);
                                                        }
                                                    }}
                                                >
                                                    <optgroup label="Hyderabad">
                                                        <option value="Hitec City">Hitec City (Madhapur / Cyberabad)</option>
                                                        <option value="Gachibowli">Gachibowli (Financial District)</option>
                                                        <option value="Madhapur">Madhapur (Metro / Inorbit Hub)</option>
                                                        <option value="Jubilee Hills">Jubilee Hills / Road 36</option>
                                                        <option value="Banjara Hills">Banjara Hills (Road 12 Hub)</option>
                                                        <option value="Tellapur">Tellapur (MyHome Tridasa Hub)</option>
                                                        <option value="Kondapur">Kondapur (Botanical Garden Hub)</option>
                                                    </optgroup>
                                                    <optgroup label="Bengaluru">
                                                        <option value="Whitefield">Whitefield (Prestige Lakeside / Forum)</option>
                                                        <option value="HSR Layout">HSR Layout (Sectors 1-7 Hub)</option>
                                                        <option value="Indiranagar">Indiranagar (100ft Road Hub)</option>
                                                        <option value="Koramangala">Koramangala (Sony World Hub)</option>
                                                    </optgroup>
                                                    <optgroup label="Mumbai">
                                                        <option value="Bandra Kurla Complex (BKC)">Bandra Kurla Complex (BKC)</option>
                                                        <option value="Powai (Hiranandani)">Powai (Hiranandani Hub)</option>
                                                    </optgroup>
                                                </select>
                                            </div>

                                            <div className={styles.coordInputsRow}>
                                                <div className={styles.field}>
                                                    <label className={styles.limitLabel}>LATITUDE</label>
                                                    <input
                                                        className={styles.input}
                                                        type="number"
                                                        step="0.0001"
                                                        value={geoLat}
                                                        onChange={e => setGeoLat(parseFloat(e.target.value) || 0)}
                                                    />
                                                </div>
                                                <div className={styles.field}>
                                                    <label className={styles.limitLabel}>LONGITUDE</label>
                                                    <input
                                                        className={styles.input}
                                                        type="number"
                                                        step="0.0001"
                                                        value={geoLng}
                                                        onChange={e => setGeoLng(parseFloat(e.target.value) || 0)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* 4. Return Policies & Terms (PRD Section 3.6.2) */}
                                <div className={styles.sectionCard}>
                                    <div className={styles.sectionCardTitle}>
                                        <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>policy</span>
                                        <span>Return Policy & Buyer Protection</span>
                                    </div>
                                    <label className={styles.limitLabel}>SELECT RETURN & INSPECTION POLICY</label>

                                    <div className={styles.policyGrid}>
                                        <div
                                            className={`${styles.policyCard} ${returnPolicy === 'instant_rejection_at_delivery' ? styles.policyCardActive : ''}`}
                                            onClick={() => setReturnPolicy('instant_rejection_at_delivery')}
                                        >
                                            <span className={styles.policyCardTitle}>
                                                🔍 Handover Inspection
                                            </span>
                                            <p className={styles.policyCardDesc}>Immediate inspection & instant rejection at pickup/doorstep handover.</p>
                                        </div>

                                        <div
                                            className={`${styles.policyCard} ${returnPolicy === '7_days_replacement' ? styles.policyCardActive : ''}`}
                                            onClick={() => setReturnPolicy('7_days_replacement')}
                                        >
                                            <span className={styles.policyCardTitle}>
                                                🔄 7-Day Replacement
                                            </span>
                                            <p className={styles.policyCardDesc}>100% replacement guarantee for any transit or manufacturing defect.</p>
                                        </div>

                                        <div
                                            className={`${styles.policyCard} ${returnPolicy === 'no_returns' ? styles.policyCardActive : ''}`}
                                            onClick={() => setReturnPolicy('no_returns')}
                                        >
                                            <span className={styles.policyCardTitle}>
                                                🚫 No Returns / Final Sale
                                            </span>
                                            <p className={styles.policyCardDesc}>Standard for fresh perishable items once handover is accepted.</p>
                                        </div>

                                        <div
                                            className={`${styles.policyCard} ${returnPolicy === 'custom' ? styles.policyCardActive : ''}`}
                                            onClick={() => setReturnPolicy('custom')}
                                        >
                                            <span className={styles.policyCardTitle}>
                                                ✍️ Custom Terms
                                            </span>
                                            <p className={styles.policyCardDesc}>Specify exact warranty, rescheduling, or freshness terms.</p>
                                        </div>
                                    </div>

                                    <div className={styles.field} style={{ marginTop: '0.75rem' }}>
                                        <label className={styles.limitLabel}>POLICY DETAILS & BUYER NOTES</label>
                                        <textarea
                                            className={styles.textarea}
                                            rows={3}
                                            placeholder="e.g. Size exchange allowed before master seal is opened. 100% replacement for transit damage..."
                                            value={returnPolicyCustom}
                                            onChange={e => setReturnPolicyCustom(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* 5. Payment Mode & Host Participation */}
                                <div className={styles.sectionCard}>
                                    <div className={styles.sectionCardTitle}>
                                        <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>payments</span>
                                        <span>Escrow Payment Mode</span>
                                    </div>

                                    <div className={styles.radioRow}>
                                        {[['upi', 'UPI Escrow (Safe & Automated)'], ['cod', 'Cash on Delivery']].map(([val, label]) => (
                                            <label key={val} className={styles.radioOption} style={{ flex: 1 }}>
                                                <input type="radio" name="paymentMode" value={val} checked={paymentMode === val} onChange={() => setPaymentMode(val)} className={styles.radioInput} />
                                                {paymentMode === val && <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '20px' }}>radio_button_checked</span>}
                                                {paymentMode !== val && <span className="material-symbols-outlined" style={{ color: 'var(--outline)', fontSize: '20px' }}>radio_button_unchecked</span>}
                                                <span>{label}</span>
                                                {val === 'upi' && paymentMode === 'upi' && (
                                                    <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '20px', marginLeft: 'auto' }}>verified_user</span>
                                                )}
                                            </label>
                                        ))}
                                    </div>

                                    <div style={{ marginTop: '1rem' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600' }}>
                                            <input
                                                type="checkbox"
                                                checked={hostParticipates}
                                                onChange={e => setHostParticipates(e.target.checked)}
                                                style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                                            />
                                            <span>I am also participating and committing units to this pool</span>
                                        </label>
                                    </div>
                                </div>

                                {/* 6. Live Review Summary Card */}
                                <div className={styles.reviewCard}>
                                    <div className={styles.reviewHeader}>
                                        <div className={styles.reviewTitleGroup}>
                                            <span className={styles.reviewTitle}>Review Summary</span>
                                        </div>
                                        <button className={styles.previewBtn} type="button" onClick={handlePreview}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>visibility</span>
                                            Full Preview
                                        </button>
                                    </div>
                                    <div className={styles.reviewBody}>
                                        <div className={styles.reviewThumb}>
                                            {photoPreviews[0] ? (
                                                <img src={photoPreviews[0]} alt="cover" className={styles.reviewThumbImg} />
                                            ) : (
                                                <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-muted)' }}>image</span>
                                            )}
                                        </div>
                                        <div className={styles.reviewInfo}>
                                            <span className={styles.reviewClan}>
                                                {selectedClanObjects.length > 0 ? selectedClanObjects.map(c => c.name.toUpperCase()).join(' · ') : 'DIRECT LINK ONLY'}
                                            </span>
                                            <p className={styles.reviewProduct}>{productName || 'Product Name'}</p>
                                            <p className={styles.reviewPrice}>₹{costPerUnit || '–'} / {unitType || 'unit'}</p>
                                        </div>
                                    </div>
                                    <div className={styles.reviewMeta}>
                                        <div className={styles.reviewMetaItem}>
                                            <span className={styles.metaLabel}>GOAL</span>
                                            <span>Min {minOrder || '–'} {pluralizeUnit(Number(minOrder) || 2, unitType)} · Max {maxCapacity || '–'} {pluralizeUnit(Number(maxCapacity) || 2, unitType)}</span>
                                        </div>
                                        <div className={styles.reviewMetaItem}>
                                            <span className={styles.metaLabel}>DELIVERY</span>
                                            <span>
                                                {deliveryType === 'pickup' && `📍 Pickup (${pickupLocality})`}
                                                {deliveryType === 'doorstep' && `🚚 Doorstep (${doorstepLocations.length} Zones)`}
                                                {deliveryType === 'pan_india' && '📦 Pan-India Courier'}
                                                {deliveryType === 'digital' && '💻 Digital Cloud'}
                                            </span>
                                        </div>
                                        <div className={styles.reviewMetaItem}>
                                            <span className={styles.metaLabel}>DEADLINE</span>
                                            <span>{deadline ? new Date(deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '–'}</span>
                                        </div>
                                        <div className={styles.reviewMetaItem}>
                                            <span className={styles.metaLabel}>VISIBILITY</span>
                                            <span>
                                                {derivedVisibility === 'public' && 'Public Discovery'}
                                                {derivedVisibility === 'restricted' && 'Restricted to Clan'}
                                                {derivedVisibility === 'unlisted' && 'Direct Link Only'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className={styles.publishActions}>
                                    <button className={styles.publishBtn} onClick={handlePublish} disabled={loading} id="publish-pitch-btn">
                                        {loading ? 'Publishing…' : 'Publish Pool'}
                                    </button>
                                    <div className={styles.secondaryActions}>
                                        <button className={styles.saveDraftBtn} type="button" onClick={handleSaveDraft}>Save as Draft</button>
                                        <button className={styles.backToStep2} onClick={() => setStep(2)} type="button">Back to Step 2</button>
                                    </div>
                                </div>
                                <p className={styles.terms}>By publishing, you agree to the LetsStack Community Guidelines, Escrow Terms, and PRD Seller Liability Standards.</p>
                            </div>
                        );
                    })()}
                </div>
            </main>
            <BottomNav />
        </>
    );
}

export default function CreatePitch() {
    return (
        <AuthGuard>
        <Suspense fallback={<div>Loading...</div>}>
            <CreatePitchForm />
        </Suspense>
        </AuthGuard>
    );
}
