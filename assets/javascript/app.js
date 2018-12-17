$(document).ready(function () {
    var legends = ["Michael Jordan", "Kobe Bryant", "Kareem Abdul-Jabbar", "Charles Barkley", "Wilt Chamberlain", "Julius Erving", "Clyde Drexler", "Scottie Pippen", "Magic Johnson", "Isiah Thomas", "Dominique Wilkins", "Larry Bird", "Bill Russell"];

    function displayGifButtons() {
        $("#legendButtons").empty();
        for (var i = 0; i < legends.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("legend");
            gifButton.addClass("btn btn-primary text-warning bg-dark")
            gifButton.attr("data-name", legends[i]);
            gifButton.text(legends[i]);
            $("#legendButtons").append(gifButton);
        }
    }

    function addNewButton() {
        $("#addGif").on("click", function () {
            var legend = $("#player-input").val().trim();
            if (legend == "") {
                return false;
            }
            legends.push(legend);
            displayGifButtons();
            return false;
        });
    }

    function removeAddedButtons() {
        $("removeGif").on("click", function () {
            legends.pop(legend);
            displayGifButtons();
            return false;
        });
    }

    $(document).on("click", ".legend", function () {
        var legend = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + legend + "&api_key=XfeVFpyc4gz1i1aPr41Dzx8IubjG9kn4&limit=10";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .then(function (response) {
                console.log(response);
                $("#gifsAppear").empty();
                var results = response.data;
                if (results == "") {
                    alert("NO GIFs FOUND. TRY AGAIN!");
                }
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");
                    gifDiv.addClass("gifDiv");
                    var gifRating = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
                    gifDiv.append(gifRating);
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                    gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                    gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                    gifImage.attr("data-state", "still");
                    gifImage.addClass("image");
                    gifDiv.append(gifImage);
                    $("#gifsAppear").prepend(gifDiv);
                }
            });
    })

    displayGifButtons();
    addNewButton();
    removeAddedButtons();

    $(document).on("click", ".image", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }
    });
});