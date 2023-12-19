export class AppApiClient {
	private baseUrl: string;

	constructor() {
		this.baseUrl = process.env.BACKEND_URL || "http://localhost:3000/";
	}

	async postRequest(endPoint: string, body: any): Promise<any> {
		const res = await fetch(`${this.baseUrl}/api/${endPoint}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(body),
		});

		return res;
	}

	async getRequest(endPoint: string, body?: any): Promise<any> {
		return await fetch(`${this.baseUrl}/api/${endPoint}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});
	}

	async putRequest(endPoint: string, updateBody: any): Promise<any> {
		return await fetch(`${this.baseUrl}/api/${endPoint}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(updateBody),
		});
	}

	async patchRequest(endpoint: string, body: any): Promise<any> {
		return await fetch(`${this.baseUrl}/api/${endpoint}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(body),
		});
	}
}

export const genApiClient = async () => new AppApiClient();
