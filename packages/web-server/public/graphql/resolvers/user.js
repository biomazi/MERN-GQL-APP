import jwt from 'jsonwebtoken';

export default {
  Query: {
    me: async (obj, args, ctx, info) => {
      const userData = ctx.req.user;
      if (!userData) return null;

      const { user } = userData;
      const me = await ctx.db.User.findById(user._id);
      return me;
    },
    user: async (obj, args, ctx, info) => {
      const user = await ctx.db.User.findById(args.id);
      return user;
    },
    users: async (obj, args, ctx, info) => {
      const users = await ctx.db.User.find({});
      return users;
    },
  },
  Mutation: {
    addUser: async (obj, args, ctx, info) => {
      const { email, password, username } = args;
      const user = await ctx.db.User.create({ email, password, username });
      return user;
    },
    login: async (obj, args, ctx, info) => {
      const { email, password } = args;
      const user = await ctx.db.User.findOne({ email });
      if (!user) {
        throw new Error(`No such user found for email ${email}`);
      }
      const isValidPassword = user.password === password;
      if (!isValidPassword) {
        throw new Error('Invalid Password!');
      }
      const userData = user.toJSON();
      const token = jwt.sign({ user: userData }, process.env.SECRET, { expiresIn: '1d' });
      ctx.res.cookie('token', token, { maxAge: 60 * 60 * 24 * 7, httpOnly: true });
      return user;
    },
    logout: async (obj, args, ctx, info) => {
      ctx.res.clearCookie('token');
      return true;
    }
  },
}