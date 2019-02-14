thd = window.thd || {};
thd.utils = thd.utils || {};

thd.utils.playlist = function(config) {
    'use strict';

    var self = this;
    var element = $(config.selector);
    var list = element.find('ul').html('').sortable();
    var player = config.playerLogic;

    var trackTemplate = function(albumTitle, title) {
        return $('<li />').append(
            $('<a />', {
                'class': 'play-button',
                'href': '#'
            }).text('Play')
        ).append(
            $('<a />', {
                'class': 'pause-button',
                'href': '#'
            }).text('Pause')
        ).append(
            $('<a />', {
                'class': 'remove-button',
                'href': '#'
            }).text('Remove')
        ).append('<span class="track-title"><strong>' + albumTitle + '</strong> - ' + title + "</span>");
    };

    var playingElement = $('');

    var markPlayed = function(elem) {
        list.find('.active').removeClass('active');
        elem.addClass('active');
    };

    var markPaused = function() {
        list.find('.active').removeClass('active');
    };

    var selectElement = function(elem) {
        list.find('.active').removeClass('active');
        list.find('.selected').removeClass('selected');
        elem.addClass('selected');
        setupPlayer(elem);
    };

    var setupPlayer = function(elem) {
        if (elem.length == 0) {
            player.removeSources();
            return;
        }

        if (!playingElement.is(elem)) {
            playingElement = elem;
            player.setSources(elem.find('.track-title').html(), elem.data('sources'));
        }
    };

    var play = function(elem) {
        selectElement(elem);
        player.play();
    };

    var pause = function() {
        if (player.isPlaying()) {
            player.pause();
        }
    };

    $(player).bind('onended', function() {
        var next = playingElement.next();

        if (next.length > 0) {
            play(playingElement.next());
            return;
        } else if (player.isLooped()) {
            var firstChild = list.children().first();

            if (firstChild.length > 0) {
                play(firstChild);
                return;
            }
        }

        markPaused();
    });

    $(player).bind('onpause', function() {
        markPaused(playingElement);
    });

    $(player).bind('onplay', function() {
        markPlayed(playingElement);
    });

    this.addTrack = function(albumSpec, trackSpec) {
        var trackElement = trackTemplate(albumSpec.title, trackSpec.title);
        var isFirst = list.children().length == 0;

        $(trackElement).data('sources', trackSpec.sources)
            .data('track-element', trackSpec.element);

        list.append(trackElement);

        if (isFirst) {
            var elem = $(trackElement);
            selectElement(elem);
            play(elem);
        }
    };

    this.clear = function() {
        list.html('');
    };

    var onRemoveClick = function(e) {
        var elem = $(this);

        e.stopPropagation();
        e.preventDefault();

        if (playingElement.is(elem)) {
            pause(elem);

            var another = elem.next();

            if (another.length == 0) {
                another = elem.prev();
            }

            selectElement(another);
        }

        $(self).trigger('remove', $(elem).data('track-element'));
        elem.remove();
    };

    var onPlayClick = function(e) {
        e.preventDefault();

        var elem = $(this);
        play(elem);
    };

    var onPauseClick = function(e) {
        e.preventDefault();
        pause();
    };

    list.on('click', 'li', function(e) {
        var target = $(e.target);

        if (target.is('.remove-button')) {
            onRemoveClick.call(this, e);
        } else if (target.is('.pause-button')) {
            onPauseClick.call(this, e);
        } else if (target.is('.play-button')) {
            onPlayClick.call(this, e);
        } else {
            selectElement($(this));
        }
    });
};