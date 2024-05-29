/**
  * Connects a user.
  * @example
  * ```js
  * login(req, res);
  * ```
  * 
  * @param {Object} req - The request object.
  * @param {Object} res - The response object.
  * @returns {Object} - The user.
  * @throws {Error} - If the user is not found.
  * @throws {TypeError} - If the user is not an object.
  */

export async function login(req, res) {
  if (typeof req !== 'object') {
    throw new TypeError('req must be an object');
  }

  if (typeof res !== 'object') {
    throw new TypeError('res must be an object');
  }

  const response = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body),
  });

  const user = await response.json();

  if (!user) {
    throw new Error('user not found');
  }

  return user;
}

/**
 * Disconnects a user.
 * @example
 * ```js
 * logout();
 * ```
 *
 */

export async function logout() {
  const logout = await fetch('http://localhost:3000/api/auth/logout', {
    method: 'POST',
  });

  return logout;
}
