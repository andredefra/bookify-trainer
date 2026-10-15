import { Link } from 'react-router-dom';
const BrandLogo = () => (
  <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="mypersonal.fit">
    <img src="/brand/logo-biceps.png" alt="" className="h-8 w-8 object-contain" onError={(event) => { event.currentTarget.hidden = true; }} />
    <span className="font-brand-mono text-base font-extrabold text-brand-text sm:text-lg">mypersonal<span className="text-brand-highlight">.fit</span></span>
  </Link>
);
export default BrandLogo;
