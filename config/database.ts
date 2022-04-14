import { Options } from 'sequelize'

// eslint-disable-next-line import/prefer-default-export
export const development = {
	url: process.env.POSTGRESQL_URL,
	options: <Options>{
		minifyAliases: true,
		logging: false,
		pool: {
			max: 4
		}
	}
}

export const test = {
	url: process.env.POSTGRESQL_TEST_URL,
	options: <Options>{
		minifyAliases: true,
		logging: false,
		pool: {
			max: 4
		}
	}
}