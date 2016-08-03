# FRONT-END TEST (PRACTICAL)
*Estimated time required: 3 hours.*

## BEFORE YOU START
- make sure you have npm on your dev machine
- run `npm i` to install npm dependencies
- run `./node_modules/.bin/bower install` to install bower dependencies
- run `gulp` to build the project with all needed dependencies

## WHATS INCLUDED?
- Bootstrap (3.x) + css, js, fonts
- jQuery (2.x)
- AngularJS (1.5.x) + ui-route, resource, animate, aria
- lodash (4.x)

## IMPORTANT
- don't change the build script. Its only allowed if your willing to use another css framework
- To re-build the project run `gulp`
- To watch file changes run `gulp watch`
- please stick to the test structure
- everything what you should need is already included
- CSS/JS is located under `/resources`
- main template `index.html` is located under `/public`
- concentrate on at least one part.
- there will be `no bonus points` if A or B is `not` done.

## PART A: HTML + CSS

1. Style a form using the style guide (test_style_guide_example.png).
2. The form must contain:
  * 4x text fields (Street, House Number, Postal Code, City)
  * 2x radio choice buttons (any option)
  * 1x checkbox (any option)
  * 1x “save” button
3. Style each form element consistently and beautifully. Native appearances are not permitted.
4. Leave comments where you were not sure how to properly proceed (had problems or time limitations)

## PART B: Javascript

1. Use jQuery or AngularJS
2. When the “save” button is clicked,
  * Make a request to the Google Maps Geocode API, sending the address from the form and retrieving the location’s latitude and longitude.
  * Show a warning message if the address is invalid, using animations.
  * Show a similar success message if everything went well.
  * If successful, use motion to display a message in the page that reads: “The coordinates for this address are: {{lat}}, {{lng}}”
3. Implement the geocode functionality such that it can be reused, even without this form, even in a completely different form (for example: it accepts an address object, and returns the same object with two new properties: `successful` (boolean), and `location` (object).
4. Leave comments where you were not sure how to properly proceed (or had time limitations)

## BONUS POINTS

* Usage of Angular.
* Usage of SCSS / SASS.
* Usage of Bootstrap LESS.
* Usage of MaterialDesign.
* Usage of ngResource.
* Usage of the ui-router.
* Usage of Angular conventions found [here](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md).
* Performant animations – especially on mobile.
