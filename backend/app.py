from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

# Sample sneaker retailer URLs (Modify as needed)
RETAILERS = {
    "StockX": "https://stockx.com/sneakers",
    "GOAT": "https://www.goat.com/sneakers",
    "FlightClub": "https://www.flightclub.com/sneakers"
}

def fetch_prices(sneaker_name):
    results = []
    for retailer, url in RETAILERS.items():
        search_url = f"{url}?q={sneaker_name.replace(' ', '+')}"
        response = requests.get(search_url, headers={"User-Agent": "Mozilla/5.0"})
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            price_tag = soup.find(class_="price")  # Modify based on actual site structure
            if price_tag:
                price = price_tag.text.strip()
                results.append({"retailer": retailer, "price": price, "link": search_url})
    return results

@app.route('/search', methods=['GET'])
def search():
    sneaker_name = request.args.get('query')
    if not sneaker_name:
        return jsonify({"error": "No search term provided"})
    
    prices = fetch_prices(sneaker_name)
    return jsonify(prices)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
