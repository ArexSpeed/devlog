/* eslint-disable import/no-anonymous-default-export */
import { connectToDatabase } from 'util/mongodb';
import create from 'services/users/create';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  switch (req.method) {
    case 'GET': {
      const data = await db.collection('users').find().sort({ _id: 1 }).toArray();
      res.json(data);

      break;
    }
    case 'POST': {
      try {
        const payload = req.body;
        console.log(payload, 'payload');
        const data = await create(payload);
        console.log(data, 'post data');
        res.status(200).json({ status: 'created', data });
      } catch (error) {
        console.log(error, 'post error');
        res.status(422).json({ status: 'not_created', error: error.message });
      }
      break;
    }

    default:
      res.status(400);
  }
};
