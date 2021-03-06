import { connectToDatabase } from 'util/mongodb';
import Joi from 'joi';
import crypto from 'crypto';

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const authorizeUser = async (payload) => {
  const { db } = await connectToDatabase();
  const { email, password } = await schema.validateAsync(payload);

  const user = await db.collection('users').findOne({ email: email });

  //console.log(user, 'user in services');
  if (!user) {
    return null;
  }

  const passwordHash = crypto
    .pbkdf2Sync(password, user.passwordSalt, 1000, 64, `sha512`)
    .toString(`hex`);
  if (passwordHash !== user.passwordHash) {
    return null;
  }
  console.log(user, 'usern in authorizeuser');

  return {
    id: user._id,
    email: user.email,
    name: user.name,
  };
};

export default authorizeUser;
