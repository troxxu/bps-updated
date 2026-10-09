import json
import csv
import io
import re
import urllib.request
import ssl

BPH_SHEETS = {
    "ilman": {
        "bphKey": "ilman",
        "evaluatorName": "Ilman Afif Al Arif",
        "evaluatorRole": "Ketua BEM FTEIC 2026",
        "evaluatorFoto": "assets/foto-staf/bph-001.jpg",
        "docId": "1RXy_XyeSlQrlfYWjO5EEHXZzYCajZNQYeXKasfA31_w",
        "gid": "619966376",
        "sheetUrl": "https://docs.google.com/spreadsheets/d/1RXy_XyeSlQrlfYWjO5EEHXZzYCajZNQYeXKasfA31_w/edit#gid=619966376"
    },
    "mirza": {
        "bphKey": "mirza",
        "evaluatorName": "Muhammad Mirza Zaidan 'Ilma",
        "evaluatorRole": "Sekretaris Jenderal 1",
        "evaluatorFoto": "assets/foto-staf/bph-002.jpg",
        "docId": "19n67m57FSuNN-vl0URbHYG5fuCBDmIok4mTwzcMsQQU",
        "gid": "619966376",
        "sheetUrl": "https://docs.google.com/spreadsheets/d/19n67m57FSuNN-vl0URbHYG5fuCBDmIok4mTwzcMsQQU/edit#gid=619966376"
    },
    "bramantio": {
        "bphKey": "bramantio",
        "evaluatorName": "Bramantio Ramayudha",
        "evaluatorRole": "Sekretaris Jenderal 2",
        "evaluatorFoto": "assets/foto-staf/bph-003.jpg",
        "docId": "13JA9jiN_Hq5mcz8_R1YC2jvtHnTncwxqBEoIuLpS7VY",
        "gid": "619966376",
        "sheetUrl": "https://docs.google.com/spreadsheets/d/13JA9jiN_Hq5mcz8_R1YC2jvtHnTncwxqBEoIuLpS7VY/edit#gid=619966376"
    }
}

DEPARTMENTS = {
    "DAGRI": {"code": "DAGRI", "name": "Departemen Dalam Negeri"},
    "LUGRI": {"code": "LUGRI", "name": "Departemen Luar Negeri"},
    "PSDM":  {"code": "PSDM",  "name": "Departemen Pengembangan Sumber Daya Mahasiswa"},
    "SOSMAS":{"code": "SOSMAS","name": "Departemen Sosial Masyarakat"},
    "RISTEK":{"code": "RISTEK","name": "Departemen Riset dan Teknologi"},
    "KWU":   {"code": "KWU",   "name": "Departemen Kewirausahaan"}
}

INDICATOR_TITLES = [
    "Goal Alignment & Impact",
    "Operational Discipline",
    "Synergy & Collaboration",
    "Team Resilience & Health",
    "Accountability & Problem Solving",
    "Representative of BEM FTEIC Values"
]

DEFAULT_COL_MAP = {
    3: "DAGRI",
    4: "LUGRI",
    5: "PSDM",
    6: "SOSMAS",
    7: "RISTEK",
    8: "KWU"
}

def parse_ssc(raw_text):
    if not raw_text or not raw_text.strip():
        return {"stop": "", "start": "", "continue": "", "hasContent": False}

    cleaned = raw_text.strip()
    
    # Patterns for Stop, Start, Continue
    stop_match = re.search(r'(?:\[Stop\]|[-*•]?\s*Stop)\s*[:\-]?\s*([\s\S]*?)(?=(?:\[Start\]|[-*•]?\s*Start)|$)', cleaned, re.IGNORECASE)
    start_match = re.search(r'(?:\[Start\]|[-*•]?\s*Start)\s*[:\-]?\s*([\s\S]*?)(?=(?:\[Continue\]|[-*•]?\s*Continue)|$)', cleaned, re.IGNORECASE)
    cont_match = re.search(r'(?:\[Continue\]|[-*•]?\s*Continue)\s*[:\-]?\s*([\s\S]*?)$', cleaned, re.IGNORECASE)

    def clean_section(val):
        if not val:
            return ""
        v = val.strip()
        v = re.sub(r'^(?:[:\-\s•*]+)', '', v).strip()
        v = re.sub(r'(?:[:\-\s•*]+)$', '', v).strip()
        return v

    stop_val = clean_section(stop_match.group(1)) if stop_match else ""
    start_val = clean_section(start_match.group(1)) if start_match else ""
    cont_val = clean_section(cont_match.group(1)) if cont_match else ""

    has_content = bool(stop_val or start_val or cont_val)
    if not has_content and len(cleaned) > 10 and not re.match(r'^(?:\[Stop\]\s*:\s*\[Start\]\s*:\s*\[Continue\]\s*:\s*)$', re.sub(r'\s+', '', cleaned)):
        start_val = cleaned
        has_content = True

    return {
        "stop": stop_val,
        "start": start_val,
        "continue": cont_val,
        "hasContent": has_content
    }

def fetch_sheet_csv(doc_id, gid):
    url = f"https://docs.google.com/spreadsheets/d/{doc_id}/gviz/tq?tqx=out:csv&gid={gid}"
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=15, context=ctx) as response:
        content = response.read().decode('utf-8', errors='replace')
        reader = csv.reader(io.StringIO(content))
        return list(reader)

