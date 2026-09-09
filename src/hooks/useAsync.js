import { useEffect, useState } from 'react'

const LOADING_STATE = { data: null, error: null, isLoading: true }

export const useAsync = (asyncFn) => {
  const [state, setState] = useState(LOADING_STATE)
  const [activeFn, setActiveFn] = useState(() => asyncFn)

  if (activeFn !== asyncFn) {
    setActiveFn(() => asyncFn)
    setState(LOADING_STATE)
  }

  useEffect(() => {
    let ignore = false

    asyncFn()
      .then((data) => {
        if (!ignore) setState({ data, error: null, isLoading: false })
      })
      .catch((error) => {
        if (!ignore) setState({ data: null, error, isLoading: false })
      })

    return () => {
      ignore = true
    }
  }, [asyncFn])

  return state
}
