/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         //using the for..of loop to loop through all feeds.
        it('URLs are defined and not empty', function(){
            for (const feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe(null);
            }
            
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('Names are defined and not empty', function(){
            for (const feed of allFeeds){
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe(null);
            }
            
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function(){
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         //toBE methode also can be used here but toContain is better for future updates
        let body = document.querySelector('body');
        it('element is hidden by default',function(){
            
            expect(body.className).toContain('menu-hidden');
        });
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          //faking two calls for the click event to test it.
        it('changes visibility when clicked', function(){
            $('.icon-list').click()
            expect(body.className).not.toContain('menu-hidden');
            $('.icon-list').click()
            expect(body.className).toContain('menu-hidden');
            //another way to perform the test using on expectation.
           /* let status = false
            $('.icon-list').on('click', function(){
                if(status === false){
                    status = true;
                }
                else {status = false;}
                
            });
            
            expect($('body').hasClass('menu-hidden')).not.toEqual(status);*/
            
            
        });
    });
        

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         //passing the done() function in the callback because it's async function
        let entriesList;
        beforeEach(function(done) {
                loadFeed(0, function(){
                    done();
                });
                entriesList = document.querySelector('.feed').getElementsByClassName('entry');    
        });

        it('has .entry element within .feed container when loadFeed function is called', function(done){
            expect(entriesList.length).not.toBe(0);
            done();
        });
    });
        

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        //getting the HTML content of the feed in two deffirent loads,
        //and compare it to make sure it is changing.
        let firstFeed,
            secondFeed;
        beforeEach(function(done){
            loadFeed(0, function(){
                firstFeed = document.querySelector('.feed').innerHTML;
                loadFeed(1, function(){
                    done();
                });
            });
        });
        it('will actually change when loaded with loadFeed()', function(done){
            secondFeed = document.querySelector('.feed').innerHTML;
            expect(firstFeed).not.toEqual(secondFeed);
            done();
        });
    });
        
}());
