import bcrypt from "bcryptjs";

import getUserId from "../utils/getUserId";
import generateToken from "../utils/generateToken";
import hashPassword from "../utils/hashPassword";

const Mutation = {
   async createUser(parent, args, { prisma }, info) {
      const emailTaken = await prisma.exists.User({ email: args.data.email });
      const password = await hashPassword(args.data.password);
      if (emailTaken) {
         throw new Error("Email taken");
      }
      const user = await prisma.mutation.createUser({
         data: {
            ...args.data,
            password
         }
      });

      return {
         user,
         token: generateToken(user.id)
      };
   },
   login: async (_, { data: { email, password } }, { prisma }, info) => {
      const user = await prisma.query.user({
         where: { email }
      });

      if (!user) {
         throw new Error("User not found");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid password");
      return {
         user,
         token: generateToken(user.id)
      };
   },
   async deleteUser(parent, args, { prisma, request }, info) {
      const userId = getUserId(request);
      return prisma.mutation.deleteUser({
         where: {
            id: userId
         }
      });
   },
   async updateUser(_, args, { prisma, request }, info) {
      const { data } = args;
      const userId = getUserId(request);
      if (typeof data.password === "string") {
         data.password = await hashPassword(data.password);
      }

      return prisma.mutation.updateUser(
         {
            where: {
               id: userId
            },
            data
         },
         info
      );
   }
};

export { Mutation as default };
