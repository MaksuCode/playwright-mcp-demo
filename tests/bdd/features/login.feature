Feature: Login
  Background:
    Given I am on the login page

  Scenario: Successful login with valid credentials
    When I enter email "test@test.com" and password "password123"
    And I click the login button
    Then I should be redirected to the product listing page
    And I should see "test@test.com" in the header

  Scenario: Login with wrong password
    When I enter email "test@test.com" and password "wrongpassword"
    And I click the login button
    Then I should see an error message "Invalid email or password"

  Scenario: Login with non-existent email
    When I enter email "nobody@example.com" and password "password123"
    And I click the login button
    Then I should see an error message "Invalid email or password"

  Scenario: Login with empty email field
    When I enter email "" and password "password123"
    And I click the login button
    Then I should see an error message "Email and password are required"

  Scenario: Login with empty password field
    When I enter email "test@test.com" and password ""
    And I click the login button
    Then I should see an error message "Email and password are required"
