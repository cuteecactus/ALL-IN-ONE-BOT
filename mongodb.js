const colors = require('./UI/colors/colors');

const createInMemoryCollection = () => ({
    async findOne() {
        return null;
    },
    async updateOne() {
        return { acknowledged: true, matchedCount: 0, modifiedCount: 0, upsertedCount: 0 };
    },
    async insertOne() {
        return { acknowledged: true };
    },
    async deleteOne() {
        return { acknowledged: true, deletedCount: 0 };
    },
    async deleteMany() {
        return { acknowledged: true, deletedCount: 0 };
    }
});

async function connectToDatabase() {
    console.log('\n' + '─'.repeat(40));
    console.log(`${colors.magenta}${colors.bright}🕸️  DATABASE CONNECTION${colors.reset}`);
    console.log('─'.repeat(40));
    console.log('\x1b[33m[ DATABASE ]\x1b[0m', '\x1b[33mDisabled (running in private no-database mode) ⚠️\x1b[0m');
}

module.exports = {
    connectToDatabase,
    notificationsCollection: createInMemoryCollection(),
    nicknameConfigs: createInMemoryCollection(),
    playlistCollection: createInMemoryCollection(),
    autoplayCollection: createInMemoryCollection(),
    botStatusCollection: createInMemoryCollection(),
};
