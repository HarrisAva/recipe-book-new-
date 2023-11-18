import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shipping-list.service";
import { Subject } from "rxjs";

// use @Injectable to access shopping list service (inject service to service)
@Injectable()
export class RecipeService {

  // when editing or adding a new recipe:
  recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe('Pizza',
    //      'Pepperoni pizza',
    //       'https://image.shutterstock.com/image-photo/supreme-pizza-lifted-slice-1-260nw-84904912.jpg',
    //       [
    //         new Ingredient ('Cheese', 1),
    //         new Ingredient ('Pepperoni', 1),
    //         new Ingredient ('Tomato', 20)
    //       ] ),
    //     new Recipe('Burger',
    //     'Beef burger',
    //     'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg',
    //     [
    //       new Ingredient ('Buns', 2),
    //       new Ingredient ('Beef', 1),
    //       new Ingredient ('Onion', 1)
    //     ] )
    //   ];

      // initialize recipes when loading app (no recipe)
      private recipes: Recipe[] = [];

      //inject shopping list service
      constructor(private slService: ShoppingListService) {}

      // fetch recipes from database, then overwrite recipe array here
      setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

      // to get a copy of list of recipes from other components
      getRecipes() {
        return this.recipes.slice();
      }

      // to get a single recipe to display its Detail
      getRecipe(index: number) {
        return this.recipes[index];
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe) // push a new recipe to recipes array
        this.recipesChanged.next(this.recipes.slice()); // get updated recipes
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe; // take array of recipe to newRecipe
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }

      addIngredientsToSL(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);

      }
}
