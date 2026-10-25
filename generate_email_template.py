#!/usr/bin/env python3
"""
=============================================================================
BEM FTEIC ITS 2026 — Kabinet Polaris | Biro Pengembangan Strategis (BPS)
ADMIN TOOLING: Functionary Email Directory Generator & Mapping Tool
File: generate_email_template.py
=============================================================================

PURPOSE:
This script extracts and unifies all 97 functionaries (3 BPH + 94 Kabinet & Staf)
from existing JSON archives (extracted_staff.json, staffList.json,
functionary_directory.json, pa_agustus_rekap.json, pa_september_rekap.json)
and generates a clean, structured functionary_emails.json.

HOW BPS PERSONAALIA ADMINS USE THIS:
1. Run this script to generate/sync functionary_emails.json:
      python generate_email_template.py
2. Open functionary_emails.json and simply replace/paste the functionary's
   real Google/personal Gmail email into the "email" field or add to "altEmails".
3. In firebase-auth.js, paste your Firebase project credentials in `firebaseConfig`.
4. Done! Any functionary logging in with Google or email will be automatically
   whitelisted and granted access to the protected directory.
=============================================================================
"""

import json
import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DEFAULT_ADMINS = [
    "admin.bps@bemfteic.its.ac.id",
    "personalia.polaris@gmail.com",
    "bps.bemfteic2026@gmail.com",
    "hilmuddinthoriq@gmail.com",
    "5022231191@mhs.its.ac.id",
    "5022231191@student.its.ac.id",
    "thoriqhilmuddin@gmail.com",
    "ilmanafif@gmail.com",
    "troxxu@gmail.com"
]

DEPT_NAMES_MAP = {
    "BPH": "Badan Pengurus Harian",
    "DAGRI": "Departemen Dalam Negeri",
    "LUGRI": "Departemen Luar Negeri",
    "PSDM": "Departemen Pengembangan Sumber Daya Mahasiswa",
    "SOSMAS": "Departemen Sosial Masyarakat",
    "RISTEK": "Departemen Riset dan Teknologi",
    "KWU": "Departemen Kewirausahaan",
    "BPS": "Badan Pengembangan Strategis"
}

def load_json_file(filename):
    path = os.path.join(BASE_DIR, filename)
    if os.path.exists(path):
        try:
            with open(path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"Warning: Could not read {filename}: {e}")
    return None

def main():
    print("[*] Generating functionary email directory...")

    # Load sources
    extracted_data = load_json_file("extracted_staff.json") or []
    staff_list_data = load_json_file("staffList.json") or []
    directory_data = load_json_file("functionary_directory.json") or {}
    existing_emails_data = load_json_file("functionary_emails.json") or {}

    dir_func_map = {}
    if isinstance(directory_data, dict) and "functionaries" in directory_data:
        for f in directory_data["functionaries"]:
            dir_func_map[f.get("id")] = f
    elif isinstance(directory_data, list):
        for f in directory_data:
            dir_func_map[f.get("id")] = f

    existing_map = {}
    if isinstance(existing_emails_data, dict) and "functionaries" in existing_emails_data:
        for f in existing_emails_data["functionaries"]:
            existing_map[f.get("id")] = f

    # Build unified functionary list
    unified = []
    seen_ids = set()

    # Prioritize extracted_data / staff_list_data
    sources = []
    if isinstance(extracted_data, list):
        sources.extend(extracted_data)
    if isinstance(staff_list_data, list):
        sources.extend(staff_list_data)

    for item in sources:
        fid = item.get("id")
        if not fid or fid in seen_ids:
            continue
        seen_ids.add(fid)

        # Merge with directory and existing email map
        dir_item = dir_func_map.get(fid, {})
        ex_item = existing_map.get(fid, {})

        nama = item.get("nama") or item.get("name") or dir_item.get("nama") or ex_item.get("name") or ""
        nrp = item.get("nrp") or dir_item.get("nrp") or ex_item.get("nrp") or ""
        dept = item.get("departemenBEM") or item.get("department") or dir_item.get("departemenBEM") or "BEM FTEIC"
        dept_full = item.get("departemenBEMFull") or DEPT_NAMES_MAP.get(dept, f"Departemen {dept}")
        role = item.get("role") or dir_item.get("role") or ex_item.get("role") or "Fungsionaris"
        role_category = item.get("roleCategory") or dir_item.get("roleCategory") or ex_item.get("roleCategory") or "Staf"
        pin = item.get("pin") or dir_item.get("pin") or ex_item.get("pin") or "123456"

        # Determine primary email
        default_its_email = f"{nrp}@mhs.its.ac.id" if nrp and nrp.strip() else ""
        clean_name = nama.lower().replace("'", "").strip()
        name_parts = [p for p in clean_name.split() if len(p) > 1]
        name_alias = f"{name_parts[0]}.{name_parts[1]}@gmail.com" if len(name_parts) >= 2 else (f"{name_parts[0]}@gmail.com" if name_parts else "")

        primary_email = ex_item.get("email") or dir_item.get("email") or default_its_email or name_alias or f"{fid}@bemfteic.its.ac.id"

        alt_emails = ex_item.get("altEmails") or dir_item.get("altEmails") or []
        if not isinstance(alt_emails, list):
            alt_emails = [str(alt_emails)]

        # Ensure common aliases exist
        for candidate in [default_its_email, name_alias, f"{nrp}@student.its.ac.id" if nrp else ""]:
            if candidate and candidate not in alt_emails and candidate != primary_email:
                alt_emails.append(candidate)

        unified.append({
            "id": fid,
            "name": nama,
            "nrp": nrp,
            "department": dept,
            "departmentFull": dept_full,
            "role": role,
            "roleCategory": role_category,
            "email": primary_email,
            "altEmails": alt_emails,
            "pin": pin
        })

    # Sort: BPH first, then by department and id
    def sort_key(f):
        is_bph = 0 if f["department"] == "BPH" else 1
        return (is_bph, f["department"], f["id"])

    unified.sort(key=sort_key)

    output = {
        "version": "1.2.0",
        "kabinet": "Kabinet Polaris 2026",
        "organisasi": "BEM FTEIC ITS",
        "totalFunctionaries": len(unified),
        "instructions": (
            "PANDUAN BIRO PERSONALIA (BPS):\n"
            "1. Untuk menambahkan email Google/pribadi fungsionaris, ganti nilai pada field 'email' "
            "atau tambahkan ke array 'altEmails'.\n"
            "2. Semua email yang terdaftar di sini otomatis memiliki akses masuk (whitelist) ke Portal Fungsionaris.\n"
            "3. Pastikan konfigurasi 'firebaseConfig' di firebase-auth.js telah diisi dengan API Key Firebase resmi."
        ),
        "admins": DEFAULT_ADMINS,
        "functionaries": unified
    }

    out_path = os.path.join(BASE_DIR, "functionary_emails.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    print(f"[+] Successfully generated {out_path} with {len(unified)} functionaries and {len(DEFAULT_ADMINS)} admins.")

if __name__ == "__main__":
    main()
