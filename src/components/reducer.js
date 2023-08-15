export const initialState = {
    basket: [],
    user:null,
    
};

export const getBaskeTotal  = (basket) => {
    let total_price = 0;
    
    for (const item of basket) {
      if (item.price) {
        total_price += item.price;
      }
    }
    return total_price;
  };


const reducer = (state , action)=>{
    
    switch(action.type){
        case 'ADD_TO_BASKET':
            return{
                ...state,
                 basket : [...state.basket, action.item],

            };

          case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
              (basketItem) => basketItem.id === action.id
            );
            let newBasket = [...state.basket];
            console.log(index)
            if(index >= 0){
              newBasket.splice(index,1);
            }else{
              console.warn(
                `Can't Remove product (id : ${action.id} as it is not in the basket!`,
              )
              console.log(state.basket)
            }
            return{
              ...state,
              basket:newBasket 
            }

          case 'SET_USER':
            return{
              ...state,
              user:action.user
            }

        default :
            return state;   
    }
}


export default reducer;



