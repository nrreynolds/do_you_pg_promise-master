# OH NO!

![:image](https://media.giphy.com/media/tpwwhv1BLd31e/giphy.gif)

It just so happens that all of the wizards of consequence in the magic world have been students of the Hogwarts School of Witchcraft and Wizardry, however the school has lost all its magic and now NOTHING WORKS!

As a member of Dumbledore's Army it's up to YOU to set up some ingenious Muggle gadgetry to keep the school up and running!

> Reparo!

## Learning Objectives

- Practicing setting up databases
- Learning to set up test databases and testing commands within them
- Practicing integrating SQL into Express apps using the PG-Promise package 
- Practicing displaying templated data in RESTful routes
- Learning to implement CRUD apps in Express
- Learning to use method overrides to implement patch and delete HTTP actions

## Setup

1) Start by creating a database and running:

`CREATE DATABASE hogwarts_crud` in psql.

Add CREATE TABLE methods for both the houses and the students tables.

The houses table should have:
 - id
 - name
 - img_url

The students table should have:
 - id
 - fname
 - lname
 - image
 - house_id (this should be set up as a foreign key!!!)

Then seed the database by running:

`psql -d hogwarts_crud -f seeds.sql`

2) Create a node app that uses Express, Mustache, Mustache-Express and PG-Promise

In your app.js file make sure to initialize a database connection using the 'pg-promise' package.

3) Create a `views` folder that will hold all of your html templates. Inside of `views` you should have 3 folders:
 - home/
 - houses/
 - students/

 You will also want the `students` and `houses` folders to both have their own `index.html` and `show.html` files

 Inside of the `home` directory, add an `index.html` file. This will be the file you use for `/` route responses in your app.

 Your tree inside of the `views` folder should look like this:

```
├── home
│   └── index.html
├── houses
│   ├── index.html
│   └── show.html
└── students
    ├── index.html
    └── show.html
```

---

It may be helpful to create a test database so you can practice editing and deleting data from tables, then setting the same seed data as your 'live' database.

 1. `createdb hogwarts_crud_test`

 1. `psql -d hogwarts_crud_test -f seed.sql`

 **Now you can test commands and mess with tables to your haerts content in your own little sandbox. Think of it as your own little [room of requirement.](http://harrypotter.wikia.com/wiki/Room_of_Requirement)**

## Completion

You've been provided with a a data set from which you will build an Express app according the the prompts. For the first few parts, when you can display all the houses and students and view their pictures you'll know things are working properly.

Completion for this assignment is up to (and including) **part 4**.  As always, healthy living is best.

## Part 1 - Accio Students! - Reading

  You will need to build route for `/`in your `app.js` file. Write the handler to connect the route to the view, and supply it with the relevant data. Your `views/home/index.html` file should have a link to the `/students` and the `/houses` route.

  Next you will need to build out the route and template for `/students` with the appropriate data. The data here is a list of all students from Hogwarts. You will have to query the database using a PG connection to get all student info, and supply it to the view. In the view, iterate over all of the student names and create a link to their specific profile on the page. i.e

  `<a href="/students/{{ id }}">{{ fname }} {{ lname }}</a>`
  > The `id` and the `fname`/`lname` should dynamically be generated in the mustache template from each student's hash

  **Testing Queries** If you're unsure about which queries to use, this is a good time to go into the test database and figure out what commands you can use.


## Part 2 - Accio *Individual* Students! - Reading

  Write out the route handler for `/students/:id` to the html template in `view/students/show.html`. In this html file, create a div with the class "student" that contains an h1 tag and an img tag. In the h1 tag, put the student's full name. In the img tag, put the student's `image` value from the database.

## Part 3 - Accio Houses! - Reading

  Students of Hogwarts are split into separate houses. Create the route handler for `/houses`, linked from the `views/houses/index.html` file. You must query the database for all houses, and iterate over them in the view. Each iteration will create a div on the page with class "house", that contains an h2, and an img tag. The h2 tag should be dynamically populated to create a link to the house by its id, i.e: `<a href="/houses/{{ id }}">{{ name }}r</a>`. The img tag should contain the img url obtained from the database.

## Part 4 - Accio All Students from a House - More Reading

  You've shown the houses together, but the house heads need a list of all of the students they are in charge of. Build a dynamic route in your `app.js` for `/houses/:id` that will query the database for a `JOIN` Table using the house based on the id, all students whose `house_id` value matches `:id` supplied by the route call.

  In the view, show the house sigil by displaying the house and img in a div with the class "house".

  Below the house div, create a new div and give it the CSS class "roster". Inside this div, iterate over your students collection, which creates a div with the CSS class "student", that contains an h1 with the student's name, and an img tag that displays the student's photo.

# BONUS LINE - TREAD LIGHTLY

## Part 5 - Updating the Students list

  Update your `/students` page so that each students name has next to it another link to their affiliated house. ***HINT*** Look at the routes to accesss each house. Do they match up with the student's house_id?

## Part 6 - Expecto Patronum - Creation

  `HINT` - You may need the `body-parser` package.

  In the index path, '/', create a new form tag that sends a POST request to '/students'. This form must ask for a first name, last name, image url, and a dropdown list of available houses. You'll have to query the database for each house.

  Drop downs are done with the `<select>` tag, and can be populated with `<option>` tags. You will iterate over the houses from your query and iterate inside the select tag to create them. An example option tag output for this form is shown below:

  `<option value="{{ id }}">{{ name }}</option>`

  The route handler for this form's submission should take the values from the form and save them to the `hogwarts_crud` table. You can look at the student table's schema in `seeds.sql` to see what values are required. How would you set form inputs as required to prevent the form from submitting?

  Save the return value of the query you wrote and use it to redirect the user to the newly created student's id. By default you get back an empty PG::Request object, but by using the [RETURNING](http://www.postgresql.org/docs/8.3/static/sql-insert.html) keyword, you can get back the new student's id, and call .entries on the response object to get the number and put it in the redirect call.


# SUPER BONUS LINE - THERE BE DRAGONS HERE

This part is for those who are curious. We haven't covered this material yet but invite you to do your own research. Writing `put` and `delete` route handlers is tricky, but HTML doesn't natively support those HTTP verbs. We can fake them using [method overrides](http://mikeebert.tumblr.com/post/26877173686/quick-tip-using-put-and-delete-in-sinatra)

## Part 7 - Avada Kedavra - Destroy

  In your student view, create a form with a method override to send a DELETE request to `/students/:id` and in your handler delete the student by their id. Afterwards, redirect the user to `/students`


## Part 8 - Riddikulus - Update

  In each student's individual page and a link to `/students/:id/edit`, with `:id` being their id number from the database. The view for this page should contain a form that let's us change all of the student's information except their id ( looks **awful similar** to the student creation form...). Query the database for the student's info, and use it to set the default values of this form.

  Override the method of this form to submit a PUT request to '/students/:id', and in it's handler use the value in `:id` to target the correct row in the database and update the values based on the form input.


## Ultra Bonus Line

- **Styling**: Some of the student portraits are leaking out of their divs. Edit the CSS to correct this!
- Add functionality so students can enroll at Hogwarts (with a link to create a new student). You should implement a sorting hat method so that when a new student is created they are randomly assigned to one of Hogwarts' four houses. (Where do you think this logic should go? Use your judgement)
