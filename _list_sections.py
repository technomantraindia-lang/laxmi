import re
t = open('_machinery_blueprint.txt', encoding='utf-8').read().splitlines()
for i, l in enumerate(t):
    s = l.strip()
    if re.match(r'^(H1|H2|H3|SECTION|Page \d|PAGE \d|CTA|Footer|Nav)', s) or re.match(r'^\d+\.\s', s):
        print(f'{i+1}: {s}')