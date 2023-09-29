import { useCallback, useState } from "react";
import { Beer, Announcement } from "@prisma/client";
import { genApiClient } from "../backend/appApiClient";

export type InfoHook = {
	botds: Beer[];
	announcements: Announcement[];

	refreshData: () => Promise<void>;
	handleSetBotD: (id: string) => Promise<void>;

	createAnnouncement: (title: string, description: string) => Promise<void>;
	updateAnnouncement: (id: string, newDescription: string) => Promise<void>;
};

export const useInfoContextValue = (): InfoHook => {
	const [botds, setBotds] = useState<Beer[]>([]);
	const [announcements, setAnnouncements] = useState<Announcement[]>([]);

	const refreshData = useCallback(async () => {
		const client = await genApiClient();

		// handle botds
		const botdsRes: any = await client.getRequest("botd");
		const botdsData = await botdsRes.json();
		setBotds(botdsData.botd);

		// handle announcements
		const announcementsRes: any = await client.getRequest("announcement");
		const announcementData = await announcementsRes.json();
		setAnnouncements(announcementData.announcements as Announcement[]);
	}, [setBotds, setAnnouncements]);

	const handleSetBotD = useCallback(
		async (id: string) => {
			const client = await genApiClient();

			const request = await client.putRequest("botd", { id: id });
			const botd = request.json() as Beer;

			setBotds([...botds, botd]);
		},
		[setBotds, botds]
	);

	// Not to be exported, handled instead by refreshData.
	const refreshAnnouncements = useCallback(async () => {
		const client = await genApiClient();
		const res: any = await client.getRequest("announcement");

		const data = await res.json();

		setAnnouncements(data.announcements as Announcement[]);
	}, [setAnnouncements]);

	const createAnnouncement = useCallback(
		async (title: string, description: string) => {
			const client = await genApiClient();

			const req = await client.postRequest("announcement", {
				title: title,
				description: description,
			});

			const announcement = req.json() as Announcement;
			setAnnouncements([...announcements, announcement]);
		},
		[announcements, setAnnouncements]
	);

	const updateAnnouncement = useCallback(
		async (id: string, newDescription: string) => {
			const client = await genApiClient();
			await client.putRequest("announcement", {
				id: id,
				newDescription: newDescription,
			});

			await refreshAnnouncements();
		},
		[refreshAnnouncements]
	);

	return {
		botds,
		announcements,
		refreshData,
		handleSetBotD,
		createAnnouncement,
		updateAnnouncement,
	};
};
