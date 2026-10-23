import json
import re
import urllib.request
import urllib.parse
import csv
import io
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

# Load staff list
with open('staffList.json', 'r', encoding='utf-8') as f:
    staff_list = json.load(f)

RUBRIC_STAF = [
    {"key": "kritis", "name": "Kritis"},
    {"key": "disiplin", "name": "Disiplin"},
    {"key": "inovatif", "name": "Inovatif"},
    {"key": "solidaritas", "name": "Solidaritas"},
    {"key": "sosial", "name": "Sosial"},
    {"key": "rasa_kekeluargaan", "name": "Rasa Kekeluargaan"},
    {"key": "inisiatif", "name": "Inisiatif"},
    {"key": "tanggung_jawab", "name": "Tanggung Jawab"},
    {"key": "etika", "name": "Etika"},
    {"key": "pemahaman_proker", "name": "Pemahaman Proker"},
    {"key": "fundamental", "name": "Fundamental"},
    {"key": "responsif", "name": "Responsif"}
]

RUBRIC_KABINET = [
    {"key": "leadership", "name": "Leadership"},
    {"key": "development", "name": "Development"},
    {"key": "empowerment", "name": "Empowerment"},
    {"key": "coordination", "name": "Coordination"},
    {"key": "representation", "name": "Representation"},
    {"key": "administration", "name": "Administration"},
    {"key": "exemplary", "name": "Exemplary"}
]

RUBRIC_BPH = [
    {"key": "governance", "name": "Governance"},
    {"key": "leadership", "name": "Leadership"},
    {"key": "development", "name": "Development"},
    {"key": "open_communication", "name": "Open Communication"},
    {"key": "administration", "name": "Administration"},
    {"key": "exemplary", "name": "Exemplary"}
]

def clean_token_str(s):
    if not s: return ""
    return re.sub(r'[^\w\s]', ' ', str(s)).lower().strip()

def is_kabinet(s):
    return s.get('roleCategory') in ['Pimpinan', 'Wakil Pimpinan', 'Kabiro']

def is_staff_name_matching(target_name, col_text):
    if not col_text or not target_name: return False
    target_clean = clean_token_str(target_name)
    col_clean = clean_token_str(col_text)
    if target_clean == col_clean: return True
    
    # Alias Ramandita / Manta
    if ('ramandita' in target_clean or 'saguna' in target_clean) and 'manta' in col_clean: return True
    if 'manta' in target_clean and ('ramandita' in col_clean or 'saguna' in col_clean): return True

    if len(target_clean) >= 3 and len(col_clean) >= 3:
        if target_clean in col_clean or col_clean in target_clean:
            shorter = col_clean if len(col_clean) < len(target_clean) else target_clean
            if len(shorter) >= 4: return True

    t_tokens = [w for w in target_clean.split() if len(w) > 1]
    c_tokens = [w for w in col_clean.split() if len(w) > 1]
    if not t_tokens or not c_tokens: return False

    ignore_words = {'nilai', 'indikator', 'performance', 'appraisal', 'kabinet', 'staf', 'staff', 'panduan', 'pengisian', 'biro', 'dept', 'departemen'}
    clean_tt = [w for w in t_tokens if w not in ignore_words]
    clean_ct = [w for w in c_tokens if w not in ignore_words]
    if not clean_tt or not clean_ct: return False

    if len(clean_ct) == 1 and clean_ct[0] in clean_tt: return True
    if len(clean_tt) == 1 and clean_tt[0] in clean_ct: return True

    matches = sum(1 for tw in clean_tt if tw in clean_ct)
    if matches >= 2: return True
    if matches >= 1 and (len(clean_ct) <= 2 or len(clean_tt) <= 2): return True
    return False

def get_deterministic_tabs(evaluator, target):
    if target.get('departemenBEM') == 'BPH':
        is_ev_kab = is_kabinet(evaluator)
        return ['PA Kabinet-BPH', 'PA Staf-BPH'] if is_ev_kab else ['PA Staf-BPH', 'PA Kabinet-BPH']

    is_target_kab = is_kabinet(target)
    is_ev_kab = is_kabinet(evaluator)

    if is_target_kab:
        return ['PA Kabinet-Kabinet', 'PA Staf-Kabinet'] if is_ev_kab else ['PA Staf-Kabinet', 'PA Kabinet-Kabinet']
    else:
        return ['PA Kabinet-Staf', 'PA Staf-Staf'] if is_ev_kab else ['PA Staf-Staf', 'PA Kabinet-Staf']

