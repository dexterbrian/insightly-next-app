import Choice from "./Choice";
import { v4 as uuidv4 } from "uuid";

function QuestionForm({question, index, questions, setQuestions} ) {
  function addChoice() {
    const newQuestions = questions.map((quiz) => {
      if (quiz._id === question._id) {
        quiz.choices.push("");
      }
      return quiz;
    });

    setQuestions(newQuestions);

    console.log("Added choice ", newQuestions);
  }

  function removeChoice() {
    const newQuestions = questions.map((quiz) => {
        if (quiz._id === question._id) {
          quiz.choices.splice(quiz.choices.length - 1, 1);
        }
        return quiz;
      });
  
      setQuestions(newQuestions);
  
      console.log("Removed choice ", newQuestions);
  }

  return (
    <>
      <div className="flex flex-row justify-between">
        <h3 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          Question {index + 1}
        </h3>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <input
          placeholder="Ask a question"
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f4] focus:border-none h-14 placeholder:text-[#637588] p-4 text-base font-normal leading-normal"
          value={question.question}
          onChange={(e) => {
            const newQuestions = questions.map((quiz) => {
              if (quiz._id === question._id) {
                quiz.question = e.target.value;
              }
              return quiz;
            });

            setQuestions(newQuestions);

            console.log('Question: ', newQuestions);
          }}
        />
      </div>

      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <input
          placeholder="Set the answer"
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f4] focus:border-none h-14 placeholder:text-[#637588] p-4 text-base font-normal leading-normal"
          value={question.answer}
          onChange={(e) => {
            const newQuestions = questions.map((quiz) => {
              if (quiz._id === question._id) {
                quiz.answer = e.target.value;
              }
              return quiz;
            });

            setQuestions(newQuestions);

            console.log('Answer: ', newQuestions);
          }}
        />
      </div>

      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <input
          placeholder="Set the weight or no. of points"
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f4] focus:border-none h-14 placeholder:text-[#637588] p-4 text-base font-normal leading-normal"
          value={question.weight === 0 ? "" : question.weight}
          onChange={(e) => {
            const newQuestions = questions.map((quiz) => {
              if (quiz._id === question._id) {
                quiz.weight = parseInt(e.target.value);
              }
              return quiz;
            });

            setQuestions(newQuestions);

            console.log('Weight: ', newQuestions);
          }}
        />
      </div>

      {question.choices.map((choice, index) => (
        <Choice
          key={uuidv4()}
          choice={choice}
          placeholder={`Option ${index + 1}`}
          index={index}
          question={question}
          questions={questions}
          setQuestions={setQuestions}
        />
      ))}

      <div className="flex flex-row">
        <div
          onClick={addChoice}
          className="cursor-pointer flex items-center gap-4 px-4 min-h-[72px] py-2"
        >
          <div
            className="text-[#111418] text-2xl flex items-center justify-center rounded-lg bg-[#f0f2f4] shrink-0 size-12"
            data-icon="Dot"
            data-size="24px"
            data-weight="regular"
          >
            +
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[#111418] dark:text-white text-base font-medium leading-normal line-clamp-1">
              Add Choice
            </p>
          </div>
        </div>
        <div
          onClick={removeChoice}
          className="cursor-pointer flex items-center gap-4 px-4 min-h-[72px] py-2"
        >
          <div
            className="text-[#111418] text-2xl flex items-center justify-center rounded-lg bg-[#f0f2f4] shrink-0 size-12"
            data-icon="Dot"
            data-size="24px"
            data-weight="regular"
          >
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
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[#111418] dark:text-white text-base font-medium leading-normal line-clamp-1">
              Remove Choice
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuestionForm;
