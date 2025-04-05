import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useEffect } from 'react';
const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-primary mb-8">Privacy Policy</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString('en-GB')}</p>
            
            <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
            <p>MyPersonal ltd ("we", "our", "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. The Data We Collect About You</h2>
            <p>Personal data means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
              <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
              <li><strong>Profile Data</strong> includes your username and password, purchases or orders made by you, your interests, preferences, feedback and survey responses.</li>
              <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. How We Use Your Personal Data</h2>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Data Security</h2>
            <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Data Retention</h2>
            <p>We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting or reporting requirements.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Your Legal Rights</h2>
            <p>Under the General Data Protection Regulation (GDPR), you have rights including:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Your right of access</strong> - You have the right to ask us for copies of your personal information.</li>
              <li><strong>Your right to rectification</strong> - You have the right to ask us to rectify information you think is inaccurate. You also have the right to ask us to complete information you think is incomplete.</li>
              <li><strong>Your right to erasure</strong> - You have the right to ask us to erase your personal information in certain circumstances.</li>
              <li><strong>Your right to restriction of processing</strong> - You have the right to ask us to restrict the processing of your information in certain circumstances.</li>
              <li><strong>Your right to object to processing</strong> - You have the right to object to the processing of your personal data in certain circumstances.</li>
              <li><strong>Your right to data portability</strong> - You have the right to ask that we transfer the information you gave us to another organization, or to you, in certain circumstances.</li>
            </ul>
            <p className="mt-4">You are not required to pay any charge for exercising your rights. If you make a request, we have one month to respond to you.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Contact Us</h2>
            <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
            <p className="mt-2">mypersonalai ltd<br />
            Email: privacy@mypersonalai.com<br />
            Address: 123 Fitness Street, London, EC1A 1BB, United Kingdom</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Changes to the Privacy Policy</h2>
            <p>We keep our privacy policy under regular review. This version was last updated on the date shown at the top of this page.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Privacy;