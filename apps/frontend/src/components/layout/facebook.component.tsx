'use client';

import { FC, useEffect } from 'react';
export const FacebookComponent: FC = () => {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_FACEBOOK_PIXEL) {
      return;
    }
    const pixel = document.createElement('script');
    pixel.id = 'fb-pixel';
    pixel.innerHTML = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'/f.js');
fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL}');
`;
    document.head.appendChild(pixel);
  }, []);
  return null;
};
