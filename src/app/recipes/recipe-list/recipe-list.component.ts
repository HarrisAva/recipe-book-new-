import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VariableBinding } from '@angular/compiler';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit, OnDestroy {

   // use Recipe model from 'recipe.model.ts'
  recipes: Recipe[];
  subscription: Subscription;

  // inject service, router and activatedRoute(current route)
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged
    .subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate (['new'], {relativeTo: this.route});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  }

  // unsubscribe the event of changes when the component gets destroyed to avoid memory leak:
  // 1. Add OnDestroy implementation
  // 2. Store subscription in a subscription variable 
  // 3. Add ngOnDestroy function - this.subscription.unsubscribe()

