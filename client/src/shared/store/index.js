import { configureStore } from "@reduxjs/toolkit";
import subjectReducer from './slices/SubjectSlice';
import userReducer from "./slices/userSlice";
import quizReducer from "./slices/QuizSlice";
import branchReducer from "./slices/branchSlice";
import statusReducer from "./slices/StatusSlice";

export default configureStore({
    reducer: {
        branchReducer,
        subjectReducer,
        userReducer,
        quizReducer,
        statusReducer,
    },
});
