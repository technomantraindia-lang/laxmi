import sys

PDF = r"c:\Users\techn\Downloads\Laxmi_EnFab_Machinery_Equipment_Final_Editorial_Layout_SEO_Blueprint.pdf"
OUT = "_machinery_blueprint.txt"

text = None
lib = None
try:
    import pdfplumber
    pages = []
    with pdfplumber.open(PDF) as pdf:
        for i, p in enumerate(pdf.pages, 1):
            pages.append(f"===== PAGE {i} =====\n" + (p.extract_text() or ""))
    text = "\n\n".join(pages)
    lib = "pdfplumber"
except Exception as e1:
    try:
        from pypdf import PdfReader
        r = PdfReader(PDF)
        pages = [f"===== PAGE {i} =====\n" + (p.extract_text() or "") for i, p in enumerate(r.pages, 1)]
        text = "\n\n".join(pages)
        lib = "pypdf"
    except Exception as e2:
        try:
            import PyPDF2
            r = PyPDF2.PdfReader(PDF)
            pages = [f"===== PAGE {i} =====\n" + (p.extract_text() or "") for i, p in enumerate(r.pages, 1)]
            text = "\n\n".join(pages)
            lib = "PyPDF2"
        except Exception as e3:
            print("ALL FAILED:", e1, "|", e2, "|", e3)
            sys.exit(1)

with open(OUT, "w", encoding="utf-8") as f:
    f.write(text)
print(f"OK lib={lib} pages={text.count('===== PAGE')} chars={len(text)}")