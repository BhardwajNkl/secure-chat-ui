import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Contact } from '../../types/contact';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { Chat } from '../../types/chat';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-page',
  imports: [
    CommonModule,
    HeaderComponent
  ],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css'
})
export class ChatPageComponent {
  userContacts: Contact[] = [];
  chatOpenWithContact: Contact | undefined; // If the user cllicks on any contact, this variable get's set.

  chatsForSelectedContact: Chat[] = []; // List of chat messages for the selected contact.

  constructor(
    private readonly contactService: ContactService,
    private readonly chatService: ChatService
  ) {
  }

  ngOnInit() {
    this.userContacts = this.contactService.loadUserContact("");
    console.log(this.userContacts);
  }

  // We can use contact's id as parameter instead of number
  onChatSelect(secureChatNumber: string) {
    this.chatOpenWithContact = this.userContacts.find(uc=> uc.secureChatNumber === secureChatNumber);
    // Load all chats from this contact
    if(this.chatOpenWithContact) {
      this.chatsForSelectedContact = this.chatService.loadMessagesForContact(this.chatOpenWithContact.secureChatNumber);
    }
  }
}
