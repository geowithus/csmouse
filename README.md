# CSMOUSE JavaScript / jQuery Plugin | HTML Ctrl + Shift + Left Mouse Click Event

<p align="center">
This functionality mimics file explorer gimmicks when selecting/deselecting files and folders.
In our CSMOUSE Object - we programmed it to work on web application sets of lists.
It is simple in settings, 100% safe and styles and HTML/CSS/Datasets combinations are unlimited.
</p>

<p align="center">
	<a href="https://geowith.us/csmouse/"><img src="https://geowith.us/csmouse/images/csmouse-animation.gif" width="486" height="520" alt="csmouse demo"></a>
</p>

## Intro

<p>
	Knowing that (1) DOM document uses indexes to enumerate elements of the same class (among all others, which JavaScript represents in arrays), and (2) having in mind ease of folder/files selection in file explorer alike applications, and (3) having the knowledge of HTML DOM Keyboard.key Property, we put all three together to this functionality. In JavaScript and jQuery.
	And this functionality really super-boosts productivity.
</p>

## Web page

Check it out [here](https://geowith.us/csmouse/).

## Demo with Downloads

Please check demo version of pure JavaScript veggies on this 
[link](https://geowith.us/csmouse-js/).
Or our fruity jQuery plugin version on this 
[link](https://geowith.us/csmouse-jquery/).

## Quick start

You can download whole package with both scripts:

- [Download the latest release.](http://github.com/geowithus/csmouse/archive/master.zip)
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

> Note that we don't define your CSS class selector, you choose whatever you want. For multiple lists on one document, you choose different selectors naming (e.g. first list will have selector: ".sel_one", second: ".sel_two", etc.)

### Selector styling

There is a selector (CSS) class and there are two coloring (CSS) classes (selector class must be the same for all selectable elements in the CSMOUSE list, number of which is unlimited on one DOM document):

1. :hover class, like: 
```css
.selector:hover {...}
```
2. selected element class, like: 
```css
.selector.color {...}
```

So, if you choose to have `sels` as a main selector class name for one list, CSS should look like:
```css
/*hover*/
.sels:hover {...}
/*selected element style*/
.sels.color_class {...}
```

### Via `CSS` class in Native Javascript Version
Add same class to all your elements that you want use in selection process, like we used `sels` CSS class
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
var csMouseItems = new CSMOUSE("sels", {settings options...});
```

> You can use whatever HTML tag you want, a tag, span tag, div tag, p tag, etc.

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
var csMouseItems = $('.sels').CSMouse('sels', {settings options...});
```

> You can use whatever HTML tag you want, a tag, span tag, div tag, p tag, etc.
> Also note, that in jQuery plugin instancing code, you must provide `selector` as the reference and the argument, because jQuery removed selector as function argument from version 1.7., more on [link](https://api.jquery.com/selector/).

### `settings options` in both versions

> Note that all settings options are optional. If you want to use defaults, you don't have to set them at all.

#### first

Type: `String`  
Default: `"first_" + selector`

HTML storage element ID (input type="hidden"), which script uses to save and update first clicked element DOM index, like left mouse click or CTRL clicked element. If element doesn't exist script will put it in parent element of selectable items. 

#### last

Type: `String`  
Default: `"last_" + selector`

HTML storage element ID (input type="hidden"), which script uses to save and update first clicked element DOM index, like left mouse click or CTRL clicked element. If element doesn't exist script will put it in parent element of select able items.

#### values

Type: `String`  
Default: `"values_" + selector`

HTML ID attribute of input tag element that script will save index values of selected elements. If element doesn't exist script will put it in parent element of select able items.

#### items

Type: `String`  
Default: `"items_" + selector`

HTML ID attribute of input tag element that script will save IDs values of selected elements. If element doesn't exist script will put it in parent element of select able items.

> Note, settings options (e.g. function arguments) <b>first, last, values, items</b> are storage types. Those can be any type of storage, including var, hidden input, session storage or local (browser) storage. We use hidden input, up to you to addapt to your demands.

#### color

Type: `String`  
Default: `csmouse_color`

CSS class that script will add to selected items.

> Selected indicating class; There are two coloring classes one is :hover and the other is this (color). Both must be defined in proper cascading order, like:
> .selector:hover and .selector.color, for example: 
> `.sels:hover {background-color: #fedcba;}` and `.sels.sels-blue {background-color: #abcdef;};` 
> This way, a `:hover` style will be overlapped with `.selector.color`, when element is selected. 
> Defining them without cascading order will not work, so no good: `.sels:hover{}, .sels-blue{}`

#### all

Type: `String`  
Default: `"sel_all_" + selector`

HTML ID attribute of element which click will provide to all items will be selected.

#### none

Type: `String`  
Default: `"unsel_all_" + selector`

HTML ID attribute of element which click will provide to all items will be deselected.

#### togg

Type: `String`  
Default: `"toggle_" + selector`

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

HTML ID attribute of element which click will provide form serialization format of selected items, e.g. `sels=on&item-1&=onitem-2&=onitem-3&=onitem-4&=on]`.

#### output

Type: `String`  
Default: `id`

Choose what HTML tag attribute script will use for selected items, by default it is element `ID`, but you can use any safely parsable element argument, e.g. `data-value="999"`.

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

### Get number of selected items
```js
csMouseItems.getSelected();
```

> Please note that you use this function call inside scope that you are working. If you want script reference outside scope define global variable for script.

## Copyright and license

Available through [Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/) License.<br>
For commercial or any enterprise use, please contact us at [copyright@geowith.us](https://geowith.us/contact/CSMOUSE+COPYRIGHT+INQUIRY/). 

Copyright © 2014+ GEO With Us Corp. All rights reserved.
