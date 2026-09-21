import json, pypdf

with open('software_ps.json', 'r', encoding='utf-8') as f:
    ps_list = json.load(f)

reader = pypdf.PdfReader('ps.pdf')

def get_page_text(page_num):
    if 0 <= page_num - 1 < len(reader.pages):
        return reader.pages[page_num - 1].extract_text()
    return ""

# Let's inspect NTRO and ISRO and Defence PSs
interesting_ps = []
for p in ps_list:
    full_text = get_page_text(p['page'])
    org = p.get('org', '')
    theme = p.get('theme', '')
    title = p.get('title', '')
    code = p.get('ps_code', '')
    
    interesting_ps.append({
        'code': code,
        'org': org,
        'theme': theme,
        'title': title,
        'page': p['page'],
        'desc_snippet': full_text[:1200]
    })

print(f"Total processed: {len(interesting_ps)}")

# Let's search for NTRO
ntro_ps = [p for p in interesting_ps if 'Technical Research' in p['org'] or 'NTRO' in p['desc_snippet']]
print(f"\n--- NTRO PS ({len(ntro_ps)}) ---")
for p in ntro_ps[:10]:
    print(f"[{p['code']}] {p['title']}")

# Let's search for ISRO
isro_ps = [p for p in interesting_ps if 'Space Research' in p['org'] or 'ISRO' in p['desc_snippet']]
print(f"\n--- ISRO PS ({len(isro_ps)}) ---")
for p in isro_ps[:10]:
    print(f"[{p['code']}] {p['title']}")

# Let's search for Defence
def_ps = [p for p in interesting_ps if 'Defence' in p['org'] or 'Defence' in p['desc_snippet']]
print(f"\n--- Defence PS ({len(def_ps)}) ---")
for p in def_ps[:10]:
    print(f"[{p['code']}] {p['title']}")

# Save detailed analysis
with open('interesting_summary.json', 'w', encoding='utf-8') as f:
    json.dump({
        'ntro': ntro_ps,
        'isro': isro_ps,
        'defence': def_ps
    }, f, indent=2, ensure_ascii=False)
