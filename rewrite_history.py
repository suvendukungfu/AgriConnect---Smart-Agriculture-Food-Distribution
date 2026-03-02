import subprocess
import json
import os

repo_dir = "/Users/suvendusahoo/Desktop/a.griconnect/AgriConnect"
mapping_file = os.path.join(repo_dir, "commit_map.json")

with open(mapping_file, 'r') as f:
    mapping = json.load(f)

def run_git(args, cwd=repo_dir):
    result = subprocess.run(["git"] + args, cwd=cwd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error: {result.stderr}")
    return result.stdout.strip()

# Get all hashes in reverse (oldest first)
old_hashes = run_git(["log", "--oneline", "--reverse", "--format=%h"]).split("\n")

parent_commit = None

for h in old_hashes:
    # Get metadata from old commit
    author_name = run_git(["log", "-1", "--format=%an", h])
    author_email = run_git(["log", "-1", "--format=%ae", h])
    date = run_git(["log", "-1", "--format=%ad", h])
    
    # Get new message
    new_message = mapping.get(h, f"chore: update project ({h})")
    
    # Get the tree of the old commit
    tree_hash = run_git(["log", "-1", "--format=%T", h])
    
    # Create the new commit
    env = os.environ.copy()
    env["GIT_AUTHOR_NAME"] = author_name
    env["GIT_AUTHOR_EMAIL"] = author_email
    env["GIT_AUTHOR_DATE"] = date
    env["GIT_COMMITTER_NAME"] = author_name
    env["GIT_COMMITTER_EMAIL"] = author_email
    env["GIT_COMMITTER_DATE"] = date
    
    cmd = ["commit-tree", tree_hash, "-m", new_message]
    if parent_commit:
        cmd += ["-p", parent_commit]
    
    new_commit_hash = subprocess.run(["git"] + cmd, cwd=repo_dir, capture_output=True, text=True, env=env).stdout.strip()
    parent_commit = new_commit_hash
    print(f"Re-committed {h} -> {new_commit_hash}")

# Now add the final "Senior Implementation" changes (README, Banner)
# First we need to get the tree for the current state (with the new README/Banner)
run_git(["add", "."])
final_tree_hash = run_git(["write-tree"])

# Final commit with current state
env = os.environ.copy()
env["GIT_AUTHOR_NAME"] = "AgriConnect Architect"
env["GIT_AUTHOR_EMAIL"] = "architect@agriconnect.org"
# No need to override everything for the final one, let it be now

cmd = ["commit-tree", final_tree_hash, "-m", "chore: finalize professional documentation and branding system", "-p", parent_commit]
final_commit_hash = subprocess.run(["git"] + cmd, cwd=repo_dir, capture_output=True, text=True, env=env).stdout.strip()

# Update main to the new final commit
run_git(["update-ref", "refs/heads/main", final_commit_hash])
run_git(["checkout", "main"])

print(f"Final commit: {final_commit_hash}")
print("Successfully rewritten history like a senior level project!")
