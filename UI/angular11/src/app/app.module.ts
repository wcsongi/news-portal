import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { ShowCategoryComponent } from './category/show-category/show-category.component';
import { AddEditCategoryComponent } from './category/add-edit-category/add-edit-category.component';
import { ArticleComponent } from './article/article.component';
import { ShowArticleComponent } from './article/show-article/show-article.component';
import { AddEditArticleComponent } from './article/add-edit-article/add-edit-article.component';
import { HomeComponent } from './home/home.component';
import { SharedService } from './shared.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    ShowCategoryComponent,
    AddEditCategoryComponent,
    ArticleComponent,
    ShowArticleComponent,
    AddEditArticleComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
