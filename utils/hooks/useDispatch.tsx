import { store } from "../../store";

export const useDispatch = () => {
    return store.dispatch;
}