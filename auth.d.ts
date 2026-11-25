
import "next-auth";
import "next-auth/jwt";
import "@auth/core/types";
import "@auth/core/adapters";
import type { DefaultSession } from "next-auth";

type UserRole = "USER" | "ADMIN";

declare module "next-auth" {
    interface User {
        role: UserRole;
    }

    interface Session {
        user: {
            id: string;
            role: UserRole;
        } & DefaultSession["user"];
    }
}

declare module "@auth/core/types" {
    interface User {
        role: UserRole;
    }
}

declare module "@auth/core/adapters" {
    interface AdapterUser {
        role: UserRole;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: UserRole;
    }
}
