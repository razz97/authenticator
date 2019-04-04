import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { DropDownModule } from "nativescript-drop-down/angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from './login/login.component';
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { RegisterComponent } from './register/register.component';
import { DiscoverComponent } from './discover/discover.component';
import { PostComponent } from './post/post.component';
import { ProfileComponent } from './profile/profile.component';
import { ImageDetailsComponent } from './image-details/image-details.component';
import { UserComponent } from './user/user.component';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        AppRoutingModule,
        DropDownModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        DiscoverComponent,
        PostComponent,
        ProfileComponent,
        ImageDetailsComponent,
        UserComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
