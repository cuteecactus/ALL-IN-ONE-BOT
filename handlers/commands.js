const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');

module.exports = async (client, config, colors) => {
    const privateGuildId = process.env.PRIVATE_GUILD_ID || config.privateGuildId;
    const commandsPath = path.join(__dirname, '../commands');
    const commandFolders = fs.readdirSync(commandsPath);
    const enabledCommandFolders = commandFolders.filter(folder => config.categories[folder]);

    const commands = [];

    for (const folder of enabledCommandFolders) {
        const commandFiles = fs.readdirSync(path.join(commandsPath, folder)).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(path.join(commandsPath, folder, file));
            client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON());
        }
    }

    // ✅ Register commands to Discord
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN || config.token);

    try {
        const route = privateGuildId
            ? Routes.applicationGuildCommands(client.user.id, privateGuildId)
            : Routes.applicationCommands(client.user.id);

        const registeredCommands = await rest.get(route);

        console.log('\n' + '─'.repeat(40));
        console.log(`${colors.yellow}${colors.bright}⚡ SLASH COMMANDS${colors.reset}`);
        console.log('─'.repeat(40));

        if (registeredCommands.length !== commands.length) {
            console.log(`${colors.red}[ LOADER ]${colors.reset} ${colors.green}Loading Slash Commands 🛠️${colors.reset}`);
        }

        await rest.put(route, { body: commands });

        console.log(`${colors.red}[ LOADER ]${colors.reset} ${colors.green}Successfully Loaded Slash Commands ✅${colors.reset}`);
        if (privateGuildId) {
            console.log(`${colors.cyan}[ PRIVATE ]${colors.reset} ${colors.green}Slash commands registered only for guild ${privateGuildId}${colors.reset}`);
        }
    } catch (error) {
        console.log(`${colors.red}[ ERROR ]${colors.reset} ${colors.red}${error}${colors.reset}`);
    }
};
