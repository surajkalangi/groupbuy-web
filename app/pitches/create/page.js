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

const HIGH_VALUE_CATEGORIES = [
    { id: 'home', label: 'Home Setup & Appliances', icon: 'chair', desc: 'Orthopedic mattresses, RO purifiers, balcony blinds & furniture' },
    { id: 'wedding', label: 'Weddings & Event Services', icon: 'celebration', desc: 'Mehndi artists, Nadaswaram troupes, return gifts & bridal sets' },
    { id: 'fitness', label: 'Gym & Fitness Hardware', icon: 'fitness_center', desc: 'Hex dumbbells, massage guns, yoga mats & power racks' },
    { id: 'service', label: 'Home Services & Deep Cleaning', icon: 'cleaning_services', desc: 'Move-in deep cleaning, pest control & AC maintenance' },
    { id: 'baby', label: 'Baby & Childcare Essentials', icon: 'child_care', desc: 'Safety kits, premium strollers, babyproofing & gear' },
    { id: 'pets', label: 'Dog & Pet Supplies', icon: 'pets', desc: 'Breeder kibble sacks, tick treatments & mobile grooming' },
    { id: 'digital', label: 'Digital Subscriptions & Cloud', icon: 'devices', desc: '4K streaming slots, software licenses & developer tools' },
    { id: 'travel', label: 'Travel, Treks & Retreats', icon: 'flight', desc: 'Colleague roadtrips, adventure tours & learning batches' },
    { id: 'solar', label: 'Rooftop Solar & Energy', icon: 'solar_power', desc: 'Gated community & villa grid-tied bifacial solar setups' },
    { id: 'gourmet', label: 'Gourmet & Specialty Pantry', icon: 'bakery_dining', desc: 'Single-origin spices, organic honey & festive sweets' },
];

const POPULAR_CITIES = [
    { name: 'Hyderabad', icon: 'location_city' },
    { name: 'Bengaluru', icon: 'apartment' },
    { name: 'Mumbai', icon: 'domain' },
    { name: 'Delhi NCR', icon: 'holiday_village' },
    { name: 'Pune', icon: 'corporate_fare' },
    { name: 'Chennai', icon: 'location_city' },
];

const CITY_LOCALITY_MAP = {
    'Hyderabad': [
        'Hitec City', 'Gachibowli', 'Madhapur', 'Tellapur', 'Jubilee Hills',
        'Banjara Hills', 'Kondapur', 'Financial District', 'Nallagandla',
        'Kokapet', 'Manikonda', 'Kukatpally', 'Secunderabad'
    ],
    'Bengaluru': [
        'HSR Layout', 'Whitefield', 'Indiranagar', 'Koramangala', 'Bellandur',
        'Sarjapur Road', 'Electronic City', 'JP Nagar', 'Marathahalli',
        'Malleshwaram', 'Hebbal', 'Bannerghatta Road'
    ],
    'Mumbai': [
        'Bandra Kurla Complex (BKC)', 'Powai', 'Andheri West', 'Juhu',
        'Lower Parel', 'Worli', 'Thane West', 'Navi Mumbai', 'Borivali'
    ],
    'Delhi NCR': [
        'Gurugram Cyber City', 'Golf Course Road', 'DLF Phase 5',
        'Noida Sector 62', 'South Extension', 'Vasant Kunj', 'Indirapuram'
    ],
    'Pune': [
        'Koregaon Park', 'Baner', 'Hinjewadi IT Park', 'Viman Nagar',
        'Kalyani Nagar', 'Wakad', 'Aundh', 'Kothrud'
    ],
    'Chennai': [
        'OMR IT Corridor', 'Adyar', 'Anna Nagar', 'T. Nagar', 'Velachery', 'Besant Nagar'
    ]
};

