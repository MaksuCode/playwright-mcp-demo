Feature: Shopping Cart

  Background:
    Given I am logged in as "test@test.com" with password "password123"

  Scenario: Empty cart shows message and disables checkout
    Given I am on the cart page
    Then the cart should be empty
    And the checkout button should be disabled

  Scenario: Cart shows added items with correct total
    Given I am on the products page
    And I add "Wireless Headphones" to the cart
    And I am on the cart page
    Then I should see "Wireless Headphones" in the cart
    And the cart total should be "$79.99"

  Scenario: Updating item quantity recalculates the total
    Given I am on the products page
    And I add "Wireless Headphones" to the cart
    And I am on the cart page
    When I update the quantity of "Wireless Headphones" to 3
    Then the cart total should be "$239.97"

  Scenario: Removing an item from the cart
    Given I am on the products page
    And I add "Wireless Headphones" to the cart
    And I add "Mechanical Keyboard" to the cart
    And I am on the cart page
    When I remove "Mechanical Keyboard" from the cart
    Then I should not see "Mechanical Keyboard" in the cart
    And the cart total should be "$79.99"

  Scenario: Checkout clears the cart and shows success message
    Given I am on the products page
    And I add "Wireless Headphones" to the cart
    And I am on the cart page
    When I click checkout
    Then I should see the order success message
    And the checkout button should be disabled
