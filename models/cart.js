module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function (item, id) {
        let arrItem = this.items[id];
        if (!arrItem) {
            arrItem = this.items[id] = {
                item: item,
                qty: 0,
                price: 0
            }
        }
        arrItem.qty++;
        arrItem.price = arrItem.item.price * arrItem.qty;

        this.totalPrice += arrItem.item.price;
        this.totalQty++;
    }

    this.generateArray = function(){
        let arr = [];
        for(let id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    }
}