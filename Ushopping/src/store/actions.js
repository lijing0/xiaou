export default {
    addCartSync(content,obj){
        content.commit('addCart',obj);
    },
    addNumSync(content,id){
        content.commit('addNum',id);
    },
    delNumSync(content,id){
        content.commit('delNum',id);
    },
    delgoodSync(content,id){
        content.commit('delgood',id);
    }
}