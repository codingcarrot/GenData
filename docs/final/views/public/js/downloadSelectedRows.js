$('#export').on('click', function(e){
  var selected_cols_index = [];
  var headerCol = document.getElementsByTagName('th');
  var headerHTML = []; //header array
  var items = document.getElementsByName('acs');
  for (var i = 0; i < headerCol.length; i++){
    var temp = headerCol.item(i).innerHTML;
    temp = temp.replace('<input type="checkbox" id="selectAll" onclick="selectOrUnselectAll()">&nbsp;&nbsp;','')
    headerHTML.push(temp);
  }

    var items = document.getElementsByName('acs');
    for (var i = 0; i < items.length; i++) {
      if (items[i].checked){
        selected_cols_index.push(i);
      }
    }

    var tds = document.getElementsByTagName('td');

    var temp_data = [];
    var data_row = [];
    var data_exp = '';
    for (var i=0; i< tds.length; i++){
      //for any td's index%items.length is in selected_cols_index
      if ( selected_cols_index.includes(i % items.length )){
        temp_data.push('"' + tds.item(i).innerHTML + '"');
        
        if(i % items.length == Math.max.apply(Math, selected_cols_index)){
          console.log('max index: ' + i);
          data_row.push(temp_data);
          temp_data = [];
        }

      }
    }
    
    for (var j=0; j<headerHTML.length; j++){
      data_exp = data_exp + String(headerHTML[j]) + ',' + String(data_row[j]) + '\n';
    }
    data_exp = data_exp.replace(/<input type="checkbox" name="acs" onclick="checkSelectAll\(\)">&nbsp;&nbsp;/g, '')
                       .replace(/_FILTER/g, 'FILTER')
                       .replace(/_FORMAT/g, 'FORMAT');
    console.log(data_exp);

    if(selected_cols_index == []){
      alert("Please select relevant columns or click select all to download.")
    } else {
      var mylink = document.createElement('a');
      mylink.download = "csvname.csv";
      mylink.href = "data:application/csv," + escape(data_exp);
      mylink.click();
    }
});
