const { config } = require("./config/config.js");
const app = require("./server/server.js");

const PORT = config.port || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));