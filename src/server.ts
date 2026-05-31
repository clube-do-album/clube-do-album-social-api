import { app } from './app.js';

const port = Number(process.env.PORT ?? 3002);

app.listen(port, () => {
  console.log(`clube-do-album-social-api running on port ${port}`);
});
