import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";

const InterviewModal = ({ jobTitle, questions = [], onComplete, onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [recordingStatus, setRecordingStatus] = useState("ready");
  const [timeLeft, setTimeLeft] = useState(60);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const isStoppingRef = useRef(false); // Track if we're already stopping

  // Handle cleanup
  useEffect(() => {
    return () => {
      stopMedia();
      clearTimer();
    };
  }, []);

  const stopMedia = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current = null;
    }
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setRecordingStatus("ready");
      setTimeLeft(60);
    } else {
      setCompleted(true);
      setRecordingStatus("completed");
      setTimeout(() => onComplete(), 3000);
    }
  };

  const startRecording = async () => {
    try {
      setRecordingStatus("requesting");
      setError(null);
      isStoppingRef.current = false; // Reset stopping flag

      if (!videoRef.current) {
        throw new Error("Video element not available");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: true,
      });

      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      setRecordingStatus("recording");

      setTimeLeft(60);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      const options = { mimeType: "video/webm;codecs=vp9" };
      mediaRecorderRef.current = new MediaRecorder(stream, options);

      const chunks = [];
      mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorderRef.current.start(100);
    } catch (error) {
      console.error("Error accessing media devices:", error);
      setError(
        "Failed to access camera and microphone. Please ensure you have granted permissions."
      );
      setRecordingStatus("ready");
      stopMedia();
    }
  };

  const stopRecording = () => {
    if (isStoppingRef.current) return; // If already stopping, do nothing
    isStoppingRef.current = true; // Mark that we're stopping

    clearTimer();
    stopMedia();
    moveToNextQuestion();
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
          <p className="text-gray-600">No interview questions available.</p>
          <button
            onClick={onClose}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="fixed inset-0 bg-black opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
        {/* Header */}
        <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{jobTitle}</h2>
            {!completed && (
              <p className="text-gray-600 mt-1">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={recordingStatus === "recording"}
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
              <p>{error}</p>
            </div>
          )}

          {completed ? (
            <div className="text-center py-10">
              <h3 className="text-2xl font-semibold text-green-600 mb-4">
                Thank You!
              </h3>
              <p className="text-gray-700 text-lg">
                Your application has been submitted successfully. We'll review
                your responses and get back to you soon.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {currentQuestion}
                </h3>
              </div>

              <div className="relative bg-black rounded-lg overflow-hidden mb-6">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-96 object-cover"
                />
                {recordingStatus === "recording" && (
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                    ⏱️ {timeLeft}s remaining
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                {recordingStatus === "ready" ? (
                  <button
                    onClick={startRecording}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg flex items-center transition-all"
                  >
                    <span className="mr-2">●</span> Start Recording
                  </button>
                ) : recordingStatus === "recording" ? (
                  <div className="text-center">
                    <p className="text-gray-600 mb-2">
                      Recording in progress...
                    </p>
                    <button
                      onClick={stopRecording}
                      className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-full"
                    >
                      Stop Recording
                    </button>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewModal;