function CreatePitchForm() {
    const router = useRouter();
    const { currentUser } = useAuth();
    const searchParams = useSearchParams();
    const draftId = searchParams.get('draftId');
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // ── Step 1: Product & Sourcing Details ──
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('home');
    const [description, setDescription] = useState('');
    const [productLink, setProductLink] = useState('');
    const [photos, setPhotos] = useState([null, null, null]);
    const [photoPreviews, setPhotoPreviews] = useState([null, null, null]);
    const [retailPrice, setRetailPrice] = useState('');
    const [sellerName, setSellerName] = useState('');
    const [sellerId, setSellerId] = useState('');

    // ── Step 2: Pricing & Capacity Economics ──
    const [minOrder, setMinOrder] = useState('');
    const [maxCapacity, setMaxCapacity] = useState('');
    const [unitType, setUnitType] = useState('');
    const [costPerUnit, setCostPerUnit] = useState('');

    // ── Step 3: Rules, Delivery Logistics & Policies ──
    const [deadline, setDeadline] = useState('');
    const [deliveryType, setDeliveryType] = useState('pickup'); // 'pickup' | 'doorstep' | 'pan_india' | 'digital'
    const [doorstepScope, setDoorstepScope] = useState('localities');
    const [activeDoorstepCity, setActiveDoorstepCity] = useState('Hyderabad');
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
                setGeoStatusMsg(`✓ GPS Coordinates Locked: (${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°)`);
            },
            () => {
                setIsDetectingGeo(false);
                setGeoStatusMsg('GPS permission unavailable. Please enter pickup address above.');
            },
            { enableHighAccuracy: true, timeout: 8000 }
        );
    };

    const toggleDoorstepLocation = (loc) => {
        setDoorstepLocations(prev => 
            prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
        );
    };

    const selectAllCityLocalities = () => {
        const cityLocs = CITY_LOCALITY_MAP[activeDoorstepCity] || [];
        setDoorstepLocations(prev => Array.from(new Set([...prev, ...cityLocs])));
    };

    const clearDoorstepLocations = () => {
        setDoorstepLocations([]);
    };

    const addCustomDoorstepLocation = (e) => {
        e?.preventDefault?.();
        if (!customLocalityInput.trim()) return;
        const clean = customLocalityInput.trim();
        if (!doorstepLocations.includes(clean)) {
            setDoorstepLocations(prev => [...prev, clean]);
        }
        setCustomLocalityInput('');
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
                        category: 'home',
                        description: 'Farm-fresh raw Gir cow A2 milk sourced daily from local organic dairy.',
                        price: 90,
                        costPerUnit: 90,
                        unitType: 'litre',
                        maxCapacity: 50,
                        minOrder: 10,
                        deadline: '2026-08-28T18:00',
                        paymentMode: 'upi',
                        deliveryType: 'doorstep',
                        doorstepLocations: ['Hitec City', 'Gachibowli', 'Madhapur', 'Tellapur'],
                        pickupInfo: {
                            address: 'Ravidham Complex, Main Gate / Daily Morning Milk Drop',
                            locality: 'Hitec City',
                            city: 'Hyderabad',
                            lat: 17.4435,
                            lng: 78.3772,
                            time: 'Daily morning 6:30 AM – 7:30 AM',
                        },
                        clanIds: ['clan-1'],
                    };
                }
            }
            if (draft) {
                setProductName(draft.title || draft.productName || '');
                setCategory(draft.category || 'home');
                setDescription(draft.description || '');
                setCostPerUnit(draft.costPerUnit || draft.price || '');
                setUnitType(draft.unitType || draft.unit || '');
                setMinOrder(draft.minOrder || '');
                setMaxCapacity(draft.maxCapacity || '');
                setDeadline(draft.deadline || '');
                if (draft.clanIds) setSelectedClans(draft.clanIds);
                if (draft.pickupInfo?.address) setPickupAddress(draft.pickupInfo.address);
                if (draft.pickupInfo?.locality) setPickupLocality(draft.pickupInfo.locality);
                if (draft.pickupInfo?.city) setPickupCity(draft.pickupInfo.city);
                if (draft.pickupInfo?.lat) setGeoLat(draft.pickupInfo.lat);
                if (draft.pickupInfo?.lng) setGeoLng(draft.pickupInfo.lng);
                if (draft.doorstepLocations) setDoorstepLocations(draft.doorstepLocations);
            }
        }
    }, [draftId]);

    const handlePhotoChange = (index, e) => {
        const file = e.target.files?.[0];
        if (file) {
            const nextPhotos = [...photos];
            nextPhotos[index] = file;
            setPhotos(nextPhotos);

            const reader = new FileReader();
            reader.onloadend = () => {
                const nextPreviews = [...photoPreviews];
                nextPreviews[index] = reader.result;
                setPhotoPreviews(nextPreviews);
            };
            reader.readAsDataURL(file);
        }
    };

    const removePhoto = (index) => {
        const nextPhotos = [...photos];
        nextPhotos[index] = null;
        setPhotos(nextPhotos);

        const nextPreviews = [...photoPreviews];
        nextPreviews[index] = null;
        setPhotoPreviews(nextPreviews);
    };

    const toggleClan = (clanId) => {
        setSelectedClans(prev =>
            prev.includes(clanId) ? prev.filter(id => id !== clanId) : [...prev, clanId]
        );
    };

    const removeClan = (clanId) => {
        setSelectedClans(prev => prev.filter(id => id !== clanId));
    };

    const stepProgress = { 1: 33, 2: 66, 3: 100 };

    const compileDraftPayload = () => {
        const selectedClanObjects = selectedClans.map(id => mockClans.find(c => c.id === id)).filter(Boolean);
        const openClans = selectedClanObjects.filter(c => c.privacy === 'open');
        let derivedVisibility = 'unlisted';
        if (selectedClanObjects.length === 0) {
            derivedVisibility = 'unlisted';
        } else if (openClans.length > 0) {
            derivedVisibility = 'public';
        } else {
            derivedVisibility = 'restricted';
        }

        return {
            id: draftId || `pitch-user-${Date.now()}`,
            title: productName,
            productName,
            category,
            description,
            productLink,
            price: Number(costPerUnit) || 0,
            costPerUnit: Number(costPerUnit) || 0,
            retailPrice: Number(retailPrice) || 0,
            totalUnits: Number(maxCapacity) || 0,
            minOrder: Number(minOrder) || 1,
            maxCapacity: Number(maxCapacity) || 1,
            unit: unitType || 'unit',
            unitType: unitType || 'unit',
            committedUnits: 0,
            waitlistCount: 0,
            deadline,
            status: 'active',
            visibility: derivedVisibility,
            deliveryType,
            doorstepScope,
            doorstepLocations: deliveryType === 'doorstep' ? doorstepLocations : [],
            isDoorstep: deliveryType === 'doorstep',
            isPanIndia: deliveryType === 'pan_india',
            isRemote: deliveryType === 'remote' || deliveryType === 'digital',
            isDigital: deliveryType === 'remote' || deliveryType === 'digital',
            pickupInfo: {
                address: pickupAddress || `${pickupLocality || 'Central'} Community Hub`,
                locality: pickupLocality,
                city: pickupCity,
                lat: geoLat,
                lng: geoLng,
                time: pickupTiming,
                deliveryType,
                doorstepLocations: deliveryType === 'doorstep' ? doorstepLocations : [],
                isDoorstep: deliveryType === 'doorstep',
                isPanIndia: deliveryType === 'pan_india',
                isRemote: deliveryType === 'remote' || deliveryType === 'digital',
            },
            pitchPolicies: {
                returnPolicy,
                returnPolicyCustom,
                cancellationFeePercent,
                platformFeePercent: 0,
                sellerName: sellerName || currentUser?.name || 'Community Host Sourcing',
                sellerId,
            },
            paymentMode,
            hostParticipates,
            clanIds: selectedClans,
            photos: photoPreviews.filter(Boolean),
            image: photoPreviews[0] || '/images/split-inverter-ac.jpg',
            host: {
                name: currentUser?.name || 'You (Host)',
                rating: currentUser?.rating || 5.0,
                isVerifiedVendor: currentUser?.isVerifiedVendor || false,
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

    const photoSlotIcons = ['add_a_photo', 'add', 'image'];
    const photoSlotLabels = ['COVER PHOTO (16:9)', 'PHOTO 2', 'PHOTO 3'];

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
                                Initiate a community group buy. Pool high-margin demand with your trusted circle to unlock direct wholesale pricing.
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
                                    placeholder="e.g. Daikin 1.5T 5-Star Split AC / Bridal Mehndi Studio Package"
                                    value={productName}
                                    onChange={e => setProductName(e.target.value)}
                                    required
                                />
                            </section>

                            <section className={styles.field}>
                                <label className={styles.label}>Select Category *</label>
                                <div className={styles.categoryGrid}>
                                    {HIGH_VALUE_CATEGORIES.map(cat => {
                                        const isSelected = category === cat.id;
                                        return (
                                            <div
                                                key={cat.id}
                                                className={`${styles.categoryCard} ${isSelected ? styles.categoryCardActive : ''}`}
                                                onClick={() => setCategory(cat.id)}
                                            >
                                                <span className={`material-symbols-outlined ${styles.categoryCardIcon}`}>
                                                    {cat.icon}
                                                </span>
                                                <div className={styles.categoryCardContent}>
                                                    <div className={styles.categoryCardTitle}>{cat.label}</div>
                                                    <p className={styles.categoryCardDesc}>{cat.desc}</p>
                                                </div>
                                                {isSelected && (
                                                    <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '18px' }}>
                                                        check_circle
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>

                            <section className={styles.field}>
                                <label className={styles.label}>Description & Sourcing Rationale *</label>
                                <textarea
                                    className={styles.textarea}
                                    rows={5}
                                    placeholder="Describe product specs, direct manufacturer/artisan origin, why pooling unlocks wholesale pricing, and warranty details..."
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
                                        placeholder="https://brand.com/product-specifications"
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
                                        placeholder="e.g. 45000"
                                        value={retailPrice}
                                        onChange={e => setRetailPrice(e.target.value)}
                                        min="0"
                                    />
                                </div>
                                <p className={styles.fieldHint}>Used to calculate savings percentage unlocked for pool members.</p>
                            </section>

                            {/* Seller & Sourcing Details */}
                            <div className={styles.sectionCard}>
                                <div className={styles.sectionCardTitle}>
                                    <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>store</span>
                                    <span>Seller & Brand Sourcing</span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.75rem', flexDirection: 'column' }}>
                                    <input
                                        className={styles.input}
                                        type="text"
                                        placeholder="Seller / Sourcing Entity Name (e.g. Daikin Authorised Regional Distributor)"
                                        value={sellerName}
                                        onChange={e => setSellerName(e.target.value)}
                                    />
                                    <input
                                        className={styles.input}
                                        type="text"
                                        placeholder="Business Registration No. (GSTIN / Trade License)"
                                        value={sellerId}
                                        onChange={e => setSellerId(e.target.value)}
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
                                            className={`${styles.deliveryModeCard} ${(deliveryType === 'remote' || deliveryType === 'digital') ? styles.deliveryModeCardActive : ''}`}
                                            onClick={() => setDeliveryType('remote')}
                                        >
                                            <div className={styles.deliveryModeCardTop}>
                                                <span className={`material-symbols-outlined ${styles.deliveryModeIcon}`}>language</span>
                                                {(deliveryType === 'remote' || deliveryType === 'digital') && <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '20px' }}>check_circle</span>}
                                            </div>
                                            <span className={styles.deliveryModeTitle}>🌐 Remote / Digital</span>
                                            <p className={styles.deliveryModeDesc}>Remote activities, cohort batches, cloud subscriptions, or digital license keys (accessible from anywhere).</p>
                                        </div>
                                    </div>

                                    {/* Doorstep Delivery Zone Configuration (For Vendor/Service Pools) */}
                                    {deliveryType === 'doorstep' && (
                                        <div className={styles.doorstepZoneBox}>
                                            <div className={styles.sectionCardTitle} style={{ fontSize: '0.875rem' }}>
                                                <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '18px' }}>map</span>
                                                <span>Serviced Doorstep Localities & Delivery Zones</span>
                                            </div>
                                            <p className={styles.fieldHint} style={{ margin: 0 }}>
                                                Select all city regions and neighborhood zones where you or your vendor provide doorstep delivery or on-site service:
                                            </p>

                                            {/* 1. City Tabs */}
                                            <label className={styles.limitLabel} style={{ marginTop: '0.35rem' }}>1. SELECT CITY / METRO REGION</label>
                                            <div className={styles.cityPillsRow}>
                                                {POPULAR_CITIES.map(c => (
                                                    <button
                                                        key={c.name}
                                                        type="button"
                                                        className={`${styles.cityPillBtn} ${activeDoorstepCity === c.name ? styles.cityPillBtnActive : ''}`}
                                                        onClick={() => setActiveDoorstepCity(c.name)}
                                                    >
                                                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>{c.icon}</span>
                                                        {c.name}
                                                    </button>
                                                ))}
                                            </div>

                                            {/* 2. Popular Localities in Selected City */}
                                            <div className={styles.zoneActionRow}>
                                                <label className={styles.limitLabel} style={{ margin: 0 }}>
                                                    2. POPULAR LOCALITIES IN {activeDoorstepCity.toUpperCase()}
                                                </label>
                                                <div className={styles.zoneActionLinks}>
                                                    <button type="button" className={styles.zoneActionBtn} onClick={selectAllCityLocalities}>
                                                        Select All in {activeDoorstepCity}
                                                    </button>
                                                    <button type="button" className={styles.zoneActionBtn} onClick={clearDoorstepLocations}>
                                                        Clear All
                                                    </button>
                                                </div>
                                            </div>

                                            <div className={styles.geoLocalityChips}>
                                                {(CITY_LOCALITY_MAP[activeDoorstepCity] || []).map(loc => {
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

                                            {/* 3. Mini Search & Add Bar */}
                                            <div className={styles.doorstepAddRow} style={{ marginTop: '0.5rem' }}>
                                                <input
                                                    className={styles.input}
                                                    type="text"
                                                    placeholder={`Search or add custom locality in ${activeDoorstepCity} (e.g. Kokapet, Bellandur)...`}
                                                    value={customLocalityInput}
                                                    onChange={e => setCustomLocalityInput(e.target.value)}
                                                    onKeyDown={e => { if (e.key === 'Enter') addCustomDoorstepLocation(e); }}
                                                />
                                                <button type="button" className={styles.doorstepAddBtn} onClick={addCustomDoorstepLocation}>
                                                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span>
                                                    Add Zone
                                                </button>
                                            </div>

                                            {/* 4. Active Selected Zones Tray */}
                                            {doorstepLocations.length > 0 && (
                                                <div style={{ marginTop: '0.5rem' }}>
                                                    <label className={styles.limitLabel} style={{ fontSize: '0.6875rem' }}>
                                                        SELECTED SERVICED LOCALITIES ({doorstepLocations.length})
                                                    </label>
                                                    <div className={styles.selectedZonesArea}>
                                                        {doorstepLocations.map(loc => (
                                                            <span key={loc} className={styles.selectedZoneChip}>
                                                                📍 {loc}
                                                                <button type="button" className={styles.removeZoneBtn} onClick={() => toggleDoorstepLocation(loc)}>
                                                                    <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>close</span>
                                                                </button>
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Physical Hub & Pickup Information */}
                                    {(deliveryType === 'pickup' || deliveryType === 'doorstep') && (
                                        <div className={styles.geoPickerBox}>
                                            <div className={styles.geoDetectRow}>
                                                <div>
                                                    <label className={styles.limitLabel} style={{ marginBottom: '0.15rem' }}>
                                                        {deliveryType === 'doorstep' ? 'SERVICE BASE HUB / DISPATCH POINT' : 'PICKUP HUB & HANDOVER LOCATION'}
                                                    </label>
                                                    <p className={styles.fieldHint} style={{ margin: 0 }}>
                                                        Used to compute proximity and distances for nearby participants.
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
                                                <label className={styles.limitLabel}>
                                                    {deliveryType === 'doorstep' ? 'DISPATCH / STORE LANDMARK ADDRESS *' : 'PICKUP HUB LANDMARK / ADDRESS *'}
                                                </label>
                                                <input 
                                                    className={styles.input} 
                                                    type="text" 
                                                    placeholder="e.g. Main Clubhouse Lobby / Gate 2, DLF CyberCity, Madhapur" 
                                                    value={pickupAddress} 
                                                    onChange={e => setPickupAddress(e.target.value)} 
                                                />
                                            </div>

                                            <div className={styles.field}>
                                                <label className={styles.limitLabel}>PICKUP / SERVICE TIMING WINDOW</label>
                                                <input 
                                                    className={styles.input} 
                                                    type="text" 
                                                    placeholder="e.g. Saturday morning 10:00 AM – 1:00 PM" 
                                                    value={pickupTiming} 
                                                    onChange={e => setPickupTiming(e.target.value)} 
                                                />
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
                                                {(deliveryType === 'remote' || deliveryType === 'digital') && '🌐 Remote / Digital'}
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
