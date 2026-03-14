Feature: Register

  Background:
    Given I am on the register page

  Scenario: Successful registration with valid details
    When I fill in the registration form with email "newuser@example.com" password "password123" and confirm password "password123"
    And I click the register button
    Then I should be redirected to the product listing page
    And I should see "newuser@example.com" in the header

  Scenario: Register with an already registered email
    When I fill in the registration form with email "test@test.com" password "password123" and confirm password "password123"
    And I click the register button
    Then I should see an error message "Email already registered"

  Scenario: Register with mismatched passwords
    When I fill in the registration form with email "newuser@example.com" password "password123" and confirm password "different"
    And I click the register button
    Then I should see an error message "Passwords do not match"

  Scenario: Register with empty email
    When I fill in the registration form with email "" password "password123" and confirm password "password123"
    And I click the register button
    Then I should see an error message "Email and password are required"

  Scenario: Register with empty password
    When I fill in the registration form with email "newuser@example.com" password "" and confirm password ""
    And I click the register button
    Then I should see an error message "Email and password are required"
