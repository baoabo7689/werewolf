// src/utilities/googleAuth.ts

// Helper to decode JWT (Google credential)
function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}
export async function handleCredentialResponse(response: any) {
  // console.log('Google Credential Response:', response);

  if (response && response.credential) {
    const user = parseJwt(response.credential);
    if (user) {
      // Store user info in localStorage for retrieval in Header
      localStorage.setItem('googleUser', JSON.stringify(user));
      // Hide Google sign-in container if present
      const signinContainer = document.getElementById('google-signin-btn-container');
      if (signinContainer) signinContainer.style.display = 'none';
    }

    // Call backend users/signin with credential
    const backendUrl = process.env.NEXT_PUBLIC_BACKENDURL || '';
    const res = await fetch(`${backendUrl}/users/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ credential: response.credential }),
    });
    console.log('Backend Sign-in Response:', res);
  }
}
