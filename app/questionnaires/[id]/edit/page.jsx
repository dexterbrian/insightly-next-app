"use client"

import { useEffect, useState } from "react";
import QuestionForm from "./QuestionForm";
import QuestionnaireForm from "../../create/page";

function EditQuestionnaireForm({ params }) {

  return (
    <>
      <QuestionnaireForm params={params} />
    </>
  );
}

export default EditQuestionnaireForm;
