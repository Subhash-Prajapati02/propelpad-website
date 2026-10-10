import { useEffect, useMemo, useRef, useState } from 'react';
import type { Map as LeafletMap, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowUpRight, Crosshair, Mail, MapPin, Phone, Search, Clock3, Navigation2, Snowflake, IceCreamCone, CakeSlice, Sparkles, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { networkStores, filterStores, distanceKm, mapsLink, leadership, onboarding, faqs, expansion, type NetworkStore, type StoreStatus } from '@/lib/propelpad-content';
import collection from '@/assets/frozen-collection.jpg';
import cone from '@/assets/floating-cone.png';

export function FloatingCone() {
 return <img src={cone} alt="" aria-hidden="true" className="floating-cone" width={768} height={1024}/>;
}

export function Collection() {
 const categories = [
  { icon: IceCreamCone, title: 'Ice cream & gelato', detail: 'Heritage dairy to small-batch scoops.' },
  { icon: CakeSlice, title: 'Frozen desserts', detail: 'Mousses, cakes and indulgent treats.' },
  { icon: Sparkles, title: 'Specialty foods', detail: 'Guilt-free and premium specialty ranges.' },
 ];
 return <section className="collection-section" aria-labelledby="collection-title"><div className="collection-inner"><div className="collection-copy" data-reveal><span className="eyebrow">CATEGORIES WE CARE FOR</span><h2 id="collection-title">Made to be enjoyed.<br/><span className="text-primary">Stored to stay perfect.</span></h2><p>Frozen and specialty products need more than shelf space. Every category gets its own storage, handling and temperature discipline — so it reaches the doorstep exactly as your brand intended.</p><div className="category-list">{categories.map(c => <div className="category" key={c.title}><span><c.icon size={20} strokeWidth={1.5}/></span><div><strong>{c.title}</strong><small>{c.detail}</small></div></div>)}</div></div><div className="collection-visual" data-reveal><img src={collection} alt="Gelato scoops, a waffle cone, fruit popsicles and chocolate mousse on a frosted white surface" width={1264} height={848} loading="lazy"/><div className="collection-badge"><Snowflake size={16}/><div><small>COLD-CHAIN</small><strong>Older batches move first</strong></div></div><span className="visual-note">Illustrative product imagery</span></div></div></section>;
}

export function Onboarding() {
 return <section className="section onboarding-section" id="how-it-works"><div className="section-heading" data-reveal><div><span className="eyebrow">HOW ONBOARDING WORKS</span><h2>From first call<br/><span className="text-primary">to first order.</span></h2></div><p>A simple path onto the white store network — built around your products and your growth.</p></div><ol className="onboarding-grid">{onboarding.map((step, i) => <li key={step.title} className="onboarding-step" data-reveal><span className="step-number">0{i + 1}</span><h3>{step.title}</h3><p>{step.detail}</p></li>)}</ol></section>;
}

export function Leadership() {
 return <section className="section leadership-section" id="leadership"><div className="section-heading" data-reveal><div><span className="eyebrow">LEADERSHIP</span><h2>The people behind<br/><span className="text-primary">the white store network.</span></h2></div><p>Talk directly to the team building Propelpad across Mumbai, Thane and beyond.</p></div><div className="leader-grid">{leadership.map(person => <article className="leader-card" key={person.name} data-reveal><div className="leader-portrait">{person.photo ? <img src={person.photo} alt={`Portrait of ${person.name}`} loading="lazy"/> : <><span className="leader-initials" aria-hidden="true">{person.initials}</span><span className="portrait-note">Portrait coming soon</span></>}</div><div className="leader-body"><span className="eyebrow">{person.role.toUpperCase()}</span><h3>{person.name}</h3>{person.bio && <p>{person.bio}</p>}<div className="leader-links"><a href={`mailto:${person.email}`}><Mail size={15}/>{person.email}</a><a href={`tel:${person.tel}`}><Phone size={15}/>{person.phone}</a></div></div></article>)}</div></section>;
}

export function Faq() {
 return <section className="section faq-section" id="faq"><div className="faq-layout"><div data-reveal><span className="eyebrow text-primary">QUESTIONS, ANSWERED</span><h2>Everything brands<br/>ask us first.</h2></div><div className="faq-list" data-reveal>{faqs.map(f => <details key={f.q}><summary>{f.q}<Plus size={18}/></summary><p>{f.a}</p></details>)}</div></div></section>;
}

type Filter = 'all' | StoreStatus;
export function StoreLocator() {
 const [query, setQuery] = useState('');
 const [status, setStatus] = useState<Filter>('all');
 const [selectedId, setSelectedId] = useState(networkStores[0]!.id);
 const [origin, setOrigin] = useState<{ lat: number; lng: number } | null>(null);
 const [geoMessage, setGeoMessage] = useState('');
 const mapNode = useRef<HTMLDivElement>(null);
 const map = useRef<LeafletMap | null>(null);
 const markers = useRef<Record<string, Marker>>({});

 const visible = useMemo(() => {
  const list = filterStores(networkStores, query, status);
  return origin ? [...list].sort((a, b) => distanceKm(origin, a) - distanceKm(origin, b)) : list;
 }, [query, status, origin]);
 const selected = networkStores.find(s => s.id === selectedId) ?? networkStores[0]!;

 useEffect(() => {
  let cancelled = false;
  import('leaflet').then(({ default: L }) => {
   if (cancelled || !mapNode.current || map.current) return;
   const m = L.map(mapNode.current, { scrollWheelZoom: false, zoomControl: true, attributionControl: true }).setView([19.1, 72.9], 10);
   L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { maxZoom: 18, attribution: '&copy; OpenStreetMap contributors &copy; CARTO' }).addTo(m);
   networkStores.forEach(store => {
    const icon = L.divIcon({ className: '', html: `<span class="leaflet-pin ${store.status}"></span>`, iconSize: [26, 26], iconAnchor: [13, 13] });
    const marker = L.marker([store.lat, store.lng], { icon, title: store.name, keyboard: true, alt: store.name }).addTo(m);
    marker.on('click', () => setSelectedId(store.id));
    markers.current[store.id] = marker;
   });
   map.current = m;
  });
  return () => { cancelled = true; map.current?.remove(); map.current = null; markers.current = {}; };
 }, []);

 useEffect(() => {
  Object.entries(markers.current).forEach(([id, marker]) => {
   const el = marker.getElement()?.querySelector('.leaflet-pin');
   el?.classList.toggle('selected', id === selectedId);
   const shown = visible.some(s => s.id === id);
   marker.setOpacity(shown ? 1 : 0.25);
  });
 }, [selectedId, visible]);

 const focus = (store: NetworkStore) => {
  setSelectedId(store.id);
  map.current?.flyTo([store.lat, store.lng], store.status === 'planned' ? 6 : 12, { duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 0.8 });
 };
 const showIndia = () => map.current?.flyTo([20.6, 78.9], 4.6, { duration: 0.8 });
 const locate = () => {
  if (!navigator.geolocation) { setGeoMessage('Location isn’t available in this browser.'); return; }
  setGeoMessage('Finding your location…');
  navigator.geolocation.getCurrentPosition(pos => {
   const here = { lat: pos.coords.latitude, lng: pos.coords.longitude };
   setOrigin(here);
   const nearest = [...filterStores(networkStores, '', 'operational')].sort((a, b) => distanceKm(here, a) - distanceKm(here, b))[0]!;
   setGeoMessage(`Nearest white store area: ${nearest.area}, about ${Math.round(distanceKm(here, nearest))} km away.`);
   focus(nearest);
  }, () => setGeoMessage('Location permission was declined. Search by area or city instead.'), { timeout: 10000 });
 };
 const operational = networkStores.filter(s => s.status === 'operational').length;
 const plannedStores = expansion.reduce((t, c) => t + c.stores, 0);

 return <section className="section locator-section" id="network">
  <div className="section-heading" data-reveal><div><span className="eyebrow">04 / A NETWORK BUILT FOR REACH</span><h2>Mumbai, fully covered.<br/><span className="text-muted-foreground">India, on the horizon.</span></h2></div><p>{operational} operational white stores across Mumbai and Thane. {plannedStores} more planned across five cities in FY26–27.</p></div>
  <div className="locator-toolbar" data-reveal>
   <label className="locator-search"><Search size={16}/><span className="sr-only">Search by area, city or state</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search area, city or state" maxLength={60}/></label>
   <div className="locator-filters" role="group" aria-label="Filter stores">{(['all', 'operational', 'planned'] as const).map(f => <button key={f} type="button" className={status === f ? 'active' : ''} aria-pressed={status === f} onClick={() => { setStatus(f); if (f === 'planned') showIndia(); }}>{f === 'all' ? 'All' : f === 'operational' ? 'Operational' : 'Planned'}</button>)}</div>
   <Button variant="glass" type="button" onClick={locate}><Crosshair/> Near me</Button>
   <Button variant="glass" type="button" onClick={showIndia}>View all India</Button>
  </div>
  {geoMessage && <p className="geo-message" role="status">{geoMessage}</p>}
  <div className="locator-layout" data-reveal>
   <div className="locator-map-wrap"><div ref={mapNode} className="locator-map" role="region" aria-label="Map of Propelpad white stores in India"/><div className="map-legend"><span><i className="leaflet-pin operational"/>Operational</span><span><i className="leaflet-pin planned"/>Planned</span></div>
    <article className="store-card" aria-live="polite"><span className={`store-status ${selected.status}`}>{selected.status === 'operational' ? 'OPERATIONAL WHITE STORE' : `PLANNED · ${selected.quarter} FY26–27`}</span><h3>{selected.status === 'operational' ? selected.area : selected.city}</h3><p className="store-meta"><MapPin size={14}/>{selected.city}, {selected.state}</p>
     {selected.status === 'operational' ? <dl><div><dt>Address</dt><dd>{selected.address ?? 'Full address to be confirmed'}</dd></div><div><dt><Clock3 size={12}/> Hours</dt><dd>{selected.hours ?? 'To be confirmed'}</dd></div><div><dt>Contact</dt><dd><a href="tel:+918237981485">Mumbai City Lead · +91 8237981485</a></dd></div><div><dt>Services</dt><dd>Temperature-controlled storage · Zomato & Swiggy fulfilment</dd></div></dl> : <dl><div><dt>Planned stores</dt><dd>{selected.plannedStores}</dd></div><div><dt>Status</dt><dd>Planned expansion — locations not yet announced</dd></div></dl>}
     <a className="store-directions" href={mapsLink(selected)} target="_blank" rel="noreferrer"><Navigation2 size={14}/>{selected.address ? 'Get directions' : `View ${selected.status === 'operational' ? 'area' : 'city'} on Google Maps`}<ArrowUpRight size={14}/></a>
     <small className="store-precision">Marker shows the {selected.precision === 'area' ? 'neighbourhood' : 'city'}, not an exact address.</small></article>
   </div>
   <div className="locator-list" role="list" aria-label="Store list">{visible.length === 0 ? <p className="locator-empty">No locations match “{query}”. Try Mumbai, Thane or a planned city.</p> : visible.map(store => <button type="button" role="listitem" key={store.id} className={`locator-item ${store.id === selectedId ? 'active' : ''}`} onClick={() => focus(store)} aria-pressed={store.id === selectedId}><i className={`leaflet-pin ${store.status}`}/><span><strong>{store.status === 'operational' ? store.area : store.city}</strong><small>{store.status === 'operational' ? `${store.city} · Operational` : `${store.plannedStores} stores · ${store.quarter} planned`}</small></span>{origin && <em>{Math.round(distanceKm(origin, store))} km</em>}<ArrowUpRight size={15}/></button>)}</div>
  </div>
 </section>;
}