# 1. Fetch all evaluator sheets
tasks = set()
for s in staff_list:
    url = s.get('sheetUrl', '')
    m = re.search(r'/d/([a-zA-Z0-9_-]+)', url)
    if not m: continue
    sid = m.group(1)
    if s.get('departemenBEM') == 'BPH': continue
    if is_kabinet(s):
        tasks.add((sid, 'PA Kabinet-Kabinet'))
        tasks.add((sid, 'PA Kabinet-Staf'))
        tasks.add((sid, 'PA Kabinet-BPH'))
    else:
        tasks.add((sid, 'PA Staf-Kabinet'))
        tasks.add((sid, 'PA Staf-Staf'))
        tasks.add((sid, 'PA Staf-BPH'))

print(f"Fetching {len(tasks)} sheets in parallel...")

def fetch_tab(item):
    sid, tab = item
    url = f"https://docs.google.com/spreadsheets/d/{sid}/gviz/tq?tqx=out:csv&sheet={urllib.parse.quote(tab)}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            text = resp.read().decode('utf-8', errors='ignore')
            reader = csv.reader(io.StringIO(text))
            rows = list(reader)
            return (sid, tab, rows)
    except Exception as e:
        return (sid, tab, None)

sheet_cache = {}
with ThreadPoolExecutor(max_workers=25) as executor:
    futures = [executor.submit(fetch_tab, t) for t in tasks]
    for f in as_completed(futures):
        sid, tab, rows = f.result()
        if rows:
            sheet_cache[(sid, tab)] = rows

print(f"Cached {len(sheet_cache)} sheets successfully.")

# 2. Process each staff member
rekap_september = {}

