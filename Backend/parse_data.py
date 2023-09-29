import pandas as pd
import numpy as np
from scipy.spatial.distance import cdist
from cliques import get_cliques_spectral_quantum
from constants import DEFAULT_RADIUS, DEFAULT_ENERGY_THRESHOLD, CSV_URL
def parse_data(
    csv_url: str = CSV_URL,
    radius: float = DEFAULT_RADIUS,
    energy_threshold: float = DEFAULT_ENERGY_THRESHOLD
) -> tuple[pd.DataFrame, np.ndarray]:
    """
    Parses the table data into a graph for which cliques can be found.
    Parameters:
        csv_url:            The URL for the CSV which is to be parsed
        radius:             The radius within which two cities will form edges with each other
        energy_threshod:    The maximum energy threshold within which two cities will form edges
                            with each other
    Returns: List of city names and adjacency matrix for their respective graph.
    """
    print("Fetching Data...")
    df: pd.DataFrame = pd.read_csv(csv_url)
    df['Average Wind Speed'] = df['Average Wind Speed'].str.replace(' mph', '').astype('float64')

    nodes: pd.DataFrame = df[["City", "latitude", "lng", "Average Wind Speed", " Population"]] \
                            .rename(columns={
                                "latitude" : 'Latitude',
                                'lng' : 'Longitude',
                                ' Population' : 'Population'
                            })
    nodes['Wind Cubed Per Capita'] = nodes['Average Wind Speed'] ** 3 / nodes['Population']
    print("Data Fetched! Generating graph...")
    n: int = nodes.shape[0]
    adj_matrix: np.ndarray = np.zeros((n, n))
    position_columns: list[str] = ['Latitude', 'Longitude']
    distances: np.ndarray = cdist(
        nodes[position_columns],
        nodes[position_columns],
        metric='euclidean'
    )

    radius: float = 1
    energy_threshold: float = 3
    for i in range(n):
        for j in range(i):
            if i == j: continue
            if distances[i][j] <= radius and \
               np.abs(nodes.at[i, 'Wind Cubed Per Capita'] - 
                      nodes.at[j, 'Wind Cubed Per Capita']) <= energy_threshold:
                adj_matrix[i][j] = 1
                adj_matrix[j][i] = 1
    return (nodes, adj_matrix)


def fetch_process_format_data() -> tuple[list[dict[str, any]], list[dict[str, any]]]:
    """
    Fetches the data from the CSV URL in constants.py and processes the data into a graph.
    Probablistically finds potential cliques in this graph using quantum eigen decomposition.
    Returns: The data in a format that will be returned by an API call
    """
    city_data: pd.DataFrame; adj_matrix: np.ndarray
    city_data, adj_matrix = parse_data()
    cities: list[dict[str, any]] = city_data[[
        'City',
        'Latitude',
        'Longitude',
        'Wind Cubed Per Capita']].to_dict(orient='records')
    print("Graph generated! Finding cliques...")
    clique_vertices: list[list[int]] = get_cliques_spectral_quantum(adj_matrix)
    clique_cities: list[dict[str, any]] = []
    for clique in clique_vertices:
        clique_city_names: list[str] = city_data.iloc[clique]['City'].tolist()
        clique_mean_wind_cubed: float = np.mean(city_data.iloc[clique]['Wind Cubed Per Capita'])
        clique_cities.append({
            'Cities' : clique_city_names,
            'Mean Wind Cubed Per Capita': clique_mean_wind_cubed
        })
    sorted_cliques: list[dict[str, any]] = sorted(
        clique_cities,
        key=lambda x: x['Mean Wind Cubed Per Capita'],
        reverse=True
    )
    print("Cliques fetched! Starting endpoint...")
    return (cities, sorted_cliques)