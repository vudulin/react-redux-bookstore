import { createSelector } from 'reselect'

const getCartState = (state) => state.cart

// Проверяем количество подобных книг в корзине
const parseCart = (cart, {book}) => {
  let count = 0
  cart.books.map((item) => {
    if(book.id == item.id) {
      count = item.count
    }
  })
  return count
}

export const getCartValue = createSelector(
  getCartState,
  (cart) => {
    return cart.books.reduce((count, book) => {
      count += book.count
      return count
    }, 0)
  }
)

export const checkBookInCart = createSelector(
  parseCart,
  (count) => count
)

export const getCartItems = createSelector(
  getCartState,
  ({books}) => {
    return books
    // Так как с бекенда (по условию) не пришла возможность указывать количество однотипных книг
    // купленных юзером, добавляю эту возможность
    // if (books) {
    //   const booksData = books.reduce((data, book) => {
    //     if(!data[book.id]) {
    //       data[book.id] = { ...book, count: 0}
    //     }
    //     data[book.id].count++;
    //     return data;
    //   }, [])

    //   //Фильтр пустых значений массива
    //   return booksData.filter((i) => i !== undefined )
    // }
  }
)

export const getTotalCost = createSelector(
  getCartItems,
  (books) => {
    let sum = 0
    books.map((book) => {
      let bookSum = book.count*book.price
      sum += bookSum
    })
    return sum
  }
)
