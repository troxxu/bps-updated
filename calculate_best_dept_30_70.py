import json

# 1. Load data
with open('pa_september_rekap.json', 'r', encoding='utf-8') as f:
    sept_rekap = json.load(f)

with open('staffList.json', 'r', encoding='utf-8') as f:
    staff_list = json.load(f)

staff_map = {s['id']: s for s in staff_list}

# Internal scores (Kabinet + Staff)
dept_internal = {}
for sid, data in sept_rekap.items():
    s = staff_map.get(sid, {})
    dept = s.get('departemenBEM')
    if not dept or dept == 'BPH':
        continue
    if dept not in dept_internal:
        dept_internal[dept] = []
    dept_internal[dept].append(data.get('rawAverageScore', data.get('averageScore', 0)))

# BPH scores from bph_evaluasi_departemen.js
with open('bph_evaluasi_departemen.js', 'r', encoding='utf-8') as f:
    bph_raw = f.read()
start = bph_raw.find('{')
end = bph_raw.rfind('}')
bph_data = json.loads(bph_raw[start:end+1])

bph_scores = {}
bph_eval_details = {}
for dept, ddata in bph_data.items():
    valid = []
    details = []
    for k, ev in ddata.get('evaluations', {}).items():
        if ev.get('isFilled') and ev.get('averageScore') is not None:
            valid.append(ev.get('averageScore'))
            details.append(f"{ev.get('evaluatorName')}: {ev.get('averageScore')}")
    if valid:
        bph_scores[dept] = sum(valid) / len(valid)
        bph_eval_details[dept] = details

dept_names = {
    'DAGRI': 'Departemen Dalam Negeri',
    'LUGRI': 'Departemen Luar Negeri',
    'PSDM': 'Departemen Pengembangan Sumber Daya Mahasiswa',
    'SOSMAS': 'Departemen Sosial Masyarakat',
    'RISTEK': 'Departemen Riset dan Teknologi',
    'KWU': 'Departemen Kewirausahaan'
}

results = []
for dept, scores in dept_internal.items():
    internal_avg = sum(scores) / len(scores)
    bph_val = bph_scores.get(dept, 0)
    
    # Formula 30% BPH + 70% Internal (Kabinet + Staf)
    final_score = (0.30 * bph_val) + (0.70 * internal_avg)
    
    predikat = "Istimewa (A)" if final_score >= 9.0 else ("Sangat Baik (AB)" if final_score >= 7.6 else "Baik (B)")
    
    results.append({
        'code': dept,
        'name': dept_names.get(dept, dept),
        'final_score': round(final_score, 2),
        'raw_final': final_score,
        'bph_score': round(bph_val, 2),
        'internal_score': round(internal_avg, 2),
        'raw_internal': internal_avg,
        'members': len(scores),
        'predikat': predikat,
        'bph_details': ', '.join(bph_eval_details.get(dept, []))
    })

results.sort(key=lambda x: x['raw_final'], reverse=True)

print("="*80)
print("HASIL BEST DEPARTMENT OF THE MONTH (30% BPH + 70% KABINET & STAF)")
print("="*80)
for i, r in enumerate(results, 1):
    print(f"Rank {i}: {r['code']} ({r['name']})")
    print(f"   Skor Akhir: {r['final_score']} (Raw: {r['raw_final']:.4f}) - Predikat: {r['predikat']}")
    print(f"   Komponen: 30% BPH ({r['bph_score']:.2f}) + 70% Internal Kabinet & Staf ({r['internal_score']:.2f})")
    print(f"   Rincian Penilai BPH: {r['bph_details']}")
    print(f"   Jumlah Anggota: {r['members']} fungsionaris\n")
