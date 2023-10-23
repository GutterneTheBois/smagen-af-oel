"use server";
import { cookies } from "next/headers";

export const createAgeCookie = async (): Promise<void> => {
	const expiring = 1000 * 60 * 60 * 2; // cookie expires after 2 hours

	const debugExpire = 1000 * 10; // 10 seconds for debugging
	cookies().set("age-cookie", "I am old enough", {
		expires: Date.now() + debugExpire,
	});
};

export const hasAgeCookie = (): boolean => {
	const cookieStore = cookies();

	return cookieStore.has("age-cookie");
};
