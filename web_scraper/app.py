from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

# Set up the Selenium WebDriver
options = webdriver.ChromeOptions()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')


def scrape_amazon(url):
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    driver.get(url)
    time.sleep(5)  # Wait for the page to load

    product_info = {
        "title": "",
        "image": "",
        "specs": "",
        "price": ""
    }

    try:
        product_info["title"] = driver.find_element(By.CLASS_NAME, "product-title-word-break").text
    except Exception as e:
        print("Amazon Product title not found:", e)

    try:
        product_info["image"] = driver.find_element(By.ID, "landingImage").get_attribute('src')
    except Exception as e:
        print("Amazon Product image not found:", e)

    try:
        specs = driver.find_element(By.ID, "feature-bullets")
        ul = specs.find_element(By.TAG_NAME, "ul")
        li_elements = ul.find_elements(By.TAG_NAME, "li")
        product_info["specs"] = ' '.join([li.text for li in li_elements])
    except Exception as e:
        print("Amazon Product specs not found:", e)

    try:
        price_div = driver.find_element(By.CLASS_NAME, "priceToPay")
        spans = price_div.find_elements(By.TAG_NAME, "span")[1].find_elements(By.TAG_NAME, "span")
        price = spans[1].text
        currency = spans[0].text
        product_info["price"] = f"{currency} {price}"
    except Exception as e:
        print("Amazon Product price not found:", e)

    driver.quit()
    return product_info


def scrape_flipkart(url):
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    driver.get(url)
    time.sleep(5)  # Wait for the page to load

    product_info = {
        "title": "",
        "image": "",
        "specs": "",
        "price": ""
    }

    try:
        product_info["title"] = driver.find_element(By.CLASS_NAME, "VU-ZEz").text
    except Exception as e:
        print("Flipkart Product title not found:", e)

    try:
        product_info["image"] = driver.find_element(By.CLASS_NAME, "DByuf4").get_attribute('src')
    except Exception as e:
        print("Flipkart Product image not found:", e)

    try:
        specs = driver.find_element(By.CLASS_NAME, "xFVion")
        ul = specs.find_element(By.TAG_NAME, "ul")
        li_elements = ul.find_elements(By.TAG_NAME, "li")
        product_info["specs"] = ' '.join([li.text for li in li_elements])
    except Exception as e:
        print("Flipkart Product specs not found:", e)

    try:
        product_info["price"] = driver.find_element(By.CLASS_NAME, "Nx9bqj").text
    except Exception as e:
        print("Flipkart Product price not found:", e)

    driver.quit()
    return product_info


def scrape(url):
    try:
        if "amazon" in url:
            product_info = scrape_amazon(url)
        elif "flipkart" in url:
            product_info = scrape_flipkart(url)
        else:
            raise ValueError("The URL is not an Amazon or Flipkart product page.")

        print(product_info)
        return product_info
    except Exception as e:
        print(f"Error: {e}")
        return {"error": str(e)}


if __name__ == "__main__":
    # Example URLs (replace with actual product URLs for testing)
    url = input("Enter the product URL: ")
    result = scrape(url)
    print(result)
