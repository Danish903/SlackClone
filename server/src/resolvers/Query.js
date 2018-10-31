import { forwardTo } from "prisma-binding";
import getUserId from "../utils/getUserId";

const Query = {
   users(parent, args, { db, prisma }, info) {
      const opArgs = {
         first: args.first,
         skip: args.skip,
         after: args.after,
         orderBy: args.orderBy
      };
      if (args.query) {
         opArgs.where = {
            // name_contains: args.query,
            OR: [
               {
                  name_contains: args.query
               }
            ]
         };
      }
      return prisma.query.users(opArgs, info);
   },

   me(parent, args, { prisma, request }, info) {
      const userId = getUserId(request);
      if (!userId) return null;
      return prisma.query.user(
         {
            where: {
               id: userId
            }
         },
         info
      );
   }
};

export { Query as default };
