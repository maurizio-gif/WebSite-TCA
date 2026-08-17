import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '3dac735e7545924d5092a4ac9de4dd2de694a417', queries,  });
export default client;
  