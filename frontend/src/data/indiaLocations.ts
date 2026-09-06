export interface StateDistrictMap {
  [state: string]: string[];
}

export const INDIA_STATES_AND_UTS: StateDistrictMap = {
  "Andaman and Nicobar Islands": ["Nicobar", "North and Middle Andaman", "South Andaman"],
  "Andhra Pradesh": ["Ananthapuramu", "Chittoor", "East Godavari", "Guntur", "Kadapa", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari"],
  "Arunachal Pradesh": ["Changlang", "East Siang", "Itanagar", "Lohit", "Papum Pare", "Tawang", "Tirap", "West Kameng"],
  "Assam": ["Baksa", "Barpeta", "Cachar", "Darrang", "Dhubri", "Dibrugarh", "Kamrup Metropolitan", "Karimganj", "Nagaon", "Sivasagar", "Sonitpur", "Tinsukia"],
  "Bihar": ["Arrah", "Begusarai", "Bhagalpur", "Darbhanga", "Gaya", "Muzaffarpur", "Nalanda", "Patna", "Purnia", "Rohtas", "Vaishali"],
  "Chandigarh": ["Chandigarh"],
  "Chhattisgarh": ["Bastar", "Bilaspur", "Durg", "Janjgir-Champa", "Korba", "Raigarh", "Raipur", "Rajnandgaon", "Surguja"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
  "Delhi (NCT)": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
  "Goa": ["North Goa", "South Goa"],
  "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Banaskantha", "Bharuch", "Bhavnagar", "Gandhinagar", "Jamnagar", "Junagadh", "Kutch", "Mehsana", "Rajkot", "Surat", "Vadodara", "Valsad"],
  "Haryana": ["Ambala", "Bhiwani", "Faridabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Karnal", "Panipat", "Rohtak", "Sirsa", "Sonipat"],
  "Himachal Pradesh": ["Chamba", "Hamirpur", "Kangra", "Kullu", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
  "Jammu and Kashmir": ["Anantnag", "Baramulla", "Budgam", "Jammu", "Kathua", "Pulwama", "Rajouri", "Srinagar", "Udhampur"],
  "Jharkhand": ["Bokaro", "Dhanbad", "Dumka", "East Singhbhum", "Hazaribagh", "Ranchi", "Ranchi Urban"],
  "Karnataka": ["Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Dakshina Kannada", "Dharwad", "Hassan", "Kalaburagi", "Mysuru", "Shivamogga", "Tumakuru", "Udupi"],
  "Kerala": ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
  "Ladakh": ["Kargil", "Leh"],
  "Lakshadweep": ["Kavaratti"],
  "Madhya Pradesh": ["Bhopal", "Gwalior", "Indore", "Jabalpur", "Katni", "Rewa", "Sagar", "Satna", "Ujjain"],
  "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Kolhapur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nashik", "Navi Mumbai", "Pune", "Solapur", "Thane"],
  "Manipur": ["Bishnupur", "Churachandpur", "Imphal East", "Imphal West", "Thoubal"],
  "Meghalaya": ["East Garo Hills", "East Khasi Hills", "Ri-Bhoi", "West Garo Hills", "West Khasi Hills"],
  "Mizoram": ["Aizawl", "Champhai", "Kolasib", "Lunglei"],
  "Nagaland": ["Dimapur", "Kohima", "Mokokchung", "Tuensang", "Wokha"],
  "Odisha": ["Balasore", "Berhampur", "Bhadrak", "Bhubaneswar", "Cuttack", "Ganjam", "Jajpur", "Jharsuguda", "Khurda", "Puri", "Rourkela", "Sambalpur"],
  "Puducherry": ["Karaikal", "Mahe", "Puducherry", "Yanam"],
  "Punjab": ["Amritsar", "Bathinda", "Firozpur", "Gurdaspur", "Jalandhar", "Ludhiana", "Mohali", "Patiala"],
  "Rajasthan": ["Ajmer", "Alwar", "Bikaner", "Bhilwara", "Jaipur", "Jodhpur", "Kota", "Udaipur"],
  "Sikkim": ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
  "Tamil Nadu": ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"],
  "Telangana": ["Adilabad", "Hyderabad", "Karimnagar", "Khammam", "Mahbubnagar", "Medak", "Nalgonda", "Nizamabad", "Rangareddy", "Warangal"],
  "Tripura": ["Dhalai", "Gomati", "North Tripura", "South Tripura", "West Tripura"],
  "Uttar Pradesh": ["Agra", "Aligarh", "Ayodhya", "Bareilly", "Ghaziabad", "Gorakhpur", "Jhansi", "Kanpur Nagar", "Lucknow", "Mathura", "Meerut", "Moradabad", "Noida", "Prayagraj", "Varanasi"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Udham Singh Nagar"],
  "West Bengal": ["Asansol", "Bankura", "Birbhum", "Darjeeling", "Howrah", "Hooghly", "Jalpaiguri", "Kolkata", "Malda", "Murshidabad", "North 24 Parganas", "Paschim Medinipur", "Purba Medinipur", "Siliguri", "South 24 Parganas"]
};

export const ALL_INDIAN_STATES = Object.keys(INDIA_STATES_AND_UTS).sort();

export const INDIA_DISTRICT_AREAS: Record<string, string[]> = {
  "Chennai": ["Ambattur", "Guindy", "Madhavaram", "Perungudi", "Sholinganallur", "Thiruvottiyur"],
  "Coimbatore": ["Sulur", "Pollachi", "Mettupalayam", "Perur", "Annur", "Kinathukadavu"],
  "Salem": ["Salem City", "Attur", "Mettur", "Omalur", "Edappadi", "Sankari"],
  "Madurai": ["Madurai North", "Madurai South", "Thiruparankundram", "Melur", "Usilampatti", "Perungudi"],
  "Krishnagiri": ["Hosur", "Krishnagiri Town", "Bargur", "Uthangarai", "Denkanikottai", "Pochampalli"],
  "Pune": ["Hinjawadi", "Chakan", "Hadapsar", "Pimpri", "Talegaon"],
  "Mumbai City": ["Fort", "Worli", "Dadar", "Bandra"],
  "Bengaluru Urban": ["Electronic City", "Whitefield", "Yelahanka", "Peenya", "Sarjapur"],
  "Mysuru": ["Nanjangud", "Hootagalli", "Hebbal Industrial Area"],
  "Varanasi": ["Babatpur", "Kashi", "Pindra", "Ramnagar"],
  "Lucknow": ["Hazratganj", "Gomti Nagar", "Amausi"],
  "Noida": ["Sector 62", "Greater Noida West", "Jewar Corridor"],
  "Surat": ["Hazira Port", "Palsana", "Sachin GIDC"],
  "Ahmedabad": ["Sanand", "Changodar", "GIFT City"],
  "Kamrup Metropolitan": ["Guwahati North", "Dispur", "Jalukbari"],
  "Thiruvananthapuram": ["Kazhakkoottam", "Vizhinjam Port Zone", "Technopark Area"],
  "New Delhi": ["Connaught Place", "Lutyens Zone", "Aerocity Link"]
};

export function getAreasForDistrict(districtName: string): string[] {
  if (INDIA_DISTRICT_AREAS[districtName]) {
    return INDIA_DISTRICT_AREAS[districtName];
  }
  return [`${districtName} North`, `${districtName} South`, `${districtName} Central`];
}
