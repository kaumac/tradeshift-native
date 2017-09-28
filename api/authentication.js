import { AsyncStorage } from 'react-native';

const JSECURITY_CHECK_URL = 'https://wpe.eu-west-1.test.ts.sv/j_spring_security_check'

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

async function getHeaders() {
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

async function getAuthRequestData(user, password) {
  const cookies = await getCookies();
  const escapedCsrf = cookies.csrfToken.split(';')[0].split('csrfToken=')[0];
  console.log(escapedCsrf);

  return {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'same-origin',
    body: `spring-security-redirect=&j_username=${escape(user)}&email=${escape(user)}&j_password=${escape(password)}&companyName=&picker-country=Denmark&country=DK&token=&connectto=&_saml_idp=&timezone=Europe%2FBerlin&_remember_me=&csrfToken=%242a%2410%24hxmugm07rH/cFIHydwhGLOs9HsGSyjlC0PNXxG5MkIMOwKOK1kGfa`,
    headers: {
      'Host': 'sandbox.tradeshift.com',
      'Origin': 'https://sandbox.tradeshift.com',
      'Upgrade-Insecure-Requests': 1,
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
      'Referer': 'https://sandbox.tradeshift.com',
      'Accept':       'application/json',
      'Content-Type': 'application/json',
      'Cookie': `${cookies.sessionId}; ${cookies.csrfToken}`,
    }
  }
}

export async function authenticate(email, password) {
  console.log('user/pass: ', email, password);
  setCookies().then(async () => {
    const authRequestData = await getAuthRequestData(email, password);
    fetch(JSECURITY_CHECK_URL, authRequestData).then(auth => {
      console.log(auth);
    }).catch(error => {
      console.log(error);
    })
  }).catch(error => {
    console.warn(error);
  })
}
