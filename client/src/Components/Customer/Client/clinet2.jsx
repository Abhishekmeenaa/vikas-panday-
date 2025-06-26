import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetails } from "../../../redux/feature/LeadSource/LeadThunx";
import { fetchOccupations } from "../../../redux/feature/OccupationType/OccupationThunx";
import { fetchLeadOccupationDetails } from "../../../redux/feature/LeadOccupation/OccupationThunx";
import {
  createClientFirstForm,
  fetchByidClientFirstForm,
  updateClientFirstForm,
} from "../../../redux/feature/ClientRedux/ClientThunx";
import { FaPlus } from "react-icons/fa";

// const ClientFirstFrom = () => {
const ClientFirstFrom = ({ isEdit, onDataChange }) => {
  const dispatch = useDispatch();
  const [StoreData, setStoreData] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  

  const [formData, setFormData] = useState({
    
      personalDetails: {
      groupCode: "",
      salutation: "",
      // familyHead: "",

      fmailyHead: "",
      annualIncome: "",
      grade:"",
      gender: "",
      organisation: "",
      designation: "",
      mobileNo: "",
      contactNo: "",
      whatsappNo: "",
      emailId: "",
      paName: "",
      paMobileNo: "",
      annualIncome: 0,
      // grade: "",

      // Address Info
      preferredAddressType: "resi",
      resiAddr: "",
      resiLandmark: "",
      resiPincode: "",
      officeAddr: "",
      officeLandmark: "",
      officePincode: "",
      //
      preferredMeetingAddr: "",
      preferredMeetingArea: "",
      city: "",
      bestTime: "",
      adharNumber: "",
      panCardNumber: "",
      hobbies: "",
      nativePlace: "",
      socialLink: "",
      habits: "",
      leadSource: "",
      leadName: "",
      leadOccupation: "",
      leadOccupationType: "",
      leadPerson: "",
      callingPurpose: "",
      name: "",
      allocatedCRE: "",
      remark: "",
    },

    education: {
      types: "school", // "school" | "college" | "professional"
      // ↓ conditional fields (kept empty by default)
      schoolName: "",
      schoolSubjects: "",
      collegeName: "",
      collegeCourse: "",
      instituteName: "",
      professionalDegree: "",
    },
    familyMembers: [
      {
        title: "",
        name: "",
        relation: "",
        dobActual: "",
        dobRecord: "",
        marriageDate: "",
        occupation: "",
        annualIncome: "",
        includeHealth: false,
        healthHistory: {
          submissionDate: "",
          diseaseName: "",
          since: "",
          height: "",
          weight: "",
          remark: "",
        },
      },
    ],
     financialInfo: {
      insurance: [],  // Changed from insuranceInvestment to separate arrays
      investment: [],
      loans: [],
      futurePriorities: [],
    },

    needs: {
      financialProducts: "",
      anyCorrection: "",
      anyUpdation: "",
      financialCalculation: false,
      assesmentOfNeed: false,
      portfolioManagement: false,
      doorStepServices: false,
      purchaseNewProducts: false,
    },
  });
  // console.log(isEdit, "lfkjdslkfd");

  useEffect(() => {
    if (isEdit && Object.keys(isEdit).length) {
      setFormData(isEdit); // set form fields from edit data
    }
  }, [isEdit]);
  
  useEffect(() => {
    dispatch(fetchLeadOccupationDetails());
    dispatch(fetchDetails());
    dispatch(fetchOccupations());
  }, [dispatch]);

  // const handleCheckboxChange = (e, group) => {
  //   const { value, checked } = e.target;
  //   setFormData((prev) => {
  //     const updatedGroup = checked
  //       ? [...prev.financialInfo[group], value]
  //       : prev.financialInfo[group].filter((v) => v !== value);

  //     return {
  //       ...prev,
  //       financialInfo: {
  //         ...prev.financialInfo,
  //         [group]: updatedGroup,
  //       },
  //     };
  //   });
  // };
  // ✅ NEW — keeps meeting address + area separate
  const handleRadioChange = (e) => {
    const value = e.target.value; // "resi" or "office"

    setFormData((prev) => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        preferredAddressType: value, // ✔ just set the radio choice
        // preferredMeetingAddr, preferredMeetingArea stay as-is
      },
    }));
  };
    useEffect(() => {
    if (isEdit && Object.keys(isEdit).length) {
      setFormData(isEdit);
    } else {
      // Initialize with proper structure if not in edit mode
      setFormData(prev => ({
        ...prev,
        financialInfo: {
          insurance: [],
          investment: [],
          loans: [],
          futurePriorities: [],
          ...prev.financialInfo
        }
      }));
    }
  }, [isEdit]);

  // Safe checkbox handler
  const handleCheckboxChange = (e, group) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const currentGroup = prev.financialInfo?.[group] || [];
      const updatedGroup = checked
        ? [...currentGroup, value]
        : currentGroup.filter(v => v !== value);
      
      return {
        ...prev,
        financialInfo: {
          ...prev.financialInfo,
          [group]: updatedGroup,
        },
      };
    });
  };

  // Safe check for includes
  const isChecked = (group, item) => {
    return formData?.financialInfo?.[group]?.includes(item) || false;
  };



  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name.includes(".")) {
      const [section, field] = name.split(".");

      setFormData((prev) => {
        const newVal =
          type === "checkbox" ? checked : type === "file" ? files[0] : value;

        const updatedSection = { ...prev[section], [field]: newVal };

        // ── annualIncome → grade mapping ────────────────────────────────
        if (section === "personalDetails" && field === "annualIncome") {
          let grade = "";
          if (newVal === "25 lakh to 1 Cr.") grade = 1;
          else if (newVal === "5 to 25 lakh") grade = 2;
          else if (newVal === "2.5 to 5 lakh") grade = 3;

          updatedSection.grade = grade;
        }
        // ────────────────────────────────────────────────────────────────

        return { ...prev, [section]: updatedSection };
      });
    } else {
      // non-nested fields
      setFormData((prev) => ({
        ...prev,
        [name]: type === "file" ? files[0] : value,
      }));
    }
  };
   const handleAddressTypeChange = (type) => {
    if (type === "resi") {
      setFormData((prev) => ({
        ...prev,
        preferredAddressType: "resi",
        // officeAddr: "",
        // officeLandmark: "",
        // officePincode: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        preferredAddressType: "office",
        // resiAddr: "",
        // resiLandmark: "",
        // resiPincode: "",
      }));
    }
  };

  // const handleFamilyMemberChange = (e, index) => {
  //   const { name, value, type, checked } = e.target;
  //   const keys = name.split(".");

  //   setFormData((prev) => {
  //     const members = [...prev.familyMembers];

  //     if (keys.length === 1) {
  //       members[index][keys[0]] = type === "checkbox" ? checked : value;
  //     } else if (keys.length === 2) {
  //       members[index][keys[0]][keys[1]] = value;
  //     }

  //     return {
  //       ...prev,
  //       familyMembers: members,
  //     };
  //   });
  // };
  const handleFamilyMemberChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const keys = name.split(".");

    setFormData((prev) => {
      const members = [...prev.familyMembers];

      if (keys.length === 1) {
        members[index][keys[0]] = type === "checkbox" ? checked : value;

        // ✅ self चुनते ही personalDetails से कॉपी करो
        if (keys[0] === "relation" && value === "self") {
          const { groupName, annualIncome } = prev.personalDetails;
          members[index].name = groupName || ""; // personalDetails.name if you prefer
          members[index].annualIncome = annualIncome || "";
        }

        // ❕ Optional: self हटाते ही खाली कर सकते हो (अभी नहीं कर रहे)
        if (keys[0] === "relation" && value !== "self") {
          members[index].name = "";
          members[index].annualIncome = "";
        }
      } else if (keys.length === 2) {
        members[index][keys[0]][keys[1]] = value;
      }

      return {
        ...prev,
        familyMembers: members,
      };
    });
  };

  useEffect(() => {
    if (StoreData) {
      const init = async () => {
        try {
          const res = await dispatch(
            fetchByidClientFirstForm({ id: StoreData._id })
          ).unwrap();
          setFormData(res);
          setFetchedData(res);
          console.log(fetchedData);

          // console.log(res, "asjdhakjshdjkahdkjahdhja");
          if (res) {
            setFormData(res);
          }
        } catch (error) {
          console.log(error, "Error in client first form");
          // alert("Error fetching client data: " + error.message);
        }
      };
      init();
    }
  }, [StoreData]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData?._id) {
        // UPDATE
        const updatedRes = await dispatch(
          updateClientFirstForm({ id: formData?._id, formData })
        ).unwrap();
        alert("Form updated successfully.");
        setStoreData(updatedRes);
        // setIsUpdated(true); // ✅ hide button after update
        onDataChange(updatedRes);
      } else {
        // CREATE
        const res = await dispatch(createClientFirstForm(formData)).unwrap();
        if (res && res._id) {
          alert("Form saved successfully.");
          setStoreData(res);
          setIsUpdated(false);
          onDataChange(res);
        } else {
          alert("Form submission failed. Please try again.");
        }
      }
    } catch (err) {
      alert("Something went wrong while saving or updating the form.");
      console.log(err, "error in first form");
    }
  };
  const removeFamilyMember = (index) => {
    setFormData((prev) => {
      const updated = [...prev.familyMembers];
      updated.splice(index, 1);
      return { ...prev, familyMembers: updated };
    });
  };

  // --------------------------lead cource and lead occupation -----------------------------
  const leadOccupations = useSelector((state) => state.leadOccupation.details);

  const leadSources = useSelector((state) => state.leadsource.leadsourceDetail);

  useEffect(() => {
    const init = async () => {
      try {
        await dispatch(fetchLeadOccupationDetails()).unwrap();
        await dispatch(fetchDetails()).unwrap();
      } catch (error) {
        console.log(error);
      }
    };

    init();
  }, []);

  return (

    
 
    <div className="mt-4   border p-3 rounded-3 ">
      <Form onSubmit={handleSubmit}>
        <h5 className="mt-4">Personal Details</h5>
        <Row className="mb-4">
          <Col md={2}>
            <Form.Group controlId="groupCode">
                <Form.Label style={{color:"#F38712"}} className="fw-medium">Group Code</Form.Label>
              <Form.Control
                name="personalDetails.groupCode"
                type="text"
                placeholder="Group Code"
                value={formData?.personalDetails?.groupCode}
                onChange={handleChange}
                size="sm"
              />
            </Form.Group>
          </Col>

          <Col md={2}>
            <Form.Group controlId="salutation">
              <Form.Label style={{color:"#F38712"}} className="fw-medium">Select</Form.Label>
              <Form.Select
                name="personalDetails.salutation"
                value={formData?.personalDetails?.salutation}
                onChange={handleChange}
                size="sm"
              >
                <option value="">Select</option>
                <option>Mr.</option>
                <option>Mrs.</option>
                <option>Ms.</option>
                <option>Mast.</option>
                <option>Shri.</option>
                <option>Smt.</option>
                <option>Kum.</option>
                <option>Kr.</option>
                <option>Dr.</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={5}>
            <Form.Group controlId="fmailyHead">
              <Form.Label style={{color:"#F68220"}} className="fw-medium">Group Head</Form.Label>
              <Form.Control
                name="personalDetails.fmailyHead"
                type="text"
                placeholder="Fmaily Head"
                value={formData?.personalDetails?.fmailyHead}
                onChange={handleChange}
                size="sm"
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="gender">
              <Form.Label style={{color:"#F38712"}} className="fw-medium">Gender</Form.Label>
              <Form.Select
                name="personalDetails.gender"
                value={formData?.personalDetails?.gender}
                onChange={handleChange}
                size="sm"
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
              </Form.Select>
            </Form.Group>
          </Col>
          
        </Row>
        <Row className="mb-4">
           <Col md={4}>
            <Form.Group style={{color:"#F38712"}} controlId="organisation">
              <Form.Label className="fw-medium">Organisation</Form.Label>
              <Form.Control
                name="personalDetails.organisation"
                type="text"
                placeholder="Organisation"
                value={formData?.personalDetails?.organisation}
                onChange={handleChange}
                size="sm"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="designation">
              <Form.Label style={{color:"#F38712"}} className="fw-medium">Designation</Form.Label>
              <Form.Control
                name="personalDetails.designation"
                type="text"
                placeholder="Designation"
                value={formData?.personalDetails?.designation}
                onChange={handleChange}
                size="sm"
              />
            </Form.Group>
          </Col>
     <Col md={3}>
  <Form.Group controlId="annualIncome">
    <Form.Label style={{color:"#F38712"}} className="fw-medium">Annual Income</Form.Label>
    <Form.Control
      as="select"
      name="personalDetails.annualIncome"
      value={formData?.personalDetails?.annualIncome || ""}
      onChange={handleChange}
      size="sm"
    >
      <option value="">-- Select --</option>
      <option value="25 lakh to 1 Cr.">25 lakh to 1 Cr.</option>
      <option value="5 to 25 lakh">5 to 25 lakh</option>
      <option value="2.5 to 5 lakh">2.5 to 5 lakh</option>
    </Form.Control>
  </Form.Group>
</Col>
<Col md={1}>
    <Form.Group controlId="grade">
      <Form.Label style={{color:"#F38712"}} className="fw-medium">Grade</Form.Label>
      <Form.Control
        type="text"
        name="personalDetails.grade"
        value={formData?.personalDetails?.grade || ""}
        size="sm"
        readOnly
        // placeholder="Auto-filled"
      />
    </Form.Group>
  </Col>
      </Row>
      <Row className="mb-4">
          <Col md={3}>
            <Form.Group controlId="mobileNo">
              <Form.Label style={{color:"#F38712"}} className="fw-medium" >Mobile Number</Form.Label>
              <Form.Control
                name="personalDetails.mobileNo"
                type="text"
                placeholder="mobile number"
                value={formData?.personalDetails?.mobileNo}
                onChange={handleChange}
                size="sm"
              />
            </Form.Group>
          </Col>

          
          <Col md={3}>
            <Form.Group controlId="contactNo">
              <Form.Label style={{color:"#F38712"}} className="fw-medium">Contact Number</Form.Label>
              <Form.Control
                name="personalDetails.contactNo"
                type="text"
                placeholder="Contact Number"
                value={formData?.personalDetails?.contactNo}
                onChange={handleChange}
                size="sm"
              />
            </Form.Group>
          </Col>

  
          <Col md={3}>
            <Form.Group controlId="whatsappNo">
              <Form.Label style={{color:"#F38712"}} className="fw-medium">Whatsapp Number</Form.Label>
              <Form.Control
                name="personalDetails.whatsappNo"
                type="text"
                placeholder="Whatsapp Number"
                value={formData?.personalDetails?.whatsappNo}
                onChange={handleChange}
                size="sm"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="emailId">
              <Form.Label style={{color:"#F38712"}} className="fw-medium">Email Id</Form.Label>
              <Form.Control
                name="personalDetails.emailId"
                type="text"
                placeholder="Email id"
                value={formData?.personalDetails?.emailId}
                onChange={handleChange}
                size="sm"
              />
            </Form.Group>
          </Col>
         </Row>

         <Row className="mb-4">
           <Col md={3}>
            <Form.Label style={{color:"#F38712"}}  className="fw-medium"  >
              PA Name
            </Form.Label>
            <Form.Control 
              name="personalDetails.paName"
              value={formData?.personalDetails?.paName}
              onChange={handleChange}
              placeholder="PA Name"
            />
          </Col>
          <Col md={3}>
            <Form.Label style={{color:"#F38712"}} className="fw-medium"   >
              PA Number
            </Form.Label>
            <Form.Control 
              name="personalDetails.paMobileNo"
              value={formData?.personalDetails?.paMobileNo}
              onChange={handleChange}
              placeholder="PA Number"
            />
          </Col>
         <Col md={3}>
            <Form.Label style={{color:"#F38712"}} className="fw-medium" >Aadhar Number</Form.Label>
            <Form.Control
              placeholder="Aadhar Number"
              name="personalDetails.adharNumber"
              type="number"
              value={formData?.personalDetails?.adharNumber}
              onChange={handleChange}
            />
          </Col>

          <Col md={3}>
            <Form.Label style={{color:"#F38712"}} className="fw-medium ">PAN Number</Form.Label>
            <Form.Control
              placeholder="PAN Number"
              name="personalDetails.panCardNumber"
              type="text"
              value={formData?.personalDetails?.panCardNumber}
              onChange={handleChange}
            />
          </Col>

         </Row>

 {/* 4 */}


          <Row className="mb-4">
        <Col md={1} style={{color:"#F38712"}} className="mt-2">
          <Form.Check
            type="radio"
            label="Select"
            name="preferredAddressType"
            checked={formData.preferredAddressType === "resi"}
            onChange={() => handleAddressTypeChange("resi")}
          />
        </Col>
        <Col md={4}>
          <Form.Label style={{color:"#F38712"}} className="fw-medium" >Resi Address</Form.Label>
          <Form.Control
            name="resiAddr"
            value={formData.resiAddr}
            // ={formData.preferredAddressType !== "resi"}
            onChange={handleChange}
          />
        </Col>
        <Col md={4}>
          <Form.Label style={{color:"#F38712"}} className="fw-medium"  >Landmark</Form.Label>
          <Form.Control
            name="resiLandmark"
            value={formData.resiLandmark}
            // disabled={formData.preferredAddressType !== "resi"}
            onChange={handleChange}
          />
        </Col>
        <Col md={3}>
          <Form.Label style={{color:"#F38712"}} className="fw-medium" >Pin Code</Form.Label>
          <Form.Control
            name="resiPincode"
            value={formData.resiPincode}
            // disabled={formData.preferredAddressType !== "resi"}
            onChange={handleChange}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={1} className="mt-4">
          <Form.Check
            type="radio"
            label="Select"
            name="preferredAddressType"
            checked={formData.preferredAddressType === "office"}
            onChange={() => handleAddressTypeChange("office")}
          />
        </Col>
        <Col md={4}>
          <Form.Label style={{color:"#F38712"}} className="fw-medium" >Office Address</Form.Label>
          <Form.Control
            name="officeAddr"
            value={formData.officeAddr}
            // disabled={formData.preferredAddressType !== "office"}
            onChange={handleChange}
          />
        </Col>
        <Col md={4}>
          <Form.Label style={{color:"#F38712"}} className="fw-medium" >Landmark</Form.Label>
          <Form.Control
            name="officeLandmark"
            value={formData.officeLandmark}
            // disabled={formData.preferredAddressType !== "office"}
            onChange={handleChange}
          />
        </Col>
        <Col md={3}>
          <Form.Label style={{color:"#F38712"}} className="fw-medium" >Pin Code</Form.Label>
          <Form.Control
            name="officePincode"
            value={formData.officePincode}
            // disabled={formData.preferredAddressType !== "office"}
            onChange={handleChange}
          />
        </Col>
      </Row>


         

        {/* Meeting Address */}
        <Row className="mb-4">
          <Col md={4}>
            <Form.Label style={{color:"#F38712"}} className="fw-medium"   style={{whiteSpace:'nowrap'}} >
              Preferred Meeting Address
            </Form.Label>
            <Form.Control
              name="personalDetails.preferredMeetingAddr"
              value={formData?.personalDetails?.preferredMeetingAddr}
              onChange={handleChange}
            />
          </Col>
          <Col md={4}>
            <Form.Label style={{color:"#F38712"}} className="fw-medium">Area</Form.Label>
            <Form.Control
              name="personalDetails.preferredMeetingArea"
              value={formData?.personalDetails?.preferredMeetingArea}
              onChange={handleChange}
            />
          </Col>
          <Col md={2}>
            <Form.Label style={{color:"#F38712"}} className="fw-medium" >City</Form.Label>
            <Form.Control
              name="personalDetails.city"
              value={formData?.personalDetails?.city}
              onChange={handleChange}
            />
          </Col>

          <Col md={2}>
            <Form.Label style={{color:"#F38712"}} className="fw-medium" >Best Time</Form.Label>
            <Form.Select
              id="bestTime"
              name="personalDetails.bestTime"
              value={formData?.personalDetails?.bestTime}
              onChange={handleChange}
            >
              <option value="">-- Select Time --</option>
              <option value="10 AM to 2 PM">10 AM to 2 PM</option>
              <option value="2 PM to 7 PM">2 PM to 7 PM</option>
            </Form.Select>
          </Col>
        </Row>
          
           <Row className="mb-4 align-items-end">
  {/* Education Type Dropdown */}
  <Col md={4} className="mt-2">
    <Form.Label className="fw-medium" style={{color:"#F38712"}} >Education Type</Form.Label>
    <Form.Select
      name="education.types"
      value={formData?.education?.types || "school"} // Default to "school"
      onChange={handleChange}
    >
      <option value="school">School</option>
      <option value="college">College</option>
      <option value="professional">Professional Degree</option>
    </Form.Select>
  </Col>
   

  {/* School Fields */}
  {formData?.education?.types === "school" && (
    <>
      <Col md={4}>
        <Form.Label className="fw-medium" style={{color:"#F38712"}} >School Name</Form.Label>
        <Form.Control
          name="education.schoolName"
          type="text"
          placeholder="Enter School Name"
          value={formData?.education?.schoolName || ""}
          onChange={handleChange}
        />
      </Col>
      <Col md={4}>
        <Form.Label className="fw-medium" style={{color:"#F38712"}}  >Subjects</Form.Label>
        <Form.Control
          name="education.schoolSubjects"
          type="text"
          placeholder="Enter Subjects"
          value={formData?.education?.schoolSubjects || ""}
          onChange={handleChange}
        />
      </Col>
    </>
  )}

  {/* College Fields */}
  {formData?.education?.types === "college" && (
    <>
      <Col md={4}>
        <Form.Label className="fw-medium" style={{color:"#F38712"}}  >College Name</Form.Label>
        <Form.Control
          name="education.collegeName"
          type="text"
          placeholder="Enter College Name"
          value={formData?.education?.collegeName || ""}
          onChange={handleChange}
        />
      </Col>
      <Col md={4}>
        <Form.Label className="fw-medium" style={{color:"#F38712"}}>Course/Degree</Form.Label>
        <Form.Control
          name="education.collegeCourse"
          type="text"
          placeholder="Enter Course"
          value={formData?.education?.collegeCourse || ""}
          onChange={handleChange}
        />
      </Col>
    </>
  )}

  {/* Professional Fields */}
  {formData?.education?.types === "professional" && (
    <>
      <Col md={4}>
        <Form.Label className="fw-medium" style={{color:"#F38712"}}  >Institute Name</Form.Label>
        <Form.Control
          name="education.instituteName"
          type="text"
          placeholder="Enter Institute Name"
          value={formData?.education?.instituteName || ""}
          onChange={handleChange}
        />
      </Col>
      <Col md={4}>
        <Form.Label className="fw-medium"   style={{color:"#F38712"}} >Degree</Form.Label>
        <Form.Control
          name="education.professionalDegree"
          type="text"
          placeholder="Enter Degree Name"
          value={formData?.education?.professionalDegree || ""}
          onChange={handleChange}
        />
      </Col>
    </>
  )}
</Row>


          {/* Conditionally render Professional fields */}
        
        {/* Preferences: Hobbies, Native Place, Social Link, Habits */}

        <Row className="mb-4">
          <Col md={3}>
            <Form.Label className="fw-medium" style={{color:"#F38712"}}  >Native Place</Form.Label>
            <Form.Control
              placeholder="Native Place"
              name="personalDetails.nativePlace"
              type="text"
              value={formData?.personalDetails?.nativePlace}
              onChange={handleChange}
            />
          </Col>
          <Col md={3}>
            <Form.Label className="fw-medium" style={{color:"#F38712"}}  >Hobbies</Form.Label>
            <Form.Control
              placeholder="Hobbies"
              name="personalDetails.hobbies"
              type="text"
              value={formData?.personalDetails?.hobbies}
              onChange={handleChange}
            />
          </Col>
          <Col md={3}>
            <Form.Label className="fw-medium" style={{color:"#F38712"}}  >Social Link</Form.Label>
            <Form.Control
              placeholder="Social Link"
              name="personalDetails.socialLink"
              type="text"
              value={formData?.personalDetails?.socialLink}
              onChange={handleChange}
            />
          </Col>
          <Col md={3}>
            <Form.Label className="fw-medium" style={{color:"#F38712"}}  >Habits</Form.Label>
            <Form.Control
              placeholder="Habits"
              name="personalDetails.habits"
              type="text"
              value={formData?.personalDetails?.habits}
              onChange={handleChange}
            />
          </Col>

          

        </Row>
        {/* Lead Info */}

        <Row className="mb-4">
        <Col md={3}>
            <Form.Label className="fw-medium" style={{color:"#F38712"}}  >Lead Source</Form.Label>
            <Form.Select
              name="personalDetails.leadSource"
              value={formData?.personalDetails?.leadSource}
              onChange={handleChange}
            >
              <option value="">Select Lead Source</option>
              {leadSources.map((source) => (
                <option key={source._id} value={source.leadName}>
                  {source.leadName}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={3}>
            <Form.Label className="fw-medium" style={{color:"#F38712"}}  >Lead Name</Form.Label>
            <Form.Control
              name="personalDetails.leadName"
              placeholder="Lead Name"
              value={formData?.personalDetails?.leadName}
              onChange={handleChange}
            />
          </Col>
          <Col md={3}>
            <Form.Label className="fw-medium" style={{color:"#F38712"}}  >Lead Occupation</Form.Label>
            <Form.Select
              name="personalDetails.leadOccupation"
              value={formData?.personalDetails?.leadOccupation}
              onChange={handleChange}
            >
              <option value="">Select Lead Occupation</option>
              {leadOccupations.map((occupation) => (
                <option key={occupation._id} value={occupation.leadName}>
                  {occupation.leadName}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={3}>
            <Form.Label className="fw-medium" style={{color:"#F38712"}}  >Occupation Type</Form.Label>
            <Form.Control
              name="personalDetails.leadOccupationType"
              placeholder="Occupation Type"
              value={formData?.personalDetails?.leadOccupationType}
              onChange={handleChange}
            />
          </Col>
        
        </Row>
        <Row className="mb-2">
          
          

            <Col md={4}>
            <Form.Label className="fw-medium" style={{color:"#F38712"}}  >Select Purpose</Form.Label>
            <Form.Select
              name="personalDetails.callingPurpose"
              value={formData?.personalDetails?.callingPurpose}
              onChange={handleChange}
            >
              <option value="">Select Purpose</option>
              <option value="Servicing">Servicing</option>
              <option value="Sales">Sales</option>
            </Form.Select>
          </Col>

          <Col md={4}>
            <Form.Label className="fw-medium" style={{color:"#F38712"}}  >Select Name</Form.Label>
            <Form.Select
              name="personalDetails.name"
              value={formData?.personalDetails?.name}
              onChange={handleChange}
            >
              <option value="">Select Name</option>
              <option value="LIC">LIC</option>
              <option value="Portfolio Management">Portfolio Management</option>
            </Form.Select>
          </Col>

          <Col md={4}>
            <Form.Label className="fw-medium" style={{color:"#F38712"}}  >CRE Name</Form.Label>
            <Form.Control
              placeholder="Allocated CRE"
              name="personalDetails.allocatedCRE"
              type="text"
              value={formData?.personalDetails?.allocatedCRE}
              onChange={handleChange}
            />
          </Col>
        </Row>
        {/* Calling Purpose, Name, Allocated CRE */}
        <Row className="mb-2">
        </Row>
        {/* remark */}
        <Row className="mb-2">
          <Col md={12}>
            <Form.Label className="fw-medium" style={{color:"#F38712"}}  >Remark</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter any remarks"
              name="personalDetails.remark"
              value={formData?.personalDetails?.remark}
              onChange={handleChange}
            />
          </Col>
        </Row>
        
        <div className="  d-flex justify-content-between align-items-center ">
              
          <h5 className="mt-4  fw-medium">Add Family Details</h5>
          <Button
            variant="success"
            className="mb-1"
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                familyMembers: [
                  ...prev.familyMembers,
                  {
                    title: "",
                    name: "",
                    relation: "",
                    dobActual: "",
                    dobRecord: "",
                    marriageDate: "",
                    occupation: "",
                    annualIncome: "",
                    includeHealth: false,
                    healthHistory: {
                      submissionDate: "",
                      diseaseName: "",
                      since: "",
                      height: "",
                      weight: "",
                      remark: "",
                    },
                  },
                ],
              }));
            }}
          >
              <FaPlus className="mb-1" /> 
          </Button>
        </div>
        

        {formData?.familyMembers?.map((member, index) => (
          <div key={index} className="border rounded p-3 mb-3">
            <Row className="mb-2">
             
              <Col md={2}>
            <Form.Group controlId={`title-${index}`}>
              <Form.Label  style={{color:"#F38712"}} className="fw-medium">Mr/Mrs</Form.Label>
              <Form.Select
                placeholder="Mr/Mrs"
                    name="title"
                    value={member.title}
                    onChange={(e) => handleFamilyMemberChange(e, index)}
              >
                <option value="">Select</option>
                <option>Mr.</option>
                <option>Mrs.</option>
                
              </Form.Select>
            </Form.Group>
          </Col>
              <Col xs={12} md={4}>
                <Form.Group controlId={`name-${index}`}>
                  <Form.Label style={{color:"#F38712"}} className="fw-medium" >Name</Form.Label>
                  <Form.Control
                    placeholder="Name"
                    name="name"
                    value={member.name}
                    onChange={(e) => handleFamilyMemberChange(e, index)}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={3}>
                <Form.Group controlId={`relation-${index}`}>
                  <Form.Label style={{color:"#F38712"}} className="fw-medium" >Relation</Form.Label>
                  <Form.Select
                    name="relation"
                    value={member.relation}
                    onChange={(e) => handleFamilyMemberChange(e, index)}
                  >
                    <option value="">Select Relation</option>
                    {[
                      "self",
                      "Wife",
                      "Husband",
                      "Son",
                      "Daughter",
                      "Mother",
                      "Father",
                      "Brother",
                      "Sister",
                      "Brother-in-law",
                      "Sister-in-law",
                      "Other",
                    ].map((rel) => (
                      <option key={rel} value={rel}>
                        {rel}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
               
               <Col xs={12} md={3}>
                  <Form.Group controlId={`annualIncome-${index}`}>
                    <Form.Label style={{color:"#F38712"}} className="fw-medium">Annual Income</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Annual Income"
                      name="annualIncome"
                      value={member.annualIncome}
                      onChange={(e) => handleFamilyMemberChange(e, index)}
                    />
                  </Form.Group>
                </Col>
                
            </Row>

            <Row className="mb-2">
               <Col xs={12} md={4}>
                <Form.Group controlId={`occupation-${index}`}>
                  <Form.Label style={{color:"#F38712"}} className="fw-medium" >Occupation</Form.Label>
                  <Form.Control
                    placeholder="Occupation"
                    name="occupation"
                    value={member.occupation}
                    onChange={(e) => handleFamilyMemberChange(e, index)}
                  />
                </Form.Group>
              </Col>
           
              <Col xs={12} md={3}>
                <Form.Group controlId={`dobActual-${index}`}>
                  <Form.Label style={{color:"#F38712"}} className="fw-medium">
                    Date of Birth (Actual)
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="dobActual"
                    value={member.dobActual}
                    onChange={(e) => handleFamilyMemberChange(e, index)}
                  />
                </Form.Group>
              </Col>
              

              <Col xs={12} md={3}>
                <Form.Group controlId={`dobRecord-${index}`}>
                  <Form.Label style={{color:"#F38712"}} className="fw-medium">
                    Date of Birth (Record)
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="dobRecord"
                    value={member.dobRecord}
                    onChange={(e) => handleFamilyMemberChange(e, index)}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={2}>
                <Form.Group controlId={`marriageDate-${index}`}>
                  <Form.Label style={{color:"#F38712"}} className="fw-medium" >Date of Marriage</Form.Label>
                  <Form.Control
                    type="date"
                    name="marriageDate"
                    value={member.marriageDate}
                    onChange={(e) => handleFamilyMemberChange(e, index)}
                  />
                </Form.Group>
              </Col>
             
            </Row>

            <Row className="mb-">
             <div style={{position:"relative", bottom:"" ,    }} className="text-end">
              <Button
                variant="danger" 
                size="sm"
                onClick={() => removeFamilyMember(index)}
              >
                Remove
              </Button>
            </div>
            </Row>

            <Form.Check
              className="mb-3"
              label="Add Health Details"
              name="includeHealth"
              type="checkbox"
              checked={member.includeHealth}
              onChange={(e) => handleFamilyMemberChange(e, index)}
              style={{position:"relative", bottom:"14px" }}
            />

            {member.includeHealth && (
              <>
                <h6 className="mb-3">Health History</h6>
                <Row className="mb-3">
                  <Col md={2}>
                    <Form.Group controlId={`submissionDate-${index}`}>
                      <Form.Label style={{color:"#F38712"}} className="small">Submission Date</Form.Label>
                      <Form.Control
                        name="healthHistory.submissionDate"
                        type="date"
                        value={member.healthHistory.submissionDate}
                        onChange={(e) => handleFamilyMemberChange(e, index)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId={`diseaseName-${index}`}>
                      <Form.Label style={{color:"#F38712"}} className="small">Disease Name</Form.Label>
                      <Form.Control
                        name="healthHistory.diseaseName"
                        value={member.healthHistory.diseaseName}
                        onChange={(e) => handleFamilyMemberChange(e, index)}
                        placeholder="Disease Name"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group controlId={`since-${index}`}>
                      <Form.Label style={{color:"#F38712"}} className="small">Since</Form.Label>
                      <Form.Control
                        name="healthHistory.since"
                        type="text"
                        value={member.healthHistory.since}
                        onChange={(e) => handleFamilyMemberChange(e, index)}
                        placeholder="Since"
                      />
                    </Form.Group>
                  </Col>
                   <Col md={2}>
                    <Form.Group controlId={`height-${index}`}>
                      <Form.Label style={{color:"#F38712"}} className="small">Height</Form.Label>
                      <Form.Control
                        name="healthHistory.height"
                        value={member.healthHistory.height}
                        onChange={(e) => handleFamilyMemberChange(e, index)}
                        placeholder="Height"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group controlId={`weight-${index}`}>
                      <Form.Label style={{color:"#F38712"}} className="small">Weight</Form.Label>
                      <Form.Control
                        name="healthHistory.weight"
                        value={member.healthHistory.weight}
                        onChange={(e) => handleFamilyMemberChange(e, index)}
                        placeholder="Weight"
                      />
                    </Form.Group>
                  </Col>
                  </Row>
                
                 

                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId={`remark-${index}`}>
                      <Form.Label style={{color:"#F38712"}} className="small">Remark</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="healthHistory.remark"
                        value={member.healthHistory.remark}
                        onChange={(e) => handleFamilyMemberChange(e, index)}
                        placeholder="Remark"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </>
            )}

            
          </div>
        ))}
        
        &nbsp; &nbsp; &nbsp; &nbsp;
        {/* Financial Details */}
      <div className="row">
  {/* Insurance */}
  <div className="col-md-4">
    <h6 className="text-warning fw-bold">Insurance</h6>
    {[
      "LIC Policy",
      "Pvt. Life Policy",
      "Health Policy",
      "Motor Policy",
      "Fire Policy",
      "Other Policy",
    ].map((item) => (
      <Form.Check
        key={`insurance-${item}`}
        type="checkbox"
        label={item}
        value={item}
        checked={formData?.financialInfo?.insurance?.includes(item) || false}
        onChange={(e) => handleCheckboxChange(e, "insurance")}
      />
    ))}
  </div>

  {/* Investment */}
  <div className="col-md-4">
    <h6 className="text-warning fw-bold">Investment</h6>
    {[
      "Deposits",
      "Mutual Fund",
      "Stock Market",
      "Gold",
      "Property",
      "Other Investment",
    ].map((item) => (
      <Form.Check
        key={`investment-${item}`}
        type="checkbox"
        label={item}
        value={item}
        checked={formData?.financialInfo?.investment?.includes(item) || false}
        onChange={(e) => handleCheckboxChange(e, "investment")}
      />
    ))}
  </div>

  {/* Loan & Liabilities */}
  <div className="col-md-4">
    <h6 className="text-warning fw-bold">Loan & Liabilities</h6>
    {[
      "Business Loan",
      "Home Loan",
      "Vehicle Loan",
      "Personal Loan",
      "Gold Loan",
      "Other Loan",
    ].map((item) => (
      <Form.Check
        key={`loan-${item}`}
        type="checkbox"
        label={item}
        value={item}
        checked={formData?.financialInfo?.loans?.includes(item) || false}
        onChange={(e) => handleCheckboxChange(e, "loans")}
      />
    ))}
  </div>

  {/* Future's Priorities */}
  <div className="row mt-4">
    <div className="col-12">
      <h6 className="fw-bold" style={{ color: "blue", textDecoration: "underline" }}>
        FUTURE'S PRIORITIES
      </h6>
      <div className="row">
        {[
          ["Life Insurance", "Health Insurance", "Retirement Fund", "Wealth Creation"],
          ["Child Higher Education", "Child Professional Education", "Child Marriage", "Property Investment"],
          ["Purchase House", "Purchase Car", "Business Fund Creation", "Business Expansion"]
        ].map((column, colIndex) => (
          <div className="col-md-4" key={`priority-col-${colIndex}`}>
            {column.map(item => (
              <Form.Check
                key={`priority-${item}`}
                type="checkbox"
                label={item}
                value={item}
                checked={formData?.financialInfo?.futurePriorities?.includes(item) || false}
                onChange={(e) => handleCheckboxChange(e, "futurePriorities")}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
        &nbsp; &nbsp;
        <Row className="mb-3">
          <h5 className="mt-4">Have You Any Need</h5>
          <Col>
            {/* ------------------------- */}
            <Form.Control
              placeholder="Financial Products"
              type="text"
              name="needs.financialProducts"
              value={formData?.needs?.financialProducts}
              onChange={handleChange}
            />
          </Col>

          {/* ------------------------- */}
          <Col>
            <Form.Control
              placeholder="Any Correction"
              type="text"
              name="needs.anyCorrection"
              value={formData?.needs?.anyCorrection}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Any Updation"
              name="needs.anyUpdation"
              value={formData?.needs?.anyUpdation}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col md={12}>
            <Form.Check
              inline
              type="checkbox"
              label="Financial Calculation"
              name="needs.financialCalculation"
              checked={formData?.needs?.financialCalculation}
              onChange={handleChange}
            />
            <Form.Check
              inline
              type="checkbox"
              label="Assessment of Need"
              name="needs.assesmentOfNeed"
              checked={formData?.needs?.assesmentOfNeed}
              onChange={handleChange}
            />
            <Form.Check
              inline
              type="checkbox"
              label="Portfolio Management"
              name="needs.portfolioManagement"
              checked={formData?.needs?.portfolioManagement}
              onChange={handleChange}
            />
            <Form.Check
              inline
              type="checkbox"
              label="Door Step Services"
              name="needs.doorStepServices"
              checked={formData?.needs?.doorStepServices}
              onChange={handleChange}
            />
            <Form.Check
              inline
              type="checkbox"
              label="Purchase New Products"
              name="needs.purchaseNewProducts"
              checked={formData?.needs?.purchaseNewProducts}
              onChange={handleChange}
            />
          </Col>
        </Row>
        {/* Submit upper details only */}
        <div className="w-100 d-flex justify-content-center mt-4 mb-4">
          {!isUpdated && (
            <Button
              type="submit"
              className="mt-3 "
              style={{
                width: "200px",
                backgroundColor: "#0d6efd",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                fontSize: "16px",
                cursor: "pointer",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              {formData?._id ? "Update" : "Submit"}
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default ClientFirstFrom;
