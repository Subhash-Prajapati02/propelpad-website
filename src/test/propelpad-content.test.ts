import { describe, expect, it } from 'vitest';
import { brands, metrics, locations, expansion, contacts, composeInquiry } from '../lib/propelpad-content';
describe('Presentation facts', () => {
 it('preserves the 4.4 average platform rating', () => expect(metrics[0].value).toBe('4.4'));
 it('preserves 95% order accuracy', () => expect(metrics[1].value + metrics[1].suffix).toBe('95%'));
 it('preserves 99.8% store uptime', () => expect(metrics[2].value + metrics[2].suffix).toBe('99.8%'));
 it('preserves the 1:38 preparation time', () => expect(metrics[3].value).toBe('1:38'));
 it('lists exactly nine operational stores', () => expect(locations).toEqual(['Dahisar','Vakola','Santacruz','Chembur','Oshiwara','Hiranandani Estate','Khopat (Thane West)','Fort','Versova']));
 it('preserves planned expansion counts and quarters', () => expect(expansion).toEqual([{city:'Bangalore',stores:6,quarter:'Q2'},{city:'Delhi NCR',stores:5,quarter:'Q2'},{city:'Hyderabad',stores:3,quarter:'Q3'},{city:'Kolkata',stores:3,quarter:'Q3'},{city:'Pune',stores:2,quarter:'Q3'}]));
 it('preserves 19 new stores across five cities', () => { expect(expansion.reduce((total, city) => total + city.stores, 0)).toBe(19); expect(expansion).toHaveLength(5); });
 it('uses the 13 supplied brand partners', () => expect(brands).toHaveLength(13));
 it('uses verified contact details', () => expect(contacts.map(c => [c.email,c.tel])).toEqual([['shanu.singh@propelpad.in','+918237981485'],['gm@propelpad.in','+918424048334']]));
 it('composes an inquiry to Shanu and safely encodes user data', () => { const uri = composeInquiry('A & B','Brand #1','a@example.com','Hello? & more'); expect(uri.startsWith('mailto:shanu.singh@propelpad.in?')).toBe(true); expect(decodeURIComponent(uri.split('&body=')[1])).toContain('Brand: Brand #1'); expect(uri).toContain('Hello%3F%20%26%20more'); });
});
