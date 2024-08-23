const {EmbedBuilder} = require('discord.js');
const fetch = require('node-fetch');
import romanize from "./utils";

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
        const data = (await response.json() as any[]);
        const embeds = [];

        console.log(data);

        if (data.length == 0) {
            return "No definition or similar word found";
        }

        if (typeof data[0] == 'string') {
            return `No definition found for *${word}*, try: ${data[0]}`;
        } else {
            const parsedData = data as DictionaryResponse[];
        }

        for (let i = 0; i < data.length; i++) {
            const info = data[i];

            if (info === undefined) {
                break;
            }

            if ((info.meta.id.split(":")[0] as string).replace(/-/g, '').toLowerCase() !== word.toLowerCase()) {
                if (!info.meta.stems.includes(word.toLowerCase())) {
                break;
                }
            }

            let pronuncations = info.hwi.prs != undefined ? info.hwi.prs.map((pr) => pr.mw).join(", ") : "n/a";

            const embed = new EmbedBuilder()
                .setColor(0xFFD9EE)
                .setTitle(`**${info.meta.id.split(":")[0]}**`)
                .setURL(`https://www.merriam-webster.com/dictionary/${encodeURIComponent(info.meta.id)}`)
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

        return {embeds};
        } catch (error) {
            console.log(error);
            return new EmbedBuilder()
            .setColor(0xFFD9EE)
            .setTitle(`**No Definition for: __${word}__**`)
        }
    }
    

}

export default Dictionary;
