import { AsyncStorage } from 'react-native';

function getCookiesFromHeaders(headers) {
  if(!headers["set-cookie"]) return undefined;

  const cookies = headers["set-cookie"][0].split(', ');
  return cookies;
}

function isJsessionId(cookie) {
  return /JSESSIONID=[A-Za-z0-9]+\;/i.test(cookie);
}

function isCsrf(cookie) {
  return /JSESSIONID=[A-Za-z0-9]+\;/i.test(cookie);
}

function getSessionCookie(cookies) {
  const sessionId = cookies.find(isJsessionId);
  return sessionId;
}

function getCsrfCookie(cookies) {
  const csrf = cookies.find(isJsessionId);
  return csrf;
}

async function setCookies() {
  try {
    await AsyncStorage.setItem('@Tradeshift:sessionId', sessionId);
  } catch (error) {
    console.log(error);
  }

  fetch('https://go.tradeshift.com', {
    withCredentials: true,
    credentials: 'cross-origin'
  }).then(async (response) => {
    console.log("=================================");
    console.log(response.headers);
    const headers = response.headers.map;
    const sessionId = getSessionIdFromHeaders(headers);

    return setCookies(sessionId);
  }).catch(error => {
    console.log(error);
  })
}

async function authenticateNow() {
  try {
    const value = await AsyncStorage.getItem('@Tradeshift:sessionId');
    if (value !== null){
      console.log(value);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function authenticate(email, password) {
  console.log(email, password);
  setCookies();
}
