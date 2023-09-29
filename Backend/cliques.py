import numpy as np
import math
from qiskit_algorithms.eigensolvers import NumPyEigensolver, NumPyEigensolverResult
from qiskit.quantum_info.operators import Operator
from constants import DEFAULT_EIG_THRESHOLD, DEFAULT_CLIQUE_DIV

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
    return adj_matrix

def get_cliques_eig(
    eigenvalues: np.ndarray,
    eigenvectors: np.ndarray,
    eig_threshold: float = DEFAULT_EIG_THRESHOLD,
    clique_div: float = DEFAULT_CLIQUE_DIV
) -> list[list[int]]:
    """
    Probabilistically finds cliques in a graph using the eigenvectors of its adjacency matrix.
    Parameters:
        eigenvalues:    The eigenvalues of the graph's adjacency matrix
        eigenvectors:   The eigenvectors corresponding to each eigenvalue
        eig_threshold:  The threshold with which the algorithm considers an eigenvector a clique.
                        Increase this to make the algorithm more strict (produce less lists of
                        nodes, but each list is more likely to be a clique)
        clique_div:     Controls the threshold for which a node is considered part of a clique.
                        Increase this to make the algorithm produce cliques containing more nodes
                        but with less connectivity.
    Returns: A list of lists of vertices, where each list of vertices is a potential clique.
    """
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

def get_eig_quantum(
    matrix: np.ndarray,
) -> tuple[np.ndarray, np.ndarray]:
    """
    A quantum version of np.linalg.eigh(). Given an adjacency matrix for an undirected graph,
    which is Hermitian by definition. Computes its eigenvectors using a Variational Quantum
    Eigensolver.
    Parameters:
        matrix:         The matrix whose eigenvalues are to be found.
    Returns: A tuple containing eigenvalues and eigenvectors, respectively.
    """
    n: int = len(matrix)
    if n & (n - 1) != 0:
        n_padded: int = 2 ** math.ceil(math.log2(n))
    matrix_padded: np.ndarray = np.zeros((n_padded, n_padded))
    matrix_padded[:n, :n] = matrix
    q_operator: Operator = Operator(matrix_padded)
    eigensolver: NumPyEigensolver = NumPyEigensolver(k=n_padded)
    result: NumPyEigensolverResult = eigensolver.compute_eigenvalues(q_operator)
    eigenvectors: np.ndarray = np.empty((0, n_padded))
    for eigenvector in result.eigenstates:
        eigenvectors = np.vstack((eigenvectors, eigenvector.to_operator().to_matrix()[0]))
    return (result.eigenvalues, eigenvectors.T)

def get_cliques_spectral(adj_matrix: np.ndarray) -> list[list[int]]:
    """
    Given an adjacency matrix for an undirected graph, uses numpy to compute its eigenvalues
    and eigenvectors. Uses those eigenvalues and eigenvectors to look for cliques in the graph.
    Parameters:
        adj_matrix:     The diagonally symmetric adjacency matrix for the graph whose cliques
                        are to be found.
    Returns: The potential cliques for the graph.
    """
    eigenvalues: np.ndarray; eigenvectors: np.ndarray
    eigenvalues, eigenvectors = np.linalg.eigh(adj_matrix)
    return get_cliques_eig(eigenvalues, eigenvectors)

def get_cliques_spectral_quantum(adj_matrix: np.ndarray) -> list[list[int]]:
    """
    Given an adjacency matrix for an undirected graph, uses quantum computing to compute its
    eigenvalues and eigenvectors. Uses those eigenvalues and eigenvectors to look for cliques
    in the graph.
    Parameters:
        adj_matrix:     The diagonally symmetric adjacency matrix for the graph whose cliques are
                        to be found.
    Returns: The potential cliques for the graph.
    """
    eigenvalues: np.ndarray; eigenvectors: np.ndarray
    eigenvalues, eigenvectors = get_eig_quantum(adj_matrix)
    return get_cliques_eig(eigenvalues, eigenvectors)