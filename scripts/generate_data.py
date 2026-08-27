#!/usr/bin/env python3
"""
LANDGUARD AI — Synthetic Dataset Generator
Generates India-wide synthetic land acquisition project data with realistic risk correlation,
role-based user hierarchy, and full geographic coverage.

DATA_TYPE = SYNTHETIC
Disclaimer: "Prototype trained and demonstrated using synthetic/historical-like data.
The system is designed to be retrained and validated using authorized government data when available."
"""

import os
import argparse
import random
import datetime
import math
import hashlib
import pandas as pd
import numpy as np
import bcrypt

GEOGRAPHIC_MASTER = {
    # 28 States
    "Andhra Pradesh": {"type": "STATE", "districts": [
        "Ananthapuramu", "Annamayya", "Alluri Sitharama Raju", "Anakapalli", "Bapatla", "Chittoor",
        "East Godavari", "Eluru", "Guntur", "Kakinada", "NTR", "Nandyal", "Palnadu",
        "Parvathipuram Manyam", "Prakasam", "Sri Potti Sriramulu Nellore", "Sri Sathya Sai",
        "Srikakulam", "Tirupati", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa",
        "Dr. B.R. Ambedkar Konaseema", "Kurnool"
    ], "lat_range": (12.6, 19.1), "lon_range": (76.8, 84.8)},

    "Arunachal Pradesh": {"type": "STATE", "districts": [
        "Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kamle", "Kra Daadi",
        "Kurung Kumey", "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley", "Lower Subansiri",
        "Namsai", "Pakke Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap",
        "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang", "Itanagar", "Bichom"
    ], "lat_range": (26.5, 29.5), "lon_range": (91.5, 97.4)},

    "Assam": {"type": "STATE", "districts": [
        "Bajali", "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang",
        "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat",
        "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong",
        "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari",
        "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"
    ], "lat_range": (24.1, 28.0), "lon_range": (89.7, 96.0)},

    "Bihar": {"type": "STATE", "districts": [
        "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar",
        "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur",
        "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger",
        "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur",
        "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"
    ], "lat_range": (24.3, 27.5), "lon_range": (83.3, 88.3)},

    "Chhattisgarh": {"type": "STATE", "districts": [
        "Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur",
        "Dantewada", "Dhamtari", "Durg", "Gariaband", "Gaurela-Pendra-Marwahi", "Janjgir-Champa",
        "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund",
        "Manendragarh-Chirmiri-Bharatpur", "Mohla-Manpur-Ambagarh Chowki", "Mungeli", "Narayanpur",
        "Raigarh", "Raipur", "Rajnandgaon", "Sarangarh-Bilaigarh", "Sakti", "Sukma", "Surajpur",
        "Surguja", "Khairagarh-Chhuikhadan-Gandai"
    ], "lat_range": (17.8, 24.1), "lon_range": (80.2, 84.4)},

    "Goa": {"type": "STATE", "districts": ["North Goa", "South Goa"],
            "lat_range": (14.9, 15.8), "lon_range": (73.7, 74.3)},

    "Gujarat": {"type": "STATE", "districts": [
        "Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad",
        "Chhota Udaipur", "Dahod", "Dang", "Devbhumi Dwarka", "Gandhinagar", "Gir Somnath",
        "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada",
        "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat",
        "Surendranagar", "Tapi", "Vadodara", "Valsad"
    ], "lat_range": (20.1, 24.7), "lon_range": (68.1, 74.5)},

    "Haryana": {"type": "STATE", "districts": [
        "Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar",
        "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal",
        "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"
    ], "lat_range": (27.6, 30.9), "lon_range": (74.5, 77.6)},

    "Himachal Pradesh": {"type": "STATE", "districts": [
        "Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti",
        "Mandi", "Shimla", "Sirmaur", "Solan", "Una"
    ], "lat_range": (30.4, 33.2), "lon_range": (75.8, 79.0)},

    "Jharkhand": {"type": "STATE", "districts": [
        "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih",
        "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga",
        "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", "Seraikela Kharsawan", "Simdega",
        "West Singhbhum"
    ], "lat_range": (21.9, 25.3), "lon_range": (83.3, 87.9)},

    "Karnataka": {"type": "STATE", "districts": [
        "Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar",
        "Chamarajanagar", "Chikkaballapura", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada",
        "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar",
        "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi",
        "Uttara Kannada", "Vijayanagara", "Vijayapura", "Yadgir"
    ], "lat_range": (11.5, 18.5), "lon_range": (74.1, 78.6)},

    "Kerala": {"type": "STATE", "districts": [
        "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode",
        "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"
    ], "lat_range": (8.3, 12.8), "lon_range": (74.9, 77.4)},

    "Madhya Pradesh": {"type": "STATE", "districts": [
        "Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind",
        "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar",
        "Dindori", "Guna", "Gwalior", "Harda", "Narmadapuram", "Indore", "Jabalpur", "Jhabua",
        "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch",
        "Niwari", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore",
        "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh",
        "Ujjain", "Umaria", "Vidisha", "Mauganj", "Maihar", "Pandhurna"
    ], "lat_range": (21.1, 26.9), "lon_range": (74.0, 82.8)},

    "Maharashtra": {"type": "STATE", "districts": [
        "Ahilyanagar", "Akola", "Amravati", "Chhatrapati Sambhajinagar", "Beed", "Bhandara",
        "Buldhana", "Chandrapur", "Dharashiv", "Dhule", "Gadchiroli", "Gondia", "Hingoli",
        "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur",
        "Nanded", "Nandurbar", "Nashik", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri",
        "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"
    ], "lat_range": (15.6, 22.0), "lon_range": (72.6, 80.9)},

    "Manipur": {"type": "STATE", "districts": [
        "Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam",
        "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong",
        "Tengnoupal", "Thoubal", "Ukhrul"
    ], "lat_range": (23.8, 25.7), "lon_range": (93.0, 94.8)},

    "Meghalaya": {"type": "STATE", "districts": [
        "East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "Eastern West Khasi Hills",
        "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills",
        "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"
    ], "lat_range": (25.1, 26.1), "lon_range": (89.8, 92.8)},

    "Mizoram": {"type": "STATE", "districts": [
        "Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai", "Lunglei",
        "Mamit", "Saiha", "Saitual", "Serchhip"
    ], "lat_range": (21.9, 24.5), "lon_range": (92.2, 93.4)},

    "Nagaland": {"type": "STATE", "districts": [
        "Chumoukedima", "Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Niuland",
        "Noklak", "Peren", "Phek", "Shamator", "Tseminyu", "Tuensang", "Wokha", "Zunheboto"
    ], "lat_range": (25.2, 27.1), "lon_range": (93.3, 95.2)},

    "Odisha": {"type": "STATE", "districts": [
        "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh",
        "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi",
        "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj",
        "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur",
        "Sundargarh"
    ], "lat_range": (17.8, 22.5), "lon_range": (81.4, 87.5)},

    "Punjab": {"type": "STATE", "districts": [
        "Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Firozpur",
        "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Malerkotla", "Mansa",
        "Moga", "Pathankot", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar", "Sangrur",
        "Shahid Bhagat Singh Nagar", "Sri Muktsar Sahib", "Tarn Taran"
    ], "lat_range": (29.5, 32.5), "lon_range": (73.9, 76.9)},

    "Rajasthan": {"type": "STATE", "districts": [
        "Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner",
        "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur",
        "Jaipur Rural", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Jodhpur Rural",
        "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar",
        "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur", "Anupgarh", "Balotra", "Beawar", "Deeg",
        "Didwana-Kuchaman", "Dudu", "Gangapur City", "Kekri", "Kotputli-Behror", "Khairthal-Tijara",
        "Neem Ka Thana", "Phalodi", "Salumbar", "Sanchore", "Shahpura"
    ], "lat_range": (23.3, 30.2), "lon_range": (69.5, 78.3)},

    "Sikkim": {"type": "STATE", "districts": [
        "Gangtok", "Mangan", "Namchi", "Pakyong", "Soreng", "Gyalshing"
    ], "lat_range": (27.1, 28.1), "lon_range": (88.1, 88.9)},

    "Tamil Nadu": {"type": "STATE", "districts": [
        "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul",
        "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai",
        "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai",
        "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni",
        "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur",
        "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
    ], "lat_range": (8.1, 13.5), "lon_range": (76.2, 80.3)},

    "Telangana": {"type": "STATE", "districts": [
        "Adilabad", "Bhadradri Kothagudem", "Hanamkonda", "Hyderabad", "Jagtial", "Jangaon",
        "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam",
        "Kumuram Bheem", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal-Malkajgiri",
        "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli",
        "Rajanna Sircilla", "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad",
        "Wanaparthy", "Warangal", "Yadadri Bhuvanagiri"
    ], "lat_range": (15.8, 19.9), "lon_range": (77.2, 81.3)},

    "Tripura": {"type": "STATE", "districts": [
        "Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti",
        "West Tripura"
    ], "lat_range": (22.9, 24.5), "lon_range": (91.1, 92.4)},

    "Uttar Pradesh": {"type": "STATE", "districts": [
        "Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh",
        "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti",
        "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah",
        "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad",
        "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun",
        "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi",
        "Kheri", "Kushinagar", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura",
        "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh",
        "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar",
        "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur",
        "Unnao", "Varanasi"
    ], "lat_range": (23.9, 30.4), "lon_range": (77.1, 84.6)},

    "Uttarakhand": {"type": "STATE", "districts": [
        "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital",
        "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar",
        "Uttarkashi"
    ], "lat_range": (28.7, 31.5), "lon_range": (77.6, 81.0)},

    "West Bengal": {"type": "STATE", "districts": [
        "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling",
        "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad",
        "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman",
        "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"
    ], "lat_range": (21.5, 27.2), "lon_range": (85.8, 89.9)},

    # 8 Union Territories
    "Andaman and Nicobar Islands": {"type": "UNION_TERRITORY", "districts": [
        "Nicobar", "North and Middle Andaman", "South Andaman"
    ], "lat_range": (6.7, 13.7), "lon_range": (92.2, 93.9)},

    "Chandigarh": {"type": "UNION_TERRITORY", "districts": ["Chandigarh"],
                   "lat_range": (30.7, 30.8), "lon_range": (76.7, 76.8)},

    "Dadra and Nagar Haveli and Daman and Diu": {"type": "UNION_TERRITORY", "districts": [
        "Dadra and Nagar Haveli", "Daman", "Diu"
    ], "lat_range": (20.2, 20.7), "lon_range": (70.9, 73.2)},

    "Delhi": {"type": "UNION_TERRITORY", "districts": [
        "Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi",
        "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi",
        "West Delhi"
    ], "lat_range": (28.4, 28.9), "lon_range": (76.8, 77.3)},

    "Jammu and Kashmir": {"type": "UNION_TERRITORY", "districts": [
        "Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kathua",
        "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi",
        "Samba", "Shopian", "Srinagar", "Udhampur"
    ], "lat_range": (32.3, 35.2), "lon_range": (73.9, 77.8)},

    "Ladakh": {"type": "UNION_TERRITORY", "districts": ["Kargil", "Leh"],
               "lat_range": (32.5, 36.0), "lon_range": (75.5, 80.5)},

    "Lakshadweep": {"type": "UNION_TERRITORY", "districts": ["Lakshadweep"],
                    "lat_range": (8.2, 12.4), "lon_range": (71.7, 74.0)},

    "Puducherry": {"type": "UNION_TERRITORY", "districts": [
        "Karaikal", "Mahe", "Puducherry", "Yanam"
    ], "lat_range": (11.8, 12.0), "lon_range": (79.7, 79.9)}
}

