#! /usr/bin/env python
"""
This is a Selenium script that will be used to programmatically test out the app.
"""
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
import time
from getpass import getpass

# get the username and password to use for logging in
login_user = input("Enter the username of the user you want to login as: ")
login_passwd = getpass(prompt="Enter in the password of that user: ")
# setup the webdriver
browser_options = webdriver.ChromeOptions()
browser_options.add_argument("--incognito")
browser = webdriver.Chrome(options=browser_options)
# Get the main page
try:
    browser.get("https://192.168.1.103:8000/")
    https_allow_button = browser.find_element_by_id("details-button")
    https_allow_button.click()
    proceed = browser.find_element_by_id("proceed-link")
    proceed.click()
    time.sleep(4.0)
    main_title = browser.find_element_by_tag_name("h1")
except Exception as e:
    print("Could not load the web page. Please check your React code")
    browser.close()

# click on the login page
try:
    login_link = browser.find_element_by_link_text("Login")
    login_link.click()
    time.sleep(0.5)
    # enter in the login information
    username = browser.find_element_by_name("username")
    password = browser.find_element_by_name("password")
    login_button = browser.find_element_by_id("submit-login")
    username.send_keys(login_user)
    password.send_keys(login_passwd)
    login_button.click()
except Exception as e:
    print("Could not load the login page. Please check your React code")
    browser.close()
# send the login information
try:
    # wait for the browser to load the main page
    content = WebDriverWait(browser, 30).until(
        ec.presence_of_element_located((By.CLASS_NAME, "UserData"))
    )
    time.sleep(3.0)
except Exception as e:
    print("Sorry, we could not get the loaded content from the page...")
    browser.close()
time.sleep(4.0)
browser.quit()
