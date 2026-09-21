import json, pypdf, sys

sys.stdout.reconfigure(encoding='utf-8')
reader = pypdf.PdfReader('ps.pdf')

candidates = ['SIH26167', 'SIH26146', 'SIH26151', 'SIH26152', 'SIH26176', 'SIH26143', 'SIH26012', 'SIH26175']

with open('software_ps.json', 'r', encoding='utf-8') as f:
    ps_list = json.load(f)

ps_map = {p['ps_code']: p for p in ps_list}

for code in candidates:
    if code in ps_map:
        page = ps_map[code]['page']
        text = reader.pages[page - 1].extract_text()
        print(f"\n==================== {code} (Page {page}) ====================")
        print(text[:1400])
