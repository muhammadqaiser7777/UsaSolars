import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const FormSection = () => {
  const [submitError, setSubmitError] = useState("");
  const [agreementError, setAgreementError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Track TrustedForm Cert URL
  const [trustedFormCertUrl, setTrustedFormCertUrl] = useState("");

  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currencyBill: "",
    sunExposure: "",
    energyProvider: "",
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
    affid: "",
    rid: "",
    tid: "",
    url: window.location.href,
    start: "",
    min: "",
    ipaddress: "",
    userAgent: navigator.userAgent,
  });

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        setFormData((prevData) => ({ ...prevData, ipaddress: data.ip }));
      })
      .catch((error) => console.error("Failed to fetch IP address:", error));

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
        } catch (e) {
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
        type: "select",
        options: [
          // Alphabetically sorted, duplicates removed
          "Alabama Power",
          "Alameda Municipal Power",
          "Alaska Villages Electric Cooperative",
          "AECO (Alabama Electric Company)",
          "Allegheny Power",
          "Allegheny Energy",
          "Alliant Energy",
          "Ambit Energy",
          "Amigo Energy",
          "American Electric Power",
          "Ameren",
          "Anaheim Public Utilities",
          "Appalachian Power",
          "APS",
          "Arkansas Electric Cooperative Corporation",
          "Arkansas Valley Electric Cooperative",
          "Ashland Electric",
          "Ashley-Chicot Electric Cooperative",
          "Atlantic City Electric",
          "Augusta Light & Power",
          "Autoridad de Energía Electrica",
          "Avista",
          "Avista Utilities",
          "Azusa Light & Water",
          "Baltimore Gas & Electric",
          "Bangor Hydro Electric",
          "Basin Electric Power Cooperative",
          "Batavia Municipal Electric",
          "Bear Valley Electric",
          "Beauregard Electric CO-OP",
          "Benton Public Utility District",
          "Benton PUD",
          "Benton Utilities",
          "Bentonville Light & Water System",
          "Berea Municipal Utilities",
          "Berkeley Electric Cooperative",
          "Berkshire Company",
          "Big Flat Electric Cooperative",
          "Big Rivers Electric Corporation",
          "Black Hills Energy",
          "Blue Grass Energy",
          "Blue Ridge Electric Membership Corp.",
          "Borough of Ellwood City",
          "Bounce Energy",
          "Braintree Electric Light Department",
          "Brigham City Public Power",
          "Brunswick EMC",
          "Bryan Texas Utilities",
          "Burbank Water & Power",
          "C&L Electric Cooperative",
          "Caddo Electric Cooperative",
          "California Public Utilities Commission",
          "Calpine",
          "Canby Electric",
          "Carroll Electric Cooperative",
          "Carteret-Craven Electric Cooperative",
          "CenterPoint Energy",
          "Central Electric Power Cooperative",
          "Central Hudson Gas & Electric",
          "Central Maine Power",
          "Central Montana Electric Power Cooperative",
          "Central Power Electric Cooperative",
          "Central Vermont Public Service",
          "Central Vermont Public Service Corp.",
          "CH Energy Group",
          "Champion Energy",
          "Champion Energy Services",
          "Chariton Valley Electric Cooperative",
          "Chelan County Public Utility District",
          "Cherokee Electric Cooperative",
          "Cheyenne Light",
          "Cheyenne Light, Fuel & Power",
          "Chicopee Electric Light",
          "Choptank Electric Cooperative",
          "Chugach Electric Association",
          "Cincinnati Bell Energy",
          "Cirro Energy",
          "Citizens Choice Energy Jamestown BPU",
          "Citizens Electric of Lewisburg",
          "Citizens Utilities Board",
          "City & County of San Francisco",
          "City of Dover Electric Department",
          "City of Milford Electric Department",
          "City of Palo Alto Utilities",
          "City of Paris Utilities",
          "City of Rock Hill",
          "City of Safford Electric Department",
          "City of Siloam Springs",
          "City of Tallahassee Utilities",
          "City of Vero Beach",
          "City Utilities of Springfield",
          "Claverack REC",
          "Clarksville Light & Water Company",
          "Clay County Electric Cooperative",
          "Clay Electric Co-op",
          "Clearwater Power",
          "CLECO",
          "Cleveland Electric Illuminating Company",
          "Coast Electric",
          "College Station Utilities",
          "Colorado Springs Utilities",
          "Colton Public Utilities",
          "Colton Public Utilities Glendale Public Service Department",
          "Columbia REA",
          "Columbia River Public Utility District",
          "ComEd Electric Company",
          "Connecticut Light & Power",
          "Connecticut Natural Gas",
          "Conservice Energy",
          "Consolidated Edison",
          "Consolidated Edison Company of New York (Con Edison)",
          "Consolidated Electric Cooperative",
          "Consumers Energy",
          "Conway Corporation",
          "Copper Valley Electric Association",
          "Corn Belt Energy",
          "Coserv Electric",
          "Coweta Fayette EMC",
          "Cowlitz County Public Utility District",
          "CPS Energy",
          "Craighead Electric Cooperative",
          "Dairyland Power Co-op",
          "Danville Utilities",
          "Dayton Power & Light",
          "Delaware Electric Cooperative",
          "Delmara Power",
          "Delmarva Power",
          "DEMCO",
          "Denton Municipal Electric",
          "Direct Energy",
          "Dominion Resources",
          "Dominion Virginia Power",
          "Douglas County Public Utility District",
          "Douglas County Public Utility District dPi Energy",
          "dPi Energy",
          "DTE Energy",
          "DTE Energy (Detroit Edison)",
          "Duke Energy",
          "Duke Energy Indiana",
          "Duke Energy Kentucky",
          "Duke Energy NC",
          "Duke Energy Ohio",
          "Duke Energy SC",
          "Duncan Valley Electric Cooperative",
          "Duquesne Light",
          "East River Electric Cooperative",
          "East River Electric Power Co-op",
          "Eau Claire Energy Cooperative",
          "EcoElectrica",
          "El Paso Electric",
          "Electric Database Publishing",
          "Electric Power Board",
          "Electrical District No. 2",
          "ElectriCities",
          "Emera",
          "Emerald Public Utility District",
          "Emerald PUD",
          "Empire District Electric Company",
          "Entergy",
          "Entergy Arkansas",
          "Entrust Energy",
          "Eugene Water & Electric Board",
          "Everything Energy",
          "Excel Energy",
          "Farmers Electric Cooperative",
          "Farmers Electrical Cooperative",
          "Farmington Electric Utility System",
          "First Electric Cooperative",
          "First Texas Energy Corporation",
          "FirstEnergy",
          "Fleming-Mason Energy Cooperative",
          "Flint Energies",
          "Florida Municipal Power Agency",
          "Florida Power & Light",
          "Florida Public Utility Company Palm Beach",
          "Fort Pierce Utilities Authority",
          "Gainesville Regional Utilities",
          "Garland Power and Light",
          "GDF SUEZ Energy Resources",
          "Georgetown Utility Services (GUS)",
          "Georgia EMC",
          "Georgia Natural Gas",
          "Georgia Power",
          "Gexa Energy",
          "Glendale Public Service Department",
          "Golden Valley Electric Association",
          "Granite State Electric",
          "Grant County Public Utility District",
          "Great River Energy",
          "Green Island Power Authority",
          "Green Mountain Energy",
          "Green Mountain Power",
          "Gridley Municipal Utilities",
          "Guadalupe Valley Electric Cooperative",
          "Gulf Power",
          "GVEC",
          "Gunnison County Electric Association (GCEA)",
          "Halifax Electric Membership",
          "Hawaiian Electric Company (HECO)",
          "Hawaiian Electric Industries",
          "Haywood EMC",
          "Healdsburg Municipal Electric Department",
          "Henderson Municipal Power and Light",
          "High Plains Power",
          "High West Energy",
          "Highline Electric Association",
          "Hill County Electric Cooperative",
          "Holden Municipal Light Department",
          "Holland Board of Public Works",
          "Holy Cross Energy",
          "Holy Cross Energy Company",
          "Holyoke Gas and Electric",
          "Hope Water & Light Company",
          "Howard Electric Cooperative",
          "Horry Electric Cooperative",
          "Horry Electric Cooperative, Inc",
          "Hutchinson Utilities Commission",
          "Hyrum City Power & Light",
          "Iberdrola USA",
          "IDACORP",
          "Idaho Power",
          "Imperial Irrigation District",
          "Independence Power and Light",
          "Indianapolis Power & Light",
          "Inc.",
          "Intermountain Power Agency",
          "Intermountain Rural Electric Association",
          "Intermountain Rural Electric Association (IREA)",
          "International Electric Power (IEP)",
          "Interstate Power and Light Company",
          "ITC Midwest",
          "Jackson",
          "Jackson Energy Authority",
          "JEA",
          "Jersey Central Power and Light Company",
          "Jones-Onslow EMC",
          "Jonesboro City Water & Light Company",
          "Just Energy",
          "Kansas City Board of Public Utilities",
          "Kansas City Power & Light",
          "Kauai Island Utility Cooperative (KIUC)",
          "Kayville City",
          "Kaysville City",
          "Kenergy Corp",
          "Kentucky Utilities",
          "Kingsport Power",
          "Kingsport Power (Appalachian Power)",
          "Kissimmee Utility Authority",
          "Klickitat Public Utility District",
          "Knoxville Utilities Board",
          "Kodiak Electric Association",
          "Kootenai Electric Cooperative",
          "L&O Power Co-op",
          "La Plata Electric Association",
          "La Plata Electric Association (LPEA)",
          "Lafayette Utilities System",
          "Lake Country Power",
          "Lake Worth Utilities",
          "Lakeland Electric",
          "Lamar Light and Power",
          "Lansing Board of Water & Light",
          "LCEC",
          "Lenoir City Utilities Board",
          "Little River Electric Co-Op",
          "Lodi Electric Utility",
          "Long Island Power Authority (LIPA)",
          "Lorain Medina Rural Electric Cooperative",
          "Los Angeles Department of Water and Power",
          "Louisville Gas & Electric",
          "Lower Colorado River Authority",
          "Lower Valley Energy",
          "Lumbee River EMC",
          "Luminant",
          "Madison Gas and Electric",
          "Magic Valley",
          "Magnolia Electric",
          "Mansfield Municipal Electric",
          "Marblehead Electric Light Department",
          "Marshall Municipal Utilities",
          "Mason County Public Utility District 3",
          "Massachusetts Electric",
          "Massachusetts Municipal Wholesale Electric Company (MMWEC)",
          "Massena Electric Department",
          "Maui",
          "Maui Electric Company",
          "MDU",
          "Memphis Light",
          "Memphis Light, Gas and Water",
          "Met-Ed",
          "MidAmerican Energy",
          "Midwest Energy",
          "Minnesota Power",
          "Minnkota Power Cooperative",
          "Mississippi County Electric Cooperative",
          "Mississippi Power Company",
          "Missouri River Energy Services",
          "Modesto Irrigation District",
          "Mojave Electric Cooperative",
          "Montana Electric Cooperatives' Association",
          "Montana-Dakota Utilities",
          "Mountain Parks Electric Inc (MPEI)",
          "Mountain Utilities",
          "Municipal Light & Power",
          "Nantucket Electric",
          "Narragansett Electric",
          "Nashville Electric Service",
          "National Grid",
          "Navopache Electric Cooperative",
          "Nebraska Public Power District",
          "Nevada Power",
          "New York Power Authority (NYPA)",
          "New York State Electric & Gas (NYSEG)",
          "New-Mac Electric",
          "Norris Electric Cooperative",
          "North Arkansas Electric Cooperative",
          "North Carolina Electric Membership Corp.",
          "North Little Rock Electric",
          "North Little Rock Electric Department",
          "Northeast Utilities",
          "Northern Indiana Public Service Company",
          "Northern Lights",
          "Northern Neck Electric Cooperative",
          "Northwestern Energy",
          "Norwich Public Utilities",
          "NOVEC",
          "NRG Energy",
          "NSTAR",
          "NV Energy",
          "Ocala Electric",
          "Ohio Edison",
          "Oglethorpe Power Corporation",
          "Oklahoma Gas & Electric",
          "Omaha Public Power District",
          "Oncor Electric",
          "Oncor Electric (Formerly TXU)",
          "Orange & Rockland",
          "Orlando Utilities Commission",
          "Osceola Municipal Light & Power",
          "Otter Tail Power Company",
          "Ouachita Electric Cooperative",
          "Overton Power District No 5",
          "Owensboro Municipal Utilities",
          "Ozarks Electric Cooperative",
          "Pacific Gas & Electric",
          "PacifiCorp",
          "PacifiCorp (Pacific Power)",
          "PacifiCorp (Rocky Mountain Power)",
          "Paragould Light Water & Cable",
          "Pasadena Water & Power",
          "Peabody Municipal Light Plant",
          "PECO",
          "Pedernales Electric Cooperative",
          "Penelec",
          "Penn Power",
          "People",
          "People's Co-op",
          "PEPCO",
          "Pepco Holdings",
          "Pennywise Power",
          "Petit Jean Electric Cooperative",
          "Piggott Municipal Light, Water & Sewer",
          "Pike County Light & Power Company",
          "Portland General Electric",
          "Potomoc Edison (FirstEnergy)",
          "Power Systems Electric",
          "PowerSouth Energy Cooperative",
          "PPL",
          "Prescott Water & Light Company",
          "Progress Energy Carolinas",
          "Progress Energy Florida",
          "Public Service Company of New Mexico",
          "Public Service Company of New Mexico Public Service Company of Oklahoma",
          "Public Service Company of Oklahoma",
          "Public Service Electric and Gas Company",
          "Public Service Electric and Gas Company (PSE&G)",
          "Public Service of NH",
          "Puget Sound Energy",
          "PWC Fayetteville",
          "Randolph Electric Membership Corp",
          "Rappahannock Electric Cooperative",
          "Redding Electric Utility (REU)",
          "Reliant Energy",
          "Rich Mountain Electric Cooperative",
          "River Falls Municipal Utility",
          "Riverside Public Utilities",
          "Rochester Gas & Electric",
          "Rochester Public Utilities",
          "Rockland Electric",
          "Rural Valley Electric Co.",
          "Rushmore Electric Cooperative",
          "Sacramento Municipal Utility District",
          "Salem Electric",
          "Salt River Electric",
          "Salt River Project",
          "Sam Houston Electric",
          "San Diego Gas & Electric",
          "San Isabel Electric Association (SIEA)",
          "Sangre De Cristo Electric Association (SDCEA)",
          "Santee Cooper",
          "Sawnee EMC",
          "Scana Energy",
          "Seattle City Light",
          "SELCO",
          "Shenandoah Valley Electric Cooperative",
          "Sierra-Pacific Power",
          "Silicon Valley Power",
          "SLECMO",
          "Snohomish County Public Utility District (PUD)",
          "Source Power and Gas",
          "South Carolina Electric & Gas Company",
          "South Central Arkansas Electric Cooperative",
          "South Central Power Company",
          "South Hadley Electric Light",
          "Southern California Edison",
          "Southern California Public Power Authority",
          "Southern Maryland Electric Cooperative",
          "Southern Rivers Energy",
          "Southwest Arkansas Electric Cooperative",
          "Southwest Mississippi Electric Power Association",
          "Southwestern Electric Power Company (SWEPCO)",
          "Springfield City Water",
          "Springfield City Water, Light & Power",
          "Star Tex Power",
          "Sterling Municipal Light Department",
          "Stream Energy",
          "Sulphur Springs Valley Electric Cooperative",
          "Summer Energy",
          "Superior Plus Utility",
          "Surprise Valley Power",
          "Sussex Rural Electric Cooperative",
          "SWEPCO",
          "Tacoma Power",
          "Tara Energy",
          "TECO",
          "Tennessee Jackson Energy Authority",
          "Tennessee Valley Authority",
          "Texas Electric Service Company",
          "Think Energy",
          "Tideland EMC",
          "Tillamook Public Utility District",
          "Tillamook PUD",
          "Toledo Edison",
          "Town of Vienna",
          "Tri Eagle Energy",
          "Tri-State Generation and Transmission Association Inc (TSGTA)",
          "Tri-County Electric",
          "Trico Electric Cooperative",
          "Trinity PUD",
          "Trinity Valley Electric Cooperative",
          "Tucson Electric Power",
          "Turlock Irrigation District (TID)",
          "UGI Utilities",
          "Umatilla Electric Company Hermiston Energy Services",
          "UniSource Energy Services",
          "United Cooperative Services",
          "United Illuminating",
          "United Power Inc",
          "Unitil Corporation",
          "Upper Missouri G&T Cooperative",
          "Upper Peninsula Power Company",
          "Valley Electric Association",
          "Vernon Light & Power",
          "Virginia Tech Electric",
          "Vineland Municipal Electric Utility",
          "Wake Electric",
          "Wakefield Municipal Gas and Light Department",
          "Wallingford Electric",
          "Wasco Electric",
          "Washington - St. Tammany Electric Cooperative",
          "We Energies",
          "Weakley County Municipal Electric System",
          "Wellsboro Electric Company",
          "West Memphis Utility Commission",
          "West Oregon Electric Cooperative",
          "Westar Energy",
          "Westfield Gas & Electric",
          "Western Massachusetts Electric",
          "Wheeling Electric Power",
          "Wheeling Electric Power (AEP Ohio)",
          "Wilson Energy",
          "Wiregrass Electric Cooperative",
          "Wisconsin Power and Light Company",
          "Wisconsin Public Service Corporation",
          "Withlacoochee River Electric Cooperative",
          "Woodruff Electric Cooperative",
          "Woodruff Electric Cooperative",
          "WTU Retail Energy",
          "Wyandotte Municipal Services",
          "XOOM Energy",
          "Xcel Energy",
          "Other",
          "Unsure/Not Listed",
        ],
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
      { id: "address", label: "Address", type: "text" },
      { id: "city", label: "City", type: "text" },
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
        ],
      },
      { id: "zipCode", label: "Zip Code", type: "text" },
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
        newErrors.universal_leadid = "LeadiD token is required. Please wait for the page to fully load.";
      }

    }
    fields[currentStep].forEach((field) => {
      // Only validate required fields, skip fields with empty label (like agreement)
      if (field.type !== 'checkbox' && field.label && !formData[field.id]) {
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

  const handleNext = () => {
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
      if (field.id === "zipCode" && formData.zipCode.length !== 5) {
        missingField = true;
      }
      if (field.id === "phone" && formData.phone.length !== 10) {
        missingField = true;
      }
      if (field.id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        missingField = true;
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
    const propertyTypeOptions = ["Commercial", "MultiUnit", "Residential"];
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
      state: formData.state,
      zip: formData.zipCode,
      homeOwner: homeOwnerValue,
      Propertytype: propertyTypeMapping[formData.propertyType] || "", // mapped code
      BriefRequirement: formData.serviceRequirements,
      SolarCurrencyBill: currencyBillMapping[formData.currencyBill] || "", // mapped code
      HowMuchSun: sunExposureMapping[formData.sunExposure] || "", // mapped code
      ElectricalEnergyProvider: formData.energyProvider || "",
      Purchasetimeframe: purchaseTimeFrameMapping[formData.purchaseTimeFrame] || "",
      Timetocall: bestTimeToCallMapping[formData.bestTimeToCall] || "",
      xxTrustedFormCertUrl: trustedFormCertUrl,
      url: window.location.href,
      universalLeadid: leadIdValue,
      ipaddress: formData.ipaddress,
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
        const serverResponse = await response.text();
        setIsSubmitting(false);
        if (response.ok) {
          setFormData({
            ...formData,
            currencyBill: "",
            sunExposure: "",
            energyProvider: "",
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
        } else {
          setSubmitError("There was an error submitting the form. Please press submit again.");
        }
      } catch (error) {
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
                disabled={isSubmitting}
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
                }}
                disabled={isSubmitting}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                style={{
                  background: '#d35400',
                  color: '#fff',
                  border: '2px solid #fff',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  padding: '12px 32px',
                  marginLeft: '12px',
                  boxShadow: '0 2px 8px rgba(211,84,0,0.12)',
                  transition: 'all 0.2s',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.6 : 1,
                  outline: '2px solid #fff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                disabled={isSubmitting}
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
