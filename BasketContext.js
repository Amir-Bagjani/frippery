import { useState, createContext, useEffect, useReducer } from "react";

export const BasketContext = createContext();

const basketReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];

    case "DELETE":
      return state.filter((item) => item.id !== action.payload.id);

    case 'INC_ITEM':
      return [...state].map((item) => {
        if(item.id.toString() === action.payload.toString()){
         return{...item, count: item.count + 1 }
        }
        return item
      })

    case 'DEC_ITEM':
      return [...state].map((item) => {
        if(item.id.toString() === action.payload.toString()){
          return{...item, count: item.count - 1}
        }
        return item
      }).filter(item => item.count !== 0)


    default:
      return state;
  }
};

const BasketContextProvider = ({ children }) => {
  const [basket, dispatch] = useReducer(basketReducer, [], () => {
    const localCart = localStorage.getItem(`cart`)
    return localCart ? JSON.parse(localCart) : []
  });
  const [sum, setSum] = useState(0);

  useEffect(() => {
    setSum(0)
    let su =0;
    if (basket.length > 0) {
      // let su = basket.map((item) => item.price * item.count).reduce((a, c) => a + c);
      basket.forEach(item => (su += item.count * item.price));
      setSum(su);
    }
  }, [basket]);

  useEffect(() => {
    localStorage.setItem(`cart`,JSON.stringify(basket))
  },[basket])

  return (
    <BasketContext.Provider value={{ basket, dispatch, sum }}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;
