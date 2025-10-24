export type Contact = {
    nickName: string;
    contact: {
        id: string;
        secureChatNumber: string;
    }
}

export type ContactAddResponse = {
    nickName: string,
    owner: {
        id: string
    },
    contact: {
        id: string,
        secureChatNumber: string
    }
}