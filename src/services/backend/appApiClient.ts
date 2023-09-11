export class AppApiClient {
	private baseUrl: string;

	constructor() {
		this.baseUrl = process.env.BACKEND_URL || "";
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

		return res.json();
	}

	async getRequest(endPoint: string, body?: any): Promise<any> {
		return await fetch(`${this.baseUrl}/api/${endPoint}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		}).then((x) => x.json());
	}

	async putRequest(endPoint: string, updateBody: any): Promise<void> {
		await fetch(`${this.baseUrl}/api/${endPoint}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(updateBody),
		});
	}
}

export const genApiClient = async () => new AppApiClient();
