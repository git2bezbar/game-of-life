/**
  * Connects a user.
  * @example
  * ```js
  * login(req, res);
  * ```
  * 
  * 
  * @param {Object} username - The user's username.
  * @param {Object} password - The user's password.
  */

export async function login(username, password) {
  if (!username || !password) {
    throw new TypeError('username and password are required');
  }

  await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  }).then((res) => res.json()).then((data) => {    
    // set jwtToken cookie
    document.cookie = `jwtToken=${data}; path=/; expires=${new Date(Date.now() + 60 * 60 * 1000 * 24 * 7).toUTCString()}`;
  });
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
  const logout = await fetch('http://localhost:3000/api/logout', {
    method: 'POST',
  });

  return logout;
}
