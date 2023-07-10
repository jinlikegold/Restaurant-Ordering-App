import { thingsToTest } from "./app.js";


function test_handleAddItem(){
    const handleAddItem = thingsToTest.handleAddItem
    const orderedItems = thingsToTest.orderedItems

    handleAddItem(0)

    console.log(orderedItems)

    /*
    1) Call the function - try to add Pizza
    2) Check if Pizza is added to object orderedItems
    3) Check if html has rendered order with Pizza
    */


}

test_handleAddItem()