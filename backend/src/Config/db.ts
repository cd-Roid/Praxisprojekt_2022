/**
 * Config for the database
 * @type {Object}
 * @parameters {string} url - Url to the database
 * @parameters {string} database - Name of the database
 * @parameters {string} imgBucket - Name of the image bucket
 * @return {Object} - Config object
 **/

export const setConfig = (url: string, db: string) => {
	const config = {
		url: url,
		database: db,
	};
	return config;
};

