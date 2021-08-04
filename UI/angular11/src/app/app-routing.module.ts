import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './article/article.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'article', component: ArticleComponent },
  { path: 'category', component: CategoryComponent }
];

const routesConfig: Routes = [
  { path: 'home', component: HomeComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
