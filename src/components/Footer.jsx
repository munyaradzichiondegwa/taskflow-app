import React, { useEffect, useState } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGlobe } from 'react-icons/fa';

export default function Footer() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer id="appFooter">
  <div className="footer-links">
    <a href="https://www.facebook.com/nevanjimunya.chiondegwa" target="_blank">🔵</a>
    <a href="https://x.com/NNehoreka/" target="_blank">🐦</a>
    <a href="https://www.linkedin.com/in/munyaradzi-chiondegwa/" target="_blank">💼</a>
    <a href="https://munyaradzichiondegwa.netlify.app/" target="_blank">🌐</a>
  </div>
  <div>© {new Date().getFullYear()} TaskFlow — {new Date().toLocaleTimeString()}</div>
</footer>

 );
}
