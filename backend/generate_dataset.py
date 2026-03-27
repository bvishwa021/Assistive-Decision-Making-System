import numpy as np
import pandas as pd

np.random.seed(42)
n_per_cluster = 40

# Features: stipend_satisfaction, workload_intensity, company_reputation, time_flexibility
# Scale: 1–5 (integers)
# Note: workload_intensity — higher = more intense (harder)
#       time_flexibility — higher = more flexible (easier)

def randint_cluster(low, high, size):
    """inclusive both ends, 1-5 scale"""
    return np.random.randint(low, high + 1, size)

# ── Cluster 2: High-Pressure, High-Reward ─────────────────────────────────────
# high stipend, high workload, high reputation, very low flexibility
c2_stipend     = randint_cluster(4, 5, n_per_cluster)
c2_workload    = randint_cluster(4, 5, n_per_cluster)
c2_reputation  = randint_cluster(4, 5, n_per_cluster)
c2_flexibility = randint_cluster(1, 2, n_per_cluster)

# ── Cluster 0: Balanced & Brand-Oriented ──────────────────────────────────────
# moderate stipend, low-moderate workload, high reputation, high flexibility
c0_stipend     = randint_cluster(2, 3, n_per_cluster)
c0_workload    = randint_cluster(2, 3, n_per_cluster)
c0_reputation  = randint_cluster(4, 5, n_per_cluster)
c0_flexibility = randint_cluster(4, 5, n_per_cluster)

# ── Cluster 3: Low-Intensity, Flexible ────────────────────────────────────────
# low stipend, low workload, low reputation, high flexibility
c3_stipend     = randint_cluster(1, 2, n_per_cluster)
c3_workload    = randint_cluster(1, 2, n_per_cluster)
c3_reputation  = randint_cluster(1, 2, n_per_cluster)
c3_flexibility = randint_cluster(4, 5, n_per_cluster)

# ── Cluster 1: Demanding & Time-Intensive Grind ───────────────────────────────
# moderate stipend, high workload, moderate reputation, very low flexibility
c1_stipend     = randint_cluster(2, 3, n_per_cluster)
c1_workload    = randint_cluster(4, 5, n_per_cluster)
c1_reputation  = randint_cluster(2, 3, n_per_cluster)
c1_flexibility = randint_cluster(1, 2, n_per_cluster)

# ── Assemble DataFrame ────────────────────────────────────────────────────────
clusters = []
for label, s, w, r, f in [
    (2, c2_stipend, c2_workload, c2_reputation, c2_flexibility),
    (0, c0_stipend, c0_workload, c0_reputation, c0_flexibility),
    (3, c3_stipend, c3_workload, c3_reputation, c3_flexibility),
    (1, c1_stipend, c1_workload, c1_reputation, c1_flexibility),
]:
    df_chunk = pd.DataFrame({
        "stipend_satisfaction": s,
        "workload_intensity":   w,
        "company_reputation":   r,
        "time_flexibility":     f,
        "true_cluster":         label
    })
    clusters.append(df_chunk)

dataset = pd.concat(clusters, ignore_index=True)
dataset = dataset.sample(frac=1, random_state=42).reset_index(drop=True)  # shuffle

print(dataset.describe())
print("\nCluster counts:\n", dataset["true_cluster"].value_counts().sort_index())
print("\nPer-cluster means:")
print(dataset.groupby("true_cluster")[["stipend_satisfaction","workload_intensity","company_reputation","time_flexibility"]].mean().round(2))

dataset.to_csv("internship_clusters_dataset_v2.csv", index=False)
print("\nSaved to internship_clusters_dataset_v2.csv")
