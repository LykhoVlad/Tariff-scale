let tariff = [
    {
        "bank": "one",
        "body_pay": "0",
        "mounth_pay": "50",
        "percent": "0",
        "period": "3",
        "period_prefix": "=",
        "type": "installment"
    },
    {
        "bank": "one",
        "body_pay": "0",
        "mounth_pay": "100",
        "percent": "0",
        "period": "5",
        "period_prefix": "-",
        "type": "installment"
    },
    {
        "bank": "one",
        "body_pay": "0",
        "mounth_pay": "120",
        "percent": "0",
        "period": "8",
        "period_prefix": "-",
        "type": "installment"
    },
    {
        "bank": "two",
        "body_pay": "0",
        "mounth_pay": "50",
        "percent": "10",
        "period": "5",
        "period_prefix": "-",
        "type": "installment"
    }, 
    {
        "bank": "two",
        "body_pay": "0",
        "mounth_pay": "20",
        "percent": "0",
        "period": "6",
        "period_prefix": "=",
        "type": "installment"
    },
    {
        "bank": "one",
        "body_pay": "140",
        "mounth_pay": "0",
        "percent": "100",
        "period": "4",
        "period_prefix": "=",
        "type": "credit"
    },
    {
        "bank": "one",
        "body_pay": "150",
        "mounth_pay": "0",
        "percent": "15",
        "period": "5",
        "period_prefix": "-",
        "type": "credit"
    }
  ];
  
const banks = {
  "one": 2,
  "two": 3
}; 

let types = [];

function start(month){
    $.each(tariff, function(key, value){
        if(!types.includes(value.type)){
            types.push(value.type)
        }
    })
    $('.tariff-res').remove();
    $.each(banks, function(key, value){
        findTariff(month,key);
    })
}

function findTariff(month,bank){
    for(let i=month; i>=banks[bank]; i-- ){ 
        $.each(types, function(key, type){
        let currentMonth = tariff.filter(item=>+item.period===i && item.bank===bank && item.type === type);
        if(!currentMonth.length){
            currentMonth = tariff.filter(item=>+item.period>i && item.period_prefix==="-" && item.bank===bank && item.type === type);
            let min = Math.min.apply(Math, currentMonth.map(function(o) { return +o.period; }))
            currentMonth = tariff.filter(item=>+item.period===min && item.bank===bank && item.type === type);
        }
        render(currentMonth,i);
        })
    }
}

function render(tariffs,month){
    $.each(tariffs, function(key, value){
        let row = '<tr class="tariff-res"><td>'+value.bank+'</td><td>'+value.type+'</td><td>'+month+'</td><td>'+value.body_pay+'</td><td>'+value.mounth_pay+'</td><td>'+value.percent+'</td></tr>';
        $(row).appendTo('#tariff-scale');
        console.log(value);
    })   
}

$(document).ready(function(){
    $('#period_time').on('input',function(){
        start(+this.value);
    })
})