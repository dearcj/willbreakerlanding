thd = window.thd || {};
thd.utils = thd.utils || {};

thd.utils.player = function(config) {
    'use strict';

    var element = $(config.selector);
    var wrapper = element.find('.wrapper');
    var message = element.find('.message');

    var isPlaying = false;
    var isLooped = false;
    var self = this;
    var audio = new Audio();

    var playButton = element.find('.play-button');
    var pauseButton = element.find('.pause-button');
    var stopButton = element.find('.stop-button');
    var loopButton = element.find('.loop-button');

    var volumeBar = element.find('.volume-bar');
    var volumeBarInner = volumeBar.find('.inner');
    var progressBar = element.find('.progress-bar');
    var progressBarInner = progressBar.find('.inner');
    var timeBar = element.find('.time-bar');
    var display = element.find('.player-display');
    var displayTrackTitle = display.find('.track-title');

    var displayAnimation = (function(display, trackTitle) {
        var runDisplayAnimation = function() {
            trackTitle.delay(2000).animate({
                left: Math.min(0, display.innerWidth() - trackTitle.width()) + 'px',
            }, 5000, 'linear').delay(2000).queue(startOver);
        };

        var startOver = function() {
            trackTitle.finish();
            trackTitle.css('left', '0');
            runDisplayAnimation();
        };

        return {
            start: function(htmlTitle) {
                trackTitle.finish();
                trackTitle.html(htmlTitle);

                startOver();
            },
            stop: function() {
                trackTitle.html('');
                trackTitle.finish();
            }
        };
    })(display, displayTrackTitle);

    var volumeBarPadding = (volumeBar.outerWidth() - volumeBar.width()) / 2;

    this.removeSources = function() {
        audio.src = '';
        progressBarInner.css('width', 0);

        wrapper.hide();
        message.show();

        displayAnimation.stop();
    };

    this.setSources = function(displayHTML, sources) {
        audio.src = '';

        if (audio.canPlayType('audio/ogg') === 'maybe') {
            audio.src = sources.ogg;
        } else {
            audio.src = sources.mp3;
        }
        progressBarInner.css('width', 0);

        markPaused();
        wrapper.show();
        message.hide();

        displayAnimation.start(displayHTML);
    };

    this.play = function() {
        if (self.isPlaying()) {
            self.pause();
        }

        audio.play();
    };

    this.pause = function() {
        audio.pause();

        $(self).trigger('paused');
    };

    var markPaused = function() {
        isPlaying = false;

        playButton.show();
        pauseButton.hide();
    };

    var markPlaying = function() {
        isPlaying = true;

        playButton.hide();
        pauseButton.show();
    };

    var updateBarVolumeTooltip = function() {
        $(volumeBar).attr('title', Math.round(audio.volume * 100) + '%');
    }

    audio.addEventListener('ended', function() {
        audio.currentTime = 0;
        markPaused();

        $(self).trigger('onended');
    });

    audio.addEventListener('pause', function() {
        markPaused();
        $(self).trigger('onpause');
    });

    audio.addEventListener('play', function() {
        markPlaying();
        $(self).trigger('onplay');
    });

    progressBar.on('click', function(e) {
        e.preventDefault();
        var offsetX = e.pageX - progressBar.offset().left;
        var progress = offsetX / progressBar.width();

        audio.currentTime = progress * audio.duration;
    });

    volumeBar.on('click', function(e) {
        e.preventDefault();
        var offsetX = e.pageX - volumeBar.offset().left;
        var volume = Math.min(1, Math.max(0, (offsetX - volumeBarPadding) / volumeBar.width()));

        audio.volume = volume;
        updateBarVolumeTooltip();
    });

    updateBarVolumeTooltip();

    var formatTime = function(time) {
        var seconds = parseInt(time, 10);
        var format = function(a, zero) {
            a = parseInt(a, 10);
            return (!zero || a > 9) ? a : '0' + a;
        };

        return format(seconds / 60, false) + ':' + format(seconds % 60, true);
    }

    var updateLoopButton = function() {
        if (isLooped) {
            loopButton.addClass('checked');
        } else {
            loopButton.removeClass('checked');
        }
    }

    audio.addEventListener('timeupdate', function() {
        progressBarInner.css('width', (progressBar.width() * audio.currentTime / audio.duration) + 'px');

        timeBar.text(formatTime(audio.currentTime));
    });

    var updateVolume = function() {
        volumeBarInner.css('width', (volumeBar.width() * audio.volume) + 'px');
    };

    updateVolume();

    audio.addEventListener('volumechange', function() {
        updateVolume();
    });

    playButton.on('click', function(e) {
        e.preventDefault();

        self.play();
    });

    pauseButton.on('click', function(e) {
        e.preventDefault();

        self.pause();
    });

    loopButton.on('click', function(e) {
        e.preventDefault();

        self.setLooped(!isLooped);
    });

    stopButton.on('click', function(e) {
        e.preventDefault();

        self.pause();
        audio.currentTime = 0;
    });

    updateLoopButton();

    this.isLooped = function() {
        return isLooped;
    };

    this.setLooped = function(val) {
        isLooped = val;
        updateLoopButton();
    }

    this.isPlaying = function() {
        return isPlaying;
    };
};