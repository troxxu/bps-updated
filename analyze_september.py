import json

with open('staffList.json', 'r', encoding='utf-8') as f:
    staff_list = json.load(f)

with open('pa_september_rekap.json', 'r', encoding='utf-8') as f:
    rekap = json.load(f)

staff_map = {s['id']: s for s in staff_list}

def get_predikat(num_avg):
    try:
        score = float(num_avg)
    except:
        return "Belum Ada Penilaian"
    if score >= 9.0:
        return "EXCELLENT (A)"
    elif score >= 7.5:
        return "Sangat Baik (AB)"
    elif score >= 6.6:
        return "Baik (B)"
    elif score >= 5.6:
        return "Cukup (C)"
    elif score >= 3.1:
        return "Kurang Mampu (D)"
    elif score > 0:
        return "BURUK (E)"
    else:
        return "Belum Ada Penilaian"

enriched = []
for sid, sdata in rekap.items():
    meta = staff_map.get(sid, {})
    avg = sdata.get('averageScore', 0)
    scores = sdata.get('scores', {})
    
    raw_scores_list = [v.get('rawScore', v.get('average', 0)) for v in scores.values() if isinstance(v, dict)]
    raw_mean = sum(raw_scores_list) / len(raw_scores_list) if raw_scores_list else avg

    enriched.append({
        'id': sid,
        'nama': meta.get('nama', sid),
        'role': meta.get('role', ''),
        'roleCategory': meta.get('roleCategory', ''),
        'dept': meta.get('departemenBEM', ''),
        'deptFull': meta.get('departemenBEMFull', ''),
        'nrp': meta.get('nrp', ''),
        'asalDept': meta.get('asalDepartemen', ''),
        'avgScore': avg,
        'rawMean': raw_mean,
        'predikat': get_predikat(avg),
        'evaluatorCount': sdata.get('evaluatorCount', 0),
        'kabinetEvaluatorCount': sdata.get('kabinetEvaluatorCount', 0),
        'stafEvaluatorCount': sdata.get('stafEvaluatorCount', 0),
        'hasSelfAssessment': sdata.get('hasSelfAssessment', False),
        'scores': scores
    })

# 1. Department Rankings (Exclude BPH)
dept_scores = {}
for e in enriched:
    d = e['dept']
    if d == 'BPH': continue
    if d not in dept_scores:
        dept_scores[d] = []
    dept_scores[d].append(e['avgScore'])

dept_ranked = []
for d, sc_list in dept_scores.items():
    avg_d = sum(sc_list) / len(sc_list)
    dept_ranked.append({
        'dept': d,
        'count': len(sc_list),
        'avg': avg_d,
        'predikat': get_predikat(avg_d)
    })

dept_ranked.sort(key=lambda x: round(x['avg'], 4), reverse=True)

print("="*60)
print("1. BEST DEPARTMENT OF THE MONTH (PA SEPTEMBER 2026)")
print("="*60)
for rank, d in enumerate(dept_ranked, 1):
    win = "[JUARA 1]" if rank == 1 else ""
    print(f"Rank {rank}: {d['dept']} - Rata-rata: {d['avg']:.2f} ({d['count']} anggota) - {d['predikat']} {win}")

# 2. Top 3 Staff (roleCategory in Staff/Staf)
staf_only = [e for e in enriched if e['roleCategory'] in ('Staff', 'Staf')]
staf_only.sort(key=lambda x: (round(x['avgScore'], 4), round(x['rawMean'], 6)), reverse=True)

print("\n" + "="*60)
print("2. TOP 3 BEST STAFF OF THE MONTH (SE-BEM FTEIC)")
print("="*60)
for rank, s in enumerate(staf_only[:10], 1):
    med = f"Juara {rank}" if rank <= 3 else f"Rank {rank}"
    print(f"{med}: {s['nama']} ({s['dept']}) - Avg: {s['avgScore']:.2f} (Raw: {s['rawMean']:.4f}) - NRP: {s['nrp']} - {s['predikat']} [ID: {s['id']}]")

# 3. Top 3 Sekdep
sekdep_only = [e for e in enriched if e['roleCategory'] == 'Sekretaris' or 'Sekretaris Departemen' in e['role'] or 'Sekdep' in e['role']]
sekdep_only.sort(key=lambda x: (round(x['avgScore'], 4), round(x['rawMean'], 6)), reverse=True)

print("\n" + "="*60)
print("3. TOP 3 BEST SEKDEP OF THE MONTH (SE-BEM FTEIC)")
print("="*60)
for rank, s in enumerate(sekdep_only, 1):
    med = f"Juara {rank}" if rank <= 3 else f"Rank {rank}"
    print(f"{med}: {s['nama']} ({s['dept']}) - Avg: {s['avgScore']:.2f} (Raw: {s['rawMean']:.4f}) - NRP: {s['nrp']} - {s['predikat']} [ID: {s['id']}]")

# 4. Best Staff Tiap Departemen
print("\n" + "="*60)
print("4. BEST STAFF TIAP DEPARTEMEN")
print("="*60)
for d in ['DAGRI', 'LUGRI', 'KWU', 'SOSMAS', 'PSDM', 'RISTEK']:
    dstaff = [s for s in staf_only if s['dept'] == d]
    dstaff.sort(key=lambda x: (round(x['avgScore'], 4), round(x['rawMean'], 6)), reverse=True)
    if dstaff:
        b = dstaff[0]
        print(f"Departemen {d:6s}: {b['nama']} - Avg: {b['avgScore']:.2f} (Raw: {b['rawMean']:.4f}) - NRP: {b['nrp']} ({b['asalDept']}) [ID: {b['id']}]")
