import {menuArray} from './data.js'

const menuContainer = document.getElementById('menu-container')
let orderArr = [] 
const checkout = document.getElementById('checkout')
const enterCardDetails = document.getElementById('enter-card-details')
const cardForm = document.getElementById('card-form')
const thankYouSection = document.getElementById('thank-you-section')




//render menu items on screen   
const menuItem = menuArray.map(item => `
    <div class="menu-item">
        <div class="menu-desc">
            <h1 class="menu-img">${item.emoji}</h1>
            <div class="text-desc">
                <h2 class="menu-name">${item.name}</h2>
                <h3>${item.ingredients}</h3>
                <h4 class="price">$${item.price}</h4>
            </div>
        </div>
        <button class="plus-btn" data-id="${item.id}">+</button>
    </div>
    `
).join('')

menuContainer.innerHTML = menuItem


// Building your order array

menuContainer.addEventListener('click', function(e){
    if (e.target.classList.contains('plus-btn')){
        const targetId = Number(e.target.dataset.id)
        const targetItemObj = menuArray.find(item => item.id === targetId)
        
        if (targetItemObj){
            orderArr.push(targetItemObj)
            renderOrder()
            displayOrder()
            thankYouSection.classList.add('hidden')
        }
    }
})

function renderOrder(){
    let orderHtml = ''
    let totalPrice = 0
    
    orderArr.forEach(item => {
        orderHtml +=`
            <div class="flex-container-between">
                <div class="flex-container-gap">
                    <h2>${item.name}</h2>
                    <button class="remove-btn" data-id="${item.id}">remove</button>
                </div>
                <h4 class="item-price">$${item.price}</h4>
            </div>`
        totalPrice += item.price
    })
    
    document.getElementById('added-item').innerHTML = orderHtml
    
    document.getElementById('total-price').textContent = `$${totalPrice}`
}

function displayOrder(){
    if (orderArr.length > 0){
        checkout.classList.remove('hidden')
    } else {
        checkout.classList.add('hidden')
    }
}


// Remove item from order
checkout.addEventListener('click', function(e){
    if (e.target.classList.contains('remove-btn')){
        const targetId = Number(e.target.dataset.id)
        const targetItemObj = orderArr.findIndex(item => item.id === targetId)
        
        if (targetItemObj > -1){
            orderArr.splice(targetItemObj, 1)
            
            renderOrder()
            displayOrder()
        }
    }
})


// Complete Order
document.getElementById('complete-order').addEventListener('click',function(){
    enterCardDetails.classList.remove('hidden')
    
    cardForm.innerHTML = `
        <input id="full-name" class="text-input" type="text" placeholder="Enter your name" required>
        <input class="text-input" type="text" placeholder="Enter card number" required>
        <input class="text-input" type="text" placeholder="Enter CVV" required>
        <input class="btn" id="pay-btn" type="submit" value="Submit">
    `
})

document.getElementById('close-card-details').addEventListener('click', function(){
    enterCardDetails.classList.add('hidden') 
})


cardForm.addEventListener('submit',function(e){
        const nameInput = document.getElementById('full-name').value
        e.preventDefault()
        thankYouSection.classList.remove('hidden')
    
        thankYouSection.textContent = ''
        
        const thankYouMessage = document.createElement('h1')
        thankYouMessage.id = 'thank-you-message'
        
        thankYouMessage.textContent = `
        Thanks, ${nameInput}! Your order is on its way!`
        
        thankYouSection.appendChild(thankYouMessage)
        
        enterCardDetails.classList.add('hidden')
        checkout.classList.add('hidden')
        orderArr = []
})


