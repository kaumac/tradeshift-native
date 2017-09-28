import { AsyncStorage } from 'react-native';

function getCookiesFromHeaders(headers) {
  if(!headers["set-cookie"]) return;

  const cookies = headers["set-cookie"][0].split(', ');
  return cookies;
}

function isJsessionId(cookie) {
  return /JSESSIONID=[^;]+\;/.test(cookie);
}

function isCsrf(cookie) {
  return /csrfToken=[^;]+\;/.test(cookie);
}

function getSessionCookie(cookies) {
  if(!cookies) return;

  const sessionId = cookies.find(isJsessionId);
  return sessionId;
}

function getCsrfCookie(cookies) {
  if(!cookies) return;

  const csrf = cookies.find(isCsrf);
  return csrf;
}

function getHeaders() {
  return fetch('https://sandbox.tradeshift.com', {
    withCredentials: true,
    credentials: 'cross-origin'
  }).then(async (response) => {
    const headers = response.headers.map;
    return headers;
  }).catch(error => {
    console.warn('Failed to fetch headers from sandbox.tradeshift.com');
    console.warn(error);
  })
}

async function setCookies() {
  return getHeaders().then(async headers => {
    const cookiesList = getCookiesFromHeaders(headers);
    const sessionId = getSessionCookie(cookiesList);
    const csrfToken = getCsrfCookie(cookiesList);

    return (async () => {
      try {
        if(sessionId) await AsyncStorage.setItem('@Tradeshift:sessionId', sessionId);
        if(csrfToken) await AsyncStorage.setItem('@Tradeshift:csrfToken', csrfToken);
      } catch (error) {
        console.log(error);
      }
    })().then(() => {});
  });
}

async function getCookies() {
  try {
    const cookies = {
      sessionId: await AsyncStorage.getItem('@Tradeshift:sessionId'),
      csrfToken: await AsyncStorage.getItem('@Tradeshift:csrfToken')
    }

    return cookies;
  } catch (error) {
    console.log(error);
  }
}

export async function authenticate(email, password) {
  console.log('user/pass: ', email, password);
  setCookies().then(() => {
    getCookies().then(cookies => {
      console.log(cookies);
    });
  }).catch(error => {
    console.warn(error);
  })
}
