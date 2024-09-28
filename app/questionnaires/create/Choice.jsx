import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

function Choice({ placeholder, choice, index, question, questions, setQuestions }) {

    // Add useRef to stop loss of focus on the choice inputs
    const inputRef = useRef(null);

    return (
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <input
                key={uuidv4()}
                type="text"
                ref={inputRef}
                placeholder={placeholder}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f4] focus:border-none h-14 placeholder:text-[#637588] p-4 text-base font-normal leading-normal"
                value={choice}
                onChange={(e) => {
                    const newQuestions = questions.map((quiz) => {
                      if (quiz.id === question.id) {
                        quiz.choices[index] = e.target.value;
                      }
                      return quiz;
                    });
        
                    setQuestions(newQuestions);
                    inputRef.current.focus(); // restore the focus when the state changes.
        
                    console.log('Choice: ', e.target.value);
                  }}
            />
        </div>
    )
}

export default Choice;