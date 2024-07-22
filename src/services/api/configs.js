/**
  * Provides all the existing configs.
  * @example
  * ```js
  * getAllConfigs(typeId);
  * ```
  * @param {string | Number} typeId - The id of the type if you want to filter. 
  */

import { getCookie } from "../utils";

export async function getAllConfigs(typeId = -1) {
  const reponse = await fetch(`http://localhost:3000/api/configs${typeId !== -1 ? `?typeId=${typeId}` : ''}`);
  const configs = await reponse.json();

  return configs;
}

/**
 * Provides information about a specific config.
 * @example
 * ```js
 * getConfig(configId);
 * ```
 *  
 * @param {string} configId - The id of the config.
 * @returns {Object} - The config.
 * @throws {Error} - If the config is not found.
 * @throws {TypeError} - If the config id is not a string.
 * @throws {TypeError} - If the config id is empty.
 */

export async function getConfig(configId) {
  if (typeof configId !== 'string') {
    throw new TypeError('configId must be a string');
  }

  if (!configId.trim()) {
    throw new TypeError('configId must not be empty');
  }

  const reponse = await fetch(`http://localhost:3000/api/configs/${configId}`);
  const config = await reponse.json();

  if (!config) {
    throw new Error('config not found');
  }

  return config;
}

/**
 * Creates a new config.
 * @example
 * ```js
 * createConfig(newConfig);
 * ```
 *  
 * @param {Object} newConfig - The new config.
 * @returns {Object} - The created config.
 * @throws {Error} - If the new config is not provided.
 * @throws {TypeError} - If the new config is not an object.
 */

export async function createConfig(newConfig) {
  if (!newConfig) {
    throw new Error('newConfig is required');
  }

  if (typeof newConfig !== 'object') {
    throw new TypeError('newConfig must be an object');
  }

  const reponse = await fetch(`http://localhost:3000/api/configs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newConfig),
    credentials: 'include'
  });

  const config = await reponse.json();

  return config;
}

/**
 * Updates a config.
 * @example
 * ```js
 * updateConfig(configId, updatedConfig);
 * ```
 *  
 * @param {string} configId - The id of the config.
 * @param {Object} updatedConfig - The updated config.
 * @returns {Object} - The updated config.
 * @throws {Error} - If the config is not found.
 * @throws {TypeError} - If the config id is not a string.
 * @throws {TypeError} - If the config id is empty.
 * @throws {Error} - If the updated config is not provided.
 * @throws {TypeError} - If the updated config is not an object.
 */

export async function updateConfig(configId, updatedConfig) {
  if (typeof configId !== 'string') {
    throw new TypeError('configId must be a string');
  }

  if (!configId.trim()) {
    throw new TypeError('configId must not be empty');
  }

  if (!updatedConfig) {
    throw new Error('updatedConfig is required');
  }

  if (typeof updatedConfig !== 'object') {
    throw new TypeError('updatedConfig must be an object');
  }

  const reponse = await fetch(`http://localhost:3000/api/configs/${configId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedConfig),
    credentials: 'include'
  });

  const config = await reponse.json();

  return config;
}

/**
 * Deletes a config.
 * @example
 * ```js
 * deleteConfig(configId);
 * ```
 *  
 * @param {string} configId - The id of the config.
 * @throws {Error} - If the config is not found.
 * @throws {TypeError} - If the config id is not a string.
 * @throws {TypeError} - If the config id is empty.
 */

export async function deleteConfig(configId) {
  if (typeof configId !== 'string') {
    throw new TypeError('configId must be a string');
  }

  if (!configId.trim()) {
    throw new TypeError('configId must not be empty');
  }

  const reponse = await fetch(`http://localhost:3000/api/configs/${configId}`, {
    method: 'DELETE',
    credentials: 'include'
  });

  if (reponse.status === 404) {
    throw new Error('config not found');
  }
}
