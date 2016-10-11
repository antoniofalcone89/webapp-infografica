/**
 * Created by Antonio on 21/09/16.
 */

function setImg(){
    var ext = ".png";
    var fullImg = img.concat(ext);
    //alert(fullImg);
    if(squadra == 1){
        $('#sortable1').append('<li class="ui-state-default"><img src='+fullImg+' /></li>');
    }
    else if(squadra == 2){
        $('#sortable2').append('<li class="ui-state-default"><img src='+fullImg+' /></li>');
    }

}

function setImg2(){
    var fullImg = "disposizione.png";
    //alert(fullImg);
    if(squadra == 1){
        $('#sortable1').append('<li class="ui-state-default"><img src='+fullImg+' /></li>');
    }
    else if(squadra == 2){
        $('#sortable2').append('<li class="ui-state-default"><img src='+fullImg+' /></li>');
    }

}

var img;

function myAjax (nomefile) {
    var testo = nomefile;
    estensione = nomefile.split('.').pop().toLowerCase();
    if(estensione == "csv"){
        $.ajax( { type : 'POST',
            data : {testo},
            url  : 'action.php',              // <=== CALL THE PHP FUNCTION HERE.
            success: function ( data ) {
                img = testo.slice(0, -4);
                //alert( data );               // <=== VALUE RETURNED FROM FUNCTION.
            },
            error: function (xhr, status, error) {
                // executed if something went wrong during call
                if (xhr.status > 0) alert('got error: ' + status); // status 0 - when load is interrupted
            },
            complete: function (data) {
                setImg();
                $('.waiting').hide();
            },
            beforeSend:function(){
                $('.waiting').show();
            }
        });
    }
    else{
        alert("Richiesto un file di tipo csv");
    }

}


//INFOGRAFICA DISPOSIZIONE IN CAMPO
function disposizione(filenames, numfiles) {
    var nomifiles = filenames;
    var allcsv = 0;
    $.each(filenames,function(index) {
        estensione = filenames[index].split('.').pop().toLowerCase();
        if(estensione == "csv"){
            allcsv = 0;
        }
        else{
            allcsv = 1;
        }
    });
    if(allcsv == 1){
        alert("Tutti i file devono essere di tipo .csv");
    }
    else{
        $.ajax( { type : 'POST',
            data : {arrayFiles: nomifiles},
            url  : 'actionDisposizione.php',              // <=== CALL THE PHP FUNCTION HERE.
            success: function ( data ) {
                //alert( data );               // <=== VALUE RETURNED FROM FUNCTION.
            },
            error: function (xhr, status, error) {
                // executed if something went wrong during call
                if (xhr.status > 0) alert('got error: ' + status); // status 0 - when load is interrupted
            },
            complete: function (data) {
                setImg2();
                $('.waiting').hide();
            },
            beforeSend:function(){
                $('.waiting').show();
            }
        });
    }
}

function removeCanvas(){
    $(".modal-body").empty();
}

function removeContent() {
    $('#contenuto').empty();
    $('#contenuto').append('<ul id="sortable"> </ul>');
}

function removeSquadra1() {
    $('#contenuto1').empty();
    $('#contenuto1').append('<ul id="sortable1"> </ul>');
}

function removeSquadra2() {
    $('#contenuto2').empty();
    $('#contenuto2').append('<ul id="sortable2"> </ul>');
}

var squadra = 1;

function mostraBottoniSquadra2() {
    $('#bottoni_squadra1').hide();
    $('#bottoni_squadra2').show();
    squadra = 2;
}

function mostraBottoniSquadra1() {
    $('#bottoni_squadra2').hide();
    $('#bottoni_squadra1').show();
    squadra = 1;
}

function captureCurrentDiv()
{
    html2canvas([document.getElementById('contenitore')], {
        onrendered: function(canvas)
        {
            var img = canvas.toDataURL()
            $.post("save.php", {data: img}, function (file) {
                window.location.href =  "download.php?path="+ file});
        }
    });
}

function captureSinglePlayer()
{
    html2canvas([document.getElementById('contenuto1')], {
        onrendered: function(canvas)
        {
            var img = canvas.toDataURL()
            $.post("save.php", {data: img}, function (file) {
                window.location.href =  "download.php?path="+ file});
        }
    });
}

