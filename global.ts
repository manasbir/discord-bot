class Emoji {
	emoji: string;

	constructor(emoji: string) {
		this.emoji = emoji;
	}

	set_emoji(emoji: string) {
		this.emoji = emoji;
	}

    view_emoji() {
        return this.emoji;
    }
}

module.exports = new Emoji(":nerd:");
