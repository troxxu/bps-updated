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
    if "Contoh pengisian" in cleaned:
        cleaned = cleaned.split("Contoh pengisian")[0].strip()

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

    # Check if anything left beyond template
    has_content = bool(stop_val or start_val or cont_val)
    if not has_content:
        stripped = re.sub(r'\[?Stop\]?\s*[:\-]?', '', cleaned, flags=re.I)
        stripped = re.sub(r'\[?Start\]?\s*[:\-]?', '', stripped, flags=re.I)
        stripped = re.sub(r'\[?Continue\]?\s*[:\-]?', '', stripped, flags=re.I).strip()
        if len(stripped) > 3 and not re.match(r'^(?:\[Stop\]\s*:\s*\[Start\]\s*:\s*\[Continue\]\s*:\s*)$', re.sub(r'\s+', '', cleaned)):
            cont_val = stripped
            has_content = True

    return {
        "stop": stop_val,
        "start": start_val,
        "continue": cont_val,
        "hasContent": has_content
    }

def fetch_sheet_csv(doc_id, gid):
    urls = [
        f"https://docs.google.com/spreadsheets/d/{doc_id}/export?format=csv&gid={gid}",
        f"https://docs.google.com/spreadsheets/d/{doc_id}/gviz/tq?tqx=out:csv&gid={gid}"
    ]
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    for url in urls:
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=15, context=ctx) as response:
                content = response.read().decode('utf-8', errors='replace')
                reader = list(csv.reader(io.StringIO(content)))
                if len(reader) >= 30:
                    return reader
        except Exception as e:
            print(f"    URL attempt failed ({url[:50]}...): {e}")

    # Fallback to whatever returned
    req = urllib.request.Request(urls[0], headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=15, context=ctx) as response:
        content = response.read().decode('utf-8', errors='replace')
        return list(csv.reader(io.StringIO(content)))

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

        # Column mapping detection
        col_map = DEFAULT_COL_MAP.copy()
        if rows:
            for r in range(min(8, len(rows))):
                for c, cell in enumerate(rows[r]):
                    val = cell.lower()
                    if "dalam negeri" in val: col_map[c] = "DAGRI"
                    elif "luar negeri" in val: col_map[c] = "LUGRI"
                    elif "pengembangan sdm" in val or "psdm" in val: col_map[c] = "PSDM"
                    elif "sosial masyarakat" in val or "sosmas" in val: col_map[c] = "SOSMAS"
                    elif "riset" in val or "ristek" in val: col_map[c] = "RISTEK"
                    elif "kewirausahaan" in val or "kwu" in val: col_map[c] = "KWU"

        # Dynamic row indices for 6 indicators, SSC, Kesan Pesan, Average
        indicator_row_map = [7, 11, 15, 19, 23, 27]
        ssc_row = 31
        kesan_row = 35
        avg_row = 39

        if rows:
            for r, row in enumerate(rows):
                for c_test in range(min(3, len(row))):
                    txt = row[c_test].lower()
                    if "goal alignment" in txt:
                        indicator_row_map[0] = r
                    elif "operational discipline" in txt:
                        indicator_row_map[1] = r
                    elif "synergy & collaboration" in txt or "synergy" in txt:
                        indicator_row_map[2] = r
                    elif "team resilience" in txt:
                        indicator_row_map[3] = r
                    elif "accountability" in txt:
                        indicator_row_map[4] = r
                    elif "representative of bem" in txt:
                        indicator_row_map[5] = r
                    elif "kebiasaan yang perlu dihentikan" in txt or "(stop)" in txt:
                        ssc_row = r
                    elif "tuliskan kesan" in txt or "harapanmu" in txt:
                        kesan_row = r

        for col_idx, dcode in col_map.items():
            if dcode not in data:
                continue

            indicators = []
            valid_scores = []
            
            for idx_num, ind_row in enumerate(indicator_row_map):
                found_score = None
                if rows and len(rows) > ind_row and col_idx < len(rows[ind_row]):
                    val = rows[ind_row][col_idx].strip().replace(',', '.')
                    try:
                        num = float(val)
                        if 1.0 <= num <= 10.0:
                            found_score = num
                    except ValueError:
                        pass
                
                # If exact row empty, search block [ind_row-1 .. ind_row+2]
                if found_score is None and rows:
                    for r_search in range(max(0, ind_row - 2), min(len(rows), ind_row + 3)):
                        if col_idx < len(rows[r_search]):
                            val = rows[r_search][col_idx].strip().replace(',', '.')
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
