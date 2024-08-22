import { Open_Sans, Cardo } from 'next/font/google';

export const openSans = Open_Sans({
  display: 'swap',
  weight:['400','600','700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

export const cardo = Cardo({
  display: 'swap',
  style: ['normal', 'italic'],
  weight :['400','700'],
  subsets: ['latin'],
});