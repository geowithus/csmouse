/**
 *
 * @Class           CSMOUSE / csmouse-class.js, jQuery Plugin
 * @Idea            Darko B.
 * @Authors         Darko B. && Kresimir K.
 * @Copyright       Copyright (c) GEO With Us Corp. USA, New York, NY
 * @Version         1.2 Apr-2014
 * @License         Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
 * @ComercialUse    Feel free to study and adapt for personal use, but for commercial or any enterprise use, please contact us @ copyright@geowith.us
 * @URL             https://geowith.us/csmouse/
 *
 */
(function($){

    // Nothing is the $ here
    $.fn.CSMouse = function(selector, options) {

        var defaults = {
            first:      "first_" + selector,
            last:       "last_" + selector,
            values:     "values_" + selector,
            items:      "items_" + selector,
            color:      "csmouse_color",
            all:        "sel_all_" + selector,
            none:       "unsel_all_" + selector,
            togg:       "toggle_" + selector,
            cnt:        "csmouse_cnt_elem_" + selector,
            elems:      "csmouse_elems_elem_" + selector,
            json:       "csmouse_json_elem_" + selector,
            serial:     "csmouse_serial_elem_" + selector,
            output:     "id",
            debug:      false,
        };

        var settings = $.extend({}, defaults, options);


        var initializedItems = $(this);
        var firstClickedItemIndex = $(this).first().index();
        var lastClickedItemIndex = $(this).first().index();
        var currentClickedItemIndex = null;
        var lastClickedItemSelectedBefore = false;
        var selectedItems = [];
        var selectedIndexes = [];
        var selectedIDs = [];
        var selectedValues = [];

        /**
         * Set up total elements number, 0 for no start
         * and total number of selectable elements
         */
        var setUpCounterInitialsValues = function() {
            if($("#" + settings.cnt).length > 0) {
                $("#" + settings.cnt).text(0);
            }
            if($("#" + settings.elems).length > 0) {
                $("#" + settings.elems).text(initializedItems.length);
            }
        };

        /**
         * Set up All, None and Toggle buttons click
         * Also set up JSON show selected elements and
         * serial "checkbox" selected elements
         */
        var setUpAllNoneToggleButtonsOther = function() {

            try {

                // All button click
                $("#" + settings.all).unbind("click").bind("click", function(event) {
                    selectAllElements();
                });

                // None button click
                $("#" + settings.none).unbind("click").bind("click", function(event) {
                    selectNoneElements();
                });

                // Toggle button click
                $("#" + settings.togg).unbind("click").bind("click", function(event) {
                    toggleElements();
                });

                // JSON button click
                $("#" + settings.json).unbind("click").bind("click", function(event) {
                    showSelectedJSON();
                    event.preventDefault();
                });

                // Serial button click
                $("#" + settings.serial).unbind("click").bind("click", function(event) {
                    showSelectedSerialize();
                    event.preventDefault();
                });

            } catch(e) {
                if(settings.debug) { console.error("Error:", e); }
            }

        };

        /**
         * Select All elements
         */
        var selectAllElements = function() {

            initializedItems.addClass(settings.color);

            saveSelectedElements();
        };

        /**
         * Select None elements
         */
        var selectNoneElements = function() {

            initializedItems.removeClass(settings.color);

            saveSelectedElements();
        };

        /**
         * Toggle elements
         */
        var toggleElements = function() {

            // Select all elements
            initializedItems.addClass(settings.color);

            // Remove previous selected
            for (var i = 0; i < selectedItems.length; i++) {
                $(selectedItems[i]).removeClass(settings.color);
            }

            saveSelectedElements();
        };

        /**
         * Get selected elements as JSON string
         *
         * Example: {ID1, ID2, ID3,...}
         */
        var getSelectedJSON = this.getSelectedJSON = function() {

            if(settings.output === "id") {
                return JSON.stringify(selectedIDs);
            }

            return JSON.stringify(selectedValues);
        }

        /**
         * Show selected elements as JSON string
         *
         * Example: {ID1, ID2, ID3,...}
         */
        var showSelectedJSON = function() {
            if (selectedIDs.length > 0) {
                alert(getSelectedJSON());  //PHP json.encode
            } else {
                alert("Nothing is selected from the list");
            }

            return false;
        };

        /**
         * Get selected elements as "checkbox" string
         *
         * Example: ID1=on&ID2=on&ID3=on
         */
        var getSelectedSerialize = this.getSelectedSerialize = function() {

            if(settings.output === "id") {
                return selector + "=on&" + selectedIDs.join("=on&") + "=on";
            }

            return selector + "=on&" + selectedValues.join("=on&") + "=on";
        }

        /**
         * Show selected elements as "checkbox" string
         *
         * Example: ID1=on&ID2=on&ID3=on
         */
        var showSelectedSerialize = function() {
            if (selectedIDs.length > 0) {
                alert(getSelectedSerialize());
            } else {
                alert("Nothing is selected from the list");
            }

            return false;
        };

        /**
         * Get the number of selected items
         *
         * @type {function(): *}
         */
        var getSelected = this.getSelected = function() {

            return selectedItems.length;

        };

        /**
         * Get minimal number between two numbers
         *
         * @param first
         * @param second
         * @returns integer {number}
         */
        var getMinimalIndex = function(first, second) {
            return Math.min(first, second);
        };

        /**
         * Get maximal number between two numbers
         *
         * @param first
         * @param second
         * @returns integer {number}
         */
        var getMaximalIndex = function(first, second) {
            return Math.max(first, second);
        };

        /**
         * Save all initializedItems ids to input field
         */
        var saveAllInitializedIds = function() {

            // Create element if it doesn't exist
            if($("#" + settings.items).length == 0) {

                initializedItems.parent().append('<input id="' + settings.items +'" type="hidden" value="" autocomplete="off" />');
            }

            var indexes = [];

            initializedItems.each(function(index) {
                indexes.push(initializedItems[index].id);
            });

            $("#" + settings.items).val(indexes.join());

        };

        /**
         * Save selected initializedItems indexes to input field
         *
         * @param selectedIndexes
         */
        var saveSelectedIndexes = function(selectedIndexes) {

            // Create element if it doesn't exist
            if($("#" + settings.values).length == 0) {

                initializedItems.parent().append('<input id="' + settings.values + '" type="hidden" value="" autocomplete="off" />');
            }

            $("#" + settings.values).val(selectedIndexes.join());

        };

        /**
         * Save first clicked index to input field
         *
         * @param index
         */
        var saveFirstClickedIndex = function(index) {

            firstClickedItemIndex = index;

            // Create element if it doesn't exist
            if($("#" + settings.first).length == 0) {

                initializedItems.parent().append('<input id="' + settings.first +'" type="hidden" value="" autocomplete="off" />');
            }

            $("#" + settings.first).val(index);

        };

        /**
         * Save last index to input field
         *
         * @param index
         */
        var saveLastClickedIndex = function(index) {

            lastClickedItemIndex = index;

            // Create element if it doesn't exist
            if( $("#" + settings.last).length == 0) {

                initializedItems.parent().append('<input id="' + settings.last +'" type="hidden" value="" autocomplete="off" />');
            }

            $("#" + settings.last).val(index);

        };

        /**
         * Save all selected initializedItems elements defined by CSS class "settings.color"
         * Resolve initializedItems ids and values.
         */
        var saveSelectedElements = function() {

            // Reset selected items
            selectedItems = [];
            selectedIndexes = [];
            selectedIDs = [];
            selectedValues = [];

            // Parse initializedItems and save only selected values
            for (var i = 0; i < initializedItems.length; i++) {

                var currentItem = $( initializedItems[i] );

                if(currentItem.hasClass(settings.color)) {

                    selectedItems.push(currentItem);

                    // INDEX
                    var itemIndex= currentItem.index();
                    selectedIndexes.push(itemIndex);

                    // ID
                    var itemID = currentItem.attr("id");
                    selectedIDs.push(itemID);

                    // Value e.g.: data-value="38"
                    var itemValue = ( typeof currentItem.attr(settings.output) !== "undefined" )? currentItem.attr(settings.output) : itemID;
                    selectedValues.push( itemValue );

                }
            }

            saveSelectedIndexes( selectedIndexes );

            // Display count of selected elements
            if( $("#" + settings.cnt).length > 0 ){
                $("#" + settings.cnt).text( selectedIndexes.length );
            }

        };

        /**
         * Select initializedItems between first clicked item and shift clicked item
         */
        var selectItemsShift = function() {

            // Initialize clicked indexes
            saveLastClickedIndex(currentClickedItemIndex);

            var start = getMinimalIndex(firstClickedItemIndex, currentClickedItemIndex);
            var stop = getMaximalIndex(firstClickedItemIndex, currentClickedItemIndex);

            for (var i = start; i <= stop; i++) {
                $(initializedItems[i]).addClass(settings.color);
            }

        };

        /**
         * Resolve SHIFT + CTRL key || SHIFT + CMD key
         */
        var resolveCtrlAndShiftKeys = function() {

            var start = getMinimalIndex(firstClickedItemIndex, currentClickedItemIndex);
            var stop = getMaximalIndex(firstClickedItemIndex, currentClickedItemIndex);

            for (var i = start; i <= stop; i++) {

                // Remove if last CTRL clicked item has selected class
                if( lastClickedItemSelectedBefore ){
                    $(initializedItems[i]).removeClass(settings.color);
                }
                // Add if last CTRL clicked item hasn't selected class
                else{
                    $(initializedItems[i]).addClass(settings.color);
                }

            }

            saveLastClickedIndex(currentClickedItemIndex);

            saveSelectedElements();

        };

        /**
         * Resolve only one SHIFT or CMD key
         */
        var resolveCtrlKey = function() {

            // Set up first clicked item for SHIFT purpose
            saveFirstClickedIndex(currentClickedItemIndex);
            saveLastClickedIndex(currentClickedItemIndex);

            if( $(initializedItems[currentClickedItemIndex]).hasClass(settings.color) ){
                lastClickedItemSelectedBefore = true;
            }
            else{
                lastClickedItemSelectedBefore = false;
            }

            $(initializedItems[currentClickedItemIndex]).toggleClass(settings.color);

            saveSelectedElements();

        };

        /**
         * Resolve only one SHIFT key
         */
        var resolveShiftKey = function() {

            // Remove previous selected
            initializedItems.removeClass(settings.color);

            selectItemsShift();

            saveSelectedElements();

        };

        /**
         * Resolve no key click
         */
        var resolveNoKey = function() {

            // Set up first clicked item for SHIFT purpose
            saveFirstClickedIndex(currentClickedItemIndex);
            saveLastClickedIndex(currentClickedItemIndex);

            // Remove previous selected
            initializedItems.removeClass(settings.color);

            // Select only this item
            initializedItems.eq(currentClickedItemIndex).addClass(settings.color);

            saveSelectedElements();

        };

        // Manage all initializedItems
        this.initialize = function() {

            try {

                // Set up total elements number and 0 for no start
                setUpCounterInitialsValues();

                // Set up additional buttons
                setUpAllNoneToggleButtonsOther();

                // Save all initialized IDs in input field
                saveAllInitializedIds();

                // Save predefined selected items
                saveSelectedElements();

                // Attach event "click" to all initializedItems
                this.unbind("click").bind("click", function(event) {

                    // Set up current clicked element
                    currentClickedItemIndex = Array.from( initializedItems ).indexOf(event.target);

                    // Handle SHIFT + CTRL key || SHIFT + CMD key
                    if ((event.ctrlKey && event.shiftKey) || (event.metaKey && event.shiftKey)) {
                        resolveCtrlAndShiftKeys();
                    }
                    // Handle one CTRL or CMD key click
                    else if(event.ctrlKey || event.metaKey) {
                        resolveCtrlKey();
                    }
                    // Handle SHIFT key
                    else if (event.shiftKey) {
                        resolveShiftKey();
                    }
                    // Handle no key click
                    else {
                        resolveNoKey();
                    }

                    // Firefox A element events disabled :( SHIFT + Mouse left click
                    if( $(this).prop("tagName") !== "INPUT" ){
                        event.preventDefault();
                        event.stopPropagation();
                        return false;
                    }

                });

                return this;

            } catch(e) {
                if(settings.debug) { console.error("Error:", e); }
            }
        };

        return this.initialize();

    };

})(jQuery);