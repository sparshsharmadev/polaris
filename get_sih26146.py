import json, pypdf, sys

sys.stdout.reconfigure(encoding='utf-8')
reader = pypdf.PdfReader('ps.pdf')

# SIH26146 is on page 161 and possibly continues on 162
print("=== PAGE 161 ===")
print(reader.pages[160].extract_text())
print("\n=== PAGE 162 ===")
print(reader.pages[161].extract_text())
