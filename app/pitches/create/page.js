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

function CreatePitchForm() {
    const router = useRouter();
    const { currentUser } = useAuth();
    const searchParams = useSearchParams();
    const draftId = searchParams.get('draftId');
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Step 1 state
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [productLink, setProductLink] = useState('');
    const [photos, setPhotos] = useState([null, null, null]);
    const [photoPreviews, setPhotoPreviews] = useState([null, null, null]);
    const [sellerName, setSellerName] = useState('');
    const [sellerId, setSellerId] = useState('');

    // Step 2 state
    const [minOrder, setMinOrder] = useState('');
    const [maxCapacity, setMaxCapacity] = useState('');
    const [unitType, setUnitType] = useState('');
    const [costPerUnit, setCostPerUnit] = useState('');

    // Step 3 state
    const [deadline, setDeadline] = useState('');
    const [logistics, setLogistics] = useState('');
    const [paymentMode, setPaymentMode] = useState('upi');
    const [selectedClans, setSelectedClans] = useState(['clan-1']);
    const [showClanDropdown, setShowClanDropdown] = useState(false);
    const clanDropdownRef = useRef(null);

    // Geolocation & Pickup Point State
    const [pickupLandmark, setPickupLandmark] = useState('');
    const [pickupLocality, setPickupLocality] = useState('Hitec City');
    const [pickupCity, setPickupCity] = useState('Hyderabad');
    const [geoLat, setGeoLat] = useState(17.4435);
    const [geoLng, setGeoLng] = useState(78.3772);
    const [isRemoteDelivery, setIsRemoteDelivery] = useState(false);
    const [isDetectingGeo, setIsDetectingGeo] = useState(false);
    const [geoStatusMsg, setGeoStatusMsg] = useState('');

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
            (err) => {
                setIsDetectingGeo(false);
                setGeoStatusMsg('GPS permission denied. Please select your locality preset.');
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
                        description: 'Farm-fresh A2 milk sourced directly from free-grazing Gir cows. Untouched by hands, unadulterated, and delivered to your doorstep every morning.',
                        unitType: 'Litre'
                    };
                } else if (draftId === 'host-draft-2') {
                    draft = {
                        title: 'Cold Pressed Oil',
                        description: 'Authentic wood-pressed oil. Pure and unrefined.',
                        unitType: 'Litre',
                        costPerUnit: 185,
                        image: '/images/wood_pressed_oil.png'
                    };
                }
            }
            if (draft) {
                setProductName(draft.title || '');
                setDescription(draft.description || '');
                setMinOrder(draft.minOrder?.toString() || '');
                setMaxCapacity(draft.maxCapacity?.toString() || '');
                setCostPerUnit(draft.costPerUnit?.toString() || '');
                setUnitType(draft.unitType || '');
                // Set first photo as preview if image exists
                if (draft.image) {
                    const newPreviews = [...photoPreviews];
                    newPreviews[0] = draft.image;
                    setPhotoPreviews(newPreviews);
                }
                if (draft.clanId) {
                    setSelectedClans([draft.clanId]);
                }
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

    const handlePublish = () => {
        setLoading(true);
        setTimeout(() => {
            router.push('/pitches/pitch-1/published');
        }, 900);
    };

    const handlePreview = () => {
        router.push('/pitches/create/preview');
    };

    const handleSaveDraft = () => {
        router.push('/pitches/create/draft-saved');
    };

    const photoSlotIcons = ['add_a_photo', 'add', 'image'];
    const photoSlotLabels = ['COVER PHOTO', 'ADD PHOTO', ''];

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

                    {/* Progress */}
                    <div className={styles.progressSection}>
                        <div className={styles.progressTop}>
                            <div>
                                <span className={styles.stepLabel}>Step {step} of 3</span>
                                <h1 className={styles.stepTitle}>
                                    {step === 1 && 'Product Details'}
                                    {step === 2 && 'Pricing & Quantity'}
                                    {step === 3 && 'Rules & Publish'}
                                </h1>
                            </div>
                            <span className={styles.progressLabel}>{stepProgress[step]}% Complete</span>
                        </div>
                        <div className={styles.progressTrack}>
                            <div className={styles.progressFill} style={{ width: `${stepProgress[step]}%` }} />
                        </div>
                    </div>

                    {/* ── STEP 1 ── */}
                    {step === 1 && (
                        <div className={styles.formCanvas}>
                            <section className={styles.field}>
                                <label className={styles.label}>Product Name *</label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="e.g. Organic Heritage Basmati Rice"
                                    value={productName}
                                    onChange={e => setProductName(e.target.value)}
                                    required
                                />
                            </section>

                            <section className={styles.field}>
                                <label className={styles.label}>Description *</label>
                                <textarea
                                    className={styles.textarea}
                                    rows={5}
                                    placeholder="Describe the product quality, origin, and why your community needs this pool..."
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    required
                                />
                            </section>

                            <section className={styles.field}>
                                <label className={styles.label}>Product Photos (Up to 3)</label>
                                <div className={styles.photoGrid}>
                                    {[0, 1, 2].map(i => (
                                        <div key={i} className={`${styles.photoSlot} ${i === 0 ? styles.photoSlotPrimary : i === 1 ? styles.photoSlotSecondary : styles.photoSlotEmpty}`}>
                                            {photoPreviews[i] ? (
                                                <>
                                                    <img src={photoPreviews[i]} alt={`Photo ${i + 1}`} className={styles.photoPreviewImg} />
                                                    <button className={styles.removePhotoBtn} onClick={() => removePhoto(i)}>
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
                                <p className={styles.photoHint}>High-quality images help build trust in your community pitch.</p>
                            </section>

                            <section className={styles.field}>
                                <div className={styles.labelRow}>
                                    <label className={styles.label}>Product Link</label>
                                    <span className={styles.optionalBadge}>OPTIONAL</span>
                                </div>
                                <div className={styles.inputWithIcon}>
                                    <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-muted)' }}>link</span>
                                    <input
                                        className={styles.inputPlain}
                                        type="url"
                                        placeholder="https://original-source.com/product"
                                        value={productLink}
                                        onChange={e => setProductLink(e.target.value)}
                                    />
                                </div>
                            </section>

                            <section className={styles.field}>
                                <div className={styles.labelRow}>
                                    <label className={styles.label}>Seller Details</label>
                                    <span className={styles.optionalBadge}>OPTIONAL</span>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', flexDirection: 'column' }}>
                                    <input
                                        className={styles.input}
                                        type="text"
                                        placeholder="Seller Name (e.g. Columbus Vacations)"
                                        value={sellerName}
                                        onChange={e => setSellerName(e.target.value)}
                                    />
                                    <input
                                        className={styles.input}
                                        type="text"
                                        placeholder="Identification No. (e.g. GSTIN / FSSAI)"
                                        value={sellerId}
                                        onChange={e => setSellerId(e.target.value)}
                                    />
                                </div>
                                <p className={styles.fieldHint} style={{ lineHeight: '1.4', marginTop: '0.5rem' }}>
                                    <strong>Disclaimer:</strong> Providing seller details is optional (as you may be the producer yourself). However, if no third-party seller is declared, <strong>you (the Host) will be held fully liable</strong> for any issues arising from the product/service, including delays, defects, or damages.
                                </p>
                            </section>

                            {/* Pitcher Tip */}
                            <div className={styles.tipCard}>
                                <div className={styles.tipContent}>
                                    <span className={styles.tipEyebrow}>PITCHER TIP</span>
                                    <h3 className={styles.tipTitle}>Build Collective Trust</h3>
                                    <p className={styles.tipBody}>Include specific details about quality certifications or local sourcing. Transparent pitches are 40% more likely to reach their target.</p>
                                </div>
                                <div className={styles.tipIcon}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>verified_user</span>
                                </div>
                            </div>

                            <button
                                className={styles.ctaBtn}
                                disabled={!productName.trim() || !description.trim()}
                                onClick={() => setStep(2)}
                            >
                                Continue to Pricing
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                    )}

                    {/* ── STEP 2 ── */}
                    {step === 2 && (
                        <div className={styles.formCanvas}>
                            {/* Row 1: Min Order + Max Capacity side by side */}
                            <div className={styles.priceGrid}>
                                <div className={styles.field}>
                                    <label className={styles.label}>Minimum Order (Goal) *</label>
                                    <input className={styles.input} type="number" placeholder="10" value={minOrder} onChange={e => setMinOrder(e.target.value)} min={1} />
                                    <p className={styles.fieldHint}>Min quantity for success</p>
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>Maximum Capacity *</label>
                                    <input className={styles.input} type="number" placeholder="20" value={maxCapacity} onChange={e => setMaxCapacity(e.target.value)} min={minOrder || 1} />
                                    <p className={styles.fieldHint}>Maximum units available</p>
                                </div>
                            </div>

                            {/* Row 2: Cost Per Unit full-width */}
                            <div className={styles.field}>
                                <label className={styles.label}>Cost Per Unit *</label>
                                <div className={styles.currencyInput}>
                                    <span className={styles.currencySymbol}>₹</span>
                                    <input className={styles.inputPlain} type="number" placeholder="125" value={costPerUnit} onChange={e => setCostPerUnit(e.target.value)} />
                                </div>
                                <p className={styles.fieldHint}>Price per unit for participants</p>
                            </div>

                            {/* Row 3: Unit Type full-width */}
                            <div className={styles.field}>
                                <label className={styles.label}>Unit Type *</label>
                                <input className={styles.input} type="text" placeholder="kg, seat, piece, litre, box..." value={unitType} onChange={e => setUnitType(e.target.value)} />
                                <p className={styles.fieldHint}>How is the item measured?</p>
                            </div>

                            {/* Price Preview */}
                            {costPerUnit && unitType && (
                                <div className={styles.pricePreview}>
                                    <div className={styles.previewEyebrow}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--primary)' }}>visibility</span>
                                        <span>PRICE PREVIEW</span>
                                    </div>
                                    <div className={styles.previewRow}>
                                        <div className={styles.previewPrice}>
                                            <span className={styles.previewBigPrice}>₹{Number(costPerUnit).toLocaleString('en-IN')}</span>
                                            <span className={styles.previewUnit}>/{unitType}</span>
                                        </div>
                                        <div className={styles.previewMid}>
                                            <span className={styles.previewAvail}>{minOrder || '–'} {pluralizeUnit(Number(minOrder) || 2, unitType)} Minimum</span>
                                            <span className={styles.previewMinNote}>{maxCapacity || '–'} {pluralizeUnit(Number(maxCapacity) || 2, unitType)} Maximum Capacity</span>
                                        </div>
                                    </div>
                                    <div className={styles.lockNote}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'var(--primary)' }}>lock</span>
                                        <span>Prices are locked for 48 hours once pitch is live.</span>
                                    </div>
                                </div>
                            )}

                            <div className={styles.stepBtns}>
                                <button className={styles.backBtn} onClick={() => setStep(1)}>Back</button>
                                <button
                                    className={styles.nextBtn}
                                    disabled={!costPerUnit || !unitType || !minOrder || !maxCapacity}
                                    onClick={() => setStep(3)}
                                >
                                    Next: Pitch Details
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── STEP 3 ── */}
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
                                {/* Target Clan(s) & Visibility */}
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

                                {/* Pool Deadline */}
                                <div className={styles.sectionCard}>
                                    <div className={styles.sectionCardTitle}>
                                        <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>schedule</span>
                                        <span>Pool Deadline</span>
                                    </div>
                                    <div className={styles.field}>
                                        <label className={styles.limitLabel}>DEADLINE DATE & TIME</label>
                                        <div className={styles.dateInputWrap}>
                                            <input className={styles.input} type="datetime-local" value={deadline} onChange={e => setDeadline(e.target.value)} />
                                            <span className={`material-symbols-outlined ${styles.dateIcon}`}>calendar_clock</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Pickup Hub & Geolocation */}
                                <div className={styles.sectionCard}>
                                    <div className={styles.sectionCardTitle}>
                                        <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>near_me</span>
                                        <span>Pickup Point & Geolocation Hub</span>
                                    </div>
                                    
                                    <div style={{ marginBottom: '0.75rem' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600' }}>
                                            <input 
                                                type="checkbox" 
                                                checked={isRemoteDelivery} 
                                                onChange={e => setIsRemoteDelivery(e.target.checked)} 
                                                style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                                            />
                                            <span>📦 Pan-India / Remote Delivery (No physical pickup hub needed)</span>
                                        </label>
                                    </div>

                                    {!isRemoteDelivery && (
                                        <div className={styles.geoPickerBox}>
                                            <div className={styles.geoDetectRow}>
                                                <div>
                                                    <label className={styles.limitLabel} style={{ marginBottom: '0.15rem' }}>PHYSICAL PICKUP HUB LOCATION</label>
                                                    <p className={styles.fieldHint} style={{ margin: 0 }}>
                                                        Used by the Geolocation Proximity Engine to filter nearby members.
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

                                            <div className={styles.field} style={{ marginTop: '0.5rem' }}>
                                                <label className={styles.limitLabel}>PICKUP LANDMARK / SPECIFIC ADDRESS</label>
                                                <input 
                                                    className={styles.input} 
                                                    type="text" 
                                                    placeholder="e.g. Main Gate / Clubhouse, Inorbit Mall pickup point" 
                                                    value={pickupLandmark} 
                                                    onChange={e => setPickupLandmark(e.target.value)} 
                                                />
                                            </div>

                                            <div className={styles.field}>
                                                <label className={styles.limitLabel}>NEIGHBORHOOD HUB (PROXIMITY ANCHOR)</label>
                                                <select
                                                    className={styles.select}
                                                    value={pickupLocality}
                                                    onChange={(e) => {
                                                        const targetVal = e.target.value;
                                                        const presets = [
                                                            { name: 'Hitec City', city: 'Hyderabad', lat: 17.4435, lng: 78.3772 },
                                                            { name: 'Gachibowli', city: 'Hyderabad', lat: 17.4401, lng: 78.3489 },
                                                            { name: 'Madhapur', city: 'Hyderabad', lat: 17.4483, lng: 78.3915 },
                                                            { name: 'Jubilee Hills', city: 'Hyderabad', lat: 17.4319, lng: 78.4073 },
                                                            { name: 'Tellapur', city: 'Hyderabad', lat: 17.4812, lng: 78.2914 },
                                                            { name: 'Whitefield', city: 'Bengaluru', lat: 12.9698, lng: 77.7499 },
                                                            { name: 'HSR Layout', city: 'Bengaluru', lat: 12.9121, lng: 77.6446 },
                                                            { name: 'Indiranagar', city: 'Bengaluru', lat: 12.9784, lng: 77.6408 },
                                                            { name: 'Koramangala', city: 'Bengaluru', lat: 12.9352, lng: 77.6245 },
                                                            { name: 'Bandra Kurla Complex (BKC)', city: 'Mumbai', lat: 19.0664, lng: 72.8687 },
                                                            { name: 'Powai (Hiranandani)', city: 'Mumbai', lat: 19.1176, lng: 72.9060 },
                                                        ];
                                                        const found = presets.find(p => p.name === targetVal);
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
                                                        <option value="Tellapur">Tellapur (MyHome Tridasa Hub)</option>
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
                                        </div>
                                    )}
                                </div>

                                {/* Logistics & Payment */}
                                <div className={styles.sectionCard}>
                                    <div className={styles.sectionCardTitle}>
                                        <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>local_shipping</span>
                                        <span>Fulfillment Logistics & Payment</span>
                                    </div>
                                    <label className={styles.limitLabel}>PICKUP/DELIVERY INSTRUCTIONS</label>
                                    <textarea
                                        className={styles.textarea}
                                        rows={3}
                                        placeholder="e.g. Items will be dropped at the main clubhouse lobby by 5 PM Friday..."
                                        value={logistics}
                                        onChange={e => setLogistics(e.target.value)}
                                    />
                                    <div style={{ marginTop: '1rem' }}>
                                        <label className={styles.limitLabel}>PAYMENT MODE</label>
                                        <div className={styles.radioRow}>
                                            {[['upi', 'UPI Escrow (Safe)'], ['cod', 'Cash on Delivery']].map(([val, label]) => (
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
                                    </div>
                                </div>

                                {/* Review Summary */}
                                <div className={styles.reviewCard}>
                                    <div className={styles.reviewHeader}>
                                        <div className={styles.reviewTitleGroup}>
                                            <span className={styles.reviewTitle}>Review Summary</span>
                                        </div>
                                        <button className={styles.previewBtn} type="button" onClick={handlePreview}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>visibility</span>
                                            Preview
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
                                        <div className={styles.reviewMetaItem}><span className={styles.metaLabel}>GOAL</span><span>Min {minOrder || '–'} {pluralizeUnit(Number(minOrder) || 2, unitType)} · Max {maxCapacity || '–'} {pluralizeUnit(Number(maxCapacity) || 2, unitType)}</span></div>
                                        <div className={styles.reviewMetaItem}><span className={styles.metaLabel}>DEADLINE</span><span>{deadline ? new Date(deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '–'}</span></div>
                                        <div className={styles.reviewMetaItem}><span className={styles.metaLabel}>PAYMENT</span><span>{paymentMode === 'upi' ? 'UPI Escrow (Safe)' : 'Cash on Delivery'}</span></div>
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
                                <p className={styles.terms}>By publishing, you agree to the LetsStack Community Guidelines and Escrow Terms.</p>
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
