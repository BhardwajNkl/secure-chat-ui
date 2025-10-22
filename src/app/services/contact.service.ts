import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }

  loadUserContact(loggedUserId: string) {
    // for now, dummy implementation
    return [
      {
        secureChatNumber: "nb100@securechat",
        nickName:"nikhil"
      },
      {
        secureChatNumber: "ashok100@securechat",
        nickName:"ashok"
      },
      {
        secureChatNumber: "tom100@securechat",
        nickName:"tom"
      }
    ]
  }

  createContact(secureChatNumber: string, nickName: string) {
    // for now, dummy implementation
    return {secureChatNumber, nickName};
  }
}
