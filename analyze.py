import json

with open('software_ps.json', 'r', encoding='utf-8') as f:
    ps_list = json.load(f)

print(f"Total parsed: {len(ps_list)}")

themes = {}
orgs = {}
for p in ps_list:
    t = p.get('theme', 'Unknown')
    o = p.get('org', 'Unknown')
    themes[t] = themes.get(t, 0) + 1
    orgs[o] = orgs.get(o, 0) + 1

print("\n--- Themes Distribution ---")
for t, c in sorted(themes.items(), key=lambda x: x[1], reverse=True):
    print(f"  {t}: {c}")

print("\n--- Top Organizations ---")
for o, c in sorted(orgs.items(), key=lambda x: x[1], reverse=True)[:10]:
    print(f"  {o}: {c}")

print("\n--- Sample PSs ---")
for p in ps_list[:15]:
    print(f"{p['ps_code']} | {p['org'][:30]} | {p['theme'][:20]} | {p['title']}")
