// CYCLE SNIPPET STYLE JS OBJECT
var cycle_snippet_prefix = 'snippet-cycle-action-';
var cycle_snippet_effects = ['blindX', 'blindY', 'blindZ', 'cover', 'curtainX', 'curtainY', 'fade', 'fadeZoom', 'growX', 'growY', 'none', 'scrollUp', 'scrollDown', 'scrollLeft', 'scrollRight', 'scrollHorz', 'scrollVert', 'shuffle', 'slideX', 'slideY', 'toss', 'turnUp', 'turnDown', 'turnLeft', 'turnRight', 'uncover', 'wipe', 'zoom', ];
// ADD TO EDITOR REGISTRY
if (typeof openerp.website.snippet !== "undefined" && typeof openerp.website.snippet.editorRegistry !== "undefined") openerp.website.snippet.editorRegistry['custom-snippet-cycle'] = openerp.website.snippet.editorRegistry.resize.extend({
    getSize: function() {
        this.grid = this._super();
        this.grid.size = 8;
        return this.grid;
    }
});
// ADD TO STYLE REGISTRY
if (typeof openerp.website.snippet !== "undefined" && typeof openerp.website.snippet.styleRegistry !== "undefined") openerp.website.snippet.styleRegistry['custom-snippet-cycle'] = openerp.website.snippet.StyleEditor.extend({
    select: function(event, np) {
        var selected_item = $(event.target).closest('[data-class]');
        var action = selected_item.attr('data-class');
        if (action == cycle_snippet_prefix + "remove") {
            this._remove_current_image();
        }
        if (action == cycle_snippet_prefix + "add") {
            this._add_new_image();
        }
        if ($.inArray(action.substring(cycle_snippet_prefix.length), cycle_snippet_effects) > -1) {
            this._add_effect(action);
        }
    },
    _add_new_image: function() {
        this.$target.removeClass(cycle_snippet_prefix + "add");
        var editor = new openerp.website.editor.ImageDialog();
        var self = this;
        editor.on('start', self, function(o) {
            o.url = "http://lorempixel.com/1200/800/";
        });
        editor.on('save', self, function(o) {
            var new_image = $('<div/>', {
                'class' : 'oe_structure',
                'style': "background: url('" + o.url + "');"
            });
            if (self.$target.find('.wbb-cycle').find('.wbb-current-slide').size() > 0) new_image.insertAfter(self.$target.find('.wbb-cycle').find('.wbb-current-slide'));
            else self.$target.find('.wbb-cycle').append(new_image);
            self._reorder();
            self._set_visible(new_image);
        });
        editor.appendTo($('body'));
    },
    _remove_current_image: function() {
        this.$target.removeClass(cycle_snippet_prefix + "remove");
        this.$target.find('.wbb-cycle').find('.wbb-current-slide').remove();
        this.$target.find('.wbb-cycle').find('div:first').addClass('wbb-current-slide');
        this._reorder();
    },
    _add_effect: function(effect) {
        this.$target.attr('data-effect', effect.substring(cycle_snippet_prefix.length));
    },
    _reorder: function() {
        var other = this.$target.find('.wbb-cycle').find('div');
        var i = 0;
        other.each(function() {
            i++;
            if (i == 1) $(this).css({
                'position': 'absolute',
                'top': '0px',
                'z-index': other.size(),
                'display': 'block',
                'opacity': 1
            });
            else $(this).css({
                'position': 'absolute',
                'top': '0px',
                'z-index': other.size() - i + 1,
                'display': 'none',
                'opacity': 0
            });
        });
    },
    _set_visible: function(element) {
        this.$target.find('.wbb-cycle').find('div').css({
            'display': 'none',
            'opacity': 0
        }).removeClass('wbb-current-slide');

        element.css({
            'display': 'block',
            'opacity': 1
        }).addClass('wbb-current-slide');
    }
});
$(document).ready(function() {
    // cycle init
    $('[data-snippet-id="custom-snippet-cycle"]').each(function() {
        var effect = $(this).attr('data-effect');
        var cycle = $(this).find('.wbb-cycle');
        cycle.cycle({
            fx: $.inArray(effect, cycle_snippet_effects) > -1 ? effect : 'none',
            next: cycle.parent().find('.wbb-slideshow-right'),
            prev: cycle.parent().find('.wbb-slideshow-left'),
            timeout: 0,
            before: function(){
                $(this).parent().find('.wbb-current-slide').removeClass('wbb-current-slide');
            },
            after: function(){
                $(this).addClass('wbb-current-slide');
            }
        });
    });
});