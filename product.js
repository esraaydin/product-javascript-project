
var productList=[];
function getList() {
    $.getJSON("http://localhost:8080/product"), done(function(data){
        console.log(data);
        var items=[];
        $.each(data , function( key,val ){
            
        }
        )}
    )}
    getList();