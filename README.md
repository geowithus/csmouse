# CSMOUSE JavaScript / jQuery Plugin | HTML Ctrl + Shift + Left Mouse Click Event

<p align="center">
    This functionality mimics Windows® File Explorer (or any other) gimmicks when selecting/deselecting files and folders.
    It is simple in settings, 100% safe and styles and HTML/CSS/Datasets combinations are unlimited.
</p>

<p align="center">
	<a href="https://geowith.us/csmouse/"><img src="https://geowith.us/share/tests/csm/csmouse-animation.gif" width="486" height="520" alt="csmouse demo"></a>
</p>

## Demo

Please check demo version of pure JavaScript on this 
[link](https://geowith.us/csmouse-js/)
 or jQuery plugin version on this 
[link](https://geowith.us/csmouse-jquery/).

## Quick start

You can download whole package with both scripts:

- [Download the latest release.](https://github.com/kkatusic/csmouse/archive/master.zip)
- Include in your working file:

```html
<!-- Latest compiled and minified JavaScript Native file -->
<script src="js/csmouse-class.min.js"></script>
```
- or if you prefer jQuery version :
```html
<!-- Latest compiled and minified jQuery file -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<!-- Latest compiled and minified jQuery Plugin file -->
<script src="js/csmouse-jquery.min.js"></script>
```
> Please first check what version of script fits your need. If you are using jQuery Plugin version be aware to
>include jQuery JavaScript library.

## Usage

> Note that we don't define you CSS class selector, you choose whatever you want.

### Via `CSS` class in Native Javascript Version
Add same class to all your elements that you want use in selection process, we like `sels` CSS class
```html
<a id="item-1" href="#" class="sels">First Item</a>
<a id="item-2" href="#" class="sels">Second Item</a>
<a id="item-3" href="#" class="sels">Third Item</a>
<a id="item-4" href="#" class="sels">Fourth Item</a>
<a id="item-5" href="#" class="sels">Fifth Item</a>
<a id="item-6" href="#" class="sels">Sixth Item</a>
```
and than call JS function:
```js
var csMouseItems = new CSMOUSE("sels", {settings...});
```

> You can use whatever HTML tag you want,a tag, span tag, div tag, etc.

### Via `CSS` class in jQuery Plugin Javascript Version
Add same class to all your elements that you want use in selection process, we like `sel` CSS class
```html
<a id="item-1" href="#" class="sels">First Item</a>
<a id="item-2" href="#" class="sels">Second Item</a>
<a id="item-3" href="#" class="sels">Third Item</a>
<a id="item-4" href="#" class="sels">Fourth Item</a>
<a id="item-5" href="#" class="sels">Fifth Item</a>
<a id="item-6" href="#" class="sels">Sixth Item</a>
```
and than call JS jQuery plugin:
```js
var csMouseItems = $('.sels').CSMouse('sels');
```

> You can use whatever HTML tag you want,a tag, span tag, div tag, etc.
> Also note that you must provide two times `selector` because jQuery removed selector as option from version 1.7., more on [link](https://api.jquery.com/selector/) 

### `options` in both versions

> Note that all option are optional, you can or not to use them.

#### first

Type: `String`  
Default: `"csmouse_first_" + selector`

HTML ID attribute of input tag element that script will save a first clicked index of element, like left mouse click or CTRL clicked element. If element doesn't exist script will put it in parent element of select able items. 

#### last

Type: `String`  
Default: `"csmouse_last_" + selector`

HTML ID attribute of input tag element that script will save a last clicked element. If element doesn't exist script will put it in parent element of select able items.

#### values

Type: `String`  
Default: `"csmouse_values_" + selector`

HTML ID attribute of input tag element that script will save index values of selected elements. If element doesn't exist script will put it in parent element of select able items.

#### items

Type: `String`  
Default: `"csmouse_items_" + selector`

HTML ID attribute of input tag element that script will save IDs values of selected elements. If element doesn't exist script will put it in parent element of select able items.

#### color

Type: `String`  
Default: `csmouse_color`

CSS class that script will add to selected items.

#### all

Type: `String`  
Default: `"csmouse_all_elem_" + selector`

HTML ID attribute of element which click will provide to all items will be selected.

#### none

Type: `String`  
Default: `"csmouse_none_elem_" + selector`

HTML ID attribute of element which click will provide to all items will be deselected.

#### togg

Type: `String`  
Default: `"csmouse_toggle_elem_" + selector`

HTML ID attribute of element which click will provide to toggle items selection.

#### cnt

Type: `String`  
Default: `"csmouse_cnt_elem_" + selector`

HTML ID attribute of element in which script will put number of selected items.

#### elems

Type: `String`  
Default: `"csmouse_elems_elem_" + selector`

HTML ID attribute of element in which script will put number of total selectable items.

#### json

Type: `String`  
Default: `"csmouse_json_elem_" + selector`

HTML ID attribute of element which click will provide JSON string of selected items, e.g. `["item-1","item-2","item-3","item-4"]`.

#### serial

Type: `String`  
Default: `"csmouse_serial_elem_" + selector`

HTML ID attribute of element which click will provide form serialization format of selected items, e.g. `sel=on&item-1&=onitem-2&=onitem-3&=onitem-4&=on]`.

#### output

Type: `String`  
Default: `id`

Choose what HTML tag attribute script will use for selected items, by default that is `ID` of tag element, but you can use e.g. `data-value="999"`.

#### debug

Type: `Boolean`  
Default: `false`

If `true` script will log errors in internet browser console.

### Exemple with all options included: 
```js
var csMouseItems = $('.sels').CSMouse('sels', {
    first:  "first_sels",
    last:   "last_sels",
    values: "sels_values",
    items:  "sels_items",
    color:  "sels-blue",
    all:    "sel_all",
    none:   "unsel_all",
    togg:   "toggle",
    cnt:    "display_counter",
    elems:  "total_elems",
    json:   "json",
    serial: "serial",
    output: "id",
    debug:  true
});
```

## Additional script functions

### Get all selected items in JSON string format

```js
csMouseItems.getSelectedJSON();
```

### Get all selected items in form serialization format
```js
csMouseItems.getSelectedSerialize();
```

> Please note that you use this function call inside scope that you are working. If you want script reference outside scope define global variable for script.

## Copyright and license

Available through [Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/) License.<br>
For commercial or any enterprise use, please contact us at TODO copyright@geowith.us. 

Copyright © 2014+ GEO With Us Corp. All rights reserved.