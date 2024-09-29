"use client"

import { useEffect, useState } from "react";
import styles from "./QuestionnaireList.css";
import TableRow from './TableRow';
import { apiUrl } from "../create/page";

export default function ListQuestionnaires() {

    const [questionnaires, setQuestionnaires] = useState([]);

    useEffect(() => {
        fetch(`${apiUrl}/api/questionnaires`)
        .then(res => res.json())
        .then(data => setQuestionnaires(data));
    }, []);

  return (
    <>
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-[#111418] dark:text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
              Questionnaires
            </p>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-medium leading-normal">
                <a href="/questionnaires/create">
                    <span className="truncate">New questionnaire</span>
                </a>
            </button>
          </div>
          <div className="px-4 py-3">
            <label className="flex flex-col min-w-40 h-12 w-full">
              <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                <div
                  className="text-[#60758a] flex border-none bg-[#f0f2f5] items-center justify-center pl-4 rounded-l-xl border-r-0"
                  data-icon="MagnifyingGlass"
                  data-size="24px"
                  data-weight="regular"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                  </svg>
                </div>
                <input
                  placeholder="Search questionnaires"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-full placeholder:text-[#60758a] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                  value=""
                  onChange={(e) => console.log(e.target.value)}
                />
              </div>
            </label>
          </div>
          <div className="px-4 py-3 @container">
            <div className="flex overflow-hidden rounded-xl border border-[#dbe0e6] ">
              <table className="flex-1">
                <thead>
                  <tr className="">
                    <th className="table-0f32c645-969d-4345-a19f-f879078285dd-column-120 px-4 py-3 text-left text-[#111418] dark:text-white w-[400px] text-sm font-medium leading-normal">
                      Title
                    </th>
                    <th className="table-0f32c645-969d-4345-a19f-f879078285dd-column-240 px-4 py-3 text-left text-[#111418] dark:text-white w-60 text-sm font-medium leading-normal">
                      Creator
                    </th>
                    <th className="table-0f32c645-969d-4345-a19f-f879078285dd-column-360 px-4 py-3 text-left text-[#111418] dark:text-white w-[400px] text-sm font-medium leading-normal">
                      Created
                    </th>
                    <th className="table-0f32c645-969d-4345-a19f-f879078285dd-column-480 px-4 py-3 text-left text-[#111418] dark:text-white w-[400px] text-sm font-medium leading-normal">
                      Modified
                    </th>
                    <th className="table-0f32c645-969d-4345-a19f-f879078285dd-column-600 px-4 py-3 text-left text-[#111418] dark:text-white w-60 text-sm font-medium leading-normal">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    questionnaires.map((questionnaire) => (
                      <TableRow
                        key={questionnaire._id}
                        id={questionnaire._id}
                        title={questionnaire.title}
                        creator={questionnaire.creator}
                        created={questionnaire.createdAt}
                        modified={questionnaire.updatedAt}
                        setQuestionnaires={setQuestionnaires}
                      />
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
