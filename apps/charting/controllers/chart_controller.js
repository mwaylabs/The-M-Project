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
        r.g.piechart(pieWidth, pieHeight, pieRadius, [55, 20, 13, 32, 5, 1, 2]);

    },

    resize: function() {
        $('#' + M.ViewManager.getView('page1', 'canvas').id).empty();
        this.init();
    }

});