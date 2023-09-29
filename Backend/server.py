from flask import Flask, jsonify
from parse_data import fetch_process_format_data

app = Flask(__name__)
cities: list[dict[str, any]]; sorted_cliques: list[dict[str, any]]

@app.get('/data')
def get_data() -> str:
    """
    Endpoint to return clique data.
    """
    
    return jsonify({
        'Cities': cities,
        'Sorted Cliques': sorted_cliques
    })

if __name__ == '__main__':
    cities, sorted_cliques = fetch_process_format_data()
    app.run()
