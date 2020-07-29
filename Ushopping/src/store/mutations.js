export default{
    addCart(state,obj){
        let idx = state.cartGoods.findIndex(item => item.id == obj.id);
        if(idx>=0){
            state.cartGoods[idx].num++;
        }else{
            state.cartGoods.push(obj);
        }
    },
    addNum(state,id){
        let idx = state.cartGoods.findIndex( item => item.id == id);
        if(state.cartGoods[idx].num <= 99){
            state.cartGoods[idx].num++;
        }else{
            state.cartGoods[idx].num = 99;
        }
    },
    delNum(state,id){
        let idx = state.cartGoods.findIndex( item => item.id == id);
        if(state.cartGoods[idx].num >1){
            state.cartGoods[idx].num--;
        }else{
            state.cartGoods[idx].num = 1;
        }
    },
    delgood(state,id){
        let idx = state.cartGoods.findIndex( item => item.id == id);
        state.cartGoods.splice(idx,1);
    }
}