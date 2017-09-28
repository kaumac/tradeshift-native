import { AsyncStorage } from 'react-native';

function getCookiesFromHeaders(headers) {
  if(!headers["set-cookie"]) return;

  const cookies = headers["set-cookie"][0].split(', ');
  return cookies;
}

function isJsessionId(cookie) {
  return /JSESSIONID=[A-Za-z0-9]+\;/i.test(cookie);
}

function isCsrf(cookie) {
  return /csrfToken=[A-Za-z0-9]+\;/i.test(cookie);
}

function getSessionCookie(cookies) {
  if(!cookies) return;

  const sessionId = cookies.find(isJsessionId);
  return sessionId;
}

function getCsrfCookie(cookies) {
  if(!cookies) return;

  const csrf = cookies.find(isJsessionId);
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
  return getHeaders().then(headers => {
    const cookiesList = getCookiesFromHeaders(headers);
    const csrfToken = getCsrfCookie(cookiesList);
    const sessionId = getSessionCookie(cookiesList);

    // try {
    //   if(sessionId) await AsyncStorage.setItem('@Tradeshift:sessionId', sessionId);
    //   if(csrfToken) await AsyncStorage.setItem('@Tradeshift:csrfToken', csrfToken);
    // } catch (error) {
    //   console.log(error);
    // }
  })
}
//
// async function authenticateNow() {
//   try {
//     const value = await AsyncStorage.getItem('@Tradeshift:sessionId');
//     if (value !== null){
//       console.log(value);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function authenticate(email, password) {
  console.log('usuário e senha: ', email, password);
  setCookies().then(() => {
    console.log('cookies setados');
  }).catch(error => {
    console.log('deu ruim');
    console.log(error);
  })
}
