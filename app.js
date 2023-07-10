import { menuArray } from "./data.js"

const paymentModal = document.getElementById('payment-modal')
const paymentForm = document.getElementById('payment-form')
const orderContainer = document.getElementById('order-container')

document.addEventListener("click", function(e){

    if(e.target.dataset.addItem){
        handleAddItem(e.target.dataset.addItem)
        console.log(orderedItems)
    }
    else if(e.target.dataset.removeItem){
        removeItemfromOrder(e.target.dataset.removeItem)
        getOrderHtml()
    }
    else if(e.target.id ==='complete-order-btn' && orderedItems.length > 0){
        paymentModal.style.display = 'block'
    } 
})

paymentForm.addEventListener("submit", function(e){
    e.preventDefault()
    paymentModal.style.display = 'none'
    validateOrder()
})

let orderedItems = []

/* Refactor for testing */

function handleAddItem(itemId){
    addItemsToOrder(itemId)
    getOrderHtml()
}


function addItemsToOrder(itemId) {

    let existingItems = orderedItems.filter((selectedItem)=>{
        return selectedItem.id === parseInt(itemId)
    }) // only will have 0 or 1 items in array


    // if item is new
    if(existingItems.length === 0){
        menuArray.filter((item)=>{
            if(item.id === parseInt(itemId)){
                orderedItems.push({
                    name: item.name,
                    price: item.price,
                    id: item.id,
                    quantity: 1
                    }) 
                console.log("new item added to order")
            }
        })
    } 
    
    // if item has already been added to order
    else {
       existingItems[0].quantity++
    }

}


function removeItemfromOrder(itemId){

    for(let i=0; i<orderedItems.length; i++){
        if(orderedItems[i].id === parseInt(itemId)){
            orderedItems.splice(i, 1)
        }        
    }

}

function validateOrder(){

    let paymentFormData = new FormData(paymentForm)
    let name = paymentFormData.get('name')
    orderContainer.innerHTML = `<div id="confirmation-container">
    <p id="confirmation">Thanks, ${name}! Your order is on its way!</p>
    </div>`

}


function getItemsHtml() {

    let itemsHtml = ``

    menuArray.forEach((item) => {
        itemsHtml += `
            <div class="items">
                <p class="item-img">${item.emoji}</p>
                    <div class="item-info">
                        <p>${item.name}</p>
                        <p class="item-ingredients">${item.ingredients}</p>
                        <p>$${item.price}</p> 
                    </div>
                <i class="fa-solid fa-plus fa-border" data-add-item="${item.id}"></i>
            </div>
        `
    })
    
    document.getElementById('item-selection-container').innerHTML = itemsHtml
}

function getOrderHtml(){

    let orderHtml = `<p id='order-heading'>Your Order</p>
    `
    let priceTotal = 0
    
    orderedItems.forEach((orderedItem)=>{

        let multipleItemQuantity = ``
        let itemPriceTotal = orderedItem.price * orderedItem.quantity
        priceTotal += itemPriceTotal

        if(orderedItem.quantity > 1){
            multipleItemQuantity = `
            <p>(${orderedItem.quantity})</p>
            `
        }

        orderHtml +=  `
        <div class='ordered-item-container'>
            <div class='item-remove-container'>
                <p>${orderedItem.name}</p>
                ${multipleItemQuantity}
                <button class='remove-btn' class='technical' data-remove-item='${orderedItem.id}'>Remove</button>
            </div>
            <div>
            <p>${itemPriceTotal}</p>
            </div>
        </div>
    `

    })

    orderHtml += `
            <hr>
            <div id='order-price-container'>
                <div>
                <p>Total Price:</p>
                </div>
                <div>
                <p>${priceTotal}</p>
                </div>
            </div>
            <button class="main-btn" id="complete-order-btn">Complete Order</button>
    `

    orderContainer.innerHTML = orderHtml
   
}

function loadApp() {
    getItemsHtml()
}

loadApp()

export const thingsToTest = {
    "handleAddItem": handleAddItem,
    "orderedItems": orderedItems
} 

/* 

this object contains references to functions 
key = the name of the function (string)
value = the actual function

*/