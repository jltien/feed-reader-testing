/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    describe('RSS Feeds', function () {
        // Checks that allFeeds is defined 
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Checks all feeds have a URL
        it('URLs defined and not empty', function () {
            for (feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        // Checks all feeds have a name
        it('names defined and not empty', function () {
            for (feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });

    describe('The menu', function () {
        // Checks menu is hidden by default
        it('hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // Checks the menu toggles when clicked on
        it('menu visibility toggles', function () {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function () {
        // Checks there is at least one entry 
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });
        it('have at least a single entry element', function (done) {
            expect($('.feed').has('.entry').length).not.toBe(0);
            done();
        });
    });

    describe('New Feed Selection', function () {
        // Checks that the feed content actually changes
        let oldFeed, newFeed;
        beforeEach(function (done) {
            loadFeed(0, function () {
                oldFeed = document.querySelector('.feed').innerHTML;
                loadFeed(1, function () {
                    newFeed = document.querySelector('.feed').innerHTML;
                    done();
                });
            });
        });
        it('content actually changes with new feed', function (done) {
            expect(oldFeed).not.toEqual(newFeed);
            done();
        });
    });
}());
