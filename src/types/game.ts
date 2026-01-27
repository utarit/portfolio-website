export interface Message {
    message: string;
    time?: string;
    person: "me" | "other" | "system";
    link?: {
        url: string;
        title: string;
    };
}

export interface Contact {
    name: string;
    messages: Message[];
    avatar?: string;
    lastMessageTime?: Date;
    unreadCount?: number;
}

export enum Suspect {
    ZEHRA = "Zehra",
    MAHMUT = "Mahmut",
    KERIM = "Kerim",
    FATMA = "Fatma",
    NURAY = "Nuray",
    YELIZ = "Yeliz",
    SINAN = "Sinan",
    RIZA = "Rıza",
    SEMRA = "Semra",
    NEDIM = "Nedim",
}

export enum ResultType {
    KILLED = "killed",
    KIDNAPPED = "kidnapped",
    ESCAPED = "escaped",
    SUICIDE = "suicide",
}

export interface Decision {
    message: string;
    type: ResultType;
}