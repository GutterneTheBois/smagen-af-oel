"use client";
import {
	FC,
	useState,
	ChangeEvent,
	useEffect,
	KeyboardEvent,
	useRef,
} from "react";
import { useDb } from "@/services";
import { Button } from "@/client-components";
import { Beer, Spirit } from "@prisma/client";

interface UpdaterProps {
	type: "beer" | "spirit";
}

const ProductUpdateRequest: FC<UpdaterProps> = ({ type }) => {
	const { updateDescription, beers, refreshBeers, refreshSpirits, spirits } =
		useDb();
	const ref = useRef(null);

	const [id, setId] = useState<string>("");
	const [props, setProps] = useState({
		description: "",
		image_url: undefined,
	});

	useEffect(() => {
		(async () => {
			await refreshBeers();
		})();
	}, [beers]);
	useEffect(() => {
		(async () => {
			await refreshSpirits();
		})();
	}, [spirits]);

	const update = () => {
		updateDescription(type, id, props.description, props.image_url);
		setProps({ description: "", image_url: undefined });
		//@ts-ignore
		ref.current.value = "";
	};

	const onChangeSelect = (ev: ChangeEvent<HTMLSelectElement>) => {
		setId(ev.target.value);
	};

	const onChangeInput = (ev: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = ev.target;

		setProps({ ...props, [name]: value });
	};

	const getProductDescription = (): string => {
		if (type === "beer") {
			let beer: Beer = beers[beers.findIndex((b) => b.id === id)] as Beer;

			if (beer === undefined || beer.description === null)
				return "Description";

			return beer.description;
		} else if (type === "spirit") {
			let spirit: Spirit = spirits[
				beers.findIndex((s) => s.id === id)
			] as Spirit;

			if (spirit === undefined || spirit.description === null)
				return "Description";

			return spirit.description;
		}
		return "Description";
	};

	const onKeyPress = (ev: KeyboardEvent<HTMLInputElement>) => {
		if (ev.key === "Enter") update();
	};

	const fillInput = (desc: string) => {
		setProps({ description: desc, image_url: undefined });
	};

	return (
		<div>
			<h1>Update Beer</h1>
			<div>
				<select onChange={onChangeSelect} defaultValue={"select"}>
					{type === "beer" && (
						<>
							<option value="select">-- Select Beer --</option>
							{beers.map((beer, index) => (
								<option key={index} value={beer.id}>
									{beer.name}
								</option>
							))}
						</>
					)}
					{type === "spirit" && (
						<>
							<option value="select">-- Select Spirit --</option>
							{spirits.map((spirit, index) => (
								<option key={index} value={spirit.id}>
									{spirit.name}
								</option>
							))}
						</>
					)}
				</select>

				<hr />
				<input
					name={"description"}
					ref={ref}
					type="text"
					onChange={onChangeInput}
					defaultValue={props.description}
					placeholder={getProductDescription()}
					onKeyDown={onKeyPress}
				/>
				<button
					style={{ color: "black" }}
					onClick={() => fillInput(getProductDescription())}
				>
					Fill input
				</button>
				<hr />
				<input
					name={"image_url"}
					type="text"
					onChange={onChangeInput}
					defaultValue={props.image_url}
					placeholder={"URL to image"}
					onKeyDown={onKeyPress}
				/>

				<Button onClick={update}>Submit</Button>
			</div>
		</div>
	);
};

export default ProductUpdateRequest;
