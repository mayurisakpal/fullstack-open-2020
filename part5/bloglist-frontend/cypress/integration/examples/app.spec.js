describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/testing/reset');
    const user = {
      name: 'Michael Scott',
      username: 'worldsBestBoss',
      password: 'dementors',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function () {
    cy.contains('Blogs');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.login({ username: 'worldsBestBoss', password: 'dementors' });
      cy.contains('Michael Scott logged in!');
      cy.get('[data-test-id="logout"]').click();
    });

    it('fails with wrong credentials', function () {
      cy.login({ username: 'worldsBestBoss', password: 'wrongPassword' });
      cy.get('.notification--error')
        .contains('Wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .should('have.css', 'border-color', 'rgb(255, 0, 0)');
    });
  });

  describe('when logged in', function () {
    beforeEach(function () {
      // login and create a blog for use
      cy.login({ username: 'worldsBestBoss', password: 'dementors' });
      cy.contains('Create new Blog').click();
      cy.get('#title').type('Cypress title');
      cy.get('#author').type('Cypress author');
      cy.get('#url').type('www.internet.com');
      cy.get('[data-test-id="create"]').click();
    });

    it('a new blog can be created and gets added to the existing blog list', function () {
      cy.contains('Create new Blog').click();
      cy.get('#title').type('Cypress title 2');
      cy.get('#author').type('Cypress author 2');
      cy.get('#url').type('www.internet.com');
      cy.get('[data-test-id="create"]').click();
      cy.contains('A new blog Cypress title 2, by Cypress author 2 added');

      // check if blog list exist
      cy.get('[data-test-id="blogListWrapper"]')
        .children()
        .should('have.length', 2);
    });

    it('user can like a blog', function () {
      cy.get('[data-test-id="toggleBlog"]').click();
      // click on the like button
      cy.contains('Like').click();
      // check if value of like has increased
      cy.get('[data-test-id="blogDetailsList"]>li').eq(1).contains('Likes 1');
    });

    it('user who created a blog can delete it', function () {
      cy.get('[data-test-id="toggleBlog"]').click();
      cy.get('[data-test-id="removeBlog"]').click();
      // should not show list wrapper since we deleted the blogs
      cy.get('[data-test-id="blogListWrapper"]').should('not.exist');
    });

    it("user who isn't creator of blog, can't delete it", function () {
      cy.get('[data-test-id="logout"]').click();
      const user = {
        name: 'Stanely',
        username: 'stanely',
        password: 'didIStutter',
      };
      cy.request('POST', 'http://localhost:3001/api/users/', user);
      cy.login({ username: 'stanely', password: 'didIStutter' });
      cy.get('[data-test-id="toggleBlog"]').click();
      // should not show Remove button for to user other than creator
      cy.get('[data-test-id="removeBlog"]').should('not.exist');
    });

    it('blogs list should be in descending order of their likes', function () {
      const blogContentArray = [
        {
          title: 'title 2',
          author: 'author 2',
          url: 'www.url2.com',
          likes: 16,
        },
        {
          title: 'title 3',
          author: 'author 3',
          url: 'www.url3.com',
          likes: 32,
        },
        {
          title: 'title 4',
          author: 'author 4',
          url: 'www.url4.com',
          likes: 8,
        },
      ];
      for (let i = 0; i < blogContentArray.length; i++) {
        cy.createBlog(blogContentArray[i]);
      }
      const listLength = blogContentArray.length + 1;
      // check if list of blogs exist
      cy.get('[data-test-id="blogListWrapper"]')
        .children()
        .should('have.length', listLength);
      // click view button of blog list to open like option, as liked button rendered after view button is clicked
      cy.get('[data-test-id="blogListWrapper"]>div').then((list) => {
        for (let i = 0; i < list.length; i++) {
          cy.get('[data-test-id="toggleBlog"]').eq(i).click();
        }
      });
      // loop through the list and check if likes of current list item is greater than next item
      cy.get('[data-test-id="blogListWrapper"]>div').then((list) => {
        for (let i = 0; i < list.length - 1; i++) {
          const currentLikes = list.find('[data-test-id="blogLikes"]')[i]
            .innerText;
          const nextLikes = list.find('[data-test-id="blogLikes"]')[i + 1]
            .innerText;
          expect(Number(currentLikes)).to.be.gt(Number(nextLikes));
        }
      });
    });
  });
});
