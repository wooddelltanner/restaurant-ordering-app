import {menuArray} from './data.js'

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
        <button id="plus-btn">+</button>
    </div>
    `
).join('')

document.getElementById('menu-container').innerHTML = menuItem

// render your order when an item is added to order
const plusBtn = document.getElementById('plus-btn')

plusBtn.addEventListener('click', () => {
    console.log('button was clicked')
})

// document.getElementById('checkout').innerHTML = 

// console.log(plusBtn)