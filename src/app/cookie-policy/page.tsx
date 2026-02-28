import React from 'react';

export default function CookiePolicyPage() {
  return (
    <div className="prose mx-auto max-w-4xl p-6">
      <h1>Cookie Policy</h1>
      <p>
        This Cookie Policy explains how this website uses cookies and similar
        technologies to recognize you when you visit. It explains what these
        technologies are and why we use them, as well as your rights to control
        our use of them.
      </p>

      <h2>What are cookies?</h2>
      <p>
        Cookies are small data files placed on your device to store preferences
        and other information. They help the site remember your settings and
        provide a better experience.
      </p>

      <h2>How we use cookies</h2>
      <ul>
        <li>Necessary cookies: required for basic site functionality.</li>
        <li>Analytics cookies: help us understand how the site is used.</li>
        <li>Marketing cookies: used for advertising and tracking.</li>
      </ul>

      <h2>Managing cookies</h2>
      <p>
        You can manage cookie preferences on the{' '}
        <a href="/cookie-preferences">Cookie preferences</a> page or change them
        in your browser settings.
      </p>
    </div>
  );
}
