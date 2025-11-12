import React from 'react';

function SocialIcon({ href, children }) {

  return (
    <a 
    href={href} 
    className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full text-white hover:bg-[#E96B56] hover:-translate-y-1 duration-300"
  >
    {children}
  </a>
  );
}

export default SocialIcon;