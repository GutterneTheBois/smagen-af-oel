"use client";
import { FC } from "react";
import { useDb } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";

const StatusField: FC = () => {
	const { breweries, beers, distilleries, refreshData } = useDb();

	const { loading } = useLoadingAsync(async () => {
		await refreshData();
	}, [refreshData]);

	return (
		<div style={{ marginTop: "5vh", marginLeft: "2vw" }}>
			{loading ? (
				<>
					<h2>Breweries: 0</h2>
					<h2>Beers: 0</h2>
					<h2>Distilleries: 0</h2>
				</>
			) : (
				<>
					<h2>Breweries: {breweries.length}</h2>
					<h2>Beers: {beers.length}</h2>
					<h2>Distilleries: {distilleries.length}</h2>
				</>
			)}
		</div>
	);
};

export default StatusField;
