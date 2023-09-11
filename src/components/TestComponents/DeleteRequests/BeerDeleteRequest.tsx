"use client";
import { Button } from "@/client-components";
import { useDb } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import { ChangeEvent, FC, useState } from "react";

const BeerDeleteRequest: FC = () => {
	const { beers, refreshBeers, deleteBeer } = useDb();

	const [id, setId] = useState<string>("");

	const { loading } = useLoadingAsync(async () => {
		await refreshBeers();
	}, [refreshBeers]);

	const onChange = (ev: ChangeEvent<HTMLSelectElement>) => {
		setId(ev.target.value);
	};

	return (
		<div>
			<h1>Delete Beer</h1>
			<div>
				<select onChange={onChange} defaultValue={"select"}>
					<option>-- Choose Beer --</option>
					{!loading && (
						<>
							{beers.map((beer) => (
								<option key={beer.id} value={beer.id}>
									{beer.name}
								</option>
							))}
						</>
					)}
				</select>
				<hr />
				<Button onClick={() => deleteBeer(id)}>Submit</Button>
			</div>
		</div>
	);
};

export default BeerDeleteRequest;