PROJECT_TYPES = [
    ("Highway", 0.20),
    ("Railway", 0.15),
    ("Water Supply", 0.10),
    ("Canal", 0.10),
    ("Power Project", 0.10),
    ("Urban Development", 0.10),
    ("Industrial Corridor", 0.08),
    ("Metro", 0.07),
    ("Airport", 0.05),
    ("Dam", 0.05)
]

STAGES = [
    "Land Identification", "Survey", "Documentation", "Approval",
    "Notification", "Objection/Hearing", "Compensation",
    "Legal Resolution", "R&R", "Possession", "Final Handover"
]

STATUSES = [("Active", 0.70), ("Completed", 0.20), ("On Hold", 0.07), ("Cancelled", 0.03)]

DEPARTMENTS = ["Revenue Department", "Land Records Cell", "Environmental Cell",
               "Public Works Dept", "Irrigation Department", "Legal Affairs",
               "R&R Authority", "Finance Department"]

VILLAGE_PREFIXES = ["Rampur", "Govindpur", "Sultanpur", "Fatehpur", "Nandpur",
                    "Kishanpur", "Shivpur", "Chandpur", "Madhavpur", "Anandpur",
                    "Devpur", "Bhavanipur", "Haripur", "Gopalpur", "Kalyanpur"]

