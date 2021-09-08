let orderList = [];

function getList() {
    $.getJSON("http://localhost:8080/product").done(function (data) {
        console.log(data);
        let items = '';
        orderList = data;

        $.each(orderList, function (key, val) {
            items += "<tr>"
            items += "<td>" + val.id + "</td>"
            items += "<td>" + val.code + "</td>"
            items += "<td>" + val.amount + "</td>"
            items += "<td>" + val.totalPrice + "</td>"
            items += "<td>" + val.delivertDate + "</td>"
            items += "<td>" + val.orderDate + "</td>"
            items += "<td>" + val.product + "</td>"
            items += "<td> <button type = 'button' class = 'btn btn-danger' onclick = 'deleteList(" + val.id + ")'> DELETE </button> &nbsp; <button type='button' class='btn btn-success' onclick='onRowClick(" + key + ")'> EDIT </button> </td>"
            items += "</tr>"
        })
        $('#orderTable').html(items)
    });
}
getList()

function addList() {
    var productOrder = {
        id: $("#orderID").val(),
        code: $("#ordercode").val(),
        amount: $("#orderAmount").val(),
        totalPrice: $("#orderTotalPrice").val(),
        delivertDate: $("#orderDeliveryDate").val(),
        orderDate: $("#orderOrderDate").val(),
        product: $("#orderProduct").val(),
    }

    $.ajax({
        url: "http://localhost:8080/product",
        type: "POST",
        dataType: "json",
        data: JSON.stringify(productOrder),
        success: function (result) {
            getList();
            // $('#gpgu0').is(':checked')
        },
        error: function (result) {
            alert('err');
        }
    });
}

function updateList() {
    var productOrder = {
        id: $("#orderID").val(),
        code: $("#ordercode").val(),
        amount: $("#orderAmount").val(),
        totalPrice: $("#orderTotalPrice").val(),
        delivertDate: $("#orderDeliveryDate").val(),
        orderDate: $("#orderOrderDate").val(),
        product: $("#orderProduct").val(),
        
    }

    $.ajax({
        url: "http://localhost:8080/product/" + productOrder.id,
        type: "PUT",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(productOrder),
        dataType: "json",

        success: function (data) {
            getList();
        },

        error: function (err) {
            alert('err');
        },
    });
}

function deleteList(id) {
    var productOrder = {
        productId: id
    }
    $.ajax({

        url: "http://localhost:8080/product/" + productOrder.productOrderId,
        type: "DELETE",
        data: JSON.stringify(productOrder),
        contentType: "application/json; charset=utf-8",

        succes: function () {
            getList();
            emptyForm();
        },
        fail: function () {
            alert("fail")
        }
    })
}

function onRowClick(index) {
    $("#orderId").val(orderList[index].id)
    $("#orderCode").val(orderList[index].code)
    $("#orderAmount").val(orderList[index].amount)
    $("#orderTotalPrice").val(orderList[index].totalPrice)
    $("#orderDeliveryDate").val(orderList[index].delivertDate)
    $("#orderOrderDate").val(orderList[index].orderDate)
    $("#orderProduct").val(orderList[index].product)
}

function emptyForm() {
    $("#orderId").val("");
    $("#orderCode").val("");
    $("#orderAmount").val("");
    $("#orderTotalPrice").val("");
    $("#orderDeliveryDate").val("");
    $("#orderOrderDate").val("");
    $("#orderProduct").val("");
}