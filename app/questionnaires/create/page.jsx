"use client"

import { useEffect, useState } from "react";
import QuestionForm from "./QuestionForm";

export const apiUrl = 'http://localhost:3000';
export const appUrl = 'http://localhost:3001';

function QuestionnaireForm({ params }) {
  
  const [questionnaire, setQuestionnaire] = useState({
    creator: '',
    title: ''
  });
  const [questions, setQuestions] = useState([
    {
      _id: 1,
      question: '',
      choices: ['', '', ''],
      answer: '',
      weight: 0,
    },
  ]);

  // Fetch questionnaire specified using the id from the URL
  if (params.id !== undefined) {
    useEffect(() => {
      fetch(`${apiUrl}/api/questionnaires/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setQuestionnaire(data.questionnaire);
        setQuestions(data.questions)
      });
    }, []);
  }

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  function addQuestion() {
    setQuestions([
      ...questions,
      {
        _id: questions.length + 1,
        question: '',
        choices: ['', '', ''],
        answer: '',
        weight: 0
      }
    ]);
    console.log("Question added: ", questions);
  }

  function removeQuestion() {
    const remainingQuestions = questions.filter(question => question._id !== questions.length);
    setQuestions(remainingQuestions);
    console.log('Removed question. Left with: ', remainingQuestions);
  }

  async function createQuestionnaire() {
    // Clear success or error messages
    setErrorMessage('');
    setSuccessMessage('');

    // Add id as a parameter in the url if it exists
    const id = params.id !== undefined ? `/${params.id}` : '';
    try {
      const response = await fetch(`${apiUrl}/api/questionnaires${id}`, {
        method: params.id !== undefined ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          creator: questionnaire.creator,
          title: questionnaire.title,
          questions: questions.map((question) => {
            return {
              question: question.question,
              choices: question.choices,
              answer: question.answer,
              weight: question.weight
            }
          })
        }),
      }).then((res) => res.json());

      if (response.result === 1) {
        setSuccessMessage(`${appUrl}/questionnaires/${params.id}/submit`);
      } else {
        setSuccessMessage(`${appUrl}/questionnaires/${response.questionnaire._id}/submit`);
      }
      console.log('Questionnaire created: ', response);
    } catch (error) {
      setErrorMessage('Questionnaire creation error: ' + error);
      console.log('Questionnaire creation error: ', error);
    }
  }

  return (
    <>
      <div
        className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden"
        style={{
          "--radio-dot-svg": `url('data:image/svg+xml,<svg viewBox="0 0 16 16" fill="rgb(17,20,24)" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="3"/></svg>')`,
          fontFamily: '"Work Sans", "Noto Sans", sans-serif',
        }}
      >
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 flex-1">
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <p className="text-[#111418] dark:text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
                  Create/Edit a Questionnaire
                </p>
              </div>
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <input
                    placeholder="Questionnaire Title"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f4] focus:border-none h-14 placeholder:text-[#637588] p-4 text-base font-normal leading-normal"
                    value={questionnaire.title}
                    onChange={(e) => {
                      setQuestionnaire({
                        creator: questionnaire.creator,
                        title: e.target.value
                      });

                      console.log('title: ', e.target.value);
                    }}
                  />
              </div>
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <input
                    placeholder="Name of the author"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f4] focus:border-none h-14 placeholder:text-[#637588] p-4 text-base font-normal leading-normal"
                    value={questionnaire.creator}
                    onChange={(e) => {
                      setQuestionnaire({
                        creator: e.target.value,
                        title: questionnaire.title
                      });

                      console.log('creator: ', e.target.value);
                    }}
                  />
              </div>
              {
                questions.map((question, index) => (
                  <QuestionForm key={question._id} question={question} index={index} questions={questions} setQuestions={setQuestions} />
                ))
              }

              <div className="flex justify-stretch">
                <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-end">
                  <button onClick={removeQuestion} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f4] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span className="truncate">Remove question</span>
                  </button>
                  <button onClick={addQuestion} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f4] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]">
                    <span className="truncate">Add question</span>
                  </button>
                  <button onClick={createQuestionnaire} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                    <span className="truncate">Done</span>
                  </button>
                </div>
              </div>
            {
              errorMessage && (
                <div className="text-red-500 text-sm font-normal leading-normal">
                  {errorMessage}
                </div>
              )
            }

            {
              successMessage && (
                <div className="text-green-500 text-sm font-normal leading-normal">
                  Questionnaire created. Click here to view: <a href={successMessage}>{successMessage}</a>
                </div>
              )
            }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuestionnaireForm;
