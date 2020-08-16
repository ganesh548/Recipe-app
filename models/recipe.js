class Recipe{
    constructor(id, ownerId, title, imageUrl, description, ingredients, wayToPrepare){
        this.id=id;
        this.ownerId=ownerId;
        this.title=title;
        this.imageUrl=imageUrl;
        this.description=description;
        this.ingredients=ingredients;
        this.wayToPrepare=wayToPrepare;
    }
}

export default Recipe;