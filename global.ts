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

const EmojiInstance = new Emoji("🤓");
export default EmojiInstance;