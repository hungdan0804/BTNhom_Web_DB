module.exports = {
    Product: function (item) {
        var product = {
            id: item.ID,
            name: item.NAME,
            price: item.PRICE,
            description: item.DESCRIPTION,
            status: item.STATUS,
            category: item.name,
            category_id: item.category_id,
        }
        return product;
    }
}