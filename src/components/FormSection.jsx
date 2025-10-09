import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// State name to abbreviation mapping
const stateAbbrev = {
  "Alabama": "AL",
  "Alaska": "AK",
  "Arizona": "AZ",
  "Arkansas": "AR",
  "California": "CA",
  "Colorado": "CO",
  "Connecticut": "CT",
  "Delaware": "DE",
  "Florida": "FL",
  "Georgia": "GA",
  "Hawaii": "HI",
  "Idaho": "ID",
  "Illinois": "IL",
  "Indiana": "IN",
  "Iowa": "IA",
  "Kansas": "KS",
  "Kentucky": "KY",
  "Louisiana": "LA",
  "Maine": "ME",
  "Maryland": "MD",
  "Massachusetts": "MA",
  "Michigan": "MI",
  "Minnesota": "MN",
  "Mississippi": "MS",
  "Missouri": "MO",
  "Montana": "MT",
  "Nebraska": "NE",
  "Nevada": "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  "Ohio": "OH",
  "Oklahoma": "OK",
  "Oregon": "OR",
  "Pennsylvania": "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  "Tennessee": "TN",
  "Texas": "TX",
  "Utah": "UT",
  "Vermont": "VT",
  "Virginia": "VA",
  "Washington": "WA",
  "West Virginia": "WV",
  "Wisconsin": "WI",
  "Wyoming": "WY",
  "Washington DC": "DC",
  "Puerto Rico": "PR",
  "Virgin Islands": "VI",
};

const areaCodesUS = [
  // Alabama
  205, 251, 256, 334, 659,
  // Alaska
  907,
  // Arizona
  480, 520, 602, 623, 928,
  // Arkansas
  479, 501, 870,
  // California
  209, 213, 279, 310, 323, 341, 408, 415, 424, 442, 510, 530, 559,
  562, 619, 626, 650, 657, 661, 669, 707, 714, 747, 760, 805, 818,
  820, 831, 858, 909, 916, 925, 949, 951, 628,
  // Colorado
  303, 719, 720, 970,
  // Connecticut
  203, 475, 860, 959,
  // Delaware
  302,
  // District of Columbia
  202,
  // Florida
  239, 305, 321, 352, 386, 407, 561, 689, 727, 754, 772, 786,
  813, 850, 863, 904, 941, 954,
  // Georgia
  229, 404, 470, 478, 678, 706, 762, 770, 912,
  // Hawaii
  808,
  // Idaho
  208, 986,
  // Illinois
  217, 224, 309, 312, 331, 464, 618, 630, 708, 773, 815, 847, 872,
  // Indiana
  219, 260, 317, 463, 574, 765, 812, 930,
  // Iowa
  319, 515, 563, 641, 712,
  // Kansas
  316, 620, 785, 913,
  // Kentucky
  270, 364, 502, 606, 859,
  // Louisiana
  225, 318, 337, 504, 985,
  // Maine
  207,
  // Maryland
  240, 301, 410, 443, 667,
  // Massachusetts
  339, 351, 413, 508, 617, 774, 781, 857, 978,
  // Michigan
  231, 248, 269, 313, 517, 586, 616, 734, 810, 906, 947, 989,
  // Minnesota
  218, 320, 507, 612, 651, 763, 952,
  // Mississippi
  228, 601, 662, 769,
  // Missouri
  314, 417, 573, 636, 660, 816,
  // Montana
  406,
  // Nebraska
  308, 402, 531,
  // Nevada
  702, 725, 775,
  // New Hampshire
  603,
  // New Jersey
  201, 551, 609, 640, 732, 848, 856, 862, 908, 973,
  // New Mexico
  505, 575,
  // New York
  212, 315, 332, 347, 516, 518, 585, 607, 631, 646, 716,
  718, 838, 845, 914, 917, 929, 934,
  // North Carolina
  252, 336, 704, 743, 828, 910, 919, 980, 984,
  // North Dakota
  701,
  // Ohio
  216, 220, 234, 330, 380, 419, 440, 513, 567, 614, 740, 937,
  // Oklahoma
  405, 539, 580, 918,
  // Oregon
  458, 503, 541, 971,
  // Pennsylvania
  215, 223, 267, 272, 412, 445, 484, 570, 610, 717, 724, 814, 878,
  // Rhode Island
  401,
  // South Carolina
  803, 839, 843, 854, 864,
  // South Dakota
  605,
  // Tennessee
  423, 615, 629, 731, 865, 901, 931,
  // Texas
  210, 214, 254, 281, 325, 346, 361, 409, 430, 432, 469, 512,
  682, 713, 726, 737, 806, 817, 830, 832, 903, 915, 936, 940,
  945, 956, 972, 979,
  // Utah
  385, 435, 801,
  // Vermont
  802,
  // Virginia
  276, 434, 540, 571, 703, 757, 804, 826, 948,
  // Washington
  206, 253, 360, 425, 509, 564,
  // West Virginia
  304, 681,
  // Wisconsin
  262, 414, 534, 608, 715, 920,
  // Wyoming
  307,
  // Puerto Rico
  787, 939,
  // U.S. Virgin Islands
  340
];

