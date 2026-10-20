import { useEffect } from 'react';
import { ConsumerLanding, type ConsumerCopy } from './UserLanding';
import { EN } from './UserLandingEn';

const IN: ConsumerCopy = {
  ...EN,
  market: { ...EN.market, href: '/in-find-trainer' },
  pricing: {
    ...EN.pricing,
    intro: 'The first 10 clients get free access for one year. After that: ₹106 per month for the first year, then ₹212.',
    freePrice: '₹0', paidPrice: '₹106', paidThen: 'then ₹212 per month',
    paidCta: 'Subscribe at ₹106/month for the first year', paidFoot: '💎 Same features, ₹106 per month for the first year',
    boxText2: 'The first 10 clients get it free for one year; everyone else pays ₹106 per month for the first year, then ₹212.',
  },
};

const UserLandingIn = () => {
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = 'en-IN';
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.href = 'https://mypersonal.fit/in-user';
    let alt = document.head.querySelector<HTMLLinkElement>('link[rel="alternate"][hreflang="en-IN"]');
    if (!alt) { alt = document.createElement('link'); alt.rel = 'alternate'; alt.hreflang = 'en-IN'; document.head.appendChild(alt); }
    alt.href = 'https://mypersonal.fit/in-user';
    return () => { document.documentElement.lang = previous; };
  }, []);
  return <ConsumerLanding c={IN} />;
};

export default UserLandingIn;
