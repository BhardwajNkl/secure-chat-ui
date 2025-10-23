export enum ChatType {
    SENT="SENT",
    RECEIVED="RECEIVED"
}
export type Chat = {
    type: ChatType,
    messageContent: string;
}