let productList = [];

function getList() {
    $.getJSON("http://localhost:8080/product").done(function (data) {
        console.log(data);
        let items = '';
        productList = data;

        $.each(productList, function (key, val) {
            items += "<tr>"
            items += "<td>" + val.id + "</td>"
            items += "<td>" + val.name + "</td>"
            items += "<td>" + val.code + "</td>"
            items += "<td>" + val.active + "</td>"
            items += "<td>" + val.unitPrice + "</td>"
            items += "<td> <button type='button' class='btn btn-danger' onclick='deleteList(" + val.id + ")'>DELETE</button> &nbsp; <button type='button' class='btn btn-success' onclick='onRowClick(" + key + ")'>EDIT</button></td>"
            items += "</tr>"
        })
        $('#productTable').html(items)
    });
}
getList()

function addList() {
    var product = {
        id: $("#productId").val(),
        name: $("#productName").val(),
        code: $("#productCode").val(),
        unitPrice: $("#productUnitPrice").val(),
        active: $("#productActive").val(),
        //# = id . = class
    }

    $.ajax({
        url: "http://localhost:8080/product/",
        type: "POST",
        data: JSON.stringify(product),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            getList();
            // $('#gpgu0').is(':checked')
        },
        error: function (err) {
            alert('err');
        }
    });
}

function updateList() {
    var product = {
        id: $("#productId").val(),
        name: $("#productName").val(),
        code: $("#productCode").val(),
        unitPrice: $("#productUnitPrice").val(),
        active: $("#productActive").val(':checked'),
    }

    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/product/" + product.id,
        data: JSON.stringify(product),
        contentType: "application/json; charset=utf-8",
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
    var product = {
        productId: id
    }
    $.ajax({
        url: "http://localhost:8080/product/" + product.productId,
        type: "DELETE",
        data: JSON.stringify(product),
        contentType: "application/json; charset=utf-8",
        success: function () {
            getList();
            emptyForm();
        },
        fail: function () {
            alert("fail")
        }
    })

}

function onRowClick(index) {
    $("#productId").val(productList[index].id)
    $("#productName").val(productList[index].name)
    $("#productCode").val(productList[index].code)
    $("#productUnitPrice").val(productList[index].unitPrice)
    $("#productActive").prop('checked', productList[index].active)
}

function emptyForm() {
    $("#productId").val("");
    $('#productName').val("");
    $('#productCode').val("");
    $('#productUnitPrice').val("");
    $('#productActive').val("");
}