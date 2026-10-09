import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, ArrowRight, Check, ChevronDown, Menu, X, Plus, Minus, Mail, Phone, MapPin, Snowflake, ShieldCheck, ScanLine, Clock3, BarChart3, Bell, PackageCheck, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contacts, composeInquiry, locations, expansion, intelligence, buying } from '@/lib/propelpad-content';
import store20 from '@/assets/stores/store-20.webp.asset.json';
import store21 from '@/assets/stores/store-21.webp.asset.json';
import store22 from '@/assets/stores/store-22.webp.asset.json';

export function Brand({ footer = false }: { footer?: boolean }) {
 return <a href="#top" className={`wordmark ${footer ? 'footer-wordmark' : ''}`} aria-label="Propelpad home">propelpad<span className="wordmark-symbol" aria-hidden="true">↗</span></a>;
}
export function Navigation() {
 const [open, setOpen] = useState(false);
 const links = [['The white store difference', '#difference'], ['Our network', '#network'], ['Our brands', '#brands']];
 return <header className="site-header"><div className="nav-inner"><Brand/><nav aria-label="Main navigation" className="desktop-nav">{links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav><Button asChild variant="brand" className="nav-cta"><a href="#contact">Partner with us <ArrowUpRight/></a></Button><Button variant="quiet" size="icon" className="mobile-menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X/> : <Menu/>}</Button></div>{open && <nav className="mobile-nav" aria-label="Mobile navigation">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}<ArrowUpRight/></a>)}<a href="#contact" onClick={() => setOpen(false)}>Partner with us <ArrowUpRight/></a></nav>}</header>;
}
export function Motion() {
 useEffect(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .08 });
  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
  return () => { observer.disconnect(); document.documentElement.classList.remove('motion-ready'); };
 }, []);
 return null;
}
const scenes = [
 { image: store21.url, number: '01', label: 'THE ENVIRONMENT', title: 'A better place\nfor your brand.', detail: 'Bright, clean facilities, maintained to brand standards. Not dark stores. Not forgotten warehouses.', icon: ShieldCheck },
 { image: store22.url, number: '02', label: 'THE STANDARD', title: 'Freshness is\nnon-negotiable.', detail: 'Temperature-controlled storage, category-specific handling and cold-chain batch sequencing.', icon: Snowflake },
 { image: store20.url, number: '03', label: 'THE LAST MILE', title: 'Every order.\nReady in moments.', detail: 'Real-time quality checks before dispatch. An average preparation time of just 1 minute, 38 seconds.', icon: PackageCheck },
];
export function StoreStory() {
 const ref = useRef<HTMLElement>(null);
 const [scene, setScene] = useState(0);
 const [playing, setPlaying] = useState(true);
 const video = useRef<HTMLVideoElement>(null);
 useEffect(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setPlaying(false); return; }
  let pending = false;
  const update = () => { pending = false; const rect = ref.current?.getBoundingClientRect(); if (!rect) return; const progress = -rect.top / Math.max(1, rect.height - window.innerHeight); setScene(Math.max(0, Math.min(2, Math.floor(progress * 3)))); };
  const scroll = () => { if (!pending) { pending = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', scroll, { passive: true }); update();
  return () => window.removeEventListener('scroll', scroll);
 }, []);
 useEffect(() => { if (!video.current) return; if (playing) video.current.play().catch(() => {}); else video.current.pause(); }, [playing]);
 const current = scenes[scene]; const Icon = current.icon;
 return <section className="store-story" id="inside" ref={ref}><div className="story-sticky"><div className="story-visual">{scenes.map((s, i) => <img key={s.number} src={s.image} alt={`Inside a Propelpad white store — ${s.label.toLowerCase()}`} loading="lazy" width="1200" height="900" className={i === scene ? 'story-image active' : 'story-image'}/>)}{/* Store video is added after production, preserving authentic photo fallback. */}<div className="story-shade"/></div><div className="story-top"><span className="eyebrow"><span className="status-dot"/> INSIDE OUR WHITE STORES</span><span className="story-count">{current.number} / 03</span></div><div className="story-content"><span className="story-kicker"><Icon size={18}/>{current.label}</span><h2>{current.title}</h2><p>{current.detail}</p><div className="story-steps" aria-label="Store standards">{scenes.map((s, i) => <Button variant="glass" key={s.number} aria-label={`View ${s.label.toLowerCase()}`} aria-pressed={scene === i} className={scene === i ? 'story-step active' : 'story-step'} onClick={() => { setScene(i); const node = ref.current; if (node && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) window.scrollTo({ top: window.scrollY + node.getBoundingClientRect().top + (node.offsetHeight - window.innerHeight) * (i / 3 + .06), behavior: 'smooth' }); }}>{s.number}</Button>)}</div></div><div className="story-footer"><span><ShieldCheck size={15}/> FSSAI-compliant</span><span><Snowflake size={15}/> Temperature-controlled</span><span><ScanLine size={15}/> Real-time quality checks</span><span>CCTV-monitored</span></div></div></section>;
}
export function Intelligence() {
 const [active, setActive] = useState(0);
 const icons = [BarChart3, Bell, Clock3, PackageCheck];
 const Icon = icons[active];
 return <section id="intelligence" className="section intelligence-section"><div className="section-heading" data-reveal><div><span className="eyebrow">03 / INTELLIGENCE THAT SELLS</span><h2>We don’t just stock your brand.<br/><span className="text-primary">We help you sell more of it.</span></h2></div><p>Your best-selling flavour. Your busiest hour. Your next reorder. Every decision, informed by real demand.</p></div><div className="intelligence-layout" data-reveal><div className="intelligence-list">{intelligence.map((item, i) => <Button key={item.title} variant="quiet" className={`intelligence-item ${active === i ? 'active' : ''}`} onClick={() => setActive(i)} aria-expanded={active === i}><span className="item-index">0{i+1}</span><span className="intelligence-item-content"><strong>{item.title}</strong>{active === i && <span>{item.description}</span>}</span>{active === i ? <Minus/> : <Plus/>}</Button>)}</div><div className="intelligence-visual" aria-live="polite"><div className="signal-header"><span><Icon size={18}/> {intelligence[active].tag}</span><span className="signal-dot"/></div><div className="signal-motif" aria-hidden="true"><div className={`signal-bars mode-${active}`}>{[1,2,3,4,5,6,7,8,9,10,11,12].map(n => <span key={n}/>)}</div><span className="signal-line"/></div><div className="signal-caption"><span>OUTLET × SKU × TIME</span><h3>{['The right product.\nIn the right place.', 'Less slow-moving stock.\nMore room to grow.', 'Every demand window.\nAn opportunity.', 'Replenishment, matched\nto what really moves.'][active]}</h3><p>Inventory intelligence, built around your brand.</p></div><div className="signal-bottom"><span>PROPELPAD / SKU INTELLIGENCE</span><ArrowUpRight size={20}/></div></div></div><div className="buying-block" data-reveal><div><span className="eyebrow">SMARTER BUYING. BUILT IN.</span><h3>Exactly enough.<br/>Exactly on time.</h3><p>Buying efficiency is the other half of inventory intelligence.</p></div><div className="buying-list">{buying.map((item, i) => <details key={item.title}><summary><span>0{i+1}</span>{item.title}<ChevronDown size={18}/></summary><p>{item.detail}</p></details>)}</div></div></section>;
}
const positions = [[38,18],[48,42],[40,49],[70,56],[31,35],[79,12],[87,24],[52,83],[22,42]];
export function Network() {
 const [selected, setSelected] = useState(0);
 return <section className="section network-section" id="network"><div className="section-heading" data-reveal><div><span className="eyebrow">04 / A NETWORK BUILT FOR REACH</span><h2>Mumbai, fully covered.<br/><span className="text-muted-foreground">India, on the horizon.</span></h2></div><p>Nine strategically located white stores. One partner. A wider addressable market for your brand.</p></div><div className="network-layout" data-reveal><div className="network-map"><div className="map-grid"/><svg className="coastline" viewBox="0 0 600 500" aria-hidden="true"><path d="M190 -10L160 65 180 92 155 130 166 173 137 205 160 233 139 266 157 302 149 337 189 370 197 410 240 475 270 510 620 510 620 -10Z"/><path className="map-route" d="M228 90L186 175 240 245 288 210 420 280 312 415M228 90L474 60 522 120"/></svg><span className="map-water">ARABIAN SEA</span><span className="map-label mumbai">MUMBAI</span><span className="map-label thane">THANE</span>{locations.map((location, i) => <Button key={location} className={`map-pin pin-${i} ${selected === i ? 'selected' : ''}`} variant="quiet" size="icon" onClick={() => setSelected(i)} aria-label={`Select ${location} store`} aria-pressed={selected === i}><MapPin size={19}/></Button>)}<div className="map-selected"><span className="status-dot"/><div><small>WHITE STORE / {String(selected+1).padStart(2,'0')}</small><strong>{locations[selected]}</strong></div><ArrowUpRight size={20}/></div><span className="map-note">Network illustration · not to scale</span></div><div className="network-directory"><div className="directory-heading"><span className="network-number">09</span><div><strong>White stores</strong><span>Mumbai & Thane</span></div></div><div className="location-list">{locations.map((location, i) => <Button key={location} variant="quiet" className={selected === i ? 'location active' : 'location'} onClick={() => setSelected(i)} aria-pressed={selected === i}><span>{String(i+1).padStart(2,'0')}</span>{location}<ArrowUpRight size={16}/></Button>)}</div><p>Wider reach. Network resilience.<br/>Hyperlocal demand intelligence.</p></div></div><div className="expansion" data-reveal><div className="expansion-heading"><span className="eyebrow">WHAT’S NEXT / FY26–27</span><h3>19 new stores.<br/>Five new cities.</h3><p>Planned expansion. Data-led locations.<br/>The same white store standard.</p></div><div className="expansion-cities">{expansion.map(city => <div key={city.city}><span className="expansion-quarter">{city.quarter} / PLANNED</span><h4>{city.city}</h4><span>{city.stores} stores <ArrowUpRight size={17}/></span></div>)}</div></div></section>;
}
export function Contact() {
 const [draft, setDraft] = useState(false);
 const submit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault(); const data = new FormData(event.currentTarget);
  window.location.href = composeInquiry(String(data.get('name') || ''), String(data.get('brand') || ''), String(data.get('email') || ''), String(data.get('message') || ''));
  setDraft(true);
 };
 return <section className="contact-section" id="contact"><div className="section contact-inner"><div className="contact-heading" data-reveal><span className="eyebrow">LET’S BUILD YOUR NEXT CHAPTER</span><h2>Your brand.<br/>Every doorstep.<span className="contact-arrow"><ArrowUpRight/></span></h2><p>Bring your frozen and specialty food brand to the white store network. Let’s talk.</p><div className="contacts">{contacts.map(contact => <div key={contact.name}><h3>{contact.name}</h3><span>{contact.role}</span><a href={`mailto:${contact.email}`}><Mail size={15}/>{contact.email}</a><a href={`tel:${contact.tel}`}><Phone size={15}/>{contact.phone}</a></div>)}</div></div><form onSubmit={submit} className="contact-form" data-reveal><h3>Explore a partnership</h3><div className="form-row"><label>Your name<input name="name" autoComplete="name" placeholder="Full name" required maxLength={100}/></label><label>Brand name<input name="brand" autoComplete="organization" placeholder="Your brand" required maxLength={100}/></label></div><label>Work email<input type="email" name="email" autoComplete="email" placeholder="you@yourbrand.com" required maxLength={254}/></label><label>Tell us a little about your brand<textarea name="message" placeholder="Your products, your plans, your next big move…" rows={3} required maxLength={3000}/></label><Button variant="brand" type="submit">Start a conversation <ArrowUpRight/></Button><p className="form-note" role="status">{draft ? 'Your email draft is ready. Send it from your email app, or contact our team directly.' : 'Opens a draft in your email app. Your details aren’t stored on this website.'}</p></form></div></section>;
}
