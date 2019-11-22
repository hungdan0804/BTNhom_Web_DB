module.exports = {
    Category: function (category) {
        var category = {
            id: category.category_id,
            name: category.name,
            description: category.description,
        }
        return category;
    }
}