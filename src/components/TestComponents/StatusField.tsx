"use client";
import { FC } from "react";
import { useDb } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";

const StatusField: FC = () => {
	const { breweries, beers, distilleries, spirits, refreshData } = useDb();

	const { loading } = useLoadingAsync(async () => {
		await refreshData();
	}, [refreshData]);

	return (
		<div
			style={{
				position: "fixed",
				backgroundColor: "black",
				right: "2vw",
				top: "2vh",
			}}
		>
			<h2>Breweries: {!loading && breweries.length}</h2>
			<h2>Beers: {!loading && beers.length}</h2>
			<h2>Distilleries: {!loading && distilleries.length}</h2>
			<h2>Spirits: {!loading && spirits.length}</h2>
		</div>
	);
};

export default StatusField;
