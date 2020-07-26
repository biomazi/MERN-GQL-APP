export default {
  Query: {
    getLink: async (obj, args, ctx, info) => {
      const book = await ctx.db.Link.findById(args.id);
      return book;
    },
    allLinks: async(obj, args, ctx, info) => {
      const links = await ctx.db.Link.find({});
      return links;
    },
  },
  Mutation: {
    addLink: async (obj, args, ctx, info) => {
      const { url, tags } = args;
      if (!tags?.length) {
        throw new Error('Tag is required!');
      }
      const link = await ctx.db.Link.getOrCreateLink({ url, tags });
      return link;
    },
  },
}