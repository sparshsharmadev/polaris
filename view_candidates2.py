import json, pypdf, sys

sys.stdout.reconfigure(encoding='utf-8')
reader = pypdf.PdfReader('ps.pdf')

for code, page in [('SIH26167', 183), ('SIH26146', 161)]:
    text = reader.pages[page - 1].extract_text()
    print(f"\n==================== {code} (Page {page}) ====================")
    print(text[:1500])
