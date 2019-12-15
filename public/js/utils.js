function FormatMoney(money_amount) {
    return (money_amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace('.00','');
}