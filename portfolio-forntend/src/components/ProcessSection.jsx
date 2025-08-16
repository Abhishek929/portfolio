import React from 'react';
import './ProcessSection.css';
import diagnosisIcon from '../assets/diagnosis.png';
import repairIcon from '../assets/repair.png';
import finalChecksIcon from '../assets/final-checks.png';

const steps = [
  {
    icon: diagnosisIcon,
    title: 'Diagnosis',
    description:
      'Our thorough diagnosis identifies issues accurately, allowing us to provide effective solutions that address your car’s specific needs.',
  },
  {
    icon: repairIcon,
    title: 'Repair',
    description:
      'With expert repair services, we fix any issues with precision and care, ensuring your vehicle is safe and in optimal condition.',
  },
  {
    icon: finalChecksIcon,
    title: 'Final Checks',
    description:
      'Before handing back your car, we perform meticulous final checks to guarantee that every aspect is working perfectly and meets our high standards.',
  },
];

const ProcessSection = () => {
  return (
    <section className="process-section">
      <div className="left-content">
        <h2>Our Process</h2>
        <h4>How We Work</h4>
        <p>
          Our service process is designed to ensure your car receives the best care. From
          diagnostics to final checks, we prioritize quality and efficiency.
        </p>
      </div>
      <div className="right-content">
        {steps.map((step, index) => (
          <div className="step" key={index}>
            <img src={step.icon} alt={`${step.title} icon`} className="step-icon" />
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProcessSection;
