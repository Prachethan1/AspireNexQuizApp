import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSubjects, fetchQuizForUser} from '../../../utils/QuizService';// Adjust this import based on your actual file structure



const QuizStepper = () => {
	const [currentStep, setCurrentStep] = useState(1);
	const [selectedSubject, setSelectedSubject] = useState("");
	const [subjects, setSubjects] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		fetchSubjectData();
	}, []);

	const fetchSubjectData = async () => {
		try {
			const subjectsData = await getSubjects();
			setSubjects(subjectsData);
		} catch (error) {
			console.error(error);
		}
	};

	const handleNext = async () => {
		if (currentStep === 2) {
			if (selectedSubject) {
				try {
					const quizQuestions = await  fetchQuizForUser(selectedSubject);
					const size = quizQuestions.length
					navigate("/take-quiz", { state: { selectedSubject, size } });
				} catch (error) {
					alert("Failed to fetch quiz questions.");
					console.error(error);
				}
			} else {
				alert("Please select a subject.");
			}
		} else {
			setCurrentStep((prevStep) => prevStep + 1);
		}
	};


	const handlePrevious = () => {
		setCurrentStep((prevStep) => prevStep - 1);
	};

	const handleSubjectChange = (event) => {
		setSelectedSubject(event.target.value);
	};

	const renderStepContent = () => {
		switch (currentStep) {
			case 1:
				return (
					<div>
						<h3 className="text-info mb-2">I want to take a quiz on :</h3>
						<select
							className="form-select"
							value={selectedSubject}
							onChange={handleSubjectChange}>
							<option value="">Select a subject</option>
							{subjects.map((subject) => (
								<option key={subject} value={subject}>
									{subject}
								</option>
							))}
						</select>
					</div>
				);
			case 2:
				return (
					<div>
						<h2>Confirmation</h2>
						<p>Subject: {selectedSubject}</p>
					</div>
				);
			default:
				return null;
		}
	};

	const renderProgressBar = () => {
		const progress = currentStep === 2 ? 100 : 50;
		return (
			<div className="progress">
				<div
					className="progress-bar"
					role="progressbar"
					style={{ width: `${progress}%` }}
					aria-valuenow={progress}>
					Step {currentStep}
				</div>
			</div>
		);
	};

	return (
		<section className="mt-5">
			<h3 style={{ color: "GrayText" }} className="mb-4">
				Welcome to quiz online
			</h3>
			{renderProgressBar()}
			<div className="card">
				<div className="card-body">
					{renderStepContent()}
					<div className="d-flex justify-content-between mt-4">
						{currentStep > 1 && (
							<button className="btn btn-primary" onClick={handlePrevious}>
								Previous
							</button>
						)}
						{currentStep < 2 && (
							<button
								className="btn btn-primary"
								onClick={handleNext}
								disabled={currentStep === 1 && !selectedSubject}>
								Next
							</button>
						)}
						{currentStep === 2 && (
							<button className="btn btn-success" onClick={handleNext}>
								Start Quiz
							</button>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default QuizStepper;