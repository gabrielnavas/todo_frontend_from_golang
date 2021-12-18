const useUtils = () => {
  const capitalize = (str: string) => {
    const strCapitalized = `${str[0].toUpperCase()}${str.slice(1)}`
    return strCapitalized
  }

  return {capitalize}
}

export {useUtils}