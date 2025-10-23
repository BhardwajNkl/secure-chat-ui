import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

export const routes: Routes = [
    {
        path:"",
        pathMatch: "full",
        component: LandingPageComponent
    },
    {
        path:"generate-number",
        pathMatch:"full",
        component: RegisterPageComponent
    },
    {
        path:"chat",
        pathMatch:"full",
        component: ChatPageComponent
    },
    {
        path:"**",
        component: ErrorPageComponent
    }
];
