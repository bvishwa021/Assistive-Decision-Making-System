def format_response(name, cluster_id, insight, raw_values):
    """
    Formats final response structure for frontend.
    """
    return {
        "internship_name": name,
        "cluster_id": cluster_id,
        "category": insight["label"],
        "core": insight["core"],
        "highlights": insight["highlights"],
        "tradeoffs": insight["tradeoffs"],
        "reflection_prompts": insight["reflection_prompts"],
        "differentiator": None,
        "values": {
            "stipend": raw_values[0],
            "workload": raw_values[1],
            "company_reputation": raw_values[2],
            "time_flexibility": raw_values[3]
        }
    }
