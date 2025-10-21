export type LoginResponse = {
    loginStatus: boolean,
    loggedUser: {
        id: string,
        secureChatNumber: string
    }
}