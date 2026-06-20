import os
import json

def compile_readmes():
    workspace_dir = os.path.dirname(os.path.abspath(__file__))
    readme_dir = os.path.join(workspace_dir, "projects_readme_Card")
    output_js = os.path.join(workspace_dir, "assets", "project_readmes.js")
    
    # Map project shortName to relative markdown path
    readme_map = {
        "Megam": os.path.join("megam", "README.md"),
        "MotorMony": os.path.join("Car_recomendation_system", "README.md"),
        "Re:Vive": os.path.join("Revive", "README.md"),
        "PolyVault": os.path.join("polyvault", "README.md"),
        "DeskBot": os.path.join("deskbot", "README.md"),
        "L.U.D.O": os.path.join("personal_AI_assistent", "README.md"),
        "Space Debris": os.path.join("space-debris-prediction", "README.md"),
        "Attendance": "Readme.md" # Root readme in projects_readme_Card
    }
    
    project_readmes = {}
    
    for short_name, rel_path in readme_map.items():
        full_path = os.path.join(readme_dir, rel_path)
        if os.path.exists(full_path):
            print(f"Compiling README for {short_name} from {full_path}")
            try:
                with open(full_path, "r", encoding="utf-8") as f:
                    content = f.read()
                project_readmes[short_name] = content
            except Exception as e:
                print(f"Error reading {full_path}: {e}")
        else:
            print(f"Warning: README for {short_name} not found at {full_path}")
            
    # Serialize as a JSON-compatible JS constant declaration
    js_content = f"const PROJECT_READMES = {json.dumps(project_readmes, indent=2)};\n"
    
    # Ensure assets directory exists
    os.makedirs(os.path.dirname(output_js), exist_ok=True)
    
    with open(output_js, "w", encoding="utf-8") as f:
        f.write(js_content)
    print(f"Successfully wrote compiled readmes to {output_js}")

if __name__ == "__main__":
    compile_readmes()
