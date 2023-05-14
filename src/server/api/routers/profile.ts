import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { filterUserForClient } from "../helpers/filterUserForClient";

export const profileRouter = createTRPCRouter({
    getUserByUserName: publicProcedure
        .input(z.object({ userName: z.string() }))
        .query(async ({ input }) => {
            const [user] = await clerkClient.users.getUserList({ username: [input.userName] });
            if (!user) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'user not found' })

            return filterUserForClient(user);
        })
})