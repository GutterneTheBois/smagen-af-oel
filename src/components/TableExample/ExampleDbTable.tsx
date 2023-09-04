"use client";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import { FC } from "react";
import { useDb } from "@/services";
import style from "./table.module.scss";

const ExampleDbTable: FC = (): JSX.Element => {
	const { getExampleUsers, exampleUsers } = useDb();

	const { loading } = useLoadingAsync(async () => {
		await getExampleUsers();
	}, []);

	const head = ["Id", "Name", "Email"];

	return (
		<>
			{!loading && (
				<table className={style.table}>
					<thead>
						<tr>
							{head.map((h, i) => (
								<th key={i} style={{ paddingLeft: "0.2vw" }}>
									{h}
								</th>
							))}
						</tr>
					</thead>

					<tbody>
						{exampleUsers.map((user, index) => (
							<tr key={index}>
								<td className={style.data}>{user.id}</td>
								<td className={style.data}>{user.name}</td>
								<td className={style.data}>{user.email}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</>
	);
};
ExampleDbTable.displayName = "ExampleDbTable";

export default ExampleDbTable;
