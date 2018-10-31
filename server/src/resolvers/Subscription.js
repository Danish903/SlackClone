// import getUserId from "../utils/getUserId";

const Subscription = {
   comment: {
      subscribe: (_, { eventId }, { prisma }, info) => {
         return prisma.subscription.comment(
            {
               where: {
                  node: {
                     event: {
                        id: eventId
                     }
                  }
               }
            },
            info
         );
      }
   }
};

export default Subscription;
