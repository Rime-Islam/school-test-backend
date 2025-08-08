import mongoose from "mongoose";
import app from "./app.js";
import config from "./app/config/index.js";
async function main() {
    try {
        await mongoose.connect(config.database_url);
        console.log("✅ Database is running");
        app.listen(config.port, () => {
            console.log(`🚀 App is listening on port: ${config.port}`);
        });
    }
    catch (err) {
        console.error("❌ Failed to connect database", err);
    }
}
main();
//# sourceMappingURL=server.js.map