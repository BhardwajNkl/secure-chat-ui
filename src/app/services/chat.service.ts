import { Injectable } from '@angular/core';
import { Chat, ChatType } from '../types/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  contactChatMap: Map<string, Chat[]> = new Map();

  constructor() {
    this.contactChatMap.set("nb100@securechat", [
      { type: ChatType.SENT, messageContent: "hello1" },
      { type: ChatType.SENT, messageContent: "hello2" },
      { type: ChatType.RECEIVED, messageContent: "hello3" },
      { type: ChatType.SENT, messageContent: "hello4" }
    ]);
    this.contactChatMap.set("ashok100@securechat", []);
    this.contactChatMap.set("tom100@securechat", [
      { type: ChatType.SENT, messageContent: "hey tom1" },
      { type: ChatType.RECEIVED, messageContent: "hey 2" },
      { type: ChatType.RECEIVED, messageContent: "hey 3" },
      { type: ChatType.SENT, messageContent: "haha" }
    ]);
  }

  loadMessagesForContact(contactNumber: string) {
    return this.contactChatMap.get(contactNumber) ?? [];
  }

  addSentMessageForContact(contactNumber: string, content: string, type: string) {
    const currentMessages = this.contactChatMap.get(contactNumber) ?? [];
    if (type === "SENT") {
      this.contactChatMap.set(contactNumber, [...currentMessages, { type: ChatType.SENT, messageContent: content }]);
    }
    if (type === "RECEIVED") {
      this.contactChatMap.set(contactNumber, [...currentMessages, { type: ChatType.SENT, messageContent: content }])
    }
  }
}