def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

def generate_users(seed=42):
    random.seed(seed)
    np.random.seed(seed)

    users = []
    user_id_counter = 1
    default_hash = hash_password("LandGuard@2026")

    admin_names = [
        "Rajesh Sharma", "Ananya Verma", "Vikramaditya Singh", "Sunita Reddy",
        "Arjun Patel", "Priya Nair", "Sanjay Banerjee", "Deepak Joshi",
        "Meenakshi Sundaram", "Amitabh Choudhury", "Pooja Deshmukh", "Karan Malhotra"
    ]
    for i, name in enumerate(admin_names, 1):
        users.append({
            "user_id": f"USR-{user_id_counter:05d}",
            "username": f"admin_{i}",
            "password_hash": default_hash,
            "full_name": name,
            "role": "ADMIN",
            "state": "ALL",
            "district": "ALL",
            "status": "Active",
            "created_at": "2024-01-01 10:00:00"
        })
        user_id_counter += 1

    state_officers_map = {}
    so_cnt = 1
    for state in GEOGRAPHIC_MASTER.keys():
        state_officers_map[state] = []
        clean_state_code = "".join(e for e in state if e.isalnum()).lower()[:10]
        for idx in range(1, 3):
            uid = f"USR-{user_id_counter:05d}"
            username = f"so_{so_cnt:03d}_{clean_state_code}"
            so_cnt += 1
            full_name = f"State Officer {idx} ({state})"
            user_obj = {
                "user_id": uid,
                "username": username,
                "password_hash": default_hash,
                "full_name": full_name,
                "role": "STATE_OFFICER",
                "state": state,
                "district": "ALL",
                "status": "Active",
                "created_at": "2024-01-05 10:00:00"
            }
            users.append(user_obj)
            state_officers_map[state].append(uid)
            user_id_counter += 1

    district_officers_map = {}
    do_cnt = 1
    for state, info in GEOGRAPHIC_MASTER.items():
        district_officers_map[state] = {}
        for dist in info["districts"]:
            clean_dist_code = "".join(e for e in dist if e.isalnum()).lower()[:12]
            uid = f"USR-{user_id_counter:05d}"
            username = f"do_{do_cnt:04d}_{clean_dist_code}"
            do_cnt += 1
            full_name = f"District Collector ({dist}, {state})"
            user_obj = {
                "user_id": uid,
                "username": username,
                "password_hash": default_hash,
                "full_name": full_name,
                "role": "DISTRICT_OFFICER",
                "state": state,
                "district": dist,
                "status": "Active",
                "created_at": "2024-01-10 10:00:00"
            }
            users.append(user_obj)
            district_officers_map[state][dist] = uid
            user_id_counter += 1

    project_managers = []
    pm_by_state = {s: [] for s in GEOGRAPHIC_MASTER.keys()}
    for pm_idx in range(1, 151):
        uid = f"USR-{user_id_counter:05d}"
        assigned_state = random.choice(list(GEOGRAPHIC_MASTER.keys()))
        assigned_dist = random.choice(GEOGRAPHIC_MASTER[assigned_state]["districts"])
        user_obj = {
            "user_id": uid,
            "username": f"pm_{pm_idx:03d}",
            "password_hash": default_hash,
            "full_name": f"Project Manager {pm_idx}",
            "role": "PROJECT_MANAGER",
            "state": assigned_state,
            "district": assigned_dist,
            "status": "Active",
            "created_at": "2024-01-15 10:00:00"
        }
        users.append(user_obj)
        project_managers.append(user_obj)
        pm_by_state[assigned_state].append(uid)
        user_id_counter += 1

    for state, pms in pm_by_state.items():
        if not pms:
            uid = f"USR-{user_id_counter:05d}"
            assigned_dist = GEOGRAPHIC_MASTER[state]["districts"][0]
            user_obj = {
                "user_id": uid,
                "username": f"pm_st_{len(pm_by_state)}",
                "password_hash": default_hash,
                "full_name": f"Special PM ({state})",
                "role": "PROJECT_MANAGER",
                "state": state,
                "district": assigned_dist,
                "status": "Active",
                "created_at": "2024-01-15 10:00:00"
            }
            users.append(user_obj)
            project_managers.append(user_obj)
            pm_by_state[state].append(uid)
            user_id_counter += 1

    for a_idx in range(1, 41):
        st_scope = random.choice(["ALL"] + list(GEOGRAPHIC_MASTER.keys()))
        users.append({
            "user_id": f"USR-{user_id_counter:05d}",
            "username": f"analyst_{a_idx:02d}",
            "password_hash": default_hash,
            "full_name": f"Senior Analyst {a_idx}",
            "role": "ANALYST",
            "state": st_scope,
            "district": "ALL",
            "status": "Active",
            "created_at": "2024-01-20 10:00:00"
        })
        user_id_counter += 1

    return users, pm_by_state, district_officers_map

