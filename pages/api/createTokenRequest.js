import Ably from 'ably/promises';
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';
import { configureAbly } from '@ably-labs/react-hooks';

configureAbly({
  authUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/createTokenRequest`,
});

export default async function handler(req, res) {
  const client = new Ably.Realtime(process.env.ABLY_CLIENT_API_KEY);

  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    length: 2,
  });

  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: randomName,
  });

  res.status(200).json(tokenRequestData);
}
