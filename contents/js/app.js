$('#search_button').on('click', function (event) {
    var search_input = $('#search_input').val();
    search.search(search_input);
});

$('#talks').on('click', function (event) {
    $('#search_button').text('Talks');
});

$('#playlists').on('click', function (event) {
    $('#search_button').text('Playlists');
});

$('#quotes').on('click', function (event) {
    $('#search_button').text('Quotes');
});

$('#blog_posts').on('click', function (event) {
    $('#search_button').text('Blog Posts');
});

$('a.category').on('click', function (event) {
    $('.nav.navbar-nav').children().each(function() {
        $(this).removeClass('active');
    });
    $(this).parent().addClass('active');
    $('#search_button').text($(this).contents().get(0).nodeValue);
});

$('#nav_talks').on('click', function (event) {
    React.render(
        <TalkList url='https://secret-retreat-5119.herokuapp.com/talks'/>,
        document.getElementById('content')
    )
});

$('#nav_playlists').on('click', function (event) {
    React.render(
        <PlaylistList url='https://secret-retreat-5119.herokuapp.com/playlists'/>,
        document.getElementById('content')
    )
});