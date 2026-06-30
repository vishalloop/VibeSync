import app from "./src/app.js"
import connectToDB from "./src/config/database.js";
import redis from "./src/config/redis.js";

async function ServerInitialization () {

    await connectToDB();
    
    app.listen(3000,()=>{
        console.log("Server is running on port 3000");
    })
}

ServerInitialization();
