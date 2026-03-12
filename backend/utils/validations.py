def validate_request(data):
    """
    Validates internship input from frontend sliders.
    Returns (True, None) if valid.
    Returns (False, error_message) if invalid.
    """

    if not isinstance(data, list):
        return False, "Input must be a list of internships."

    if not (2 <= len(data) <= 4):
        return False, "You must provide between 2 and 4 internships."

    required_fields = [
        "name",
        "stipend",
        "workload",
        "company_reputation",
        "time_flexibility"
    ]

    for internship in data:

        # Check required fields exist
        for field in required_fields:
            if field not in internship:
                return False, f"Missing field: {field}"

        # Validate slider values (1–5)
        numeric_fields = required_fields[1:]

        for field in numeric_fields:
            value = internship[field]

            if not isinstance(value, (int, float)):
                return False, f"{field} must be numeric."

            if value < 1 or value > 5:
                return False, f"{field} must be between 1 and 5."

    return True, None
