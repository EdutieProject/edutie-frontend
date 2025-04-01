import {Dispatch, SetStateAction} from "react";
import {ApiError} from "src/services/types";

interface UniversalModalParams {
    isOpen: boolean;
    handleClose: () => void;
    setError: Dispatch<SetStateAction<ApiError | undefined>>
}