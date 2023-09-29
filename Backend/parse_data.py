import pandas as pd
import numpy as np
from scipy.spatial.distance import cdist

csv_url: str = 'https://gist.githubusercontent.com/rasesh-desai/6ff1e97245fee86089f5d5e98f886ddd/raw/fdb38a1f3553a1e401ed059f3d367bddc4258cf3/CA_W_S.csv'
def parse_data(
    csv_url: str,
    radius: float = 1,
    energy_threshold: float = 3
) -> tuple[list[str], np.ndarray]:
    """
    Parses the table data into a graph for which cliques can be found.
    Parameters:
        csv_url:            The URL for the CSV which is to be parsed
        radius:             The radius within which two cities will form edges with each other
        energy_threshod:    The maximum energy threshold within which two cities will form edges with each other
    Returns: List of city names and adjacency matrix for their respective graph.
    """
    df: pd.DataFrame = pd.read_csv(csv_url)
    df['Average Wind Speed'] = df['Average Wind Speed'].str.replace(' mph', '').astype('float64')

    nodes: pd.DataFrame = df[["City", "latitude", "lng", "Average Wind Speed", " Population"]]
    nodes['energy per capita'] = nodes['Average Wind Speed'] ** 3 / nodes[' Population']

    n: int = nodes.shape[0]
    names = list(df['City'])
    adj_matrix: np.ndarray = np.zeros((n, n))
    position_columns: list[str] = ['latitude', 'lng']
    distances: np.ndarray = cdist(nodes[position_columns], nodes[position_columns], metric='euclidean')

    radius: float = 1
    energy_threshold: float = 3
    for i in range(n):
        for j in range(i):
            if i == j: continue
            if distances[i][j] <= radius and \
               np.abs(nodes.at[i, 'energy per capita'] - 
                      nodes.at[j, 'energy per capita']) <= energy_threshold:
                adj_matrix[i][j] = 1
                adj_matrix[j][i] = 1
    return (names, adj_matrix)