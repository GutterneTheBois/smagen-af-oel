"use client";
import { FC, useState, ChangeEvent } from "react";
import { useDb } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import { Button } from "@/client-components";

const BreweryDeleteRequest: FC = () => {
	const { breweries, refreshBreweries, deleteData } = useDb();

	const [id, setId] = useState<string>("");

	const { loading } = useLoadingAsync(async () => {
		await refreshBreweries();
	}, [refreshBreweries]);

	const onChange = (ev: ChangeEvent<HTMLSelectElement>) => {
		setId(ev.target.value);
	};

	return (
		<div style={{ marginLeft: "10vw" }}>
			<h1>Delete Brewery</h1>
			<div>
				<select onChange={onChange} defaultValue={"select"}>
					<option value={"select"}>-- Choose Brewery --</option>
					{!loading && (
						<>
							{breweries.map((brewery, index) => (
								<option key={index} value={brewery.id}>
									{brewery.name}
								</option>
							))}
						</>
					)}
				</select>
				<hr />
				<Button onClick={() => deleteData("brewery", id)}>
					Submit
				</Button>
			</div>
		</div>
	);
};

export default BreweryDeleteRequest;