for staff in staff_list:
    is_target_bph = staff.get('departemenBEM') == 'BPH'
    is_target_kab = not is_target_bph and is_kabinet(staff)
    indicators = RUBRIC_BPH if is_target_bph else (RUBRIC_KABINET if is_target_kab else RUBRIC_STAF)

    # Determine evaluators
    evaluators = (
        [s for s in staff_list if s.get('departemenBEM') != 'BPH' and s.get('sheetUrl') and '/d/' in s.get('sheetUrl')]
        if is_target_bph else
        [s for s in staff_list if s.get('departemenBEM') == staff.get('departemenBEM') and s.get('sheetUrl') and '/d/' in s.get('sheetUrl')]
    )

    scores_by_group = {ind['key']: {'kabinet': [], 'staf': [], 'self': []} for ind in indicators}
    active_kab = set()
    active_staf = set()
    has_self = False
    collected_feedback = []

    for ev in evaluators:
        m = re.search(r'/d/([a-zA-Z0-9_-]+)', ev.get('sheetUrl', ''))
        if not m: continue
        sid = m.group(1)
        candidate_tabs = get_deterministic_tabs(ev, staff)

        found_rows = None
        target_col_idx = -1
        matched_tab = None

        for tab in candidate_tabs:
            rows = sheet_cache.get((sid, tab))
            if not rows or len(rows) == 0: continue

            max_scan = min(15, len(rows))
            for r in range(max_scan):
                row = rows[r]
                for c in range(len(row)):
                    if is_staff_name_matching(staff['nama'], row[c]):
                        target_col_idx = c
                        break
                if target_col_idx != -1: break

            # Fallback for BPH column indices
            if target_col_idx == -1 and is_target_bph:
                t_clean = clean_token_str(staff['nama'])
                if staff['id'] == 'bph-001' or 'ilman' in t_clean: target_col_idx = 3
                elif staff['id'] == 'bph-003' or 'bramantio' in t_clean: target_col_idx = 4
                elif staff['id'] == 'bph-002' or 'mirza' in t_clean: target_col_idx = 5

            if target_col_idx != -1:
                found_rows = rows
                matched_tab = tab
                break

        if not found_rows or target_col_idx == -1: continue

        is_self = ev['id'] == staff['id']
        is_ev_kab = is_kabinet(ev)
        grp = 'self' if is_self else ('kabinet' if is_ev_kab else 'staf')

        ev_contributed = False
        for r in range(len(found_rows)):
            row = found_rows[r]
            if len(row) <= target_col_idx: continue
            ind_cell = clean_token_str(row[1] if len(row) > 1 and row[1] else (row[0] if len(row) > 0 else ''))

            for ind in indicators:
                ind_name_clean = clean_token_str(ind['name'])
                ind_key_clean = clean_token_str(ind['key'])
                is_match = (ind_cell == ind_name_clean or ind_cell.startswith(ind_name_clean) or
                            ind_cell == ind_key_clean or (len(ind_cell) > 2 and ind_name_clean.startswith(ind_cell)))
                if is_match:
                    raw_val = (row[target_col_idx] or '').strip().replace(',', '.')
                    try:
                        num = float(raw_val)
                        if 0 < num <= 20:
                            norm = num / 2.0 if num > 10 else num
                            scores_by_group[ind['key']][grp].append(norm)
                            ev_contributed = True
                    except ValueError:
                        pass

        if ev_contributed:
            if is_self: has_self = True
            elif is_ev_kab: active_kab.add(ev['id'])
            else: active_staf.add(ev['id'])

    # Weights
    if is_target_bph:
        weight_kab = 0.50
        weight_staf = 0.50
        weight_self = 0.00
    elif is_target_kab:
        weight_kab = 0.35
        weight_staf = 0.55
        weight_self = 0.10
    else:
        weight_kab = 0.55
        weight_staf = 0.35
        weight_self = 0.10

    calculated_scores = {}
    valid_indicators = 0
    total_score = 0.0

    for ind in indicators:
        k_list = scores_by_group[ind['key']]['kabinet']
        s_list = scores_by_group[ind['key']]['staf']
        self_list = scores_by_group[ind['key']]['self']

        k_avg = (sum(k_list) / len(k_list)) if k_list else None
        s_avg = (sum(s_list) / len(s_list)) if s_list else None
        self_avg = (sum(self_list) / len(self_list)) if self_list else None

        active_w = 0.0
        w_sum = 0.0
        if k_avg is not None:
            w_sum += weight_kab * k_avg
            active_w += weight_kab
        if s_avg is not None:
            w_sum += weight_staf * s_avg
            active_w += weight_staf
        if self_avg is not None:
            w_sum += weight_self * self_avg
            active_w += weight_self

        if active_w > 0:
            final_s = w_sum / active_w
            calculated_scores[ind['key']] = {
                'average': round(final_s, 1),
                'rawScore': final_s,
                'kabinetAvg': round(k_avg, 1) if k_avg is not None else None,
                'stafAvg': round(s_avg, 1) if s_avg is not None else None,
                'selfAvg': round(self_avg, 1) if self_avg is not None else None,
                'kabCount': len(k_list),
                'stafCount': len(s_list),
                'selfCount': len(self_list),
                'weights': {'kabinet': weight_kab, 'staf': weight_staf, 'self': weight_self}
            }
            total_score += final_s
            valid_indicators += 1

    avg_score = round(total_score / valid_indicators, 1) if valid_indicators > 0 else 0.0
    total_eval = len(active_kab) + len(active_staf) + (1 if has_self else 0)

    rekap_september[staff['id']] = {
        'isLive': valid_indicators > 0,
        'averageScore': avg_score,
        'scores': calculated_scores,
        'evaluatorCount': total_eval,
        'kabinetEvaluatorCount': len(active_kab),
        'stafEvaluatorCount': len(active_staf),
        'hasSelfAssessment': has_self,
        'isTargetKabinet': is_target_kab,
        'isTargetBPH': is_target_bph,
        'periodName': 'PA September 2026'
    }

# Save rekap_september.json
with open('pa_september_rekap.json', 'w', encoding='utf-8') as f:
    json.dump(rekap_september, f, indent=2, ensure_ascii=False)

print(f"Generated pa_september_rekap.json for {len(rekap_september)} fungsionaris!")

# Summary evaluation counts
non_zero = sum(1 for v in rekap_september.values() if v['averageScore'] > 0)
print(f"Fungsionaris with scores > 0: {non_zero} / {len(rekap_september)}")
