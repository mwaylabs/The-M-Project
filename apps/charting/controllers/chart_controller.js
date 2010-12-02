Charting.ChartController = M.Controller.extend({

    init: function() {

        var availableWidth = M.Environment.getWidth() - 30;
        var availableHeight = M.Environment.getHeight() - 80;

        var canvasWidth = availableWidth < availableHeight ? availableWidth : availableHeight;
        var canvasHeight = canvasWidth;

        var pieWidth = canvasWidth / 2;
        var pieHeight = pieWidth;
        var pieRadius = canvasWidth / 2;

        $('#' + M.ViewManager.getView('page1', 'canvas').id).css('width', canvasWidth);
        $('#' + M.ViewManager.getView('page1', 'canvas').id).css('height', canvasHeight);

        if(availableWidth < availableHeight) {
            $('#' + M.ViewManager.getView('page1', 'canvas').id).css('margin-top', (availableHeight - availableWidth) / 2);
            $('#' + M.ViewManager.getView('page1', 'canvas').id).css('margin-left', 0);
        } else if(availableWidth > availableHeight) {
            $('#' + M.ViewManager.getView('page1', 'canvas').id).css('margin-left', (availableWidth - availableHeight) / 2);
            $('#' + M.ViewManager.getView('page1', 'canvas').id).css('margin-top', 0);
        }

        var r = Raphael(M.ViewManager.getView('page1', 'canvas').id, canvasWidth, canvasHeight);
        var pie = r.g.piechart(pieWidth, pieHeight, pieRadius - (pieRadius / 10), [55, 20, 13, 32, 5, 1, 2]);

        pie.hover(function () {
            this.sector.stop();
            this.sector.scale(1.1, 1.1, this.cx, this.cy);
            if (this.label) {
                this.label[0].stop();
                this.label[0].scale(1.5);
                this.label[1].attr({"font-weight": 800});
            }
        }, function () {
            this.sector.animate({scale: [1, 1, this.cx, this.cy]}, 500, "bounce");
            if (this.label) {
                this.label[0].animate({scale: 1}, 500, "bounce");
                this.label[1].attr({"font-weight": 400});
            }
        });


    },

    resize: function() {
        $('#' + M.ViewManager.getView('page1', 'canvas').id).empty();
        this.init();
    }

});