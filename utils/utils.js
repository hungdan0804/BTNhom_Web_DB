class Utils {
    static FormatMoney(money_amount) {
        return (money_amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace('.00','');
    }
    static FormatDate(date) {
        return date.getDate() + "/" + date.getMonth() + '/' + date.getFullYear();
    }
    static GetStatusBadge(status) {
        status = status.toString().toUpperCase();
        switch(status) {
            case 'NEW':
                return `<span class="badge badge-success">${status}</span>`;
            case 'COMPLETED':
                return `<span class="badge badge-danger">${status}</span>`;
            default:
                return `<span class="badge badge-primary">${status}</span>`
        }
    }
    static GetUserStatusBadge(is_active) {
        if (is_active != 0)
            return `<span class="badge badge-success">Active</span>`;
        else
            return `<td><span class="badge badge-secondary">Inactive</span></td>`;
    }
    static FormatPhone(phone_number) {
        phone_number = phone_number.replace(/[^0-9]/,'');
        return phone_number.replace(/(\d{4})(\d{3})(\d{3})/, '$1-$2-$3');
    }
}
module.exports = Utils;
