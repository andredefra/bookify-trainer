
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useEffect } from 'react';

const Cookies = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-primary mb-8">Cookie Policy</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString('en-GB')}</p>
            
            <h2 className="text-xl font-semibold mb-4">1. What Are Cookies</h2>
            <p>As is common practice with almost all professional websites, Personal.ai uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the site's functionality.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. How We Use Cookies</h2>
            <p>We use cookies for a variety of reasons detailed below. Unfortunately, in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. The Cookies We Set</h2>
            <h3 className="text-lg font-semibold mt-4 mb-3">Account related cookies</h3>
            <p>If you create an account with us then we will use cookies for the management of the signup process and general administration. These cookies will usually be deleted when you log out however in some cases they may remain afterwards to remember your site preferences when logged out.</p>
            
            <h3 className="text-lg font-semibold mt-4 mb-3">Login related cookies</h3>
            <p>We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page. These cookies are typically removed or cleared when you log out to ensure that you can only access restricted features and areas when logged in.</p>
            
            <h3 className="text-lg font-semibold mt-4 mb-3">Site preferences cookies</h3>
            <p>In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences we need to set cookies so that this information can be called whenever you interact with a page is affected by your preferences.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Third Party Cookies</h2>
            <p>In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.</li>
              <li>From time to time we test new features and make subtle changes to the way that the site is delivered. When we are still testing new features these cookies may be used to ensure that you receive a consistent experience whilst on the site whilst ensuring we understand which optimizations our users appreciate the most.</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. More Information</h2>
            <p>Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.</p>
            <p className="mt-3">However if you are still looking for more information then you can contact us through one of our preferred contact methods:</p>
            <p className="mt-2">Email: cookies@mypersonalai.com</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Cookie Consent</h2>
            <p>When you first visit our website, we will request your consent to the use of cookies as described in this policy. You can choose to accept all cookies, only necessary cookies, or customize your preferences. You can change your cookie preferences at any time by clicking on the 'Cookie Settings' link in the footer of our website.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Cookie Management</h2>
            <p>Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.</p>
            
            <p className="mt-4">Find out how to manage cookies on popular browsers:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><a href="https://support.google.com/accounts/answer/61416" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
              <li><a href="https://support.microsoft.com/en-gb/help/4468242/microsoft-edge-browsing-data-and-privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
              <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Safari (on macOS)</a></li>
              <li><a href="https://support.apple.com/en-us/HT201265" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Safari (on iOS)</a></li>
            </ul>
            
            <p className="mt-4">To find information relating to other browsers, visit the browser developer's website.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cookies;