def generate_dataset(target_projects=1200, seed=42):
    random.seed(seed)
    np.random.seed(seed)

    print("=" * 60)
    print("LANDGUARD AI — SYNTHETIC DATASET GENERATION STARTED")
    print("=" * 60)

    users, pm_by_state, district_officers_map = generate_users(seed)

    all_districts_list = []
    for state, info in GEOGRAPHIC_MASTER.items():
        for dist in info["districts"]:
            all_districts_list.append((state, dist))

    total_districts_count = len(all_districts_list)
    print(f"Total States/UTs: {len(GEOGRAPHIC_MASTER)}")
    print(f"Total Districts: {total_districts_count}")

    project_geo_locations = list(all_districts_list)
    remaining_count = max(0, target_projects - len(project_geo_locations))
    state_weights = []
    for state, dist in all_districts_list:
        n_dist = len(GEOGRAPHIC_MASTER[state]["districts"])
        weight = n_dist ** 1.2
        state_weights.append(weight)

    sum_w = sum(state_weights)
    norm_weights = [w / sum_w for w in state_weights]

    extra_indices = np.random.choice(len(all_districts_list), size=remaining_count, p=norm_weights)
    for idx in extra_indices:
        project_geo_locations.append(all_districts_list[idx])

    actual_total_projects = len(project_geo_locations)
    print(f"Total Projects to Generate: {actual_total_projects}")

    projects = []
    land_parcels = []
    lifecycle_timelines = []
    compensations = []
    legal_disputes = []
    approvals = []
    documentations = []
    rehabilitation_rrs = []
    stakeholders = []
    administrative_performances = []
    project_geospatials = []
    project_outcomes = []
    risk_histories = []
    coverage_tracker = {s: {d: 0 for d in info["districts"]} for s, info in GEOGRAPHIC_MASTER.items()}

    parcel_id_cnt = 1
    timeline_id_cnt = 1
    comp_id_cnt = 1
    legal_id_cnt = 1
    app_id_cnt = 1
    doc_id_cnt = 1
    rr_id_cnt = 1
    stk_id_cnt = 1
    admin_id_cnt = 1
    geo_id_cnt = 1
    out_id_cnt = 1
    risk_id_cnt = 1

    pt_types, pt_probs = zip(*PROJECT_TYPES)
    st_names, st_probs = zip(*STATUSES)

    for p_idx in range(1, actual_total_projects + 1):
        project_id = f"LG-{p_idx:06d}"
        state, district = project_geo_locations[p_idx - 1]
        coverage_tracker[state][district] += 1

        is_demo_high_risk = (p_idx == 42)

        if is_demo_high_risk:
            project_type = "Highway"
            project_name = f"National Highway 44 Bypass ({district} Corridor)"
            land_area_acres = 800.0
            affected_families = 450
            total_landowners = 650
            village_count = 14
            project_budget = 4500000000.0
            current_stage = "Compensation"
            project_status = "Active"
        else:
            project_type = np.random.choice(pt_types, p=pt_probs)
            corridor_names = ["Freight Corridor Expansion", "Expressway Development",
                              "Irrigation Modernization", "Power Grid Link",
                              "Ring Road Phase II", "Smart City Water Network",
                              "Industrial Cluster Feeder", "Metro Line Extension",
                              "Greenfield Connector", "Bypass Construction"]
            project_name = f"{district} {project_type} {random.choice(corridor_names)}"
            village_count = random.randint(1, 40)
            land_area_acres = round(random.uniform(20.0, 10000.0), 2)
            affected_families = random.randint(10, 5000)
            ownership_factor = random.uniform(1.1, 2.5)
            total_landowners = int(affected_families * ownership_factor) + random.randint(5, 50)
            project_budget = round(random.uniform(10_000_000.0, 100_000_000_000.0), 2)
            current_stage = random.choice(STAGES)
            project_status = np.random.choice(st_names, p=st_probs)

        start_year = random.randint(2018, 2024)
        start_month = random.randint(1, 12)
        start_day = random.randint(1, 28)
        planned_start = datetime.date(start_year, start_month, start_day)
        duration_years = random.randint(2, 6)
        planned_comp = planned_start + datetime.timedelta(days=365 * duration_years)
        created_at = datetime.datetime.combine(planned_start, datetime.time(9, 0, 0))
        updated_at = created_at + datetime.timedelta(days=random.randint(10, 300))

        available_pms = pm_by_state.get(state, [])
        pm_id = random.choice(available_pms) if available_pms else "USR-00013"

        projects.append({
            "project_id": project_id,
            "project_name": project_name,
            "project_type": project_type,
            "state": state,
            "district": district,
            "project_manager_id": pm_id,
            "village_count": village_count,
            "land_area_acres": land_area_acres,
            "affected_families": affected_families,
            "total_landowners": total_landowners,
            "project_budget": project_budget,
            "planned_start_date": planned_start.isoformat(),
            "planned_completion_date": planned_comp.isoformat(),
            "current_stage": current_stage,
            "project_status": project_status,
            "created_at": created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "updated_at": updated_at.strftime("%Y-%m-%d %H:%M:%S")
        })

        if is_demo_high_risk:
            risk_tier = "CRITICAL"
        else:
            tier_prob = random.random()
            if tier_prob < 0.30:
                risk_tier = "LOW"
            elif tier_prob < 0.60:
                risk_tier = "MEDIUM"
            elif tier_prob < 0.85:
                risk_tier = "HIGH"
            else:
                risk_tier = "CRITICAL"

        n_parcels = random.randint(5, 15)
        for p_i in range(1, n_parcels + 1):
            parcel_id = f"PARCEL-{parcel_id_cnt:07d}"
            parcel_id_cnt += 1
            p_area = round(land_area_acres / n_parcels, 2)
            survey_no = f"Sy.No {100 + p_i}/{random.choice(['1A','2B','3C','4D'])}"
            v_name = f"{random.choice(VILLAGE_PREFIXES)} ({district})"

            if risk_tier in ["HIGH", "CRITICAL"]:
                verified = 1 if random.random() > 0.4 else 0
                conflict = 1 if random.random() < 0.6 else 0
                doc_stat = random.choice(["Pending", "Missing", "Rejected"])
                acq_stat = random.choice(["Identified", "Surveyed"])
                poss_stat = "Pending"
                comp_stat = "Disputed" if conflict else "Pending"
                dispute_flag = 1 if conflict else 0
            else:
                verified = 1 if random.random() > 0.1 else 0
                conflict = 0 if random.random() > 0.1 else 1
                doc_stat = "Verified"
                acq_stat = random.choice(["Acquired", "Transferred", "Notified"])
                poss_stat = "Taken" if acq_stat == "Acquired" else "In Progress"
                comp_stat = "Approved" if verified else "Pending"
                dispute_flag = conflict

            land_parcels.append({
                "parcel_id": parcel_id,
                "project_id": project_id,
                "survey_number": survey_no,
                "village": v_name,
                "land_area_acres": p_area,
                "land_use_type": random.choice(["Agricultural", "Residential", "Commercial", "Barren"]),
                "ownership_type": random.choice(["Private", "Government", "Community"]),
                "owner_count": random.randint(1, 5),
                "ownership_verified": verified,
                "ownership_conflict": conflict,
                "document_status": doc_stat,
                "acquisition_status": acq_stat,
                "possession_status": poss_stat,
                "compensation_status": comp_stat,
                "legal_dispute_flag": dispute_flag
            })

        curr_stage_idx = STAGES.index(current_stage)
        running_date = planned_start
        for s_idx, s_name in enumerate(STAGES):
            timeline_id = f"TL-{timeline_id_cnt:07d}"
            timeline_id_cnt += 1
            p_dur = random.randint(30, 120)
            p_s_date = running_date
            p_e_date = p_s_date + datetime.timedelta(days=p_dur)
            running_date = p_e_date + datetime.timedelta(days=5)

            if s_idx < curr_stage_idx:
                s_status = "Completed"
                a_s_date = p_s_date
                if risk_tier in ["HIGH", "CRITICAL"]:
                    delay_d = random.randint(40, 150)
                else:
                    delay_d = random.randint(0, 15)
                a_dur = p_dur + delay_d
                a_e_date = a_s_date + datetime.timedelta(days=a_dur)
            elif s_idx == curr_stage_idx:
                s_status = "In Progress" if risk_tier not in ["CRITICAL"] else "Delayed"
                a_s_date = p_s_date
                a_e_date = None
                a_dur = 0
                delay_d = random.randint(20, 120) if risk_tier in ["HIGH", "CRITICAL"] else random.randint(0, 10)
            else:
                s_status = "Not Started"
                a_s_date = None
                a_e_date = None
                a_dur = 0
                delay_d = 0

            lifecycle_timelines.append({
                "timeline_id": timeline_id,
                "project_id": project_id,
                "stage_name": s_name,
                "planned_start_date": p_s_date.isoformat(),
                "planned_end_date": p_e_date.isoformat(),
                "actual_start_date": a_s_date.isoformat() if a_s_date else None,
                "actual_end_date": a_e_date.isoformat() if a_e_date else None,
                "stage_status": s_status,
                "responsible_department": random.choice(DEPARTMENTS),
                "planned_duration_days": p_dur,
                "actual_duration_days": a_dur,
                "stage_delay_days": delay_d
            })

        comp_id = f"COMP-{comp_id_cnt:06d}"
        comp_id_cnt += 1
        est_amt = round(project_budget * random.uniform(0.3, 0.5), 2)
        if risk_tier == "CRITICAL" or is_demo_high_risk:
            app_amt = round(est_amt * 0.85, 2)
            disb_amt = round(app_amt * 0.42, 2)
            ben_total = affected_families
            ben_paid = int(ben_total * 0.42)
            p_status = "In Progress"
            c_disputes = random.randint(12, 25)
        elif risk_tier == "HIGH":
            app_amt = round(est_amt * 0.90, 2)
            disb_amt = round(app_amt * 0.55, 2)
            ben_total = affected_families
            ben_paid = int(ben_total * 0.55)
            p_status = "Partially Completed"
            c_disputes = random.randint(5, 12)
        else:
            app_amt = est_amt
            disb_amt = round(app_amt * random.uniform(0.85, 1.0), 2)
            ben_total = affected_families
            ben_paid = int(ben_total * (disb_amt / app_amt))
            p_status = "Fully Disbursed" if disb_amt == app_amt else "Partially Completed"
            c_disputes = random.randint(0, 3)

        pend_amt = round(app_amt - disb_amt, 2)
        ben_pend = ben_total - ben_paid
        avg_proc = random.randint(15, 60) if risk_tier in ["LOW", "MEDIUM"] else random.randint(60, 180)

        compensations.append({
            "compensation_id": comp_id,
            "project_id": project_id,
            "total_estimated_amount": est_amt,
            "total_approved_amount": app_amt,
            "total_disbursed_amount": disb_amt,
            "total_pending_amount": pend_amt,
            "beneficiaries_total": ben_total,
            "beneficiaries_paid": ben_paid,
            "beneficiaries_pending": ben_pend,
            "average_processing_days": avg_proc,
            "payment_status": p_status,
            "compensation_dispute_count": c_disputes
        })

        if is_demo_high_risk:
            n_legal = 18
        elif risk_tier == "CRITICAL":
            n_legal = random.randint(6, 10)
        elif risk_tier == "HIGH":
            n_legal = random.randint(3, 6)
        elif risk_tier == "MEDIUM":
            n_legal = random.randint(1, 3)
        else:
            n_legal = random.randint(0, 1)

        for l_i in range(n_legal):
            leg_id = f"LEG-{legal_id_cnt:07d}"
            legal_id_cnt += 1
            f_date = planned_start + datetime.timedelta(days=random.randint(30, 400))
            is_resolved = (random.random() > 0.7) if risk_tier in ["HIGH", "CRITICAL"] else (random.random() > 0.3)

            if is_resolved:
                res_date = f_date + datetime.timedelta(days=random.randint(60, 300))
                c_status = "Resolved"
                p_days = 0
            else:
                res_date = None
                c_status = random.choice(["Pending", "Under Hearing", "Stay Order Issued"])
                p_days = (datetime.date(2026, 6, 30) - f_date).days

            legal_disputes.append({
                "dispute_id": leg_id,
                "project_id": project_id,
                "case_type": random.choice(["Title Dispute", "Compensation Amount Dispute", "Encroachment", "Environmental Challenge", "R&R Dispute"]),
                "filing_date": f_date.isoformat(),
                "resolution_date": res_date.isoformat() if res_date else None,
                "case_status": c_status,
                "pending_days": p_days,
                "court_level": random.choice(["District Court", "High Court", "Revenue Tribunal"]),
                "case_severity": "Critical" if risk_tier == "CRITICAL" else random.choice(["Low", "Medium", "High"])
            })

        n_apps = random.randint(3, 8)
        app_types = ["Administrative Approval", "Environmental Clearance", "Land Acquisition Approval", "Financial Approval", "Government Notification"]
        for a_i in range(n_apps):
            app_id = f"APP-{app_id_cnt:07d}"
            app_id_cnt += 1
            sub_date = planned_start + datetime.timedelta(days=random.randint(10, 100))
            is_app = (random.random() > 0.6) if risk_tier in ["HIGH", "CRITICAL"] else (random.random() > 0.15)
            if is_app:
                app_d = sub_date + datetime.timedelta(days=random.randint(30, 120))
                app_stat = "Approved"
                delay_d = random.randint(0, 15)
            else:
                app_d = None
                app_stat = random.choice(["Submitted", "In Review", "Conditionally Approved"])
                delay_d = random.randint(30, 150)

            approvals.append({
                "approval_id": app_id,
                "project_id": project_id,
                "approval_type": app_types[a_i % len(app_types)],
                "submission_date": sub_date.isoformat(),
                "approval_date": app_d.isoformat() if app_d else None,
                "approval_status": app_stat,
                "responsible_authority": random.choice(["MoEFCC", "State Cabinet", "District Collectorate", "Finance Ministry"]),
                "delay_days": delay_d
            })

        n_docs = random.randint(5, 15)
        for d_i in range(n_docs):
            doc_id = f"DOC-{doc_id_cnt:07d}"
            doc_id_cnt += 1
            sub_flag = 1 if (random.random() > 0.2 if risk_tier in ["HIGH", "CRITICAL"] else random.random() > 0.05) else 0
            ver_flag = (1 if random.random() > 0.3 else 0) if sub_flag == 1 else 0
            iss_flag = 1 if (random.random() > 0.5 if risk_tier in ["HIGH", "CRITICAL"] else random.random() > 0.9) else 0
            sub_d = planned_start + datetime.timedelta(days=random.randint(5, 60)) if sub_flag else None
            ver_d = sub_d + datetime.timedelta(days=random.randint(10, 40)) if ver_flag and sub_d else None

            documentations.append({
                "doc_id": doc_id,
                "project_id": project_id,
                "document_type": random.choice(["Land Record", "Ownership Proof", "Survey Record", "Identity Document", "Compensation Document"]),
                "submitted_flag": sub_flag,
                "verified_flag": ver_flag,
                "issue_flag": iss_flag,
                "submission_date": sub_d.isoformat() if sub_d else None,
                "verification_date": ver_d.isoformat() if ver_d else None,
                "doc_status": "Verified" if ver_flag else ("Submitted" if sub_flag else "Pending")
            })

        rr_id = f"RR-{rr_id_cnt:06d}"
        rr_id_cnt += 1
        fam_elig = int(affected_families * random.uniform(0.8, 1.0))
        if is_demo_high_risk or risk_tier == "CRITICAL":
            fam_rehab = int(fam_elig * 0.35)
            h_req = fam_elig
            h_comp = int(h_req * 0.30)
            r_stat = "Delayed"
        elif risk_tier == "HIGH":
            fam_rehab = int(fam_elig * 0.55)
            h_req = fam_elig
            h_comp = int(h_req * 0.50)
            r_stat = "In Progress"
        else:
            fam_rehab = int(fam_elig * random.uniform(0.85, 1.0))
            h_req = fam_elig
            h_comp = int(h_req * (fam_rehab / fam_elig))
            r_stat = "Completed" if fam_rehab == fam_elig else "In Progress"

        fam_pend = fam_elig - fam_rehab
        rr_budg = round(project_budget * 0.15, 2)
        rr_sp = round(rr_budg * (fam_rehab / fam_elig) if fam_elig > 0 else 0.0, 2)
        rr_perc = round((fam_rehab / fam_elig * 100.0), 2) if fam_elig > 0 else 100.0

        rehabilitation_rrs.append({
            "rr_id": rr_id,
            "project_id": project_id,
            "affected_families": affected_families,
            "families_eligible": fam_elig,
            "families_rehabilitated": fam_rehab,
            "families_pending": fam_pend,
            "houses_required": h_req,
            "houses_completed": h_comp,
            "rr_budget": rr_budg,
            "rr_spent": rr_sp,
            "rr_completion_percentage": rr_perc,
            "rr_status": r_stat
        })

        n_stk = random.randint(3, 8)
        for s_k in range(n_stk):
            stk_id = f"STK-{stk_id_cnt:07d}"
            stk_id_cnt += 1
            req_rec = random.randint(5, 50)
            req_res = int(req_rec * (0.4 if risk_tier in ["HIGH", "CRITICAL"] else 0.85))
            req_pend = req_rec - req_res

            stakeholders.append({
                "stakeholder_id": stk_id,
                "project_id": project_id,
                "stakeholder_type": random.choice(["Landowner", "Village Administration", "District Administration", "Contractor", "Local Authority"]),
                "stakeholder_name": f"Stakeholder Group {s_k+1} ({district})",
                "engagement_level": "Low" if risk_tier in ["HIGH", "CRITICAL"] else "High",
                "sentiment": "Negative" if risk_tier in ["HIGH", "CRITICAL"] else "Positive",
                "requests_received": req_rec,
                "requests_resolved": req_res,
                "pending_requests": req_pend,
                "response_time_days": random.randint(30, 90) if risk_tier in ["HIGH", "CRITICAL"] else random.randint(5, 25)
            })

        n_adm = random.randint(2, 5)
        for a_k in range(n_adm):
            adm_id = f"ADM-{admin_id_cnt:07d}"
            admin_id_cnt += 1

            administrative_performances.append({
                "admin_id": adm_id,
                "project_id": project_id,
                "department": DEPARTMENTS[a_k % len(DEPARTMENTS)],
                "officer_workload": "High" if risk_tier in ["HIGH", "CRITICAL"] else "Medium",
                "active_case_count": random.randint(10, 50),
                "pending_case_count": random.randint(5, 30),
                "staff_available": random.randint(2, 15),
                "average_processing_days": random.randint(45, 120) if risk_tier in ["HIGH", "CRITICAL"] else random.randint(10, 40),
                "approval_backlog": random.randint(10, 40) if risk_tier in ["HIGH", "CRITICAL"] else random.randint(0, 10),
                "historical_delay_rate": round(random.uniform(0.4, 0.85), 2) if risk_tier in ["HIGH", "CRITICAL"] else round(random.uniform(0.05, 0.35), 2),
                "coordination_score": round(random.uniform(2.0, 5.0), 1) if risk_tier in ["HIGH", "CRITICAL"] else round(random.uniform(6.5, 9.8), 1)
            })

        geo_id = f"GEO-{geo_id_cnt:06d}"
        geo_id_cnt += 1
        lat_r = GEOGRAPHIC_MASTER[state]["lat_range"]
        lon_r = GEOGRAPHIC_MASTER[state]["lon_range"]
        plat = round(random.uniform(lat_r[0], lat_r[1]), 6)
        plon = round(random.uniform(lon_r[0], lon_r[1]), 6)

        project_geospatials.append({
            "geo_id": geo_id,
            "project_id": project_id,
            "latitude": plat,
            "longitude": plon,
            "state": state,
            "district": district,
            "village": f"{random.choice(VILLAGE_PREFIXES)} ({district})",
            "location_name": f"{district} Infrastructure Site {p_idx}"
        })

        out_id = f"OUT-{out_id_cnt:06d}"
        out_id_cnt += 1
        p_dur_total = (planned_comp - planned_start).days
        if risk_tier == "CRITICAL" or is_demo_high_risk:
            act_dur_total = p_dur_total + random.randint(300, 750)
            d_flag = 1
            f_stat = "Severely Delayed"
            d_stage = "Compensation"
        elif risk_tier == "HIGH":
            act_dur_total = p_dur_total + random.randint(120, 350)
            d_flag = 1
            f_stat = "Delayed"
            d_stage = "Legal Resolution"
        elif risk_tier == "MEDIUM":
            act_dur_total = p_dur_total + random.randint(30, 110)
            d_flag = 1 if (act_dur_total - p_dur_total) > 90 else 0
            f_stat = "Delayed" if d_flag else "On Time"
            d_stage = "Approval" if d_flag else "None"
        else:
            act_dur_total = p_dur_total + random.randint(0, 30)
            d_flag = 0
            f_stat = "On Time"
            d_stage = "None"

        delay_days_val = max(act_dur_total - p_dur_total, 0)
        comp_date = (planned_start + datetime.timedelta(days=act_dur_total)).isoformat() if project_status == "Completed" else None

        project_outcomes.append({
            "outcome_id": out_id,
            "project_id": project_id,
            "planned_duration_days": p_dur_total,
            "actual_duration_days": act_dur_total,
            "delay_days": delay_days_val,
            "delay_flag": d_flag,
            "final_status": f_stat,
            "delay_stage": d_stage,
            "completion_date": comp_date
        })

        n_risks = random.randint(5, 20)
        base_pred_date = planned_start
        for r_i in range(n_risks):
            risk_id = f"RISK-{risk_id_cnt:07d}"
            risk_id_cnt += 1
            p_date = base_pred_date + datetime.timedelta(days=r_i * 30)

            if risk_tier == "CRITICAL" or is_demo_high_risk:
                score = min(100, int(81 + (r_i * 1.0) + random.randint(-2, 4)))
                prob = round(score / 100.0, 2)
                cat = "CRITICAL"
                exp_d = random.randint(250, 600)
            elif risk_tier == "HIGH":
                score = min(80, max(61, int(61 + (r_i * 0.8) + random.randint(-3, 3))))
                prob = round(score / 100.0, 2)
                cat = "HIGH"
                exp_d = random.randint(120, 280)
            elif risk_tier == "MEDIUM":
                score = min(60, max(31, int(35 + random.randint(-5, 10))))
                prob = round(score / 100.0, 2)
                cat = "MEDIUM"
                exp_d = random.randint(40, 110)
            else:
                score = max(0, min(30, int(15 + random.randint(-8, 8))))
                prob = round(score / 100.0, 2)
                cat = "LOW"
                exp_d = random.randint(0, 30)

            risk_histories.append({
                "risk_history_id": risk_id,
                "project_id": project_id,
                "prediction_date": p_date.isoformat(),
                "delay_probability": prob,
                "risk_score": score,
                "risk_category": cat,
                "expected_delay_days": exp_d,
                "highest_risk_stage": current_stage,
                "model_version": "v1.2.0"
            })

    coverage_rows = []
    zero_dist_count = 0
    zero_state_count = 0

    for state, info in GEOGRAPHIC_MASTER.items():
        st_dist_cnt = len(info["districts"])
        st_proj_cnt = sum(coverage_tracker[state].values())
        if st_proj_cnt == 0:
            zero_state_count += 1
        for dist, d_p_cnt in coverage_tracker[state].items():
            if d_p_cnt == 0:
                zero_dist_count += 1
            coverage_rows.append({
                "state": state,
                "district": dist,
                "project_count": d_p_cnt,
                "minimum_project_coverage_met": (d_p_cnt >= 1)
            })

    os.makedirs("data", exist_ok=True)
    pd.DataFrame(users).to_csv("data/users.csv", index=False)
    pd.DataFrame(projects).to_csv("data/projects.csv", index=False)
    pd.DataFrame(land_parcels).to_csv("data/land_parcels.csv", index=False)
    pd.DataFrame(lifecycle_timelines).to_csv("data/lifecycle_timeline.csv", index=False)
    pd.DataFrame(compensations).to_csv("data/compensation.csv", index=False)
    pd.DataFrame(legal_disputes).to_csv("data/legal_disputes.csv", index=False)
    pd.DataFrame(approvals).to_csv("data/approvals.csv", index=False)
    pd.DataFrame(documentations).to_csv("data/documentation.csv", index=False)
    pd.DataFrame(rehabilitation_rrs).to_csv("data/rehabilitation_rr.csv", index=False)
    pd.DataFrame(stakeholders).to_csv("data/stakeholders.csv", index=False)
    pd.DataFrame(administrative_performances).to_csv("data/administrative_performance.csv", index=False)
    pd.DataFrame(project_geospatials).to_csv("data/project_geospatial.csv", index=False)
    pd.DataFrame(project_outcomes).to_csv("data/project_outcomes.csv", index=False)
    pd.DataFrame(risk_histories).to_csv("data/risk_history.csv", index=False)
    pd.DataFrame(coverage_rows).to_csv("data/coverage_summary.csv", index=False)

    print("\nGeneration Completed Successfully!")
    print(f"Total States/UTs: {len(GEOGRAPHIC_MASTER)}")
    print(f"Total Districts: {total_districts_count}")
    print(f"Total Projects: {actual_total_projects}")
    print(f"States/UTs with zero projects: {zero_state_count}")
    print(f"Districts with zero projects: {zero_dist_count}")
    print("-" * 60)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="LANDGUARD AI Synthetic Dataset Generator")
    parser.add_argument("--projects", type=int, default=1200, help="Number of projects to generate")
    parser.add_argument("--seed", type=int, default=42, help="Random seed for reproducibility")
    args = parser.parse_args()

    generate_dataset(target_projects=args.projects, seed=args.seed)
