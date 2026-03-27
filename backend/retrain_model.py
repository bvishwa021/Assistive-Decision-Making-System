import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
import joblib

# ── Load new dataset ──────────────────────────────────────────────────────────
df = pd.read_csv("internship_clusters_dataset_v2.csv")
features = ["stipend_satisfaction", "workload_intensity", "company_reputation", "time_flexibility"]
X = df[features].values

# ── Scale ─────────────────────────────────────────────────────────────────────
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# ── Train KMeans ──────────────────────────────────────────────────────────────
kmeans = KMeans(n_clusters=4, random_state=42, n_init=10)
kmeans.fit(X_scaled)

labels = kmeans.labels_
sil = silhouette_score(X_scaled, labels)
print(f"Silhouette Score: {sil:.4f}  (closer to 1.0 = well-separated clusters)")

# ── Verify cluster centroids make sense ───────────────────────────────────────
centroids_scaled = kmeans.cluster_centers_
centroids_original = scaler.inverse_transform(centroids_scaled)
centroid_df = pd.DataFrame(centroids_original, columns=features)
centroid_df.index.name = "cluster"
print("\nCluster centroids (original 1-5 scale):")
print(centroid_df.round(2))

# ── Check which KMeans label maps to which archetype ─────────────────────────
print("\nKMeans label → archetype mapping (based on centroid inspection):")
for i, row in centroid_df.iterrows():
    s, w, r, f = row["stipend_satisfaction"], row["workload_intensity"], row["company_reputation"], row["time_flexibility"]
    if s >= 4 and w >= 4 and r >= 4 and f <= 2:
        archetype = "High-Pressure High-Reward (JSON key: '2')"
    elif s <= 2 and w <= 2 and r >= 4 and f >= 4:
        archetype = "Balanced & Brand-Oriented (JSON key: '0')"
    elif s <= 2 and w <= 2 and r <= 2 and f >= 4:
        archetype = "Low-Intensity Flexible (JSON key: '3')"
    elif s <= 3 and w >= 4 and r <= 3 and f <= 2:
        archetype = "Demanding Grind (JSON key: '1')"
    else:
        archetype = "⚠️  Ambiguous — inspect manually"
    print(f"  KMeans label {i}: {archetype}  | stipend={s:.1f} workload={w:.1f} rep={r:.1f} flex={f:.1f}")

# ── Save ──────────────────────────────────────────────────────────────────────
joblib.dump(scaler, "scaler_v2.pkl")
joblib.dump(kmeans, "kmeans_model_v2.pkl")
print("\nSaved scaler_v2.pkl and kmeans_model_v2.pkl")
print("IMPORTANT: Check the mapping above and update cluster_insights.json keys if needed.")
