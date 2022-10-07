import { createContext, useContext as useReactContext } from 'react';
export const UserContext = createContext({})

export const useContext = () => {
  const reactContext = useReactContext(UserContext);
  if (typeof (reactContext.data) === 'undefined') {
    console.log("[Context] undefined", reactContext)
    return { name: undefined }
  } else {
    console.log("[Context] defined", reactContext)
    return reactContext.data
  }
}
export const useSetContext = (data) => {
  const reactContext = useReactContext(UserContext);
  return reactContext.data// = data
}