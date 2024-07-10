const {EmbedBuilder} = require('discord.js');
const fetch = require('node-fetch');
const romanize = require('./utils.ts');

type DictionaryResponse = {
    meta: MetaInfo;
    def: DefinitionInfo[];
    hwi: HeadwordInfo;
    fl: string;
    shortdef: string[]
}

type HeadwordInfo = {
    hw: string;
    prs?: PronunciationInfo[];
}

type PronunciationInfo = {
    mw: string;
}

type DefinitionInfo = {
    shortdef: string[];
}

type MetaInfo = {
    id: string;
}

class Dictionary {
    api_key: string;  

    constructor(api_key: string) {
        this.api_key = api_key;
    }


    async get_info(word: string) {
        try {
        const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${this.api_key}`

        const response = await fetch(url);
        const data = (await response.json() as DictionaryResponse[]);
        const embeds = [];

        for (let i = 0; i < data.length; i++) {
            const info = data[i];

            if (info == undefined) {
                break;
            }

            if (!info.meta.id.includes(word)) {
                break;
            }

            let pronuncations = info.hwi.prs != undefined ? info.hwi.prs.map((pr) => pr.mw).join(", ") : "n/a";

            let embed = new EmbedBuilder()
            .setColor(0xFFD9EE)
            .setTitle(`**${info.meta.id.split(":")[0]}**`)
            .setURL(`https://www.merriam-webster.com/dictionary/${info.meta.id.replace(" ", "%20")}`)
            .setAuthor({ name: 'banger definition', iconURL: 'https://static.wikia.nocookie.net/villains/images/9/9f/Freddy_fazbear_by_monsuirahab-d898wex.png/revision/latest?cb=20231009195005', url: 'https://youtu.be/UCmgGZbfjmk' })
            .setDescription(`**${info.hwi.hw}** | **${pronuncations}** \n ${info.fl}`)

            for (let j = 0; j < info.shortdef.length; j++) {
                embed.addFields({
                    name: `Definition ${romanize(j + 1)}`,
                    value: info.shortdef[j]
                });
            }

            embeds.push(embed);
        }

        // .addFields({ name: 'Inline field title', value: 'Some value here', inline: false })
        // .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

        if (embeds.length == 0) {
            return "No definition found";
        }

        return {embeds: embeds};
        } catch (error) {
            console.log(error);
            return new EmbedBuilder()
            .setColor(0xFFD9EE)
            .setTitle(`**No Definition for: __${word}__**`)
        }
    }


}

module.exports = Dictionary;