def sync():
    data = {}
    for dcode, dinfo in DEPARTMENTS.items():
        data[dcode] = {
            "deptCode": dcode,
            "deptName": dinfo["name"],
            "evaluations": {}
        }

    for bkey, bcfg in BPH_SHEETS.items():
        print(f"Fetching sheet for {bcfg['evaluatorName']}...")
        rows = []
        try:
            rows = fetch_sheet_csv(bcfg["docId"], bcfg["gid"])
            print(f"  -> Success: {len(rows)} rows loaded.")
        except Exception as e:
            print(f"  -> Error fetching {bkey}: {e}")

        # Column mapping
        col_map = DEFAULT_COL_MAP.copy()
        if rows:
            for r in range(min(6, len(rows))):
                for c, cell in enumerate(rows[r]):
                    val = cell.lower()
                    if "dalam negeri" in val: col_map[c] = "DAGRI"
                    elif "luar negeri" in val: col_map[c] = "LUGRI"
                    elif "pengembangan sdm" in val or "psdm" in val: col_map[c] = "PSDM"
                    elif "sosial masyarakat" in val or "sosmas" in val: col_map[c] = "SOSMAS"
                    elif "riset" in val or "ristek" in val: col_map[c] = "RISTEK"
                    elif "kewirausahaan" in val or "kwu" in val: col_map[c] = "KWU"

        # Row ranges for 6 indicators
        indicator_blocks = [
            (3, 6),
            (7, 10),
            (11, 14),
            (15, 18),
            (19, 22),
            (23, 26)
        ]

        ssc_row = 27
        kesan_row = 28
        avg_row = 29

        if rows:
            for r, row in enumerate(rows):
                if len(row) > 1:
                    c1 = row[1].lower()
                    if "kebiasaan yang perlu dihentikan" in c1 or "(stop)" in c1:
                        ssc_row = r
                    elif "tuliskan kesan" in c1 or "harapanmu" in c1:
                        kesan_row = r

        for col_idx, dcode in col_map.items():
            if dcode not in data:
                continue

            indicators = []
            valid_scores = []
            
            for idx_num, (start_r, end_r) in enumerate(indicator_blocks):
                found_score = None
                if rows and len(rows) > start_r:
                    for r in range(start_r, min(end_r + 1, len(rows))):
                        if col_idx < len(rows[r]):
                            val = rows[r][col_idx].strip().replace(',', '.')
                            try:
                                num = float(val)
                                if 1.0 <= num <= 10.0:
                                    found_score = num
                                    break
                            except ValueError:
                                pass
                if found_score is not None:
                    valid_scores.append(found_score)
                indicators.append({
                    "title": INDICATOR_TITLES[idx_num],
                    "score": found_score
                })

            avg_score = round(sum(valid_scores) / len(valid_scores), 1) if valid_scores else None

            # Check average formula row if top scores empty
            if avg_score is None and rows and len(rows) > avg_row and col_idx < len(rows[avg_row]):
                val = rows[avg_row][col_idx].strip().replace(',', '.')
                try:
                    num = float(val)
                    if 1.0 <= num <= 10.0:
                        avg_score = round(num, 1)
                except ValueError:
                    pass

            raw_ssc = ""
            if rows and len(rows) > ssc_row and col_idx < len(rows[ssc_row]):
                raw_ssc = rows[ssc_row][col_idx]
            parsed_ssc = parse_ssc(raw_ssc)

            raw_kesan = ""
            if rows and len(rows) > kesan_row and col_idx < len(rows[kesan_row]):
                raw_kesan = rows[kesan_row][col_idx]
            clean_kesan = re.sub(r'Tuliskan kesan, pesan, atau harapanmu[^\n]*\n?', '', raw_kesan, flags=re.IGNORECASE)
            clean_kesan = re.sub(r'\*?\(WAJIB UNTUK BPH[^\)]*\)?', '', clean_kesan, flags=re.IGNORECASE).strip()

            is_filled = parsed_ssc["hasContent"] or bool(clean_kesan) or (avg_score is not None)

            data[dcode]["evaluations"][bkey] = {
                "bphKey": bkey,
                "evaluatorName": bcfg["evaluatorName"],
                "evaluatorRole": bcfg["evaluatorRole"],
                "evaluatorFoto": bcfg["evaluatorFoto"],
                "isFilled": is_filled,
                "averageScore": avg_score,
                "indicators": indicators,
                "ssc": parsed_ssc,
                "kesanPesan": clean_kesan,
                "sheetUrl": bcfg["sheetUrl"]
            }

    # Write JSON and JS
    with open("bph_evaluasi_departemen.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print("Saved bph_evaluasi_departemen.json")

    with open("bph_evaluasi_departemen.js", "w", encoding="utf-8") as f:
        f.write("// Data Snapshot Penilaian BPH ke Departemen (Ketua BEM, Sekjen 1, Sekjen 2)\n")
        f.write("window.bphDepartemenData = ")
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write(";\n")
    print("Saved bph_evaluasi_departemen.js")

if __name__ == "__main__":
    sync()
