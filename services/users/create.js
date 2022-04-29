import { connectToDatabase } from 'util/mongodb';
import Joi from 'joi';
import crypto from 'crypto';

const schema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
  position: Joi.string().required()
});

const checkUserExist = async (email) => {
  const { db } = await connectToDatabase();
  const existingUserEmail = await db.collection('users').findOne({ email: email });
  console.log(existingUserEmail, 'exist email');
  if (existingUserEmail) {
    throw new Error(`User ${email} already exist`);
  }
};

const create = async (payload) => {
  const { db } = await connectToDatabase();

  const { email, name, password, position } = await schema.validateAsync(payload);
  await checkUserExist(email);
  const passwordSalt = crypto.randomBytes(16).toString('hex');
  const passwordHash = crypto
    .pbkdf2Sync(password, passwordSalt, 1000, 64, `sha512`)
    .toString(`hex`);

  const user = await db.collection('users').insertOne({
    email,
    name,
    passwordSalt,
    passwordHash,
    position
  });

  return user;
};

export default create;
