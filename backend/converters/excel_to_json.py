import math


def clean_value(value):

    # Handle None
    if value is None:
        return None

    # Handle NaN / Inf
    if isinstance(value, float):

        if math.isnan(value):
            return None

        if math.isinf(value):
            return None

    return value


def parse_time_window(value):

    value = clean_value(value)

    if value is None:
        return [None, None]

    value = str(value)

    # Expected format:
    # 2025-05-06T07:00:00Z - 2025-05-06T19:00:00Z
    if " - " in value:

        parts = value.split(" - ")

        if len(parts) == 2:

            return [
                parts[0].strip(),
                parts[1].strip()
            ]

    # fallback
    return [value, value]


def convert_excel_to_json(excel_data):

    # Read first sheet
    sheet_name = list(excel_data.keys())[0]

    df = excel_data[sheet_name]

    # Remove hidden spaces from Excel headers
    df.columns = df.columns.str.strip()

    jobs = []
    vehicles = []

    # --------------------
    # JOBS
    # --------------------
    for index, row in df.iterrows():

        job = {
            "id": f"job_{index}",

            "pickups": [{
                "places": [{
                    "location": {
                        "lat": clean_value(row["Pickup Latitude"]),
                        "lng": clean_value(row["Pickup Longitude"])
                    },

                    "duration": clean_value(row["Service Time"]),

                    "times": [
                        parse_time_window(
                            row["Time window (s)"]
                        )
                    ]
                }],

                "demand": [
                    clean_value(row["Demand"])
                ]
            }],

            "deliveries": [{
                "places": [{
                    "location": {
                        "lat": clean_value(row["Delivery Latitude"]),
                        "lng": clean_value(row["Delivery Longitude"])
                    },

                    "duration": clean_value(row["Service Time"]),

                    "times": [
                        parse_time_window(
                            row["Time window (s)"]
                        )
                    ]
                }],

                "demand": [
                    clean_value(row["Demand"])
                ]
            }]
        }

        # Optional skills handling
        skills_allof = clean_value(row.get("Skills (allOf)"))

        if skills_allof:
            job["skills"] = {
                "allOf": [
                    s.strip()
                    for s in str(skills_allof).split(",")
                ]
            }

        jobs.append(job)

    # --------------------
    # VEHICLES
    # --------------------
    unique_vehicles = df.drop_duplicates(
        subset=["Vehicle ID"]
    )

    for _, row in unique_vehicles.iterrows():

        vehicle = {
            "vehicleId": clean_value(
                row["Vehicle ID"]
            ),

            "typeId": clean_value(
                row["Vehicle Type"]
            ),

            "profile": clean_value(
                row["Vehicle Profile"]
            ),

            "costs": {
                "fixed": clean_value(
                    row["Fixed Cost"]
                ),

                "distance": clean_value(
                    row["Cost per unit distance (m)"]
                ),

                "time": clean_value(
                    row["Cost per unit time (sec)"]
                )
            },

            "capacity": [
                clean_value(
                    row["Capacity"]
                )
            ],

            "shifts": [{
                "start": {
                    "time": clean_value(
                        row["Shift Start Time"]
                    ),

                    "location": {
                        "lat": clean_value(
                            row["Shift Start Latitude"]
                        ),

                        "lng": clean_value(
                            row["Shift Start Longitude"]
                        )
                    }
                },

                "end": {
                    "time": clean_value(
                        row["Shift End Time"]
                    ),

                    "location": {
                        "lat": clean_value(
                            row["Shift End Latitude"]
                        ),

                        "lng": clean_value(
                            row["Shift End Longitude"]
                        )
                    }
                }
            }]
        }

        # Optional vehicle skills
        vehicle_skills = clean_value(
            row.get("Skills")
        )

        if vehicle_skills:
            vehicle["skills"] = [
                s.strip()
                for s in str(vehicle_skills).split(",")
            ]

        vehicles.append(vehicle)

    # --------------------
    # FINAL JSON
    # --------------------
    return {
        "plan": {
            "jobs": jobs
        },

        "fleet": {
            "vehicles": vehicles
        }
    }