function setTitle(){
    //var titolo = document.getElementById('title').value;
    if(squadra == 1){
        var title = $('#title').val();
        $('#sortable1').prepend('<li class="ui-state-default"><h1>'+title+'</h1></li>');
        $('#title').val('');
        $('#sortable1').css('cursor', 'default');
    }
    else if(squadra == 2){
        var title = $('#title2').val();
        $('#sortable2').prepend('<li class="ui-state-default"><h1>'+title+'</h1></li>');
        $('#title').val('');
        $('#sortable2').css('cursor', 'default');
    }
}

function setText(){
    var testo = document.getElementById('text').value;


    if(squadra == 1){
        $('#sortable1').prepend('<li class="ui-state-default"><h4>'+testo+'</h4></li>');
        $('#text').val('');
        $('#sortable1').css('cursor', 'default');
    }
    else if(squadra == 2){
        $('#sortable2').prepend('<li class="ui-state-default"><h4>'+testo+'</h4></li>');
        $('#text').val('');
        $('#sortable2').css('cursor', 'default');
    }
}

//PER AGGIUNGERE BOTTONI HEATMAP
var x = 1; //initlal text box count
function addElements(){
    var max_fields      = 10; //maximum input boxes allowed
    var wrapper         = $(".col-md-4"); //Fields wrapper

    if(squadra == 1){
        if(x < max_fields){ //max input box allowed
            x++;
            $('#firstimg1').after('<div class="gruppoinput1"><p class="lead" style="margin-bottom: 0;">Heatmap</p><label class="btn btn-default btn-info" style="margin-top: 8px">Browse <input type="file" style="display: none;" class="inputfile"/> </label> <button type="button" class="btn btn-outline-danger" disabled="disabled">Ok</button> <span id="remove_field" class="glyphicon glyphicon-remove" aria-hidden="true" style="vertical-align: middle"></span> </div>');
        }


        $(wrapper).on("click","#remove_field", function(){ //user click on remove text
            $(this).parent('div').remove(); x--;
        })
    }
    else if(squadra == 2){
        if(x < max_fields){ //max input box allowed
            x++;
            $('#firstimg2').after('<div class="gruppoinput2"><p class="lead" style="margin-bottom: 0;">Heatmap</p><label class="btn btn-default btn-info" style="margin-top: 8px">Browse <input type="file" style="display: none;" class="inputfile"/> </label> <button type="button" class="btn btn-outline-danger" disabled="disabled">Ok</button> <span id="remove_field" class="glyphicon glyphicon-remove" aria-hidden="true" style="vertical-align: middle"></span> </div>');
        }


        $(wrapper).on("click","#remove_field", function(){ //user click on remove text
            $(this).parent('div').remove(); x--;
        })
    }
}

//PER AGGIUNGERE ELEMENTI TESTO
var y = 1; //initlal text box count
function addText(){
    var max_fieldsY      = 10; //maximum input boxes allowed
    var wrapperY         = $(".col-md-4"); //Fields wrapper

    if(squadra == 1){
        if(x < max_fieldsY){ //max input box allowed
            y++;
            $('#firstInput1').after('<form class="form-inline" id="firstInput" style="margin-top: 8px;"><div class="form-group"><input type="text" class="form-control" id="text" placeholder="Testo"></div> <button type="button" class="btn btn-primary" id="inserisciTitolo" onclick="setText(text.value)">Ok</button> <span id="remove_text_field" class="glyphicon glyphicon-remove" aria-hidden="true" style="vertical-align: middle"></span> </form>');
        }

        $(wrapperY).on("click","#remove_text_field", function(){ //user click on remove text
            $(this).parent('form').remove(); y--;
        })
    }
    else if(squadra == 2){
        if(x < max_fieldsY){ //max input box allowed
            y++;
            $('#firstInput2').after('<form class="form-inline" id="firstInput" style="margin-top: 8px;"><div class="form-group"><input type="text" class="form-control" id="text" placeholder="Testo"></div> <button type="button" class="btn btn-primary" id="inserisciTitolo" onclick="setText(text.value)">Ok</button> <span id="remove_text_field" class="glyphicon glyphicon-remove" aria-hidden="true" style="vertical-align: middle"></span> </form>');
        }

        $(wrapperY).on("click","#remove_text_field", function(){ //user click on remove text
            $(this).parent('form').remove(); y--;
        })
    }

}
