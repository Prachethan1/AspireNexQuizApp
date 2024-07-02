import axios from "axios"

export const api = axios.create({
	// baseURL: "http://localhost:9192/api/quizzes"
  baseURL: "https://enthusiastic-gentleness-production.up.railway.app/api/quizzes"
})

export const createQuestion = async(quizQustion) =>{
  try {
    const response = await api.post("/create-new-question", quizQustion)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getAllQuestions = async() =>{
  try {
    const response = await api.get("/all-questions")
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const fetchQuizForUser = async(subject) =>{
  try {
    const response = await api.get(
			`/quiz/fetch-questions-for-user?subject=${subject}`
      // `/quiz/fetch-questions-for-user`,{params:{subject}}
		)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

// export const getQuizQuestions = async (subject) => {
//   try {
//       const response = await axios.get(`${API_BASE_URL}/quiz/fetch-questions-for-user`, {
//           params: { subject }
//       });
//       return response.data;
//   } catch (error) {
//       console.error("Error fetching quiz questions", error);
//       throw error;
//   }
// };

export const getSubjects = async() =>{
  try {
    const response = await api.get("/subjects")
    return response.data
  } catch (error) {
    console.error(error)

  }
}

export const updateQuestion = async(id, question) =>{
  try {
    const response = await api.put(`/question/${id}/update`, question)
    return response.data
  } catch (error) {
    console.error(error)

  }
}

export const getQuestionById = async(id) =>{
  try {
    const response = await api.get(`/question/${id}`)
		return response.data
  } catch (error) {
    console.error(error)
  }
}

export const deleteQuestion = async(id) =>{
  try {
    const response = await api.delete(`/question/${id}/delete`)
		return response.data
  } catch (error) {
    console.error(error)
  }
}

// export const getQuizQuestions = async (subject) => {
//   try {
//       const response = await axios.get(`${API_BASE_URL}/quiz/fetch-questions-for-user`, {
//           params: { subject }
//       });
//       return response.data;
//   } catch (error) {
//       console.error("Error fetching quiz questions", error);
//       throw error;
//   }
// };