"use client";
import { Button } from "@/client-components";
import { FC } from "react";
import { useDb } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";

const ExampleApiGet: FC = (): JSX.Element => {
	const { getExampleUsers, exampleUsers } = useDb();

	const { loading } = useLoadingAsync(async () => {
		await getExampleUsers();
	}, []);

	return (
		<>
			{!loading && (
				<Button onClick={() => console.table(exampleUsers)}>GET</Button>
			)}
		</>
	);
};

export default ExampleApiGet;
