"use client";
import { Button } from "@/client-components";
import { useDb } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import { ChangeEvent, FC, useState } from "react";

const BeerDeleteRequest: FC = () => {
	const { beers, refreshBeers, deleteData } = useDb();

	const [id, setId] = useState<string>("");

	const { loading } = useLoadingAsync(async () => {
		await refreshBeers();
	}, [refreshBeers]);

	const onChange = (ev: ChangeEvent<HTMLSelectElement>) => {
		setId(ev.target.value);
	};

	return (
		<div style={{ marginLeft: "10vw" }}>
			<h1>Delete Beer</h1>
			<div>
				<select onChange={onChange} defaultValue={"select"}>
					<option>-- Choose Beer --</option>
					{!loading && (
						<>
							{beers.map((beer, index) => (
								<option key={index} value={beer.id}>
									{beer.name}
								</option>
							))}
						</>
					)}
				</select>
				<hr />
				<Button onClick={() => deleteData("beer", id)}>Submit</Button>
			</div>
		</div>
	);
};

export default BeerDeleteRequest;
