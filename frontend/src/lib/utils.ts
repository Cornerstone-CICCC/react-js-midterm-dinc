import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugToTitle(slug: string) {
  const words = slug.split('-');
  const title = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return title;
}

export function tilteToSlug(slug: string) {
  const words = slug.split(' ');
  const title = words.map((word) => word.toLowerCase()).join('-');
  return title;
}
