"use client";
import { ExampleButton } from "@/barrels";
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
				<ExampleButton onClick={() => console.table(exampleUsers)}>
					GET
				</ExampleButton>
			)}
		</>
	);
};

export default ExampleApiGet;
