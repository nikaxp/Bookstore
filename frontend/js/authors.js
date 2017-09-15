$(function() {
    
    /*** Dodanie nowego autora ***/
    
    function addAuthor() {
        var form = $("#authorAdd");
        
        form.on( 'submit', function(e) {
            e.preventDefault();
            
            var name = $(this).find("#name");
            var surname = $(this).find("#surname");
            
            if( name.val().length === 0 || surname.val().length === 0 ) {
                showModal( "Co najmniej jedno pole jest puste" );
                return false;
            }
            
            // AJAX
            $.ajax({
                url: '/rest/rest.php/author',
                method: 'POST',
                dataType: 'json',
                data: form.serialize()
            }).done( function (result) {
                createAuthor(result.success[0]);
                
            });
        });
    }
    
    addAuthor();
    
  
    
    /*** Stworzenie autora ***/
    
    function createAuthor( author ) {
        
        var authorElement = $('<li class="list-group-item">');
        var panel = $('<div class="panel panel-default">');
        var heading = $('<div class="panel-heading">');
        var authorTitle = $('<span class="authorTitle">');
        var remove = $('<button class="btn btn-danger pull-right btn-xs btn-author-remove"><i class="fa fa-trash"></i></button>');
        
        var select = $("#authorEditSelect");
        var option = $('<option value="'+ author.id + '"></option>');
        option.text(author.name + ' ' + author.surname);
        select.append(option);
        
        authorElement.append( panel );
        panel.append( heading );
        
        authorTitle.text( author.name + ' ' + author.surname );
        heading.append( authorTitle );
        heading.append( remove );
        
        remove.attr('data-id', author.id);
        
        $("#authorsList").append( authorElement);
        
    }
    
    /*** wyświetlenie wszystkich autorów ***/
    
    function getAllAuthors() {
        
        $.ajax({
                url: '/rest/rest.php/author',
                method: 'GET',
                dataType: 'json',
                
            }).done( function (result) {
                for( var i =0; i < result.success.length; i++) {
                createAuthor(result.success[i]);
                }
            });
        
    }

    /*** usuwanie autora ***/
    
    function delAuthor() {
        
        
        $(document).on('click', ".btn-author-remove", function(e) {

            var id = $(this).attr("data-id");
            var divDesc = $(this).closest('li');
        
            $.ajax({
                    url: '/rest/rest.php/author/'+ id,
                    method: 'DELETE',
                    dataType: 'json',

                }).done( function (result) {
                    divDesc.remove();
                });

            });
        
    }
    delAuthor();
    
    
    /*** edycja autora ***/
    
    function chooseAuthorToEdit() {
        
        $(document).on('change', "#authorEditSelect", function(e) {
            
            $("#authorEdit").show(); // pokaz formularz edycji
                
        });
    }
    
    chooseAuthorToEdit();
    
    function editAuthor() {
        $(document).on('submit', "#authorEdit", function(e) {
            e.preventDefault();
            var id = $("#authorEditSelect").val(); // val zwroci id 
            var name = $('body #name').eq(1).val();
            var surname = $('body #surname').eq(1).val();
            console.log(name, surname);
            var newAuthor = {
                name: name,
                surname: surname
            };
            
             // AJAX
            $.ajax({
                url: '../rest/rest.php/author/'+id,
                method: 'PATCH',
                dataType: 'json',
                data: newAuthor
            }).done( function (result) {
                
                
            });
        
        
           $("#authorEdit").hide(); 
        });

    }
    editAuthor();
    getAllAuthors();
    
   
    
});