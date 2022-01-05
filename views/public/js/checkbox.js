function selectAll() {

    var items = document.getElementsByName('acs');
    var tds = document.getElementsByTagName('td');
    
    for (var i = 0; i < items.length; i++) {
        if (items[i].type == 'checkbox')
            items[i].checked = true;    
    }
    for (var j = 0; j < tds.length; j++) {
            tds[j].classList.add('selected');
        }

}

function UnSelectAll() {
    var items = document.getElementsByName('acs');
	var tds = document.getElementsByTagName('td');
    for (var i = 0; i < items.length; i++) {
        if (items[i].type == 'checkbox')
            items[i].checked = false;
    }
    for (var j = 0; j < tds.length; j++) {
            tds[j].classList.remove('selected');
    }
}

function selectOrUnselectAll() {

	var x = document.getElementById('selectAll');   
	if (x.checked){ selectAll(); }
	else { UnSelectAll();}
}	

function checkSelectAll(){
	var items = document.getElementsByName('acs');
	var nofalse = true;
	var trRows = document.getElementsByTagName('tr');
    var tds = document.getElementsByTagName('td');
	//if any checkbox is unselected, uncheck select all checkbox, unhighlight row 
	for (var i = 0; i < items.length; i++) {
        if (items[i].type == 'checkbox' & !items[i].checked){
        	document.getElementById('selectAll').checked = false;
            for(var j = 0; j < tds.length; j++){
                if(j%items.length == i)
                    tds[j].classList.remove('selected');
                }
        	}
    }
    //highlight selected row
    for (var i = 0; i < items.length; i++) {
        if (items[i].type == 'checkbox' & items[i].checked){
            for(var j=0; j< tds.length; j++){
                if(j%items.length == i)
                    tds[j].classList.add('selected');
            }
        }
    }
	//if all checkboxes are selected, check select all checkbox
	for (var i = 0; i < items.length; i++) {
		 if (items[i].type == 'checkbox' & !items[i].checked){		
        	nofalse = false;}}
        if (nofalse) 
        document.getElementById('selectAll').checked = true;
    nofalse = true;	  
}	
