export type TNavLink = {
  text: string;
  href: string;
  locations: string[];
};

export const navLinks: TNavLink[] = [
  {
    text: 'Home',
    href: '/',
    locations: ['footer'],
  },
  {
    text: 'Outdoors',
    href: '/outdoors/',
    locations: ['header', 'footer'],
  },
  {
    text: 'About',
    href: '/about/',
    locations: ['header', 'footer'],
  },
  {
    text: 'Now',
    href: '/now/',
    locations: ['footer'],
  },
];