const FormSection = () => {
  const [submitError, setSubmitError] = useState("");
  const [agreementError, setAgreementError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Track TrustedForm Cert URL
  const [trustedFormCertUrl, setTrustedFormCertUrl] = useState("");

  const [imageLoaded, setImageLoaded] = useState(false);
  // Track LeadiD token
  // (already declared below, removed duplicate)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currencyBill: "",
    sunExposure: "",
    energyProvider: "",
    energyProviderName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    homeOwner: "",
    propertyType: "",
    purchaseTimeFrame: "",
    bestTimeToCall: "",
    serviceRequirements: "",
    agreement: false,
    aff_id: "",
    transaction_id: "",
    sub_aff_id: "",
    url: window.location.href,
    start: "",
    min: "",
    ipaddress: "",
    browser: "",
  });

  useEffect(() => {
    // Fetch user's IP and region on first load
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        setFormData((prevData) => ({ ...prevData, ipaddress: data.ip }));
        // Now fetch region for this IP
        fetch(`https://ipapi.co/${data.ip}/json/`)
          .then((res) => res.json())
          .then((regionData) => {
            setIpState(regionData.region || "");
          })
          .catch(() => {
            setIpState("");
          });
      })

    // Set browser info
    setFormData((prevData) => ({ ...prevData, browser: navigator.userAgent }));

    // Extract aff_id, transaction_id, and sub_aff_id from query string if present
    const urlParams = new URLSearchParams(window.location.search);
    const aff_id = urlParams.get("aff_id") || "";
    const transaction_id = urlParams.get("transaction_id") || "";
    const sub_aff_id = urlParams.get("sub_aff_id") || "";

    setFormData((prevData) => ({
      ...prevData,
      aff_id,
      transaction_id,
      sub_aff_id,
    }));

    // Remove query string from URL after capturing values
    if (window.location.search) {
      window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
    }
  }, []);

  useEffect(() => {
    // Inject TrustedForm script if not present
    if (!document.querySelector("script[src*='trustedform.com/trustedform.js']")) {
      const trustedFormScript = document.createElement("script");
      trustedFormScript.type = "text/javascript";
      trustedFormScript.async = true;
      trustedFormScript.src =
        (document.location.protocol === "https:" ? "https" : "http") +
        "://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&ping_field=xxTrustedFormPingUrl&l=" +
        new Date().getTime() +
        Math.random();
      document.body.appendChild(trustedFormScript);
    }

    // Inject Jornaya LeadiD script as per official instructions, after form is rendered
    setTimeout(() => {
      if (!document.getElementById('LeadiDscript_campaign')) {
        let leadIdScript = document.getElementById('LeadiDscript');
        if (!leadIdScript) {
          leadIdScript = document.createElement('script');
          leadIdScript.id = 'LeadiDscript';
          document.body.appendChild(leadIdScript);
        }
        const s = document.createElement('script');
        s.id = 'LeadiDscript_campaign';
        s.type = 'text/javascript';
        s.async = true;
        s.src = '//create.lidstatic.com/campaign/548c86c2-3c24-2ec2-b201-274ffb0f5005.js?snippet_version=2';
        leadIdScript.parentNode.insertBefore(s, leadIdScript);
      }
    }, 500);

    // Set LeadiD token in hidden input after script loads
    const setLeadIdToken = () => {
      setTimeout(() => {
        let token = '';
        try {
          token = window.LeadiD && window.LeadiD.getToken ? window.LeadiD.getToken() : '';
        } catch {
          // ignore
        }
        // Set token in hidden input field
        const leadIdInput = document.getElementById('leadid_token');
        if (leadIdInput) {
          leadIdInput.value = token;
        }
        setUniversalLeadid(token);
      }, 1200);
    };
    window.addEventListener('load', setLeadIdToken);
    setLeadIdToken();

    // Add noscript image for Jornaya (for non-JS users)
    if (!document.getElementById('jornaya-noscript-img')) {
      const img = document.createElement('img');
      img.id = 'jornaya-noscript-img';
      img.src = '//create.leadid.com/noscript.gif?lac=6B96394A-E3F0-75F4-8748-80CB63C352C2&lck=548c86c2-3c24-2ec2-b201-274ffb0f5005&snippet_version=2';
      img.alt = '';
      img.style.display = 'none';
      document.body.appendChild(img);
    }
  }, []);

  // Track LeadiD token
  const [universalLeadid, setUniversalLeadid] = useState("");

  useEffect(() => {
    const trustedFormPingScript = document.createElement("script");
    trustedFormPingScript.innerHTML = `
      function recordTrustedFormPing() {
        var pingUrlField = document.querySelector("input[name='xxTrustedFormPingUrl']");
        if (pingUrlField && pingUrlField.value) {
          var img = document.createElement("img");
          img.src = pingUrlField.value;
          img.style.display = "none";
          document.body.appendChild(img);
        }
      }
      window.addEventListener("beforeunload", recordTrustedFormPing);
    `;
    document.body.appendChild(trustedFormPingScript);
  }, []);

  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [validatingZip] = useState(false); // Remove unused setter
  const [zipValid, setZipValid] = useState(false);
  const [ipState, setIpState] = useState("");
  const [ipStateCheckLoading, setIpStateCheckLoading] = useState(false);
  const [ipStateValidForSubmit, setIpStateValidForSubmit] = useState(true);
  const [zipCheckLoading, setZipCheckLoading] = useState(false);
  const [emailCheckLoading, setEmailCheckLoading] = useState(false);

  const [providerQuery, setProviderQuery] = useState("");
  const [providerSuggestions, setProviderSuggestions] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const getMatchScore = (name, query) => {
    const lowerName = name.toLowerCase();
    const lowerQuery = query.toLowerCase();
    if (lowerName === lowerQuery) return 3;
    if (lowerName.startsWith(lowerQuery)) return 2;
    if (lowerName.includes(lowerQuery)) return 1;
    return 0;
  };

  const fetchProviders = async (query) => {
    if (query.length < 3) return;
    try {
      const res = await fetch(`https://steermarketeer.com/API/providers.php?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      const sortedData = data.sort((a, b) => {
        const scoreA = getMatchScore(a.name, query);
        const scoreB = getMatchScore(b.name, query);
        if (scoreA !== scoreB) return scoreB - scoreA; // higher score first
        return a.name.localeCompare(b.name); // alphabetical as tiebreaker
      });
      setProviderSuggestions(sortedData);
    } catch (e) {
      console.error(e);
      setProviderSuggestions([]);
    }
  };

  const fields = [
    [
      {
        id: "currencyBill",
        label: "How much is your current bill?",
        type: "select",
        options: [
          "50$",
          "100$",
          "200$",
          "300$",
          "400$",
          "500$",
          "600$",
          "700$",
          "800$",
          "900$",
          "More than 900$",
        ],
      },
      {
        id: "sunExposure",
        label: "How much sun hits your roof?",
        type: "select",
        options: ["Full sun", "Partially shaded", "Mostly shaded", "Not sure"],
      },
    ],
    [
      {
        id: "energyProvider",
        label: "Who is your energy provider?",
        type: "text",
      },
      {
        id: "ProjectNature",
        label: "What is the nature of your project?", type: "select",
        options: ["New", "Repair", "Replace"],
      },
    ],

    [
      { id: "firstName", label: "First Name", type: "text" },
      { id: "lastName", label: "Last Name", type: "text" },
    ],
    [
      { id: "email", label: "Email", type: "email" },
      { id: "phone", label: "Phone Number", type: "tel" },
    ],
    [
      {
        id: "state",
        label: "State",
        type: "select",
        options: [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
  "Washington DC",
  "Puerto Rico",
  "Virgin Islands",
],

      },
      { id: "zipCode", label: "Zip Code", type: "text" },
    ],
    [
      { id: "address", label: "Address", type: "text" },
      { id: "city", label: "City", type: "text" },
    ],
    [
      {
        id: "homeOwner",
        label: "Home Owner",
        type: "select",
        options: ["Yes", "No"],
      },
      {
        id: "propertyType",
        label: "Property Type",
        type: "select",
        options: ["Commercial", "MultiUnit", "Residential"],
      },
    ],
    [
      {
        id: "purchaseTimeFrame",
        label: "Purchase Time Frame",
        type: "select",
        options: [
          "1-2 weeks",
          "3-4 weeks",
          "5-6 weeks",
          "7-8 weeks",
          "Time is flexible",
        ],
      },
      {
        id: "bestTimeToCall",
        label: "Best Time to Call",
        type: "select",
        options: ["Any Time", "Morning", "Afternoon", "Evening"],
      },
    ],
    [
      {
        id: "serviceRequirements",
        label: "Brief Explanation",
        type: "textarea",
      },
      { id: "agreement", label: "", type: "checkbox" },
    ],
  ];

  const totalSteps = fields.length;
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  const validateFields = () => {
    let newErrors = {};
    // UniversalLeadid is now required for submit
    if (currentStep === fields.length - 1) {
      const leadIdInput = document.getElementById('leadid_token');
      const leadIdValue = leadIdInput ? leadIdInput.value : universalLeadid;
      if (!leadIdValue) {
        newErrors.universalLeadid = "LeadiD token is required. Please wait for the page to fully load.";
      }
      // Check if browser info is available
      if (!formData.browser) {
        newErrors.browser = "Browser information is required. Please wait for the page to load.";
      }
    }
    fields[currentStep].forEach((field) => {
      // Only validate required fields, skip fields with empty label (like agreement)
      if (field.type !== 'checkbox' && field.label && (formData[field.id] === undefined || formData[field.id] === null || formData[field.id] === "")) {
        newErrors[field.id] = "This field is required";
      }
      if (field.id === "zipCode") {
        if (formData.zipCode.length !== 5) {
          newErrors.zipCode = "Zip code must be exactly 5 digits";
        }
      }
      if (field.id === "phone") {
        if (formData.phone.length !== 10) {
          newErrors.phone = "Phone number must be exactly 10 digits";
        } else {
          const areaCode = parseInt(formData.phone.substring(0, 3));
          if (!areaCodesUS.includes(areaCode)) {
            newErrors.phone = "Invalid area code";
          }
        }
      }
      if (
        field.id === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ) {
        newErrors.email = "Invalid email format";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    // Update universalLeadid from hidden input if present
    const leadIdInput = document.getElementById('leadid_token');
    if (leadIdInput) {
      setUniversalLeadid(leadIdInput.value);
    }

    // Inject TrustedForm script when user starts filling the form (first change)
    if (!document.querySelector("script[src*='trustedform.com/trustedform.js?field=xxTrustedFormCertUrl']")) {
      (function() {
        var tf = document.createElement('script');
        tf.type = 'text/javascript';
        tf.async = true;
        tf.src = (document.location.protocol === "https:" ? 'https' : 'http') +
          '://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&use_tagged_consent=true&l=' +
          new Date().getTime() + Math.random();
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(tf, s);
      })();
    }

    // Try to get xxTrustedFormCertUrl value after each change
    setTimeout(() => {
      const certInput = document.querySelector("input[name='xxTrustedFormCertUrl']");
      if (certInput && certInput.value) {
        setTrustedFormCertUrl(certInput.value);
      }
    }, 500);
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };


  useEffect(() => {
    // Run zip API only when both state and zipCode are present and non-empty, and ipState is empty
    if (formData.state && formData.zipCode && formData.zipCode.length === 5 && !ipState) {
      fetch(`https://steermarketeer.com/api/a9f3b2c1e7d4?zip=${formData.zipCode}`)
        .then(res => res.json())
    }
  }, [formData.state, formData.zipCode, ipState]);

  const handleNext = async () => {
    // Provider validation step (step 1)
    if (currentStep === 1) {
      if (providerQuery.trim()) {
        const query = providerQuery.trim().toLowerCase();
        if (query === "other" || query === "others") {
          setSelectedProvider({ id: 0, name: "Other" });
          setFormData({ ...formData, energyProvider: 0, energyProviderName: "Other" });
        } else {
          try {
            const res = await fetch(`https://steermarketeer.com/API/providers.php?q=${encodeURIComponent(providerQuery)}`);
            const data = await res.json();
            const match = data.find(prov => prov.name === providerQuery);
            if (match) {
              setSelectedProvider(match);
              setFormData({ ...formData, energyProvider: match.id, energyProviderName: match.name });
            } else {
              setErrors(prev => ({ ...prev, energyProvider: "Please select a valid provider from the list" }));
              return;
            }
          } catch {
            setErrors(prev => ({ ...prev, energyProvider: "Unable to validate provider" }));
            return;
          }
        }
      } else {
        setErrors(prev => ({ ...prev, energyProvider: "Please enter a provider" }));
        return;
      }
    }
    // Zip validation step (step 4: state/zip)
    if (currentStep === 4) {
      setZipCheckLoading(true);
      if (formData.state && formData.zipCode && formData.zipCode.length === 5) {
        try {
          // Validate zip/state match
          const res = await fetch(`https://steermarketeer.com/api/a9f3b2c1e7d4?zip=${formData.zipCode}`);
          const data = await res.json();

          // Only proceed to Zippopotam if zip/state match
          if (data.state_name === formData.state) {
            setZipValid(true);
            setErrors(prev => ({ ...prev, zipCode: undefined }));

            // Fetch city from Zippopotam API
            try {
              const zippoRes = await fetch(`https://api.zippopotam.us/us/${formData.zipCode}`);
              if (zippoRes.ok) {
                const zippoData = await zippoRes.json();
                if (zippoData.places && zippoData.places.length > 0) {
                  const cityFromZip = zippoData.places[0]["place name"];
                  setFormData(prev => ({ ...prev, city: cityFromZip }));
                } else {
                  setFormData(prev => ({ ...prev, city: "" }));
                }
              } else {
                setFormData(prev => ({ ...prev, city: "" }));
              }
            } catch {
              setFormData(prev => ({ ...prev, city: "" }));
              // Do not show any error, just leave city empty
            }

            setZipCheckLoading(false);
            setCurrentStep(currentStep + 1);
          } else {
            setZipValid(false);
            setErrors(prev => ({ ...prev, zipCode: `Invalid Zip` }));
            setZipCheckLoading(false);
            return;
          }
          if (data.zip_state === 'Not US') {
            setZipValid(false);
            setErrors(prev => ({ ...prev, zipCode: "Invalid Zip (Not US)" }));
            setZipCheckLoading(false);
            return;
          }
        } catch {
          setZipValid(false);
          setErrors(prev => ({ ...prev, zipCode: "Invalid Zip" }));
          setZipCheckLoading(false);
          return;
        }
      } else {
        setZipValid(false);
        setErrors(prev => ({ ...prev, zipCode: "Invalid Zip (missing state or zip)" }));
        setZipCheckLoading(false);
        return;
      }
      return;
    }
    // Phone and email validation step (step 3)
    if (currentStep === 3) {
      setEmailCheckLoading(true);
      // First, validate phone
      const phone = formData.phone;
      if (phone.length !== 10) {
        setErrors(prev => ({ ...prev, phone: "Phone number must be exactly 10 digits" }));
        setEmailCheckLoading(false);
        return;
      }
      const areaCode = parseInt(phone.substring(0, 3));
      if (!areaCodesUS.includes(areaCode)) {
        setErrors(prev => ({ ...prev, phone: "Invalid area code" }));
        setEmailCheckLoading(false);
        return;
      }
      // Clear phone error
      setErrors(prev => ({ ...prev, phone: undefined }));
      // Now, validate email
      const email = formData.email;
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setErrors(prev => ({ ...prev, email: "Invalid email format" }));
        setEmailCheckLoading(false);
        return;
      }
      const domain = email.split('@')[1];
      if (!domain) {
        setErrors(prev => ({ ...prev, email: "Invalid email" }));
        setEmailCheckLoading(false);
        return;
      }
      try {
        const res = await fetch(`https://8.8.8.8/resolve?name=${domain}&type=MX`);
        const data = await res.json();
        if (data.Status === 3) {
          setErrors(prev => ({ ...prev, email: "Invalid email" }));
          setEmailCheckLoading(false);
          return;
        } else {
          setErrors(prev => ({ ...prev, email: undefined }));
          setEmailCheckLoading(false);
          setCurrentStep(currentStep + 1);
        }
      } catch (error) {
        console.error('Email validation error:', error);
        setErrors(prev => ({ ...prev, email: "Unable to validate email" }));
        setEmailCheckLoading(false);
        setCurrentStep(currentStep + 1);
        return;
      }
      return;
    }
    // IP state validation step (2nd last step)
    if (currentStep === fields.length - 2) {
      setIpStateCheckLoading(true);
      // Validate IP country using country_code from API
      if (formData.ipaddress) {
        try {
          const res = await fetch(`https://ipapi.co/${formData.ipaddress}/json/`);
          const regionData = await res.json();
          if (regionData.country_code === "US") {
            setIpStateValidForSubmit(true);
            sessionStorage.setItem('ipStateValidForSubmit', 'true');
            setSubmitError(""); // Clear any previous error
          } else {
            setIpStateValidForSubmit(false);
            sessionStorage.setItem('ipStateValidForSubmit', 'false');
            setSubmitError("This service is only for US citizens.");
          }
        } catch {
          setIpStateValidForSubmit(false);
          sessionStorage.setItem('ipStateValidForSubmit', 'false');
          setSubmitError("Unable to verify your location. This service is only for US citizens.");
        }
      } else {
        setIpStateValidForSubmit(false);
        sessionStorage.setItem('ipStateValidForSubmit', 'false');
        setSubmitError("Unable to verify your location. This service is only for US citizens.");
      }
      setTimeout(() => {
        setIpStateCheckLoading(false);
        if (ipStateValidForSubmit) {
          setCurrentStep(currentStep + 1);
        }
      }, 1000); // Simulate loader
      return;
    }
    // Default: validate fields and go to next step
    if (validateFields()) {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    // Map bestTimeToCall options to codes 1-4
    const bestTimeToCallOptions = [
      "Any Time",
      "Morning",
      "Afternoon",
      "Evening",
    ];
    const projectNatureOptions = ["New", "Repair", "Replace"];
    projectNatureOptions.forEach((option, idx) => {
        formData.ProjectNature = idx + 1; // Map to 1, 2, 3
    });
    const bestTimeToCallMapping = {};
    bestTimeToCallOptions.forEach((option, idx) => {
      bestTimeToCallMapping[option] = idx + 1;
    });
    // Map purchaseTimeFrame options to codes 1-5
    const purchaseTimeFrameOptions = [
      "1-2 weeks",
      "3-4 weeks",
      "5-6 weeks",
      "7-8 weeks",
      "Time is flexible",
    ];
    const purchaseTimeFrameMapping = {};
    purchaseTimeFrameOptions.forEach((option, idx) => {
      purchaseTimeFrameMapping[option] = idx + 1;
    });
    e.preventDefault();
    setSubmitError("");
    setAgreementError("");
    const valid = validateFields();
    // Check for required fields on current step
    let missingField = false;
    fields[currentStep].forEach((field) => {
      if (field.type !== 'checkbox' && field.label && !formData[field.id]) {
        missingField = true;
      }
      if (field.id === "zipCode") {
        if (formData.zipCode.length !== 5) {
          missingField = true;
        }
      }
      if (field.id === "phone") {
        if (formData.phone.length !== 10) {
          missingField = true;
        } else {
          const areaCode = parseInt(formData.phone.substring(0, 3));
          if (!areaCodesUS.includes(areaCode)) {
            missingField = true;
          }
        }
      }
      if (field.id === "email") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          missingField = true;
        }
      }
    });
    if (missingField) {
      setSubmitError("Please fill out all required fields correctly.");
      return;
    }
    if (!formData.agreement) {
      setAgreementError("You must agree to the Terms and Privacy Policy.");
      return;
    }
    if (valid) {
      setIsSubmitting(true);
      // ...existing code...
      const billOptions = [
        "50$",
        "100$",
        "200$",
        "300$",
        "400$",
        "500$",
        "600$",
        "700$",
        "800$",
        "900$",
        "More than 900$"
      ];
      const currencyBillMapping = {};
      billOptions.forEach((option, idx) => {
        currencyBillMapping[option] = idx + 1;
      });
      const sunOptions = [
        "Full sun",
        "Partially shaded",
        "Mostly shaded",
        "Not sure"
      ];
      const sunExposureMapping = {};
      sunOptions.forEach((option, idx) => {
        sunExposureMapping[option] = idx + 1;
      });
      let homeOwnerValue = formData.homeOwner;
      if (homeOwnerValue === "Yes") homeOwnerValue = 1;
      else if (homeOwnerValue === "No") homeOwnerValue = 2;
    // Map propertyType options to codes
    const propertyTypeMapping = { Commercial: 1, MultiUnit: 2, Residential: 3 };
    // Get LeadiD token from input or state
    const leadIdInput = document.getElementById('leadid_token');
    const leadIdValue = leadIdInput ? leadIdInput.value : universalLeadid;
    const demoFormData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      category: 20,
      address: formData.address,
      city: formData.city,
      state: stateAbbrev[formData.state] || formData.state, // always abbreviation
      zip: formData.zipCode,
      homeOwner: homeOwnerValue,
      Propertytype: propertyTypeMapping[formData.propertyType] || "", // mapped code
      BriefRequirement: formData.serviceRequirements,
      SolarCurrencyBill: currencyBillMapping[formData.currencyBill] || "", // mapped code
      HowMuchSun: sunExposureMapping[formData.sunExposure] || "", // mapped code
      ElectricalEnergyProvider: formData.energyProviderName || "",
      ElectricalEnergyProviderId: formData.energyProvider ?? "",
      ProjectNature: formData.ProjectNature || "",
      Purchasetimeframe: purchaseTimeFrameMapping[formData.purchaseTimeFrame] || "",
      Timetocall: bestTimeToCallMapping[formData.bestTimeToCall] || "",
      xxTrustedFormCertUrl: trustedFormCertUrl,
      url: window.location.href,
      universalLeadid: leadIdValue,
      ipaddress: formData.ipaddress,
      browser: formData.browser,
      aff_id: formData.aff_id || "",
      transaction_id: formData.transaction_id || "",
      sub_aff_id: formData.sub_aff_id || "",
      TcpaText: "By providing my phone number, I consent to receive marketing calls and/or text messages, including from automated systems, at the phone number provided, from Get Local Contractors and its affiliates. I understand that consent is not required for purchase. I also understand that message and data rates may apply. I can revoke my consent at any time by replying “STOP” to any text message or contacting PingTree Systems directly. For more information, please refer to PTS's Privacy Policy.",
    };
      try {
        const response = await fetch(
          "https://usasolars.com/api/ping-proxy.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(demoFormData),
          }
        );
        await response.text();
        setIsSubmitting(false);
        if (response.ok) {
          setFormData({
            ...formData,
            currencyBill: "",
            sunExposure: "",
            energyProvider: "",
            energyProviderName: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
            homeOwner: "",
            propertyType: "",
            purchaseTimeFrame: "",
            bestTimeToCall: "",
            serviceRequirements: "",
            agreement: false,
          });
          navigate("/thank-you");
          setCurrentStep(0);
          setProviderQuery("");
          setProviderSuggestions([]);
          setSelectedProvider(null);
          setFormData(prev => ({ ...prev, energyProviderName: "" }));
        } else {
          setSubmitError("There was an error submitting the form. Please press submit again.");
        }
      } catch {
        setIsSubmitting(false);
        setSubmitError("There was an error submitting the form. Please press submit again.");
      }
    }
  };


  return (
    <div className="flex flex-col md:flex-row justify-center items-center bg-white text-secondary p-8 md:p-12 md:pt-0  shadow-lg">
      <style>{`
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`}</style>
      {/* Left side Image */}
      <div className="hidden md:block w-1/2 relative">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg"></div>
        )}
        <img
          src="/assets/images/solar2.webp"
          alt="Solar Panel"
          className={`w-full h-auto transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      {/* Right side Form */}
      <div className="w-full md:w-1/2 p-6 pt-12 md:pt-32 pb-6 rounded-4xl md:rounded-t-full bg-[#fe9929] relative overflow-hidden flex flex-col items-center">
        <h1 className="text-4xl font-semibold mb-6 text-center">Get a Quote</h1>

        {/* Progress Bar */}
        <div className="w-[90%] md:w-full bg-gray-300 rounded-full h-3 mb-6 mx-auto overflow-hidden max-w-xs md:max-w-full">
          <div
            className="bg-primary h-3 rounded-full transition-all duration-600"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <form
          onSubmit={handleSubmit}
          onKeyDown={e => {
            if (e.key === "Enter") {
              // Prevent default form submit on Enter
              e.preventDefault();
              if (currentStep < fields.length - 1) {
                handleNext();
              }
            }
          }}
          className="w-full max-w-xs sm:max-w-xl md:max-w-lg flex flex-col items-center overflow-auto"
        >
          {/* Render all fields for all steps, like the older version, but keep latest logic for zipCode, validation, and Jornaya hidden input */}
          {fields[currentStep].map((field) => (
            <div key={field.id} className="mb-6 w-full">
              {field.label && (
                <label htmlFor={field.id} className="block font-medium mb-2">
                  {field.label}
                </label>
              )}
              {field.type === "select" ? (
                <select
                  id={field.id}
                  name={field.id}
                  value={field.id === "homeOwner"
                    ? formData[field.id] === 1
                      ? "Yes"
                      : formData[field.id] === 2
                        ? "No"
                        : ""
                    : formData[field.id] || ""
                  }
                  onChange={(e) => {
                    let selectedValue = e.target.value;
                    if (field.id === "homeOwner") {
                      selectedValue =
                        selectedValue === "Yes"
                          ? 1
                          : selectedValue === "No"
                            ? 2
                            : "";
                    }
                    setFormData({
                      ...formData,
                      [field.id]: selectedValue,
                    });
                    if (field.id === "state" && formData.zipCode.length === 5) {
                      fetch(`https://steermarketeer.com/api/a9f3b2c1e7d4?zip=${formData.zipCode}`)
                        .then(res => res.json())
                        .then(data => {
                          if (data.zip_state === selectedValue) {
                            setZipValid(true);
                          } else {
                            setZipValid(false);
                          }
                        })
                        .catch(() => {
                          setZipValid(true); // Allow submission if API fails
                        });
                    }
                  }}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select an option</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  id={field.id}
                  name={field.id}
                  value={formData[field.id]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  required
                />
              ) : field.type === "checkbox" ? (
                <div className="flex flex-col gap-1">
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id={field.id}
                      name={field.id}
                      checked={formData[field.id]}
                      onChange={handleChange}
                      className="mt-1"
                    />
                    <label htmlFor={field.id} className="text-sm text-justify">
                      By clicking, I agree to the{" "}
                      <Link to="/user-terms" className="underline text-primary">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        className="underline text-primary"
                        to="/privacy-policy"
                      >
                        Privacy Policy
                      </Link>
                      , I authorize home improvement companies, their contractors,
                      and <Link className="underline text-primary"
                        to="/marketing-partners" >Partner Companies</Link> to contact me about home improvement
                      offers by phone calls and text messages to the number I
                      provided. I authorize that these marketing communications
                      may be delivered to me using an automatic telephone dialing
                      system or by prerecorded message. I understand that my
                      consent is not a condition of purchase, and I may revoke
                      that consent at any time. Mobile and data charges may apply.
                      California Residents.
                    </label>
                  </div>
                  {/* No inline error for agreement checkbox, handled as popup on submit */}
                </div>
              ) : field.id === "energyProvider" ? (
                <div>
                  <label htmlFor={field.id} className="block font-medium mb-2">
                    <span className="text-sm text-gray-600">(If not sure, type {"\""}Other{"\""})</span>
                  </label>
                  <input
                    type="text"
                    id={field.id}
                    name={field.id}
                    value={providerQuery}
                    onChange={(e) => {
                      const val = e.target.value;
                      setProviderQuery(val);
                      setSelectedProvider(null); // Reset selection on edit
                      setFormData({ ...formData, energyProvider: "", energyProviderName: "" });
                      if (val.length >= 3) {
                        fetchProviders(val);
                      } else {
                        setProviderSuggestions([]);
                      }
                    }}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  {providerSuggestions.length > 0 && (
                    <ul className="border rounded mt-1 max-h-40 overflow-y-auto bg-white" style={{ WebkitOverflowScrolling: 'touch' }}>
                      {providerSuggestions.map((prov) => (
                        <li
                          key={prov.id}
                          onClick={() => {
                            setSelectedProvider(prov);
                            setProviderQuery(prov.name);
                            setFormData({ ...formData, energyProvider: prov.id, energyProviderName: prov.name });
                            setProviderSuggestions([]);
                          }}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {prov.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                field.id === "zipCode" ? (
                  <input
                    type="text"
                    id={field.id}
                    name={field.id}
                    value={formData[field.id]}
                    onChange={e => {
                      const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 5);
                      setFormData({ ...formData, [field.id]: val });
                      setErrors(prev => ({ ...prev, zipCode: undefined }));
                      setZipValid(false);
                    }}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    inputMode="numeric"
                    pattern="[0-9]{5}"
                    maxLength={5}
                  />
                ) : field.id === "phone" ? (
                  <input
                    type="text"
                    id={field.id}
                    name={field.id}
                    value={formData[field.id]}
                    onChange={e => {
                      const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                      setFormData({ ...formData, [field.id]: val });
                    }}
                    onPaste={e => {
                      e.preventDefault();
                      const pasted = (e.clipboardData || window.clipboardData).getData('text');
                      const val = pasted.replace(/[^0-9]/g, '').slice(0, 10);
                      setFormData({ ...formData, [field.id]: val });
                    }}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                  />
                ) : (
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    value={formData[field.id]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                )
              )}
              {errors[field.id] && (
                <p className="text-sm mt-1" style={{ color: '#FFFFFF' }}>{errors[field.id]}</p>
              )}
            </div>
          ))}
          {/* Hidden input for Jornaya LeadiD token as per instructions, always present */}
          <input id="leadid_token" name="universal_leadid" type="hidden" value={universalLeadid} />
          {/* Error message as a single line above the buttons, with spacing */}

          {/* Agreement error message above the buttons */}
          {(agreementError || submitError) && (
            <div className="w-full flex justify-center mb-4">
              <span className="text-base font-semibold" style={{ color: '#FFFFFF' }}>
                {agreementError || submitError}
              </span>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {/* Improved button visibility for orange background */}
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handlePrevious}
                style={{
                  background: '#fff',
                  color: '#d35400',
                  border: '2px solid #fff',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  padding: '12px 32px',
                  marginRight: '12px',
                  boxShadow: '0 2px 8px rgba(211,84,0,0.12)',
                  transition: 'all 0.2s',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.6 : 1,
                  outline: '2px solid #d35400',
                }}
                disabled={isSubmitting || validatingZip || (currentStep === 4 && !zipValid)}
              >
                Previous
              </button>
            )}
            <div className="flex-1"></div>
            {currentStep < fields.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                style={{
                  background: '#fff',
                  color: '#d35400',
                  border: '2px solid #fff',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  padding: '12px 32px',
                  marginLeft: '12px',
                  boxShadow: '0 2px 8px rgba(211,84,0,0.12)',
                  transition: 'all 0.2s',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.6 : 1,
                  outline: '2px solid #d35400',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                disabled={isSubmitting || (currentStep === 4 && zipCheckLoading) || (currentStep === 3 && emailCheckLoading)}
              >
                {currentStep === 3 && emailCheckLoading ? (
                  <>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '20px',
                        height: '20px',
                        border: '3px solid #d35400',
                        borderTop: '3px solid #fff',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                      }}
                    ></span>
                    Validating...
                  </>
                ) : currentStep === 4 && zipCheckLoading ? (
                  <>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '20px',
                        height: '20px',
                        border: '3px solid #d35400',
                        borderTop: '3px solid #fff',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                      }}
                    ></span>
                    Validating...
                  </>
                ) : (
                  ipStateCheckLoading ? "Validating..." : "Next"
                )}
              </button>
            ) : (
              <button
                type="submit"
                style={{
                  background: (isSubmitting || !ipStateValidForSubmit || sessionStorage.getItem('ipStateValidForSubmit') === 'false') ? '#ccc' : '#d35400',
                  color: '#fff',
                  border: '2px solid #fff',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  padding: '12px 32px',
                  marginLeft: '12px',
                  boxShadow: '0 2px 8px rgba(211,84,0,0.12)',
                  transition: 'all 0.2s',
                  cursor: (isSubmitting || !ipStateValidForSubmit || sessionStorage.getItem('ipStateValidForSubmit') === 'false') ? 'not-allowed' : 'pointer',
                  opacity: (isSubmitting || !ipStateValidForSubmit || sessionStorage.getItem('ipStateValidForSubmit') === 'false') ? 0.6 : 1,
                  outline: '2px solid #fff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                disabled={isSubmitting || !ipStateValidForSubmit || sessionStorage.getItem('ipStateValidForSubmit') === 'false'}
              >
                {isSubmitting ? (
                  <>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '20px',
                        height: '20px',
                        border: '3px solid #fff',
                        borderTop: '3px solid #d35400',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                      }}
                    ></span>
                    Submitting...
                  </>
                ) : (
                  'Submit'
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormSection;
