$(function() {
    
    /*** Dodanie książki ***/
    
    function addBook() {
        var form = $("#bookAdd");
        
        form.on( 'submit', function(e) {
            e.preventDefault();
            
            var title = $(this).find("#title");
            var description = $(this).find("#description");
            
            if( title.val().length === 0 || description.val().length === 0 ) {
                showModal( "Co najmniej jedno pole jest puste" );
                return false;
            }
            
            // AJAX
            $.ajax({
                url: '/rest/rest.php/book',
                method: 'POST',
                dataType: 'json',
                data: form.serialize()
            }).done( function (result) {
                createBookElement(result.success[0]);
                
            });
        });
    }
    
    addBook();
    
    
    
    /*** Stworzenie elementu książki ***/
    
    function createBookElement( book ) {
        
        var bookElement = $('<li class="list-group-item">');
        var panel = $('<div class="panel panel-default">');
        var heading = $('<div class="panel-heading">');
        var bookTitle = $('<span class="bookTitle">');
        var remove = $('<button class="btn btn-danger pull-right btn-xs btn-book-remove"><i class="fa fa-trash"></i></button>');
        var showDescription = $('<button class="btn btn-primary pull-right btn-xs btn-book-show-description"><i class="fa fa-info-circle"></i></button>');
        var description = $('<div class="panel-body book-description"></div>');
        
        var select = $("#bookEditSelect");
        var option = $('<option value="'+ book.id + '"></option>');
        option.text(book.title);
        select.append(option);
        
        bookElement.append( panel );
        panel.append( heading );
        
        bookTitle.text( book.title );
        heading.append( bookTitle );
        heading.append( remove );
        heading.append( showDescription );
        
        remove.attr('data-id', book.id);
        showDescription.attr('data-id', book.id);
        
        panel.append( description );
        
        $("#booksList").append( bookElement);
        
        
    }
    
    /*** wyświetlenie wszystkich książek ***/
    
    function getAllBooks() {
        
        $.ajax({
                url: '/rest/rest.php/book',
                method: 'GET',
                dataType: 'json',
                
            }).done( function (result) {
                for( var i =0; i < result.success.length; i++) {
                createBookElement(result.success[i]);
                }
            });
        
    }
    //getAllBooks();
    
    
    /*** wyświetlenie opisu książki ***/
    
    function showDescription() {
        
        
        $(document).on('click', ".btn-book-show-description", function(e) {

            var id = $(this).attr("data-id");
            var divDesc = $(this).parent().siblings(".book-description");
        
            $.ajax({
                    url: '/rest/rest.php/book/'+ id,
                    method: 'GET',
                    dataType: 'json',

                }).done( function (result) {
                    result.success[0].description;
                    divDesc.text(result.success[0].description).show();
                    console.log(result);

                });

            });
        
    }
    showDescription();
    
    
    /*** usuwanie książki ***/
    
    function delBook() {
        
        
        $(document).on('click', ".btn-book-remove", function(e) {

            var id = $(this).attr("data-id");
            var divDesc = $(this).closest('li');
        
            $.ajax({
                    url: '/rest/rest.php/book/'+ id,
                    method: 'DELETE',
                    dataType: 'json',

                }).done( function (result) {
                    divDesc.remove();
                });

            });
        
    }
    delBook();
    
    
    /*** edycja książki ***/
    
    function chooseToEdit() {
        
        $(document).on('change', "#bookEditSelect", function(e) {
            
            $("#bookEdit").show(); // pokaz formularz edycji
                
        });
    }
    
    chooseToEdit();
    
    function editBook() {
        $(document).on('submit', "#bookEdit", function(e) {
            e.preventDefault();
            var id = $("#bookEditSelect").val(); // val zwroci id ksiazki
            var title = $('body #title').eq(1).val();
            var description = $('body #description').eq(1).val();
            
            var newBook = {
                title: title,
                description: description
            };
            
             // AJAX
            $.ajax({
                url: '../rest/rest.php/book/'+id,
                method: 'PATCH',
                dataType: 'json',
                data: newBook
            }).done( function (result) {
                
                
            });
        
        
           $("#bookEdit").hide(); 
        });

    }
    editBook();
    getAllBooks();
    
   
    
});