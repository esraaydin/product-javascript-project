let orderList = [];

function getList() {
    $.getJSON("http://localhost:8080/productOrder/").done(function (data) {
        console.log(data);
        let items = '';
        orderList = data;
        $.each(orderList, function (key, val) {
            items += "<tr>"
            items += "<td>" + val.productOrderId + "</td>"
            items += "<td>" + val.code + "</td>"
            items += "<td>" + val.amount + "</td>"
            items += "<td>" + val.totalPrice + "</td>"
            items += "<td>" + val.delivertDate + "</td>"
            items += "<td>" + val.orderDate + "</td>"
            items += "<td>" + val.product + "</td>"
            items += "<td> <button type = 'button' class = 'btn btn-danger' onclick = 'deleteList(" + val.productOrderId + ")'> DELETE </button> &nbsp; <button type='button' class='btn btn-success' onclick='onRowClick(" + key + ")'> EDIT </button> </td>"
            items += "</tr>"
        })
        $('#orderTable').html(items)
    });
}
getList()

function addList() {
    var productOrder = {
        id: $("#productOrderId").val(),
        code: $("#code").val(),
        amount: $("#amount").val(),
        totalPrice: $("#totalPrice").val(),
        delivertDate: $("#deliveryDate").val(),
        orderDate: $("#orderDate").val(),
        product: {
            id: $("#product").val()
        }
    }
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/productOrder/",
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
        id: $("#productOrderId").val(),
        code: $("#code").val(),
        amount: $("#amount").val(),
        totalPrice: $("#totalPrice").val(),
        delivertDate: $("#deliveryDate").val(),
        orderDate: $("#orderDate").val(),
        product: $("#orderProduct").val(),
    }
    $.ajax({
        url: "http://localhost:8080/productOrder/" + productOrder.id,
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
        url: "http://localhost:8080/productOrder/" + productOrder.productOrderId,
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
    $("#productOrderId").val(orderList[index].id)
    $("#code").val(orderList[index].code)
    $("#amount").val(orderList[index].amount)
    $("#totalPrice").val(orderList[index].totalPrice)
    $("#deliveryDate").val(orderList[index].delivertDate)
    $("#orderDate").val(orderList[index].orderDate)
    $("#orderProduct").val(orderList[index].product)
}

function emptyForm() {
    $("#productOrderId").val("");
    $("#code").val("");
    $("#amount").val("");
    $("#totalPrice").val("");
    $("#deliveryDate").val("");
    $("#orderDate").val("");
    $("#orderProduct").val("");
}