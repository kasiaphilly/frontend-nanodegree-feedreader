/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */
/* We"re placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don"t run until the DOM is ready.
 */
$(function() {
    /* This test suite tests if RSS feed is defined in the allFeeds
    variable in the application. */

    describe("RSS Feeds", function() {
        /* This test makes sure that the allFeeds variable has been
         * defined and that it is not empty. */
        it("are defined", function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed in the allFeeds object and
         * ensures it has a URL defined and that the URL is not empty. */
        it("should have a URL", function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* This test loops through each feed in the allFeeds object and
         * ensures it has a name defined and that the name is not empty. */
        it("should have a name", function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    /* This test suite tests the visibility of the menu*/
    describe("The menu", function() {

        const body = document.body;
        const menu = document.querySelector(".menu-icon-link");

        /* This test ensures the menu element is hidden by default. */
        it("is hidden by default", function() {
            expect(body.className).toContain("menu-hidden");
        });

        /* This test ensures that the menu changes visibility when
         * the menu icon is clicked. */
        it("hides and shows on click", function() {
            $(menu).trigger("click"); // first click on menu icon
            expect(body.className).not.toContain("menu-hidden");

            $(menu).trigger("click"); // second click on menu icon
            expect(body.className).toContain("menu-hidden");
        });
    });

    /* This test suite checks if the feed displays initial entries */
    describe("Initial Entries", function() {

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* This test ensures that when the loadFeed function is called
         * and completes its work, there is at least a single .entry element
         * within the .feed container. */

        it("feed loads at least one entry", function() {
            expect($(".entry").length).not.toBe(0);
        });
    });

    /* This test suite tests the mechanism of loading a new feed */
    describe("New Feed Selection", function() {
        let previousFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                previousFeed = document.querySelector(".feed").innerHTML;
                loadFeed(1, function() {
                    done();
                });
            });
        });

        /* This test ensures that when a new feed is loaded
         * by the loadFeed function, the content actually changes. */
        const newFeed = document.querySelector(".feed").innerHTML;

        it("content changes after reloading feed", function() {
            expect(newFeed).not.toEqual(previousFeed);
        });
    });

}());
