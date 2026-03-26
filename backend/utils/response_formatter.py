def format_response(name, cluster_id, insight):
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
        "differentiator": None
    }
