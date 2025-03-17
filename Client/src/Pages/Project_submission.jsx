import React, { useState, useEffect } from 'react';
import { User, FileText, Globe, Calendar, Upload, CheckCircle, Briefcase, Lightbulb } from 'lucide-react';
import emailjs from 'emailjs-com';

// Mock database remains the same
const projectDB = {
  saveSubmission: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const id = Math.random().toString(36).substring(2, 15);
    console.log('Saved submission:', { id, ...data });

    const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    submissions.push({ id, timestamp: new Date().toISOString(), ...data });
    localStorage.setItem('submissions', JSON.stringify(submissions));

    return id;
  },
  getSubmissions: () => JSON.parse(localStorage.getItem('submissions') || '[]'),
};

const ProjectSubmission = () => {
  const [activeTab, setActiveTab] = useState('idea'); // Just controls which form is visible
  const [isSubmittingIdea, setIsSubmittingIdea] = useState(false);
  const [isSubmittingProject, setIsSubmittingProject] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [ideaSubmissionSuccess, setIdeaSubmissionSuccess] = useState(false);
  const [projectSubmissionSuccess, setProjectSubmissionSuccess] = useState(false);

  // Initial empty form states - separate for each form
  const initialIdeaFormState = {
    name: '',
    year: '',
    title: '',
    domain: '',
    description: '',
  };

  const initialProjectFormState = {
    name: '',
    year: '',
    title: '',
    domain: '',
    description: '',
    googledriveLink: '',
  };

  // Controlled form states - separate for each form
  const [ideaFormData, setIdeaFormData] = useState(initialIdeaFormState);
  const [projectFormData, setProjectFormData] = useState(initialProjectFormState);

  useEffect(() => {
    setSubmissions(projectDB.getSubmissions());
  }, [ideaSubmissionSuccess, projectSubmissionSuccess]);

  const handleIdeaChange = (e) => {
    const { name, value } = e.target;
    setIdeaFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProjectFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const resetIdeaForm = () => {
    setIdeaFormData(initialIdeaFormState);
  };

  const resetProjectForm = () => {
    setProjectFormData(initialProjectFormState);
  };

  const handleIdeaSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingIdea(true);

    try {
      const dataToSubmit = { ...ideaFormData, type: 'idea' };

      // Save submission in the mock database
      await projectDB.saveSubmission(dataToSubmit);

      // EmailJS data object for idea submission
      const emailData = {
        name: ideaFormData.name,
        year: ideaFormData.year,
        title: ideaFormData.title,
        domain: ideaFormData.domain,
        description: ideaFormData.description,
        project_type: 'idea',
      };

      // Send email using EmailJS
      await emailjs.send(
        'service_veawp9g',
        'template_p25a032',
        emailData,
        'maKw0xiMpSl3fit09'
      );

      setIdeaSubmissionSuccess(true);
      resetIdeaForm();
      
      setTimeout(() => {
        setIdeaSubmissionSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting idea:', error);
      alert('Failed to submit idea. Please try again.');
    } finally {
      setIsSubmittingIdea(false);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingProject(true);

    try {
      const dataToSubmit = { ...projectFormData, type: 'project' };

      // Save submission in the mock database
      await projectDB.saveSubmission(dataToSubmit);

      // EmailJS data object for project submission
      const emailData = {
        name: projectFormData.name,
        year: projectFormData.year,
        title: projectFormData.title,
        domain: projectFormData.domain,
        description: projectFormData.description,
        googleDriveLink: projectFormData.googledriveLink || '',
        project_type: 'project',
      };

      // Send email using EmailJS
      await emailjs.send(
        'service_veawp9g',
        'template_p25a032',
        emailData,
        'maKw0xiMpSl3fit09'
      );

      setProjectSubmissionSuccess(true);
      resetProjectForm();
      
      setTimeout(() => {
        setProjectSubmissionSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting project:', error);
      alert('Failed to submit project. Please try again.');
    } finally {
      setIsSubmittingProject(false);
    }
  };

  // Custom input field styling with hover effect
  const inputClasses = "block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md transition-all duration-200 ease-in-out focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 hover:shadow-md";

  return (
    <div className="min-h-screen bg-blue-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mokoto-text">Innovation Hub</h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Submit your innovative ideas and projects to our platform
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
            <h2 className="text-l font-semibold text-center text-white mokoto-text">New Submission</h2>
          </div>

          {/* Tab Selector - just controls visibility */}
          <div className="border-b border-gray-200">
            <div className="flex justify-center">
              <button
                onClick={() => setActiveTab('idea')}
                className={`py-5 px-8 font-medium border-b-2 flex items-center ${activeTab === 'idea' ? 'border-blue-500 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                <Lightbulb className={`h-5 w-5 mr-2 ${activeTab === 'idea' ? 'text-blue-600' : 'text-gray-500'}`} />
                Share an Idea
              </button>
              <button
                onClick={() => setActiveTab('project')}
                className={`py-5 px-8 font-medium border-b-2 flex items-center ${activeTab === 'project' ? 'border-blue-500 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                <Briefcase className={`h-5 w-5 mr-2 ${activeTab === 'project' ? 'text-blue-600' : 'text-gray-500'}`} />
                Showcase a Project
              </button>
            </div>
          </div>

          {/* IDEA FORM */}
          <div className={`p-8 relative ${activeTab === 'idea' ? 'block' : 'hidden'}`}>
            {ideaSubmissionSuccess && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-95 z-10 rounded-lg backdrop-blur-sm">
                <div className="text-center p-8 bg-white shadow-2xl rounded-lg border border-green-100">
                  <div className="bg-green-100 p-3 rounded-full inline-flex mb-4">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Submission Successful!</h3>
                  <p className="text-gray-600">
                    Thank you for your idea. Our review team will evaluate it shortly.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleIdeaSubmit} className="space-y-8">
              {/* Form introduction */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-blue-800 text-sm">
                  Fill out the form below to submit your idea. All fields marked with * are required.
                </p>
              </div>

              {/* Personal Information Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={ideaFormData.name}
                        onChange={handleIdeaChange}
                        className={inputClasses}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Year <span className="text-red-500">*</span>
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="year"
                        value={ideaFormData.year}
                        onChange={handleIdeaChange}
                        className={inputClasses}
                        placeholder="e.g. 2nd Year"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Idea Information Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Idea Information</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FileText className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="title"
                        value={ideaFormData.title}
                        onChange={handleIdeaChange}
                        className={inputClasses}
                        placeholder="Enter idea title"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Domain <span className="text-red-500">*</span>
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="domain"
                        value={ideaFormData.domain}
                        onChange={handleIdeaChange}
                        className={inputClasses}
                        placeholder="e.g. Technology, Healthcare, Education"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Description Box */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                        <FileText className="h-5 w-5 text-gray-400" />
                      </div>
                      <textarea
                        name="description"
                        value={ideaFormData.description}
                        onChange={handleIdeaChange}
                        rows="4"
                        className={`${inputClasses} pt-2`}
                        placeholder="Provide a detailed description of your idea..."
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit button for Idea form */}
              <div className="pt-4 mokoto-text">
                <button
                  type="submit"
                  disabled={isSubmittingIdea}
                  className={`w-full flex justify-center items-center py-3 px-6 border border-transparent text-base font-medium rounded-md text-white shadow-sm transition-all duration-200 ${
                    isSubmittingIdea 
                      ? 'bg-blue-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
                >
                  {isSubmittingIdea ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Idea'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* PROJECT FORM */}
          <div className={`p-8 relative ${activeTab === 'project' ? 'block' : 'hidden'}`}>
            {projectSubmissionSuccess && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-95 z-10 rounded-lg backdrop-blur-sm">
                <div className="text-center p-8 bg-white shadow-2xl rounded-lg border border-green-100">
                  <div className="bg-green-100 p-3 rounded-full inline-flex mb-4">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Submission Successful!</h3>
                  <p className="text-gray-600">
                    Thank you for submitting your project. Our review team will evaluate it shortly.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleProjectSubmit} className="space-y-8">
              {/* Form introduction */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-blue-800 text-sm">
                  Fill out the form below to submit your completed project. All fields marked with * are required.
                </p>
              </div>

              {/* Personal Information Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={projectFormData.name}
                        onChange={handleProjectChange}
                        className={inputClasses}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Year <span className="text-red-500">*</span>
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="year"
                        value={projectFormData.year}
                        onChange={handleProjectChange}
                        className={inputClasses}
                        placeholder="e.g. 2nd Year"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Information Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Project Information</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Project Title <span className="text-red-500">*</span>
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FileText className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="title"
                        value={projectFormData.title}
                        onChange={handleProjectChange}
                        className={inputClasses}
                        placeholder="Enter project title"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Domain <span className="text-red-500">*</span>
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="domain"
                        value={projectFormData.domain}
                        onChange={handleProjectChange}
                        className={inputClasses}
                        placeholder="e.g. Technology, Healthcare, Education"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Description Box */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                        <FileText className="h-5 w-5 text-gray-400" />
                      </div>
                      <textarea
                        name="description"
                        value={projectFormData.description}
                        onChange={handleProjectChange}
                        rows="4"
                        className={`${inputClasses} pt-2`}
                        placeholder="Provide a detailed description of your project..."
                        required
                      />
                    </div>
                  </div>

                  {/* Google Drive Link */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Google Drive Link <span className="text-red-500">*</span>
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Upload className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="url"
                        name="googledriveLink"
                        value={projectFormData.googledriveLink}
                        onChange={handleProjectChange}
                        className={inputClasses}
                        placeholder="Paste Google Drive link with your project files"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit button for Project form */}
              <div className="pt-4 mokoto-text">
                <button
                  type="submit"
                  disabled={isSubmittingProject}
                  className={`w-full flex justify-center items-center py-3 px-6 border border-transparent text-base font-medium rounded-md text-white shadow-sm transition-all duration-200 ${
                    isSubmittingProject 
                      ? 'bg-blue-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
                >
                  {isSubmittingProject ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Project'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default ProjectSubmission;