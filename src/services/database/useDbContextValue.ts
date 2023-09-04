import { useCallback, useState } from "react";
import { DatabaseHook } from "./database";
import { ExampleUser } from "@prisma/client";
import { genApiClient } from "../backend/appApiClient";

export const useDbContextValue = (): DatabaseHook => {
    const [exampleUsers, setExampleUsers] = useState<ExampleUser[]>([]);

    const createExampleUser = useCallback(
        async (name: string, email: string) => {
            const client = await genApiClient();

            const newUser = { name, email };
            const usr: ExampleUser = await client.postRequest("exampleuser", newUser) as ExampleUser;

            setExampleUsers([...exampleUsers, usr])
        }, []
    );

    const getExampleUsers = useCallback(
        async (): Promise<void> => {
            const client = await genApiClient();
            const ex: any = await client.getRequest("exampleuser");
            
            const users: ExampleUser[] = ex.users;

            setExampleUsers(users);
        }, []
    );

    const updateExampleUser = useCallback(
        async (id: string, newName: string): Promise<void> => {
            const update = { id, newName };

            const client = await genApiClient();
            await client.putRequest("exampleuser", update);

            await getExampleUsers();
        }, []
    );

    const deleteExampleUser = useCallback(
        async (id: string) => {
            const del = { id };

            const client = await  genApiClient();
            await client.postRequest("deleteuser", del)

            await getExampleUsers();
        }, []
    );

    return { exampleUsers, createExampleUser, getExampleUsers, updateExampleUser, deleteExampleUser };
}