/**
 * 
 * @Class		CSMOUSE / csmouse-class.js, Pure Javascript
 * @Idea		Darko B.
 * @Authors		Darko B. <dbertovi@geowith.us> && Kresimir K. <kreso@geowith.us>
 * @Copyright		Copyright (c) GEO With Us Corp. USA, New York, NY
 * @Version		1.2 Apr-2014
 * @License		Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
 * @ComercialUse	Feel free to study and addapt for personal use, but for commercial or any enterprise use, please contact us @ copyright@geowith.us
 * @URL			https://geowith.us/csmouse/
 * 
 */

function CSMOUSE(selector, settings) {

    // Main selector of elements
    this.selector = selector;

    this.settings = {
        first 	:	typeof settings.first !== typeof undefined ? settings.first : "first_" + this.selector,
        last 	:	typeof settings.last !== typeof undefined ? settings.last : "last_" + this.selector,
        values	:	typeof settings.values !== typeof undefined ?settings.values : "values_" + this.selector,
        items	:	typeof settings.items !== typeof undefined ? settings.items : "items_" + this.selector,
        color	:	typeof settings.color !== typeof undefined ? settings.color : "csmouse_color",
        all		:	typeof settings.all !== typeof undefined ? settings.all : "sel_all_" + this.selector,
        none 	:	typeof settings.none !== typeof undefined ? settings.none : "unsel_all_" + this.selector,
        togg	:	typeof settings.togg !== typeof undefined ? settings.togg : "toggle_" + this.selector,
        cnt		:	typeof settings.cnt !== typeof undefined ? settings.cnt : "csmouse_cnt_elem_" + this.selector,
        elems	:	typeof settings.elems !== typeof undefined ? settings.elems : "csmouse_elems_" + this.selector,
        json	:	typeof settings.json !== typeof undefined ? settings.json : "csmouse_json_elem_" + this.selector,
        serial	:	typeof settings.serial !== typeof undefined ? settings.serial : "csmouse_serial_elem_" + this.selector,
		output	:	typeof settings.output !== typeof undefined ? settings.output : "id",
		purl	:	typeof settings.purl !== typeof undefined ? settings.purl : "", //post URL
        debug	:	typeof settings.debug !== typeof undefined ? settings.debug : false
    };

    // DOM items
    this.itemsDOM = {};

    this.RESOLVENoneOfTheKeys = function(selector, index, first, last, values, items, color){
		
        try {
			
            this.sv(first, index);
            this.sv(last, index);
            this.sv(values, index + ",");
            this.markSelected(selector, values, items, color);

        } catch(e){this.cl(e);}

    };

    this.RESOLVECtrlAndShiftKeys = function(selector, index, first, last, values, items, color){

        try {

            if (this.gv(first) !== ""){

                this.sv(first, this.gv(last));
                this.sv(last, index);
                this.selectCtrlShift(selector, index, first, last, values, items, color);

            }

        } catch(e){this.cl(e);}

    };

    this.RESOLVECtrlKey = function(selector, index, first, last, values, items, color){

        try {
			
			if (!this.inArray(index, this.gv(values))){

				if (this.gv(first) === ""){

					this.sv(first, index);
					this.sv(last, index);
					this.sv(values, index + ",");

				} else {

					this.sv(last, index);
					this.sv(values, this.gv(values) + index + ",");

				}

			} else {
				
				this.removeAlreadySelected(index, first, last, values);

			}
			this.markSelected(selector, values, items, color);

        } catch(e){this.cl(e);}

    };

    this.RESOLVEShiftKey = function(selector, index, first, last, values, items, color){

        try {

            if (this.gv(first) === ""){

                this.sv(first, "0");
                this.sv(last, index);
                this.sv(values, index + ",");

            } else {

				this.sv(first, this.gv(last));
                this.sv(last, index);

            }
            this.selectShift(selector, first, last, values, items, color);

        } catch(e){this.cl(e);}

    };

    this.selectCtrlShift = function(selector, index, first, last, values, items, color){

        try {

            var range = "";
			var start = parseInt(this.gv(first));
			var end = parseInt(this.gv(last));
            if (start <= end){

                for (var i = start; i <= end; i++){

                    range += i + ",";

                }

            } else {

                for (var i = end; i <= start; i++){

                    range += i + ",";

                }

            }
            var selected = range.split(",");
            var sets = "";
            for (var i = 0; i < selected.length - 1; i++){

                var id_op = "";
                if (this.inArray(selected[i], this.gv(values))){

                    sets += selected[i] + "-r,";

                }
                if (!this.inArray(selected[i], this.gv(values))){

                    sets += selected[i] + "-a,";

                }
                sets += id_op;

            }
            var new_values = this.gv(values);
            var pairs = sets.split(",");
            for (var i = 0; i < pairs.length - 1; i++){

                var op = pairs[i].split("-");
                if (op[0] !== this.gv(first) && op[0] !== index){

                    if (op[1] === "a"){

                        new_values += op[0] + ",";

                    } else {

                        var temp = "";
                        var old = this.gv(values);
                        var old_values = old.split(",");
                        for (var j = 0; j < old_values.length - 1; j++){

                            if (old_values[j] !== op[0]){

                                temp += old_values[j] + ",";

                            }

                        }
                        new_values = temp;

                    }
                    this.sv(values, new_values);

                }

            }
            this.markSelected(selector, values, items, color);

        } catch(e){this.cl(e);}

    };

    this.selectShift = function(selector, first, last, values, items, color){

        try {
			
			var start = "";
			var end = "";
            if (parseInt(this.gv(first)) <= parseInt(this.gv(last))){

                start = parseInt(this.gv(first));
				end = parseInt(this.gv(last));

            } else {

                start = parseInt(this.gv(last));
                end = parseInt(this.gv(first));

            }
            var sel = "";
            var a = this.gv(items);
            var arr = a.split(",");
            this.removeClass(selector, color);
            for (var i = start; i <= end; i++){

                sel += i + ",";
                this.ac(arr[i], color);

            }
            this.sv(values, sel);

        } catch(e){this.cl(e);}

    };

    this.markSelected = function(selector, values, items, color){

        try {

            this.removeClass(selector, color);
            var a = this.gv(items);
            var b = this.gv(values);
            var arr = a.split(",");
            var arr2 = b.split(",");
            for (var i = 0; i < arr2.length - 1; i++){

                this.ac(arr[arr2[i]], color);

            }

        } catch(e){this.cl(e);}

    };

    this.removeAlreadySelected = function(index, first, last, values){

        try {
			
			var vals = this.gv(values);
			if (vals !== ""){
				
				var arr = vals.split(",");
				var result = arr.filter(function(i){
					
					return parseInt(i) !== index;
				
				});
				
			}
			var new_vals = "";
			for (var i = 0; i < result.length - 1; i++){
				
				new_vals += result[i] + ",";
				
			}
			if (new_vals !== ""){
				
				this.sv(first, result[0]);
				this.sv(last, result[result.length - 2]);
				this.sv(values, new_vals);
				
			}
			
        } catch(e){this.cl(e);}

    };

    this.numberSelected = function(values){

        try {

            var a = this.gv(values);
            var vals = a.split(",");
            return vals.length - 1;

        } catch(e){this.cl(e);}

    };

    this.toggleSelection = function(selector, first, last, values, items, color){

        try {

            if (this.gv(values) !== ""){

                var new_selects = "";
                var list = document.querySelectorAll("." + selector);
                list.forEach(function(v, i){
					
                    if (!this.inArray(i, this.gv(values))){

                        new_selects += i + ",";
                        if (i === 0){

                            this.sv(first, i);

                        }

                    }

                }, this);
                this.sv(values, new_selects);
                var last_value = new_selects.slice(-2).split(",");
                this.sv(last, last_value[0]);
                this.removeClass(selector, color);
                var a = this.gv(items);
                var all = a.split(",");
                list.forEach(function(v, i){

                    if (this.inArray(i, new_selects)){

                        this.ac(all[i], color);

                    }

                }, this);

            }

        } catch(e){this.cl(e);}

    };

    this.selectAll = function(selector, first, last, values, items, color){

        try {
			
            var a = this.gv(items);
            var all = a.split(",");
            var sel = "";
            var list = document.querySelectorAll("." + selector);
            list.forEach(function(v, i){

                sel += i + ",";
                this.ac(all[i], color);

            }, this);
            var last_value = parseInt(all.length) - 1;
            this.sv(first, "0");
            this.sv(last, last_value);
            this.sv(values, sel);

        } catch(e){this.cl(e);}

    };

    this.unselectAll = function(selector, first, last, values, color){

        try {
			
            this.sv(first, "");
            this.sv(last, "");
            this.sv(values, "");
            this.removeClass(selector, color);

        } catch(e){this.cl(e);}

    };

    this.showSelectedJSON = function(values, items, output, url){

        try {

            var h = false;
            var a = this.gv(items);
            var arr = a.split(",");
            var b = this.gv(values);
            var arr2 = b.split(",");
            var prepare = [];
            for (var i = 0; i < arr2.length - 1; i++){

                h = true;
				if (output === "id"){
                
					prepare.push(arr[arr2[i]]);
					
				} else {
					
					prepare.push(encodeURI(this.ga(arr[arr2[i]], output)));
					
				}

            }
            if (h){

				if (url === ""){
                
					alert(JSON.stringify(prepare));  //PHP json.encode and alert (just for example)
					
				} else {
					
					//send data to server via XMLHttpRequest (and optionally handle server response) or post via HTML Form
					
				}

            } else {

                //alert("Nothing is selected from the list");

            }

        } catch(e){this.cl(e);}

    };

    this.showSelectedSerialize = function(selector, values, items, output, url){

        try {

            var h = false;
            var serialization = selector + "=on&";
            var a = this.gv(items);
            var arr = a.split(",");
            var b = this.gv(values);
            var arr2 = b.split(",");
			var prepare = [];
            for (var i = 0; i < arr2.length - 1; i++){

                h = true;
				if (output === "id"){
                
					prepare.push(arr[arr2[i]]);
					
				} else {
					
					prepare.push(encodeURI(this.ga(arr[arr2[i]], output)));
					
				}

            }
            serialization += prepare.join("=on&");
			serialization += "=on";
            if (h){

				if (url === ""){
                
					alert(serialization);
					
				} else {
					
					//send data to server via XMLHttpRequest (and optionally handle server response) or post via HTML Form
					
				}

            } else {

                //alert("Nothing is selected from the list");

            }

        } catch(e){this.cl(e);}

    };

    this.removeClass = function(selector, color){

        try {

            var els = document.querySelectorAll("." + selector);
            [].forEach.call(els, function(el) {

                el.classList.remove(color);

            });

        } catch(e){this.cl(e);}

    };

    this.inArray = function(a, b){

        try {

            var in_selected = false;
            var arr = b.split(",");
            for (var i = 0; i < arr.length - 1; i++){

                if (parseInt(arr[i]) === parseInt(a)){

                    in_selected = true;

                }

            }
            return in_selected;

        } catch(e){this.cl(e);}

    };

	// Get Element Value
    this.gv = function(a){

        try {

            return document.getElementById(a).value;

        } catch(e){this.cl(e);}

    };
	
	// Get Element Attribute
	this.ga = function(a, b){
		
		try {
			
			return document.getElementById(a).getAttribute(b);
			
		} catch(e){this.cl(e);}
		
	};

	// Set Element Value
    this.sv = function(a, b){

        try {

            document.getElementById(a).value = b;
            return true;

        } catch(e){this.cl(e);}

    };

	// Add Class to Element
    this.ac = function(a, b){

        try {

            document.getElementById(a).classList.add(b);
            return true;

        } catch(e){this.cl(e);}

    };

    // Enable click event on defined "selector" elements
    this.defineClick = function(){

        for (var i = 0; i < this.itemsDOM.length; i++) {
			
            this.itemsDOM[i].addEventListener("click", this.checkClick.bind(this));
			
        }

    };

    this.setUpItemsAndTheirInput = function(){

        var items = "";
        for (var i = 0; i < this.itemsDOM.length; i++){
			
            items += this.itemsDOM[i].id + ",";
			
        }
        this.sv(this.settings.items, items);

    };

    this.checkClick = function(e){

        try {

            var index = Array.from(this.itemsDOM).indexOf(e.target);
            var passSingleKey = false;
            if (!e.ctrlKey && !e.shiftKey && !e.metaKey){

                this.RESOLVENoneOfTheKeys(
                    this.selector,
                    index,
                    this.settings.first,
                    this.settings.last,
                    this.settings.values,
                    this.settings.items,
                    this.settings.color
                );

            }
            if ((e.ctrlKey && e.shiftKey) || (e.metaKey && e.shiftKey)){

                this.RESOLVECtrlAndShiftKeys(
                    this.selector,
                    index,
                    this.settings.first,
                    this.settings.last,
                    this.settings.values,
                    this.settings.items,
                    this.settings.color
                );
                passSingleKey = true;

            }
            if (!passSingleKey){

                if (e.ctrlKey || e.metaKey){

                    this.RESOLVECtrlKey(
                        this.selector,
                        index,
                        this.settings.first,
                        this.settings.last,
                        this.settings.values,
                        this.settings.items,
                        this.settings.color
                    );

                }
                if (e.shiftKey){

                    this.RESOLVEShiftKey(
                        this.selector,
                        index,
                        this.settings.first,
                        this.settings.last,
                        this.settings.values,
                        this.settings.items,
                        this.settings.color
                    );

                }

            }
            this.setUpCounter();

        } catch(e){this.cl(e);}

    };

    this.setUpCounter = function(){
		
        if (document.getElementById( this.settings.togg ) !== undefined){
			
            document.getElementById( this.settings.cnt ).innerHTML = this.numberSelected(this.settings.values);
			
        }
		
    };

    this.toggleElements = function(){

        this.toggleSelection(
            this.selector,
            this.settings.first,
            this.settings.last,
            this.settings.values,
            this.settings.items,
            this.settings.color
        );
        this.setUpCounter();

    };

    this.selectAllElements = function(){
		
        this.selectAll(
            this.selector,
            this.settings.first,
            this.settings.last,
            this.settings.values,
            this.settings.items,
            this.settings.color
        );
        this.setUpCounter();

    };

    this.unselectAllElements = function(){

        this.unselectAll(
            this.selector,
            this.settings.first,
            this.settings.last,
            this.settings.values,
            this.settings.color
        );
        this.setUpCounter();

    };

    this.showJSONOutputFormat = function(){

        this.showSelectedJSON(
            this.settings.values,
            this.settings.items,
			this.settings.output,
			this.settings.purl
        );

    };

    this.showSerializedOutputFormat = function(){

        this.showSelectedSerialize(
            this.selector,
            this.settings.values,
            this.settings.items,
			this.settings.output,
			this.settings.purl
        );

    };

    this.setUpStatsButtons = function(){
		
		// Toggle
		if (document.getElementById(this.settings.togg) !== null){

			document.getElementById(this.settings.togg).addEventListener("click", this.toggleElements.bind(this));

		}
		// Select all
		if(document.getElementById(this.settings.all) !== null){

			document.getElementById(this.settings.all).addEventListener("click", this.selectAllElements.bind(this));

		}
		// UnSelect all
		if(document.getElementById(this.settings.none) !== null){

			document.getElementById(this.settings.none).addEventListener("click", this.unselectAllElements.bind(this));

		}
        // JSON Output
        if(document.getElementById(this.settings.json) !== null){

            document.getElementById(this.settings.json).addEventListener("click", this.showJSONOutputFormat.bind(this));

        }
        // SERIALIZE Output
        if(document.getElementById(this.settings.serial) !== null){

            document.getElementById(this.settings.serial).addEventListener("click", this.showSerializedOutputFormat.bind(this));

        }
		//Count Total of Elements for Selector
		if (document.getElementById(this.settings.elems) !== null){
			
			document.getElementById(this.settings.elems).innerHTML = document.getElementsByClassName(this.selector).length;
			
		}

    };
	
	// Check if Hidden Inputs Exist on DOM
	this.checkHiddenInputs = function(){
		
		try {
			
			if (document.getElementById(this.settings.first) === null){
				
				this.setUpHiddenInput(this.settings.first);
				
			} else {
				
				this.sv(this.settings.first, "");
				
			}
			if (document.getElementById(this.settings.last) === null){
				
				this.setUpHiddenInput(this.settings.last);
				
			} else {
				
				this.sv(this.settings.last, "");
				
			}
			if (document.getElementById(this.settings.values) === null){
				
				this.setUpHiddenInput(this.settings.values);
				
			} else {
				
				this.sv(this.settings.values, "");
				
			}
			if (document.getElementById(this.settings.items) === null){
				
				this.setUpHiddenInput(this.settings.items);
				
			}
			
		} catch(e){this.cl(e);}
		
	};
	
	// Set Hidden Inputs if not Existing on DOM
	this.setUpHiddenInput = function(element){
		
		try {
			
			var elem = document.createElement("input");
			elem.id = element;
			elem.type = "hidden";
			elem.value = "";
			elem.autocomplete = "off";
			document.body.appendChild(elem); 
			
		} catch(e){this.cl(e);}
		
	};
	
	// Console Error (e) depending on debug setting
	this.cl = function(e){
		
		if (this.settings.debug){console.error("Error:", e);}
		
	};
	
    // Manage all items - INIT functions
    this.initialize = function(){
		
		// Set up missing hidden inputs
		this.checkHiddenInputs();
		
        // Define items and put it in input field
        this.itemsDOM = document.querySelectorAll("." + this.selector);

        // Define items input field
        this.setUpItemsAndTheirInput();

        // Define click
        this.defineClick();

        // Set up additional buttons
        this.setUpStatsButtons();
		
        return this;

    };
    return this.initialize();

}