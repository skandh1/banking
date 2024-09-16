'use server'
import { cookies } from 'next/headers';
import { ID, Query } from "node-appwrite";

import { createAdminClient, createSessionClient } from "./appwrite"
import { parseStringify } from '../utils';

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
    APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
    try {
        const { database } = await createAdminClient();

        const user = await database.listDocuments(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            [Query.equal('userId', [userId])]
        )

        return parseStringify(user.documents[0]);
    } catch (error) {
        console.log(error)
    }
}

export const signIn = async ({ email, password }: signInProps) => {
    try {
        const { account } = await createAdminClient();
        
        const session = await account.createEmailPasswordSession(email, password);
        
        // Uncomment and adjust as needed for your setup
        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        
        // const user = await getUserInfo({ userId: session.userId })
        
        return { success: true, session: parseStringify(session) };
    } catch (error) {
        console.error(error);
        return { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' };
    }
}

export const signUp = async (userData: SignUpParams) => {

    const { firstName, lastName, email, password } = userData;

    try {
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            `${firstName} ${lastName}`
        );

        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(newUserAccount);
    } catch (error) {
        console.error(error)
    }
}

// ... your initilization functions

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const userData = await account.get();
        return parseStringify(userData);
    } catch (error) {
        console.error(error)
        return null;
    }
}

export const logoutAccount = async () => {
    try {
        const { account } = await createSessionClient()
        cookies().delete("appwrite-session");
        await account.deleteSession("current");
    } catch (error) {
        console.error(error)
        return null

    }
}