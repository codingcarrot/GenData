

//field1 ids
// var dis1id = document.getElementById("field1id");
// var dis1regionlw = document.getElementById("field1lwregion");
// var dis1regionup = document.getElementById("field1upregion");
//field2 ids
var dis2id = document.getElementById("field2id");
// var dis2pos = document.getElementById("field2position");
// var dis2range = document.getElementById("field2range");
var dis2downstream = document.getElementById("lower");
var dis2upstream = document.getElementById("upper");
//initial setup
// dis1id.disabled = false;
// dis1regionlw.disabled = false;
// dis1regionup.disabled = false;
dis2id.disabled = false;
// dis2pos.disabled = false;
// dis2range.disabled = false;
dis2downstream.disabled = false;
dis2upstream.disabled = false;

// document.addEventListener("DOMContentLoaded", function(event) { 
    
    
    //if some value is entered in field 1 then field 2 is diabled
    
    dis2id.onchange = function(){
        if (this.value.length > 0){
            dis2downstream.disabled = true;
            dis2upstream.disabled = true;
        }   else if (this.value.length == 0){
                    //enable field 2 if field 1 is completely empty
                    dis2downstream.disabled = false;
                    dis2upstream.disabled = false;  
            }
    }
    // dis1regionlw.onchange = function(){
    //     if (this.value.length > 0 && dis1id.value.length == 0 && dis1regionup.value.length == 0){
    //         dis2id.disabled = true;
    //         dis2pos.disabled = true;
    //         dis2range.disabled = true;
    //         dis2downstream.disabled = true;
    //         dis2upstream.disabled = true;
    //     }   else if (this.value.length == 0 && dis1id.value.length == 0 && dis1regionup.value.length == 0){
    //                 dis2id.disabled = false;
    //                 dis2pos.disabled = false;
    //                 dis2range.disabled = false; 
    //                 dis2downstream.disabled = false;
    //                 dis2upstream.disabled = false;
    //         }
    // }
    // dis1regionup.onchange = function(){
    //     if (this.value.length > 0 && dis1id.value.length == 0 && dis1regionlw.value.length == 0){
    //         dis2id.disabled = true;
    //         dis2pos.disabled = true;
    //         dis2range.disabled = true;
    //         dis2downstream.disabled = true;
    //         dis2upstream.disabled = true;
    //     }   else if (this.value.length == 0 && dis1id.value.length == 0 && dis1regionlw.value.length == 0){
    //                 dis2id.disabled = false;
    //                 dis2pos.disabled = false;
    //                 dis2range.disabled = false; 
    //                 dis2downstream.disabled = false;
    //                 dis2upstream.disabled = false;
    //         }
    // }


    //if some value is entered in field 2 then field 1 is diabled
    
    
    // dis2id.onchange = function(){
    //     if (this.value.length > 0 && dis2pos.value.length == 0 && dis2range.value.length == 0){
    //         //disable field 1
    //         dis1id.disabled = true;
    //         dis1regionlw.disabled = true;
    //         dis1regionup.disabled = true;
    //     }   else if (this.value.length == 0 && dis2pos.value.length == 0 && dis2range.value.length == 0){
    //             //enable field 1
    //             dis1id.disabled = false;
    //             dis1regionlw.disabled = false;
    //             dis1regionup.disabled = false;
    //         }
    // }
    dis2upstream.onchange = function(){
        if (this.value.length > 0 && dis2downstream.value.length == 0){
            //disable field 1
            dis2id.disabled = true;
        }   else if (this.value.length == 0 && dis2downstream.value.length == 0){
                //enable field 1
                dis2id.disabled = false;
            }
    }
    dis2downstream.onchange = function(){
        if (this.value.length > 0 && dis2upstream.value.length == 0){
            //disable field 1
           dis2id.disabled = true;
        }   else if (this.value.length == 0 && dis2upstream.value.length == 0){
                //enable field 1
                dis2id.disabled = false;
            }
    }
// });
