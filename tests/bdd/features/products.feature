Feature: Product Listing

  Background:
    Given I am logged in as "test@test.com" with password "password123"
    And I am on the products page

  Scenario: All products are shown by default
    Then I should see at least 1 product

  Scenario: Filter by Electronics shows only electronics products
    When I filter products by "Electronics"
    Then I should see at least 1 product
    And all visible products should be in the "electronics" category

  Scenario: Filter by Apparel shows only apparel products
    When I filter products by "Apparel"
    Then I should see at least 1 product
    And all visible products should be in the "apparel" category

  Scenario: Resetting filter to All shows all products
    Given I note the current product count as "total"
    When I filter products by "Electronics"
    And I filter products by "All"
    Then I should see the same number of products as "total"

  Scenario: Adding a product to cart updates the cart count
    When I add "Wireless Headphones" to the cart
    Then the cart count should be 1

  Scenario: Adding multiple products increments the cart count
    When I add "Wireless Headphones" to the cart
    And I add "Mechanical Keyboard" to the cart
    Then the cart count should be 2
