const phoneNumber = '5547988724280';
const message = encodeURIComponent('Olá, gostaria de saber mais sobre o Legisla.AI!');

export const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}
