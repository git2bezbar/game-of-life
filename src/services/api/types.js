/**
  * Provides all the existing types.
  * @example
  * ```js
  * getAllTypes();
  * ```
  */

export async function getAllTypes() {
  const reponse = await fetch(`http://localhost:3000/api/types`);
  const types = await reponse.json();

  return types;
}

/**
 * Provides information about a specific type.
 * @example
 * ```js
 * getType(typeId);
 * ```
 *  
 * @param {string} typeId - The id of the type.
 * @returns {Object} - The type.
 * @throws {Error} - If the type is not found.
 * @throws {TypeError} - If the type id is not a string.
 * @throws {TypeError} - If the type id is empty.
 */

export async function getType(typeId) {
  if (typeof typeId !== 'string') {
    throw new TypeError('typeId must be a string');
  }

  if (!typeId.trim()) {
    throw new TypeError('typeId must not be empty');
  }

  const reponse = await fetch(`http://localhost:3000/api/types/${typeId}`);
  const type = await reponse.json();

  if (!type) {
    throw new Error('type not found');
  }

  return type;
}

/**
 * Creates a new type.
 * @example
 * ```js
 * createType(newType);
 * ```
 *  
 * @param {Object} newType - The new type.
 * @returns {Object} - The created type.
 * @throws {Error} - If the new type is not provided.
 * @throws {TypeError} - If the new type is not an object.
 */

export async function createType(newType) {
  if (!newType) {
    throw new Error('newType is required');
  }

  if (typeof newType !== 'object') {
    throw new TypeError('newType must be an object');
  }

  const reponse = await fetch(`http://localhost:3000/api/types`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newType),
  });

  const type = await reponse.json();

  return type;
}

/**
 * Updates an existing type.
 * @example
 * ```js
 * updateType(typeId, updatedType);
 * ```
 *  
 * @param {string} typeId - The id of the type.
 * @param {Object} updatedType - The updated type.
 * @returns {Object} - The updated type.
 * @throws {Error} - If the type is not found.
 * @throws {TypeError} - If the type id is not a string.
 * @throws {TypeError} - If the type id is empty.
 * @throws {Error} - If the updated type is not provided.
 * @throws {TypeError} - If the updated type is not an object.
 */

export async function updateType(typeId, updatedType) {
  if (typeof typeId !== 'string') {
    throw new TypeError('typeId must be a string');
  }

  if (!typeId.trim()) {
    throw new TypeError('typeId must not be empty');
  }

  if (!updatedType) {
    throw new Error('updatedType is required');
  }

  if (typeof updatedType !== 'object') {
    throw new TypeError('updatedType must be an object');
  }

  const reponse = await fetch(`http://localhost:3000/api/types/${typeId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedType),
  });

  const type = await reponse.json();

  return type;
}

/**
 * Deletes an existing type.
 * @example
 * ```js
 * deleteType(typeId);
 * ```
 *  
 * @param {string} typeId - The id of the type.
 * @throws {Error} - If the type is not found.
 * @throws {TypeError} - If the type id is not a string.
 * @throws {TypeError} - If the type id is empty.
 */

export async function deleteType(typeId) {
  if (typeof typeId !== 'string') {
    throw new TypeError('typeId must be a string');
  }

  if (!typeId.trim()) {
    throw new TypeError('typeId must not be empty');
  }

  const reponse = await fetch(`http://localhost:3000/api/types/${typeId}`, {
    method: 'DELETE',
  });

  if (reponse.status === 404) {
    throw new Error('type not found');
  }
}
