"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import Image from "next/image";

function HowToGuide() {
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    {
      number: 1,
      title: "Go to Google Takeout",
      description: "Navigate to takeout.google.com",
      link: "https://takeout.google.com",
      image: "/guide/step-1.png",
    },
    {
      number: 2,
      title: "Deselect All Products",
      description:
        'Click the "Deselect all" button at the top of the product list.',
      image: "/guide/step-2.png",
    },
    {
      number: 3,
      title: "Select Only Chrome",
      description:
        'Scroll down and find the "Chrome" product. Check the box next to Chrome.',
      image: "/guide/step-3.png",
    },
    {
      number: 4,
      title: "Customize the Data (Crucial Step)",
      description:
        'Click the "All Chrome data included" button underneath the Chrome checkbox.',
      substeps: [
        'In the pop-up, deselect everything except "BrowserHistory".',
        'Click "OK".',
      ],
      image: "/guide/step-4.png",
      important: true,
    },
    {
      number: 5,
      title: "Create the Export",
      description: 'Scroll to the bottom and click "Next step".',
      substeps: [
        "Keep the default options:",
        "• Delivery Method: Send download link via email",
        "• Frequency: Export once",
        "• File type: .zip",
        "• Size: 2 GB (or sufficient size - max is 50 GB)",
        'Click "Create export".',
      ],
      image: "/guide/step-5.png",
    },
    {
      number: 6,
      title: "Download and Upload",
      description:
        "Wait for the email from Google (this can take a few hours).",
      substeps: [
        "Click the link in the email to download the ZIP file.",
        "Extract the ZIP file (if applicable) and find the History.json file. Path: Takeout/Chrome/History.json",
        "Upload the History.json file to this website.",
      ],
      image: "/guide/step-6.png",
    },
  ];

  return (
    <div className="w-full px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-gray-800/50 hover:bg-gray-800/70 transition-colors rounded-xl p-4 sm:p-6 border border-gray-700 flex items-start sm:items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-full bg-cyan-400/20 flex items-center justify-center flex-shrink-0">
              <span className="text-cyan-400 text-xl">?</span>
            </div>
            <div className="text-left min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-white">
                How to Get Your Browser History JSON
              </h3>
              <p className="text-xs sm:text-sm text-gray-400">
                Step-by-step guide to export from Google Takeout
              </p>
            </div>
          </div>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 flex-shrink-0" />
          ) : (
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 flex-shrink-0" />
          )}
        </button>

        {/* Privacy note below button when collapsed */}
        {!isOpen && (
          <div className="mt-3 bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
            <p className="text-blue-200 text-xs sm:text-sm">
              <strong>Privacy:</strong> All data processing happens in your
              browser. Your browsing history is never uploaded to any server.
            </p>
          </div>
        )}

        {isOpen && (
          <div className="mt-4 bg-gray-800/30 rounded-xl p-4 sm:p-6 border border-gray-700 space-y-6">
            {/* Privacy note when expanded */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-blue-200 text-sm">
                <strong>Privacy:</strong> All data processing happens in your
                browser. Your browsing history is never uploaded to any server.
              </p>
            </div>

            {steps.map((step) => (
              <div
                key={step.number}
                className={`${
                  step.important
                    ? "bg-cyan-500/10 border-cyan-500/30"
                    : "bg-gray-800/50 border-gray-700"
                } border rounded-lg p-4 sm:p-6`}
              >
                {/* Step number at top */}
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={`w-8 h-8 rounded-full ${
                      step.important
                        ? "bg-cyan-400 text-black"
                        : "bg-gray-700 text-white"
                    } flex items-center justify-center font-bold text-sm flex-shrink-0`}
                  >
                    {step.number}
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-white">
                    {step.title}
                    {step.important && (
                      <span className="ml-2 text-xs bg-cyan-400/20 text-cyan-400 px-2 py-1 rounded">
                        Important
                      </span>
                    )}
                  </h4>
                </div>

                {/* Content - full width */}
                <div className="w-full">
                  <p className="text-sm sm:text-base text-gray-300 mb-2">
                    {step.description}
                  </p>
                  {step.link && (
                    <a
                      href={step.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm mt-2"
                    >
                      Open Google Takeout
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {step.substeps && (
                    <ul className="mt-3 space-y-2">
                      {step.substeps.map((substep, idx) => (
                        <li key={idx} className="text-gray-400 text-sm pl-4">
                          {substep}
                        </li>
                      ))}
                    </ul>
                  )}
                  {step.image && (
                    <div className="mt-4 rounded-lg overflow-hidden border border-gray-700 bg-gray-900">
                      <Image
                        src={step.image}
                        alt={`Step ${step.number}: ${step.title}`}
                        width={800}
                        height={450}
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <p className="text-yellow-200 text-sm">
                <strong>Note:</strong> The export process can take several hours
                depending on the size of your browsing history. You&apos;ll
                receive an email from Google when it&apos;s ready to download.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HowToGuide;
