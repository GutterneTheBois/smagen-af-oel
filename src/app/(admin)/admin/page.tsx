import { FC } from "react";
import {
	AdminPostRequest,
	BeerDeleteRequest,
	BeerRequest,
	BreweryDeleteRequest,
	BreweryPostRequest,
	BreweryPutRequest,
	DistilleryDeleteRequest,
	DistilleryPostRequest,
	DistilleryPutRequest,
	SpiritDeleteRequest,
	SpiritPostRequest,
	StatusField,
} from "@/components/RequestComponents";
import styles from "./admin.module.scss";

const AdminPage: FC = async () => {
	return (
		<>
			<StatusField />
			<div
				className={styles.admin_field_container}
				style={{ marginTop: "9vh" }}
			>
				<BreweryPostRequest />
				<BreweryPutRequest />
				<BreweryDeleteRequest />
			</div>
			<hr />
			<div className={styles.admin_field_container}>
				<BeerRequest />
				<BeerDeleteRequest />
			</div>
			<hr />
			<div className={styles.admin_field_container}>
				<DistilleryPostRequest />
				<DistilleryPutRequest />
				<DistilleryDeleteRequest />
			</div>
			<hr />
			<div className={styles.admin_field_container}>
				<SpiritPostRequest />
				<SpiritDeleteRequest />
			</div>
			<hr />
			<div className={styles.admin_field_container}>
				<AdminPostRequest />
			</div>
		</>
	);
};

export default AdminPage;
