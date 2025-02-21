const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds
let sessionTimeout: NodeJS.Timeout;

export function resetSessionTimeout(callback: () => void) {
  if (sessionTimeout) {
    clearTimeout(sessionTimeout);
  }
  sessionTimeout = setTimeout(callback, SESSION_DURATION);
}

export function clearSessionTimeout() {
  if (sessionTimeout) {
    clearTimeout(sessionTimeout);
  }
}

