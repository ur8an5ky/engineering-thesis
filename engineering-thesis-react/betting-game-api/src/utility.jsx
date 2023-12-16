/**
 * Decodes the payload of a JWT token.
 * 
 * @param {string} token - The JWT token.
 * @returns {Object|null} - The decoded payload or null if there's an error.
 */
export function decodeJWT(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (error) {
      return null;
    }
  }
  