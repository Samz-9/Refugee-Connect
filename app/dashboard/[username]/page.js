"use client"
import { useEffect, useState, useMemo } from "react";
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";
const Select = dynamic(() => import("react-select"), { ssr: false });
const MapWithSearch = dynamic(() => import('@/components/map'), { ssr: false, });
import MuseJobs from "@/components/joboffers";

export default function ClimateRefugeeApp({ params, searchParams }) {
    const { username } = params;
    const uid = searchParams?.id;
    const router = useRouter();
    const [originalProfile, setOriginalProfile] = useState(null);
    const [isModified, setIsModified] = useState(false);
    const [Loc, setLoc] = useState("");
    const [skll, setskll] = useState("");
    const [profile, setProfile] = useState({ name: "", username: "", password: "", age: "", gender: "", nationality: "", language: [], skills: [], location: "", education: "" });

    const languageOptions = useMemo(() => [
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
    ], []);
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
            overflowX: "auto",
            overflowY: "hidden",
            flexWrap: "nowrap",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
                display: "none",
            },
        }),
        valueContainer: (base) => ({
            ...base,
            display: "flex",
            flexWrap: "nowrap",
            overflowX: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
                display: "none",
            },
        }),
        multiValue: (base) => ({
            ...base,
            backgroundColor: "#E0E7FF",
            borderRadius: "0.375rem",
            padding: "0 4px",
            marginRight: "4px",
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: "#3730A3",
            fontWeight: "500",
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

    const jobOptions = useMemo(() => [
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
    ], [])

    useEffect(() => {
        const validate = async () => {
            if (!username || !uid) {
                router.push("/404");
                return;
            }

            try {

                const res = await fetch("/api/checkusername", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, uid }),
                });

                const data = await res.json();

                if (!data.valid) {
                    router.push("/404");
                }
                else {
                    setLoc(data.user.location);
                    setskll(data.user.skills);
                    setProfile(data.user);
                    setOriginalProfile(data.user);

                    setTimeout(() => {
                        setisLoading(false)
                    }, 15000);
                }
            } catch (error) {
                console.error("Error validating user:", error);
                router.push("/404");
            }
        };

        validate();
    }, [username, uid, router]);
    useEffect(() => {
        if (!originalProfile) return;

        const isChanged = JSON.stringify(profile) !== JSON.stringify(originalProfile);
        setIsModified(isChanged);

    }, [profile, originalProfile]);

    const [isLoading, setisLoading] = useState(true);
    const handlesave = async () => {
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
            if (res.ok) {
                alert("Profile saved successfully!");
                setOriginalProfile(profile);
                setIsModified(false);
                setLoc(profile.location);
                setskll(profile.skills);
                window.location.reload();
            }

        } catch (err) {
            console.error("Error saving profile:", err);
        }
    }


    return (
        <div className="mx-auto font-sans ">
    { isLoading && <div className="w-full h-full z-20 absolute top-0 left-0 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 mb-4 animate-spin"></div>
            <p className="text-lg font-semibold text-gray-700">Wait a minute !!</p>
            <p className="text-lg font-semibold text-gray-700">Loading your dashboard...</p>
        </div>
    </div>}
    <div className="text-xl m-2 rounded-xl px-9 py-4 flex justify-between text-white bg-gradient-to-r from-orange-500 to-indigo-500 font-bold text-center ">
        <div>Profile Match With Safe Countries</div>
        <div>
            <span className="text-lg drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] text-black">Welcome,</span>
            <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                {username && username[0].toUpperCase() + username.slice(1)}
            </span>
        </div>
    </div>

    <div className="mx-2 bg-gray-100 rounded-2xl h-[87vh] flex shadow-md px-5 pb-1 pt-4">
        <div className="space-y-4 flex flex-col px-6 py-2 w-[25vw] ">
            <h2 className="text-xl font-semibold">Edit Profile</h2>
            <input className="rounded-lg w-full p-1 text-base border border-gray-400 indent-2" placeholder="Full Name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
            <input className="rounded-lg p-1 w-full text-base border border-gray-400 indent-2" placeholder="Age" value={profile.age} onChange={(e) => setProfile({ ...profile, age: e.target.value })} />
            <select
                value={profile.gender}
                onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                className={`rounded-lg shadow-sm w-full p-1 border indent-1 border-gray-400 focus:ring-1 text-base focus:ring-black ${profile.gender === "" ? "text-gray-400" : "text-black"} bg-white`}
            >
                <option value="" disabled hidden>
                    Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <input className="rounded-lg p-1 w-full text-base border border-gray-400 indent-2" placeholder="Nationality" value={profile.nationality} onChange={(e) => setProfile({ ...profile, nationality: e.target.value })} />
            <Select
                isMulti
                value={profile.language ? profile.language.map(lang => ({ value: lang, label: lang })) : []}
                options={languageOptions}
                onChange={(selected) =>
                    setProfile((prev) => ({
                        ...prev,
                        language: selected.map((l) => l.value),
                    }))
                }

                placeholder="Languages Known"
                styles={customStyles}
                className="w-full"
                classNamePrefix="react-select"
            />
            <Select
                isMulti
                value={profile.skills ? profile.skills.map(lang => ({ value: lang, label: lang })) : []}
                options={jobOptions}
                onChange={(selected) =>
                    setProfile((prev) => ({
                        ...prev,
                        skills: selected.map((l) => l.value),
                    }))
                }
                placeholder="Skills / Occupation"
                styles={customStyles}
                className="w-full"
                classNamePrefix="react-select"
            />

            <input className="rounded-lg p-1 w-full text-base border border-gray-400 indent-2" placeholder="Current Location/City" value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} />
            <select
                value={profile.education}
                onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                className={`rounded-lg shadow-sm w-full p-1 border indent-1 border-gray-400 focus:ring-1 text-base focus:ring-black ${profile.education === "" ? "text-gray-400" : "text-black"} bg-white`}
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
            {isModified && (<button className="bg-gradient-to-r from-orange-500 to-indigo-500 text-white py-2 w-full rounded-xl hover:font-semibold transition-transform duration-300 hover:animate-pulse-scale" onClick={handlesave}>Save Changes</button>)}
        </div>


        <div className="bg-white rounded-2xl mx-1 my-2 w-[25vw] shadow-md ">
            <h2 className="text-xl pt-4 px-4 font-semibold">Nearby Safe Cities with Matching Jobs</h2>
            {Loc && skll && (
                <MuseJobs skills={skll} proplocation={Loc} />
            )}
        </div>


        <div className="bg-white rounded-2xl mx-1 my-2 w-[45vw] shadow-md px-4">
            <MapWithSearch location={Loc} className='w-full h-[72vh] mb-1'></MapWithSearch>
        </div>

    </div>
</div>
    );
}