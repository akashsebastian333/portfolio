#include <stdio.h>

#define MAX_NODES 20
#define INFINITY 999

typedef struct {
    unsigned dist[MAX_NODES];
    unsigned from[MAX_NODES];
} Node;

int main() {
    Node nodes[MAX_NODES];
    int costMatrix[MAX_NODES][MAX_NODES];
    int n, i, j, k, count;

    printf("Enter the number of nodes: ");
    scanf("%d", &n);

    printf("Enter the cost matrix (use %d for INFINITY):\n", INFINITY);
    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
            scanf("%d", &costMatrix[i][j]);
            if (i == j) {
                costMatrix[i][j] = 0;
            }
            nodes[i].dist[j] = costMatrix[i][j];
            nodes[i].from[j] = j;
        }
    }

    do {
        count = 0;
        for (i = 0; i < n; i++) {
            for (j = 0; j < n; j++) {
                for (k = 0; k < n; k++) {
                    if (nodes[i].dist[j] > costMatrix[i][k] + nodes[k].dist[j]) {
                        nodes[i].dist[j] = costMatrix[i][k] + nodes[k].dist[j];
                        nodes[i].from[j] = k;
                        count++;
                    }
                }
            }
        }
    } while (count != 0);

    for (i = 0; i < n; i++) {
        printf("\nState value for router %d\n", i + 1);
        for (j = 0; j < n; j++) {
            printf("Node %d via %d Distance %d\n", j + 1, nodes[i].from[j] + 1, nodes[i].dist[j]);
        }
    }

    return 0;
}
