import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Contact, ContactAddResponse } from '../../types/contact';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { Chat, ChatType } from '../../types/chat';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GlobalStateService } from '../../shared/global-state.service';
import { LoginResponse } from '../../types/login';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-chat-page',
  imports: [
    CommonModule,
    HeaderComponent,
    ReactiveFormsModule
  ],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css'
})
export class ChatPageComponent {
  loginDetails: LoginResponse | null = null;
  userContacts: Contact[] = [];

  chatOpenWithContact: Contact | undefined; // If the user cllicks on any contact, this variable get's set.
  chatsForSelectedContact: Chat[] = []; // List of chat messages for the selected contact.

  addContactForm: FormGroup;
  showAddContactForm: boolean = false;

  chatMessageForm: FormGroup;

  constructor(
    private readonly contactService: ContactService,
    private readonly globalState: GlobalStateService,
    private readonly eventService: EventService
  ) {
    this.addContactForm = new FormGroup({
      secureChatNumber: new FormControl('', Validators.required),
      nickName: new FormControl('')
    });

    this.chatMessageForm = new FormGroup({
      messageContent: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    // Subscribe to login state
    this.globalState.loginState$.subscribe(
      data => {
        this.loginDetails = data;
      }
    )
    // Subscribe to the contacts state
    this.globalState.contactState$.subscribe(
      data => {
        this.userContacts = data;
      }
    );

    // subscribe to chat state:  todo-> we can have a different impl:
    // we can have different observables for each user (array of observables)
    // we can subscribe inside onChatSelect.
    // but, for now, let's keep this impl.
    this.globalState.chatMap$.subscribe(
      data => {
        if (this.chatOpenWithContact) {
          this.chatsForSelectedContact = this.globalState.loadMessagesForContact(this.chatOpenWithContact.contact.id);
        }
      }
    );

    // subscribe to 
    this.eventService.getMessages().subscribe(
      (message) => {
        this.globalState.updateChatState(message.senderId, message.messageContent, ChatType.RECEIVED);
      }
    );

    if (this.loginDetails) {
      this.contactService.loadUserContact(this.loginDetails.loggedUser.id).subscribe(
        data => {
          // Set the state
          this.globalState.setContacts(data);
        }, err => {
          console.log("Error while loading contacts!", err);
        }
      );
    }
  }

  // We can use contact's id as parameter instead of number
  onChatSelect(secureChatNumber: string) {
    this.chatOpenWithContact = this.userContacts.find(uc => uc.contact.secureChatNumber === secureChatNumber);
    // Load all chats from this contact
    if (this.chatOpenWithContact) {
      this.chatsForSelectedContact = this.globalState.loadMessagesForContact(this.chatOpenWithContact.contact.id);
    }
  }

  addContactBtnClick() {
    this.showAddContactForm = true;
  }

  addContactSave() {
    if (!this.addContactForm.valid) {
      alert("Please submit correctly!")
    }
    const { nickName, secureChatNumber } = this.addContactForm.value;

    this.showAddContactForm = false;
    this.addContactForm.reset();

    if (this.loginDetails) {
      this.contactService.createContact(this.loginDetails.loggedUser.id,
        secureChatNumber,
        nickName
      ).subscribe(
        (data: ContactAddResponse) => {
          // Update state
          this.globalState.addNewContact({ nickName: data.nickName, contact: data.contact });
        },
        err => {
          console.log("Error while creating contact!", err);
        }
      )
    } else {
      alert("Login session expired!");
    }
  }

  addContactCancel() {
    this.showAddContactForm = false;
    this.addContactForm.reset();
  }

  sendChat() {
    if (!this.chatMessageForm.valid) {
      return;
    }
    const { messageContent } = this.chatMessageForm.value;
    this.chatMessageForm.reset();
    this.eventService.sendMessage({
        senderId: this.loginDetails!.loggedUser.id,
        receiverId: this.chatOpenWithContact!.contact.id,
        messageContent: messageContent
      });
    this.globalState.updateChatState(this.chatOpenWithContact!.contact.id, messageContent, ChatType.SENT);
  }
}
