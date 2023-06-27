import { menuArray } from "./data.js"

const paymentModal = document.getElementById('payment-modal')
const paymentForm = document.getElementById('payment-form')
const orderContainer = document.getElementById('order-container')

document.addEventListener("click", function(e){

    if(e.target.dataset.addItem){
        addItemsToOrder(e.target.dataset.addItem)
        getOrderHtml()
    }
    else if(e.target.dataset.removeItem){
        removeItemfromOrder(e.target.dataset.removeItem)
        getOrderHtml()
    }
    else if(e.target.id ==='complete-order-btn' && priceTotal !== 0){
        paymentModal.style.display = 'block'
    } 
})

paymentForm.addEventListener("submit", function(e){
    e.preventDefault()
    paymentModal.style.display = 'none'
    validateOrder()
})

let orderedItems = []
let priceTotal = 0

function addItemsToOrder(itemId) {

    menuArray.filter((item)=>{
        if(item.id === parseInt(itemId)) {
            orderedItems.push({
                name: item.name,
                price: item.price,
                id: item.id
            })
            priceTotal += item.price
        }
    })

}

function removeItemfromOrder(itemId){

    for(let i=0; i<orderedItems.length; i++){
        if(orderedItems[i].id === parseInt(itemId)){
            priceTotal -= orderedItems[i].price
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
    
    orderedItems.forEach((orderedItem)=>{
        orderHtml +=  `
        <div class='ordered-item-container'>
            <div class='item-remove-container'>
                <p>${orderedItem.name}</p>
                <button class='remove-btn' class='technical' data-remove-item='${orderedItem.id}'>Remove</button>
            </div>
            <div>
            <p>${orderedItem.price}</p>
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


/*

Notes:

Tricky part was making sure the required fields in the form validation weren't overridden by the modal closing. 
Initially I attached the event listener for closing the modal & showing the confirmation message 
to clicking the "pay" button, but then the modal would close even if the required inputs were not filled.
I changed the event listener to attach to the "submit" action instead of the form, and also overrode the default refresh action of the form
so as to show the user the final message for confirming the order.

Also proud of myself for catching & implementing splice instead of the original pop in removeItemfromOrder(), 
because it wasn't removing the correct item in the array

*/