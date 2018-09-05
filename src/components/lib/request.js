// @flow

type RequestParams = {
	uri: string,
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
	headers?: {
		[key: string]: string
	},
	body?: mixed
};

type ErrorResponse = {
	message?: string,
	error?: Error
};


const stringify = (body: mixed) =>
	typeof body === 'object'
		? JSON.stringify (body)
		: null;


export default ({
	uri,
	method = 'GET',
	headers,
	body
}: RequestParams) =>
	fetch (uri, {
		method,
		headers: {
			...headers,
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: stringify (body),
		credentials: 'include',
		mode: 'cors',
		cache: 'default'
	})
		.catch (() => {
			throw new Error ('something went wrong');
		})
		.then ((res) => {
			if (res.ok) {
				return res.json ()
					.catch (() => res);
			} else if (res.status === 401) {
				throw new Error ('invalid credentials');
			}

			return res.json ()
				.then ((res: ErrorResponse) =>
					Promise.reject (
						res.message || res.error || res
					)
				);
		});