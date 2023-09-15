"use client";
import { FC, useState } from "react";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import { Beer, Brewery, Distillery, Spirit } from "@prisma/client";

type FilterProps = {
	data: Beer[] | Brewery[] | Distillery[] | Spirit[] | undefined;
};

const SearchFilter: FC<FilterProps> = ({ data }) => {
	return <></>;
};

SearchFilter.displayName = "SearchFilter";

export default SearchFilter;
