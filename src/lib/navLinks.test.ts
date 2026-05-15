import { describe, it, expect } from 'vitest';
import { navLinks } from './navLinks';

describe('navLinks', () => {
  it('is a non-empty array', () => {
    expect(navLinks.length).toBeGreaterThan(0);
  });

  it('every entry has required fields with correct types', () => {
    for (const link of navLinks) {
      expect(typeof link.text).toBe('string');
      expect(link.text.length).toBeGreaterThan(0);
      expect(typeof link.href).toBe('string');
      expect(Array.isArray(link.locations)).toBe(true);
      expect(link.locations.length).toBeGreaterThan(0);
    }
  });

  it('all hrefs start with /', () => {
    for (const link of navLinks) {
      expect(link.href).toMatch(/^\//);
    }
  });

  it('no duplicate hrefs', () => {
    const hrefs = navLinks.map((l) => l.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it('header links include Outdoors and About', () => {
    const headerLinks = navLinks.filter((l) => l.locations.includes('header'));
    const texts = headerLinks.map((l) => l.text);
    expect(texts).toContain('Outdoors');
    expect(texts).toContain('About');
  });

  it('footer links include Home, Outdoors, About, and Now', () => {
    const footerLinks = navLinks.filter((l) => l.locations.includes('footer'));
    const texts = footerLinks.map((l) => l.text);
    expect(texts).toContain('Home');
    expect(texts).toContain('Outdoors');
    expect(texts).toContain('About');
    expect(texts).toContain('Now');
  });
});
