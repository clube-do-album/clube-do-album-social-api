import 'dotenv/config';
import { app } from './app.js';

const port = Number(process.env.PORT ?? 3004);

app.listen(port, () => {
  console.log(`clube-do-album-social-api running on port ${port}`);
});
