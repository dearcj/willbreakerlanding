(function() {
    'use strict';

    var config = {
        selector: '#player',
        albums: $.extend(true, {}, thd.utils.albums)
    };

    var player = $(config.selector),
        details = player.find('.details'),
        trackList = details.find('.tracks ul');

    var genDetails = function(album) {
        var tracks = trackList.html('');
        for (var i = 0; i < album.tracks.length; i++) {
            var addButton = $('<a />', {
                'class': 'add-button',
                'href': '#'
            }).text('Add');

            var track = album.tracks[i],
                elem = $('<li />').append(addButton).append('<strong>' + album.title + '</strong> - ' + track.title);

            track.element = elem;
            elem.data('track', track);

            tracks.append(elem);
        }
    };

    var album = config.albums[0];
    genDetails(album);

    var playerLogic = new thd.utils.player({
        selector: player.find('.audio-player')
    });

    var playlist = new thd.utils.playlist({
        selector: player.find('.playlist'),
        playerLogic: playerLogic
    });

    var playAll = player.find('.tracks-play-all');

    trackList.on('click', '.add-button', function(e) {
        var parent = $(this).parent('li');
        e.preventDefault();

        if (!parent.hasClass('in-playlist')) {
            parent.addClass('in-playlist');
            playlist.addTrack(album, parent.data('track'));
        }
    });

    $(playlist).on('remove', function(e, element) {
        $(element).removeClass('in-playlist');
    });

    playAll.on('click', function(e) {
        e.preventDefault();

        playlist.clear();

        for (var i = 0; i < album.tracks.length; i++) {
            var track = album.tracks[i];
            track.element.addClass('in-playlist');
            playlist.addTrack(album, track);
        }
    });

    player.addClass('ready');
})();