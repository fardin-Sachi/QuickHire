import ENV from '../config/env.config.js';
import { app } from '../server.js';
import { connectDb } from './connectDb.js';
export async function startServer() {
    await connectDb();
    app.listen(ENV.PORT, () => {
        console.log(`Server running on port ${ENV.PORT} in ${ENV.NODE_ENV} mode`);
    });
}
