$('.export').on('click', function(e){
  var selected_rows_index = [];
  var headerRow = document.getElementById('header');
  var headerHTML = headerRow.innerHTML;
    var items = document.getElementsByName('acs');
    for (var i = 0; i < items.length; i++) {
      if (items[i].checked){
        selected_rows_index.push(i);
      }
    }
    var temp=headerHTML;
    var rowsArr = document.getElementsByName('row');

    for (var i=0; i< selected_rows_index.length; i++){
      var x = (rowsArr[selected_rows_index[i]]);
      temp = temp.concat(x.innerHTML);
      console.log(temp);
    }
    if (temp != headerHTML) {
        data = temp.replace(/<th>/g, '')
                   .replace(/<\/th>/g, ',')
                   .replace(/<input type="checkbox" id="selectAll" onclick="selectOrUnselectAll\(\)">/g, '')
                   .replace(/<td>/g, '')
                   .replace(/<\/td>/g, ',')
                   .replace(/<input type="checkbox" name="acs" onclick="checkSelectAll\(\)">/g, '\r\n')
                   .replace(/\t/g, '')
                   .replace(/\n/g, '');
//     alert(data);
       
       var mylink = document.createElement('a');
       mylink.download = "csvname.csv";
       mylink.href = "data:application/csv," + escape(data);
       mylink.click();
     } else {alert("Please select relevant rows or click select all to download.")}
});
