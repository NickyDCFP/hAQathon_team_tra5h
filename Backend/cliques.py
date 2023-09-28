import numpy as np
import networkx as nx

def get_sample_graph() -> np.ndarray:
    """
    Generates an adjacency matrix for a sample graph with a rough clique.
    """
    graph_size: int = 100
    adj_matrix: np.ndarray = np.random.randint(0, 1, (graph_size, graph_size))
    for i in range(graph_size // 2):
        for j in range(graph_size // 2):
            adj_matrix[i][j] = adj_matrix[j][i]
    for i in range(10):
        for j in range(10):
            adj_matrix[i][j] = 1
            adj_matrix[j][i] = 1
    adj_matrix[5][6] = 0
    adj_matrix[6][5] = 0
    adj_matrix[11][2] = 1
    adj_matrix[2][11] = 1
    for i in range(100):
        adj_matrix[i][i] = 0

def get_cliques_deterministic(adj_matrix: np.ndarray) -> list[list[int]]:
    """
    Deterministically finds cliques in a graph, for reference, using its adjacency matrix.
    Parameters:
        adj_matrix:     The adjacency matrix for the graph whose cliques are to be found
    """
    graph: nx.Graph = nx.Graph(adj_matrix)
    cliques: list[list[int]] = list(nx.find_cliques(graph))
    return cliques

def get_cliques_eig(
    adj_matrix: np.ndarray,
    eig_threshold: float = 0.7,
    clique_div: float = 5
) -> list[list[int]]:
    """
    Probabilistically finds cliques in a graph using the eigenvectors of its adjacency matrix.
    Parameters:
        adj_matrix:     The adjacency matrix for the graph whose cliques are to be found
        eig_threshold:  The threshold with which the algorithm considers an eigenvector a clique.
                        Increase this to make the algorithm more strict (produce less lists of
                        nodes, but each list is more likely to be a clique)
        clique_div:     Controls the threshold for which a node is considered part of a clique.
                        Increase this to make the algorithm produce cliques containing more nodes
                        but with less connectivity.
    """
    eigenvalues, eigenvectors = np.linalg.eigh(adj_matrix)
    cliques: list[list[int]] = []
    for i in range(len(eigenvalues)):
        if eigenvalues[i] > eig_threshold:
            vertices: dict[int, float] = {} # maps vertex to respective value in eigenvector
            max_eig: float = 0 # the max value in the eigenvector for comparison to other nodes
            for j in range(len(eigenvectors[:, i])):
                eigenvector_value: float = abs(eigenvectors[j, i])
                if not eigenvector_value: continue
                vertices[j] = eigenvector_value
                max_eig = max(max_eig, eigenvector_value)
            cliques.append([vertex for vertex in vertices.keys()
                            if vertices[vertex] >= max_eig / clique_div])
    return cliques

adj_matrix: np.ndarray = get_sample_graph()
# print(get_cliques_deterministic(adj_matrix))
cliques_eig: list[list[int]] = get_cliques_eig(adj_matrix)
for clique in cliques_eig:
    print(f'Clique: {clique}\n')