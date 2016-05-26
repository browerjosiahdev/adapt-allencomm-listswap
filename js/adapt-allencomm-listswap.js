define(function(require) {
    // Import the required components.
    var ComponentView = require('coreViews/componentView');
    var Adapt = require('coreJS/adapt');
    // Create the "AllenCommListswap" listswap component by extending
    // the features of the "ComponentView" component.
    var AllenCommListswap = ComponentView.extend({
        onLinkClick: function (e) {
          // Get a handle to the new link, the currently selected
          // link, and the associated content.
          var link = this.$(e.currentTarget);
          var selectedLink = this.$('.link.selected');
          var content = this.$('.content').eq(parseInt(link.data('index')));
          // Make sure the link has associated content. If it doesn't
          // we don't want to do anything. Also do nothing if the new
          // link is the currently selected link.
          if (content && !link.hasClass('selected')) {
            // If there is a link currently selected, de-select the link, and
            // hide the associated content.
            if (selectedLink) {
              selectedLink.removeClass('selected');
              this.$('.content').eq(parseInt(selectedLink.data('index'))).removeClass('show show-active');
            }
            // Add the visited and selected classes to the link, and add
            // the show class to the content.
            link.addClass('selected visited');
            content.addClass('show');
            // Wait for 10ms before adding the show-active class to the
            // content that will play the fade animation.
            setTimeout(function () {
              content.addClass('show-active');
            }, 10);
            // If all links have been visited, set the completion status.
            if (this.$('.link:not(.visited)').length === 0) {
              this.setCompletionStatus();
            }
          }
        },
        preRender: function() {
            // Checks to see if the text should be reset on revisit
            this.checkIfResetOnRevisit();
        },
        postRender: function() {
            this.setReadyStatus();
            // Check if instruction or title or body is set, otherwise force completion
            this.$('.link').on('click', this.onLinkClick.bind(this));
        },
        // Used to check if the text should reset on revisit
        checkIfResetOnRevisit: function() {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');
            // If reset is enabled set defaults
            if (isResetOnRevisit) {
                this.model.reset(isResetOnRevisit);
            }
        }
    });
    Adapt.register('allencommListswap', AllenCommListswap);
    return AllenCommListswap;
});
