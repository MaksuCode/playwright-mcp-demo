Feature: Checkout
  Authenticated users can place an order from their cart, receive a confirmation, and have their cart cleared on success.

  Scenario: Successful checkout with items in cart
    Given I am logged in as "test@test.com" with password "password123"
    And I add "Wireless Headphones" to the cart
    And I am on the cart page
    When I click checkout
    Then I should see the order success message

  Scenario: Cart is cleared after successful checkout
    Given I am logged in as "test@test.com" with password "password123"
    And I add "Wireless Headphones" to the cart
    And I am on the cart page
    When I click checkout
    Then the cart should be empty
    And the checkout button should be disabled

  Scenario: Order total is displayed correctly before checkout
    Given I am logged in as "test@test.com" with password "password123"
    And I add "Wireless Headphones" to the cart
    When I am on the cart page
    Then the cart total should be "$79.99"

  Scenario: Cannot checkout with an empty cart
    Given I am logged in as "test@test.com" with password "password123"
    And I am on the cart page
    Then the cart should be empty
    And the checkout button should be disabled

  Scenario: Unauthenticated user is redirected from the cart page
    Given I am not logged in
    When I am on the cart page
    Then I should be redirected to the login page
