import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../types/login';
import { Contact } from '../types/contact';
import { Chat, ChatType } from '../types/chat';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  // Login state
  private loginStateSource = new BehaviorSubject<LoginResponse | null>(this.loadLoginState());
  loginState$ = this.loginStateSource.asObservable();

  // Contacts state
  private contactStateSource = new BehaviorSubject<Array<Contact>>([]);
  contactState$ = this.contactStateSource.asObservable();

  // Chats state:
  private chatMapSource = new BehaviorSubject<Map<string, Chat[]>>(new Map());
  chatMap$ = this.chatMapSource.asObservable();

  private loadLoginState(): LoginResponse | null {
    const loginDetails = localStorage.getItem(`SECURE_CHAT_LOGIN_DETAILS`);
    if (loginDetails) {
      return JSON.parse(loginDetails);
    } else {
      return null;
    }
  }

  setLogin(login: LoginResponse) {
    this.loginStateSource.next(login);
    // save state to local storage as it is a critical state
    localStorage.setItem(`SECURE_CHAT_LOGIN_DETAILS`, JSON.stringify(login));
  }

  clearLogin() {
    this.loginStateSource.next(null);
  }

  setContacts(contacts: Contact[]) {
    this.contactStateSource.next(contacts);
  }

  addNewContact(contact: Contact) {
    const existingList = this.contactStateSource.getValue();
    const newList = [...existingList];
    newList.push(contact)
    this.contactStateSource.next(newList);
  }

   loadMessagesForContact(contactUserId: string) {
    const chats = this.chatMapSource.getValue().get(contactUserId) ?? [];
    return chats;
  }

  updateChatState(contactUserId: string, content: string, type: ChatType) {
    // Handle the scenario when user gets a message from a non-contact person.
      // So we will need to add a temp contact (nick name= securechat number) in the 'contacts' state.
    const contactExists = this.contactStateSource.getValue().find(c=>c.contact.id === contactUserId);
    if(!contactExists) {
      this.createTempContact(contactUserId);
    }
    
    // Clone the current map and build a new one.
    const currentMap = this.chatMapSource.getValue();
    const newMap = new Map(currentMap);

    // Clone or extend the existing messages for that user
    const currentMessages = newMap.get(contactUserId) ?? [];
    const updatedMessages = [
      ...currentMessages,
      { type, messageContent: content }
    ];

    // Update in the new map.
    newMap.set(contactUserId, updatedMessages);

    // Update the state
    this.chatMapSource.next(newMap);
  }

  // TODO: it's better to use person's securechat number instead of id for display purpose.
    // To achieve this, we will need to modify send message event data. For now, let's use id.
  // Ths function only modifies local state. Contact is not created on server.
    // Only created for showing the incoming messages from non-contact persons.
    // We will provide a button to save such non-contact persons in contact list.
  private createTempContact(userId: string) {
    const guest: Contact = {
      nickName: userId,
      contact: {
        id: userId,
        secureChatNumber: ""
      }
    }
    this.addNewContact(guest);
  }
}
