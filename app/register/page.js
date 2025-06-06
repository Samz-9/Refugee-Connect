"use client"
import { useState, useEffect } from "react";
import DOMPurify from "isomorphic-dompurify";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { checkPasswordStrength, checkUsername } from "@/actions/route";
const Select = dynamic(() => import("react-select"), { ssr: false });

export default function Register() {
  const [languages, setlanguages] = useState([]);
  const [skill, setSkills] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [passMsg, setpassMsg] = useState("");
  const [nameerror, setnameerror] = useState("");
  const [uid, setuid] = useState(null);

  const router = useRouter();

  const [profile, setProfile] = useState({ name: "", username: "", password: "", age: "", gender: "", nationality: "", language: languages, skills: skill, location: "", education: "" });
  const [showOverlay, setShowOverlay] = useState(true);
  const [confirmpass, setconfirmpass] = useState("");
  const isFormIncomplete = Object.values(profile).some(
    (value) => {
      return value === "" || (Array.isArray(value) && value.length === 0);
    }
  ) || confirmpass === "";

  const languageOptions = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "mandarin", label: "Mandarin Chinese" },
    { value: "hindi", label: "Hindi" },
    { value: "arabic", label: "Arabic" },
    { value: "french", label: "French" },
    { value: "bengali", label: "Bengali" },
    { value: "russian", label: "Russian" },
    { value: "portuguese", label: "Portuguese" },
    { value: "urdu", label: "Urdu" },
    { value: "german", label: "German" },
    { value: "japanese", label: "Japanese" },
    { value: "swahili", label: "Swahili" },
    { value: "turkish", label: "Turkish" },
    { value: "tamil", label: "Tamil" },
    { value: "telugu", label: "Telugu" },
    { value: "korean", label: "Korean" },
    { value: "italian", label: "Italian" },
    { value: "farsi", label: "Farsi / Persian" },
    { value: "hausa", label: "Hausa" },
    { value: "malay", label: "Malay / Bahasa" },
    { value: "thai", label: "Thai" },
    { value: "vietnamese", label: "Vietnamese" },
    { value: "amharic", label: "Amharic" },
  ];

  const jobOptions = [
    { value: "Accounting", label: "Accounting" },
    { value: "Accounting and Finance", label: "Accounting and Finance" },
    { value: "Account Management", label: "Account Management" },
    { value: "Account Management/Customer Success", label: "Account Management/Customer Success" },
    { value: "Administration and Office", label: "Administration and Office" },
    { value: "Advertising and Marketing", label: "Advertising and Marketing" },
    { value: "Animal Care", label: "Animal Care" },
    { value: "Arts", label: "Arts" },
    { value: "Business Operations", label: "Business Operations" },
    { value: "Cleaning and Facilities", label: "Cleaning and Facilities" },
    { value: "Computer and IT", label: "Computer and IT" },
    { value: "Construction", label: "Construction" },
    { value: "Corporate", label: "Corporate" },
    { value: "Customer Service", label: "Customer Service" },
    { value: "Data and Analytics", label: "Data and Analytics" },
    { value: "Data Science", label: "Data Science" },
    { value: "Design", label: "Design" },
    { value: "Design and UX", label: "Design and UX" },
    { value: "Editor", label: "Editor" },
    { value: "Education", label: "Education" },
    { value: "Energy Generation and Mining", label: "Energy Generation and Mining" },
    { value: "Entertainment and Travel Services", label: "Entertainment and Travel Services" },
    { value: "Farming and Outdoors", label: "Farming and Outdoors" },
    { value: "Food and Hospitality Services", label: "Food and Hospitality Services" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "HR", label: "HR" },
    { value: "Human Resources and Recruitment", label: "Human Resources and Recruitment" },
    { value: "Installation, Maintenance, and Repairs", label: "Installation, Maintenance, and Repairs" },
    { value: "IT", label: "IT" },
    { value: "Law", label: "Law" },
    { value: "Legal Services", label: "Legal Services" },
    { value: "Management", label: "Management" },
    { value: "Manufacturing and Warehouse", label: "Manufacturing and Warehouse" },
    { value: "Marketing", label: "Marketing" },
    { value: "Mechanic", label: "Mechanic" },
    { value: "Media, PR, and Communications", label: "Media, PR, and Communications" },
    { value: "Mental Health", label: "Mental Health" },
    { value: "Nurses", label: "Nurses" },
    { value: "Office Administration", label: "Office Administration" },
    { value: "Personal Care and Services", label: "Personal Care and Services" },
    { value: "Physical Assistant", label: "Physical Assistant" },
    { value: "Product", label: "Product" },
    { value: "Product Management", label: "Product Management" },
    { value: "Project Management", label: "Project Management" },
    { value: "Protective Services", label: "Protective Services" },
    { value: "Public Relations", label: "Public Relations" },
    { value: "Real Estate", label: "Real Estate" },
    { value: "Recruiting", label: "Recruiting" },
    { value: "Retail", label: "Retail" },
    { value: "Sales", label: "Sales" },
    { value: "Science and Engineering", label: "Science and Engineering" },
    { value: "Social Services", label: "Social Services" },
    { value: "Software Engineer", label: "Software Engineer" },
    { value: "Software Engineering", label: "Software Engineering" },
    { value: "Sports, Fitness, and Recreation", label: "Sports, Fitness, and Recreation" },
    { value: "Transportation and Logistics", label: "Transportation and Logistics" },
    { value: "Unknown", label: "Unknown" },
    { value: "UX", label: "UX" },
    { value: "Videography", label: "Videography" },
    { value: "Writer", label: "Writer" },
    { value: "Writing and Editing", label: "Writing and Editing" }
  ];

  const checkname = async () => {
    let strength = checkPasswordStrength(profile.password);
    let isUsernameTaken = await checkUsername(profile.username);

    if (isUsernameTaken) {
      setnameerror("Username already exists.");
      return;
    }
    if (strength == "Weak") {
      setpassMsg("Please use a stronger password");
      return;
    }
    if (profile.password !== confirmpass) {
      setErrorMsg("Passwords do not match. Please try again.");
      return;
    }
    setErrorMsg("");
    setpassMsg("");
    setnameerror("");
    window.alert("Profile created successfully!");
    setShowOverlay(false);
    const createdUid = await handleSubmit();
    if (createdUid) {
      setuid(createdUid);
    }
  }
  const [encodedUsername, setEncodedUsername] = useState("");
  const [encodedUid, setencodedUid] = useState("");
 
  useEffect(() => {
    if (uid) {
      const safeUsername = DOMPurify.sanitize(profile.username);
      const safeUid = DOMPurify.sanitize(uid);

      setEncodedUsername(encodeURIComponent(safeUsername))
      setencodedUid(encodeURIComponent(safeUid))

    }
  }, [uid]);
  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...profile,
        }),
      });
      const data = await res.json();
      return data._id;

    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };
  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderRadius: "0.5rem",
      borderColor: "#9CA3AF",
      boxShadow: state.isFocused ? "0 0 0 1px black" : "none",
      padding: "0.125rem",
      minHeight: "2.5rem",
      fontSize: "1.125rem",
      backgroundColor: "white",
      display: "flex",
      overflow: "hidden",
    }),
    valueContainer: (base) => ({
      ...base,
      display: "flex",
      flexWrap: "nowrap",
      overflowX: "auto",
      overflowY: "hidden",
      maxWidth: "100%",
      whiteSpace: "nowrap",
      scrollbarWidth: "thin",
      msOverflowStyle: "auto",
      "&::-webkit-scrollbar": {
        height: "6px",
      },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#E0E7FF",
      borderRadius: "0.375rem",
      padding: "0 4px",
      marginRight: "4px",
      flexShrink: 0,
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#3730A3",
      fontWeight: "500",
      whiteSpace: "nowrap",      
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "#6B7280",
      ":hover": {
        backgroundColor: "#F87171",
        color: "white",
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: "#9CA3AF",
      whiteSpace: "nowrap",
    }),
  };



  return (
    <div className="relative">
      {showOverlay && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/30 z-50 flex items-center justify-center">
          <div className='border-2 bg-white w-[30%] rounded-2xl p-10'>

            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input type="text" id="username" onChange={(e) => {
              const cleanValue = DOMPurify.sanitize(e.target.value);
              setProfile({ ...profile, username: cleanValue });
              setnameerror("");
            }} required className="w-full px-4 py-2 border border-gray-300 mb-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {nameerror && <p className="text-red-500 text-sm mb-4 ">{nameerror}</p>}

            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" onChange={(e) => {
              const cleanpass = DOMPurify.sanitize(e.target.value);
              setProfile({ ...profile, password: cleanpass });
              setpassMsg("");
            }} id="password" name="password" className="w-full px-4 py-2 border border-gray-300 mb-1  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            {passMsg && <p className="text-red-500 text-sm mb-4">{passMsg}</p>}

            <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input type="password" onChange={(e) => {
              setconfirmpass(e.target.value);
              setErrorMsg("");
            }}
              id="confirmpassword" name="confirmpassword" className="w-full px-4 py-2 border border-gray-300 mb-5  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            {errorMsg && <p className="text-red-500 text-sm mb-4">{errorMsg}</p>}

            <div onClick={checkname} className="w-[80%] bg-blue-600 mx-auto text-center text-white py-2 rounded-lg hover:bg-blue-700 hover:font-semibold">Create Profile</div>

          </div>
        </div>
      )}
      <div className="mx-auto w-[85vw] bg-gray-100 rounded-2xl p-6 shadow-md my-14">
        <h2 className="text-2xl text-center font-semibold underline py-4">Create Your Profile</h2>
        <div className="px-8 py-4 w-full grid grid-cols-3 gap-10">
          <input className="rounded-lg w-full px-1 py-2 text-lg border border-gray-400 indent-2" placeholder="Full Name" onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          <input className="rounded-lg px-1 py-2 w-full text-lg border border-gray-400 indent-2" placeholder="Age" onChange={(e) => setProfile({ ...profile, age: e.target.value })} />
          <select
            value={profile.gender}
            onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
            className={`rounded-lg shadow-sm w-full px-1 py-2 border indent-1 border-gray-400 focus:ring-1 text-lg focus:ring-black ${profile.gender === "" ? "text-gray-400" : "text-black"} bg-white`}
          >
            <option value="" disabled hidden>
              Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input className="rounded-lg px-1 py-2 w-full text-lg border border-gray-400 indent-2" placeholder="Nationality" onChange={(e) => setProfile({ ...profile, nationality: e.target.value })} />
          <Select
            isMulti
            options={languageOptions}
            onChange={(selected) => {
              setlanguages(selected)
              setProfile({ ...profile, language: selected.map(l => l.value) })
            }}

            placeholder="Languages Known"
            styles={customStyles}
            className="w-full"
            classNamePrefix="react-select"
          />
          <Select
            isMulti
            options={jobOptions}
            onChange={(selected) => {
              setSkills(selected)
              setProfile({ ...profile, skills: selected.map(l => l.value) })
            }}

            placeholder="Skills / Occupation"
            styles={customStyles}
            className="w-full"
            classNamePrefix="react-select"
          />

          <input className="rounded-lg px-1 py-2 w-full text-lg border border-gray-400 indent-2" placeholder="Current Location/State" onChange={(e) => setProfile({ ...profile, location: e.target.value })} />
          <select
            value={profile.education}
            onChange={(e) => setProfile({ ...profile, education: e.target.value })}
            className={`rounded-lg shadow-sm w-full px-1 py-2 border indent-1 border-gray-400 focus:ring-1 text-lg focus:ring-black ${profile.education === "" ? "text-gray-400" : "text-black"} bg-white`}
          >
            <option value="" disabled hidden>
              Education Level
            </option>
            <option value="Below 10th">No formal education</option>
            <option value="10th Pass">10th Pass</option>
            <option value="12th Pass">12th Pass</option>
            <option value="Undergraduate (UG)">Undergraduate (UG)</option>
            <option value="Postgraduate (PG)">Postgraduate (PG)</option>
            <option value="PhD / Doctorate">PhD / Doctorate</option>
          </select>
        </div>
        <button disabled={isFormIncomplete} className={`block bg-gradient-to-r my-4 from-orange-500 to-indigo-500 text-white py-3 text-center w-[30%] text-lg mx-auto rounded-xl hover:font-semibold ${isFormIncomplete ? "opacity-50 cursor-not-allowed" : ""}`} onClick={() => {
          handleSubmit(); router.push(`/dashboard/${encodedUsername}?id=${encodedUid}`); alert('Loading...');
        }}>Find Safe Country</button>
      </div>
    </div>

  )
}
