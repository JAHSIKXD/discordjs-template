class Loader {
    constructor(client) {
        this.client = client;
    }
    load({file, folder, dir}) {
        try {
            if (!file.endsWith('.js')) throw 'Nie jest komendą';
			dir = dir || `../commands/${folder}/${file}`;
            let command = require(dir);
            if (!command) throw 'Nie istnieje';
            if (!command.name || !command.run) throw 'Nie może zostać uruchomiony';
			
            command = Object.assign(command, { file, folder, dir });
            
            this.client.commands.set(command.name, command);
            
            if (command.aliases) command.aliases.forEach(alias => {
                if (this.client.aliases.get(alias)) throw `Alias ${alias} jest już zajęty przez komende ${this.client.aliases.get(alias)}`;
                this.client.aliases.set(alias, command.name);
            });
            
            log.ready(`Komenda ${command.name} została załadowana!`);
            return command;
        } catch (e) {
            log.error(`${folder}/${file} | ${e}`);
        }
    }
    unload(file) {
        try {
         const command = this.client.commands.get(file) || this.client.commands.get(this.client.aliases.get(file));
         if (!command) throw `Komenda nie została znaleziona`;

        delete require.cache[require.resolve(command.dir)];
        if (this.client.commands.get(file)) this.client.commands.delete(command.name);
        else this.client.aliases.delete(command.name);

        log.warn(`Poprawnie zdezaktywowano komendę ${command.folder}/${command.name}`);
        return command;
        } catch (e) {
            log.error(`${file} | ${e}`);
        }
    }
};

module.exports = Loader;