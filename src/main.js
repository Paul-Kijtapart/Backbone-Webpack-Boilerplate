// Library
import Backbone from "backbone";
import $ from "jquery";
import _ from "lodash";

const uuidv1 = require('uuid/v1'); // generate timestamp

// UI library
import "popper.js";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// MODELS
const Blog = Backbone.Model.extend({
    default: {
        id: uuidv1(), // assign timestamp as the id
        description: ""
    }
});

// Collections
const BlogList = Backbone.Collection.extend({
    model: Blog
});

// BlogView
const BlogView = Backbone.View.extend({

    // DOM to be created and inserted
    tagName: "li",
    className: "blog-item",
    attributes: {
        color: "blue",
        "font-size": "20px"
    },

    // Life cycle
    initialize: function () {
        // 'created' in VueJS
    },

    render: function () {
        // mounted phase in VueJS
        // Model data is fully available by this point
        console.log("[BlogView] render");

        this.$el[0].innerHTML = this.model.get("description");

        return this; // enable chained calls
    },

    // Event Register
    events: {
        "dblclick": "showInfo"
    },

    // Methods
    showInfo: function () {
        alert(this.model.get("description"));
    }
});

// BlogListView
const blogs = new BlogList();
const BlogListView = Backbone.View.extend({
    // Target DOM with id 'app': replace its content with this view content
    el: $('#blogs'), // Bind to the existing skeleton of the App

    // Life cycle
    initialize: function () {

        // Respond to change on model(s)
        this.listenTo(this.model, 'add', this.addBlog);

        // updates this.el with the new HTML
        this.model.toArray().forEach(blog => {
            this.addBlog(blog);
        });
    },

    // Override this function with your code that renders the view template from model data
    render: function () {
        console.log("render");

        return this;
    },

    // Event listeners
    events: {
        "click .add-blog-btn": "onAddBlogBtnClick"
    },

    onAddBlogBtnClick: function () {
        let description = $("#description-input").val();

        let newblog = new Blog({
            description: description
        });

        this.model.add(newblog);
    },

    // Methods
    addBlog: function (blog) {
        let view = new BlogView({model: blog});
        this.$el.append(view.render().$el);
    }
});


blogs.add(new Blog({
    description: "im first"
}));

// Start the App
const blogList = new BlogListView({
    model: blogs
});