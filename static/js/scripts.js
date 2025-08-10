

function addProductReview() {
    // make request, process response
    jQuery.ajax({
        url: "/review/product/add/",
        type: "POST",
        dataType: "json",
        data: {
            'csrfmiddlewaretoken': $('[name="csrfmiddlewaretoken"]').val(),
            'title': jQuery("#id_title").val(),
            'content': jQuery("#id_content").val(),
            'rating': jQuery("#id_rating").val(),
            'slug': jQuery("#id_slug").val(),
        },
        success: function (responce) {
            // disable the submit button to prevent duplicates
            jQuery("#submit_review").attr('disabled', 'disabled');
            // if this is first review, get rid of "no reviews" text
            jQuery("#no_reviews").empty();
            //// add the new review to the reviews section
            jQuery("#reviews").prepend(responce.html).slideDown();
            //// get the newly added review and style it with color
            new_review = jQuery("#reviews").children(":first");
            new_review.addClass('new_review');
            //// hide the review form
            jQuery("#review_form").slideToggle();

        },
        //error: function (xhr, errmsg, err) {
        error: function (response) {
                alert(xhr.status + ": " + xhr.responseText);
                //jQuery("#review_errors").append(response.html);
        }
    });


    //jQuery.post("/review/product/add/", review,
    //    function (response) {
    //        alert("Enter a search term.");
    //        jQuery("#review_errors").empty();
    //        // evaluate the "success" parameter
    //        if (response.success == "True") {
    //            // disable the submit button to prevent duplicates
    //            jQuery("#submit_review").attr('disabled', 'disabled');
    //            // if this is first review, get rid of "no reviews" text
    //            jQuery("#no_reviews").empty();
    //            // add the new review to the reviews section
    //            jQuery("#reviews").prepend(response.html).slideDown();
    //            // get the newly added review and style it with color
    //            new_review = jQuery("#reviews").children(":first");
    //            new_review.addClass('new_review');
    //            // hide the review form
    //            jQuery("#review_form").slideToggle();
    //        }
    //        else {
    //            // add the error text to the review_errors div
    //            jQuery("#review_errors").append(response.html);
    //        }
    //    }, "json");
}

function addTag() {
    //tag = {
    //    tag: jQuery("#id_tag").val(),
    //    slug: jQuery("#id_slug").val()
    //};
    //
    //
    //
    //jQuery.post("/tag/product/add/", tag,
    //    function (response) {
    //        if (response.success == "True") {
    //            jQuery("#tags").empty();
    //            jQuery("#tags").append(response.html);
    //            jQuery("#id_tag").val("");
    //        }
    //    }, "json");

    jQuery.ajax({
        url: "/tag/product/add/",
        type: "POST",
        dataType: "json",
        data: {
            'csrfmiddlewaretoken': $('[name="csrfmiddlewaretoken"]').val(),
            'tag': jQuery("#id_tag").val(),
            'slug': jQuery("#id_slug").val(),
        },
        success: function (responce) {
                jQuery("#tags").empty();
                jQuery("#tags").append(response.html);
                jQuery("#id_tag").val("");

        },
        error: function (xhr, errmsg, err) {
        //error: function (response) {
                alert(xhr.status + ": " + xhr.responseText);
                //jQuery("#review_errors").append(response.html);
        }
    });
}

function slideToggleReviewForm() {
    jQuery("#review_form").slideToggle();
    jQuery("#add_review").slideToggle();

}





function prepareDocument() {
    //code to prepare page here.
    jQuery("form#search").submit(function () {
        text = jQuery("#id_q").val();
        //alert(text);
        if (text == "" || text == "Search") {
            // if empty, pop up alert
            alert("Enter a search term.");
            // halt submission of form
            return false;
        }
    });
    ////tagging functionality to prepareDocument()
    //jQuery("#add_tag").click(addTag);
    //jQuery("#id_tag").keypress(function (event) {
    //    if (event.keyCode == 13 && jQuery("#id_tag").val().length > 2) {
    //        addTag();
    //        event.preventDefault();
    //    }
    //});

    jQuery("#submit_review").click(addProductReview);
    //jQuery("#review_form").addClass('hidden');
    jQuery("#add_review").click(slideToggleReviewForm);
    jQuery("#add_review").addClass('visible');
    jQuery("#cancel_review").click(slideToggleReviewForm);

    function statusBox() {
        jQuery('<div id="loading">Loading...</div>')
            .prependTo("#main")
            .ajaxStart(function () {
                jQuery(this).show();
            })
            .ajaxStop(function () {
                jQuery(this).hide();
            })
    }
}

jQuery(document).ready(prepareDocument);

//jQuery(document).ready(function(){
////code to prepare page here.
//    alert("Enter a search term.");
//});
