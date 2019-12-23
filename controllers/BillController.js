let models = require('../models/models');
let utils = require('../utils/utils');

exports.BillManager = (req, res, next) => {
	if (req.user == undefined || req.user == null)
        res.redirect('/user/login');
    let user_id = req.user.user_id;
    models.Bill.GetByCustomer(user_id).then(dataTable => {
        dataTable.forEach(n=> {
            n.status = utils.GetStatusBadge(n.status);
            n.total_price = utils.FormatMoney(n.total_price);
            n.created_date = utils.FormatDate(n.created_date);
        });
        res.render('bill_manager', {bills: dataTable});
    });
};
exports.Bill = (req, res, next) => {
	if (req.user == undefined || req.user == null)
        res.redirect('/user/login');
	let user_id = req.user.user_id;
    let id = req.query.id;
    let billQueryResult;
    models.Bill.findByIdWithCustomerName(id).then(data => {
        data.status = utils.GetStatusBadge(data.status);
        data.total_price = utils.FormatMoney(data.total_price);
        data.created_date = utils.FormatDate(data.created_date);
        billQueryResult = data;
        return models.BillDetail.findByBillIdWithProductName(billQueryResult.bill_id);
    }).then(dataTable => {
        res.render('bill', {bill: billQueryResult, details: dataTable});
    });
};