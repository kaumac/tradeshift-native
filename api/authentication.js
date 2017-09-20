import { AsyncStorage } from 'react-native';

function isJsessionId (cookie) {
  return /JSESSIONID=[A-Za-z0-9]+\;/i.test(cookie);
}

export const setInitialSessionId = async function() {
  const getSessionIdFromHeaders = headers => {
    if(!headers["set-cookie"]) return undefined;
    const cookies = headers["set-cookie"][0].split(', ');
    const sessionIdRaw = cookies.find(isJsessionId);
    const sessionId = sessionIdRaw.split(';')[0];

    return sessionId;
  }

  async function storeSessionId(sessionId) {
    if(sessionId) {
      try {
        return await AsyncStorage.setItem('@Tradeshift:sessionId', sessionId);
      } catch (error) {
        console.log(error);
      }
    }
  }

  fetch('https://go.tradeshift.com', {
    withCredentials: true,
    credentials: 'cross-origin'
  }).then(async (response) => {
    console.log("=================================");
    console.log(response.headers);
    const headers = response.headers.map;
    const sessionId = getSessionIdFromHeaders(headers);

    return storeSessionId(sessionId);
  }).catch(error => {
    console.log(error);
  })
}
