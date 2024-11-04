'use server';

import { cookies } from 'next/headers';

export async function handleRefresh() {
  const cookieHandler = await cookies();
  const refreshToken = await getRefreshToken();

  const token = await fetch('http://localhost:8000/api/auth/token/refresh/', {
    method: 'POST',
    body: JSON.stringify({
      refresh: refreshToken,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log('Response - Refresh:', json);

      if (json.access) {
        cookieHandler.set('session_access_token', json.access, {
          httpOnly: true,
          secure: false,
          maxAge: 60 * 60,
          path: '/',
        });

        return json.access;
      } else {
        resetAuthCookies();
      }
    })
    .catch((error) => {
      console.log('error', error);
      resetAuthCookies();
    });

  return token;
}

export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
  const cookieHandler = await cookies();

  cookieHandler.set('session_userid', userId, {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  cookieHandler.set('session_access_token', accessToken, {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60,
    path: '/',
  });

  cookieHandler.set('session_refresh_token', refreshToken, {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
}

export async function resetAuthCookies() {
  const cookieHandler = await cookies();

  cookieHandler.set('session_userid', '', { path: '/' });
  cookieHandler.set('session_access_token', '', { path: '/' });
  cookieHandler.set('session_refresh_token', '', { path: '/' });
}

export async function getUserId() {
  const cookieHandler = await cookies();
  const userId = cookieHandler.get('session_userid')?.value;
  return userId ? userId : null;
}

export async function getAccessToken() {
  const cookieHandler = await cookies();
  let accessToken = cookieHandler.get('session_access_token')?.value;

  if (!accessToken) {
    accessToken = await handleRefresh();
  }

  return accessToken;
}

export async function getRefreshToken() {
  const cookieHandler = await cookies();
  return cookieHandler.get('session_refresh_token')?.value;
}
