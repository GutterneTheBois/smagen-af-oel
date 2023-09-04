import { ExampleUser } from "@prisma/client";

export type DatabaseHook = {
    exampleUsers: ExampleUser[];
    createExampleUser: (name: string, email: string) => Promise<void>;
    getExampleUsers: () => Promise<void>;
    updateExampleUser: (id: string, name: string) => Promise<void>;
    deleteExampleUser: (id: string) => Promise<void>;
}