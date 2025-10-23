import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Contact } from '../../types/contact';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { Chat } from '../../types/chat';
import { ChatService } from '../../services/chat.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  userContacts: Contact[] = [];
  chatOpenWithContact: Contact | undefined; // If the user cllicks on any contact, this variable get's set.

  chatsForSelectedContact: Chat[] = []; // List of chat messages for the selected contact.

  addContactForm: FormGroup;
  showAddContactForm: boolean = false;

  constructor(
    private readonly contactService: ContactService,
    private readonly chatService: ChatService
  ) {
    this.addContactForm = new FormGroup({
      secureChatNumber: new FormControl('', Validators.required),
      nickName: new FormControl('')
    });
  }

  ngOnInit() {
    this.contactService.loadUserContact("2e50bdcc-b293-4dc2-836e-e821db6f1ecb").subscribe(
      data=> {
        this.userContacts = data;
      }, err=> {
        console.log("Error while loading contacts!", err);
      }
    )
  }

  // We can use contact's id as parameter instead of number
  onChatSelect(secureChatNumber: string) {
    this.chatOpenWithContact = this.userContacts.find(uc=> uc.contact.secureChatNumber === secureChatNumber);
    // Load all chats from this contact
    if(this.chatOpenWithContact) {
      this.chatsForSelectedContact = this.chatService.loadMessagesForContact(this.chatOpenWithContact.contact.secureChatNumber);
    }
  }

  addContactBtnClick() {
    this.showAddContactForm = true;
  }

  addContactSave() {
    if(!this.addContactForm.valid) {
      alert("Please submit correctly!")
    }
    const {nickName, secureChatNumber} = this.addContactForm.value;

    this.showAddContactForm = false;
    this.addContactForm.reset();
    
    this.contactService.createContact("2e50bdcc-b293-4dc2-836e-e821db6f1ecb",
      secureChatNumber,
      nickName
    ).subscribe(
      data=>{
        alert("Contact saved!")
      },
      err=> {
        console.log("Error while creating contact!", err);
      }
    )
  }

  addContactCancel() {
    this.showAddContactForm = false;
    this.addContactForm.reset();
  }
}
