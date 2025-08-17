import { Timestamp } from "firebase/firestore";

export type User = {
    uid: string;
    username?: string;
    email: string;
    avatarUrl?: string;
    createdAt?: Timestamp;
    nrOfRecipes?: number;
    upVotes?: number;
}