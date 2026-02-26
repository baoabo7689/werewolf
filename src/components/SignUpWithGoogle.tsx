import React from 'react';
import { handleCredentialResponse } from '@/utilities/googleAuth';

declare global {
  interface Window {
    google: any;
    handleCredentialResponse?: (response: any) => void;
  }
}

export default function SignUpWithGoogle() {
  const [mounted, setMounted] = React.useState(false);
  const [googleUser, setGoogleUser] = React.useState<any>(null);

  React.useEffect(() => {
    setMounted(true);
    // @ts-ignore
    window.handleCredentialResponse = (response: any) => {
      handleCredentialResponse(response);
      // After login, update state
      const stored = localStorage.getItem('googleUser');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (JSON.stringify(parsed) !== JSON.stringify(googleUser)) {
          setGoogleUser(parsed);
        }
      }
    };
    // Check for user info in localStorage
    const stored = typeof window !== 'undefined' ? localStorage.getItem('googleUser') : null;
    if (stored) {
      const parsed = JSON.parse(stored);
      if (JSON.stringify(parsed) !== JSON.stringify(googleUser)) {
        setGoogleUser(parsed);
      }
    }
    // Listen for storage changes (multi-tab)
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'googleUser') {
        const newValue = e.newValue ? JSON.parse(e.newValue) : null;
        if (JSON.stringify(newValue) !== JSON.stringify(googleUser)) {
          setGoogleUser(newValue);
        }
      }
    };
    window.addEventListener('storage', onStorage);

    // Dynamically load Google script if not present
    if (!document.getElementById('google-gsi-script')) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.id = 'google-gsi-script';
      script.onload = () => {
        // @ts-ignore
        if (window.google && window.google.accounts && window.google.accounts.id) {
          // @ts-ignore
          window.google.accounts.id.initialize({
            client_id: '300539175277-1753d7rs0vpg7501ehi1ggpifselkbon.apps.googleusercontent.com',
            callback: window.handleCredentialResponse,
            auto_select: false,
          });
          // @ts-ignore
          window.google.accounts.id.renderButton(document.getElementById('google-signin-btn'), {
            type: 'standard',
            size: 'medium',
          });
        }
      };
      document.body.appendChild(script);
    } else {
      // If script already loaded, initialize immediately
      // @ts-ignore
      if (window.google && window.google.accounts && window.google.accounts.id) {
        // @ts-ignore
        window.google.accounts.id.initialize({
          client_id: '300539175277-1753d7rs0vpg7501ehi1ggpifselkbon.apps.googleusercontent.com',
          callback: window.handleCredentialResponse,
          auto_select: false,
        });
        // @ts-ignore
        window.google.accounts.id.renderButton(document.getElementById('google-signin-btn'), {
          type: 'standard',
          size: 'medium',
        });
      }
    }
    return () => window.removeEventListener('storage', onStorage);
  });

  const handleLogout = () => {
    localStorage.removeItem('googleUser');
    setGoogleUser(null);
  };

  if (!mounted) return null;

  if (googleUser) {
    return (
      <div className="flex items-center gap-2">
        {googleUser.picture && (
          <img src={googleUser.picture} alt={googleUser.name} className="w-8 h-8 rounded-full" />
        )}
        <span className="text-gray-700 text-sm font-medium">
          {googleUser.name || googleUser.email}
        </span>
        <button onClick={handleLogout} className="btn-blue px-2 py-1 text-xs">
          Logout
        </button>
      </div>
    );
  }

  return (
    <div id="google-signin-container">
      <div id="google-signin-btn"></div>
    </div>
  );
}
