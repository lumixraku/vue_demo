import * as types from './mutation-types'

// export const ADD_TO_CART = 'ADD_TO_CART'
// export const CHECKOUT_REQUEST = 'CHECKOUT_REQUEST'
// export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS'
// export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE'
// export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'

//这里只定义了一个action的方法
//commit 是调用mutation中的方法
export const addToCart = ({ commit }, product) => {
  if (product.inventory > 0) {
    commit(types.ADD_TO_CART, {
      id: product.id
    })
  }
}
