import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact, ContactAddResponse } from '../types/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  baseUrl: string = "http://localhost:3001";

  constructor(private http: HttpClient) { }

  loadUserContact(loggedUserId: string) {
    const endpoint = `${this.baseUrl}/user/${loggedUserId}/contact`;
    return this.http.get<Array<Contact>>(endpoint);
  }

  createContact(loggedUserId: string, secureChatNumber: string, nickName: string) {
    const endpoint = `${this.baseUrl}/user/${loggedUserId}/contact`;
    return this.http.post<ContactAddResponse>(endpoint, {contactNumber: secureChatNumber, nickName});
  }
}
