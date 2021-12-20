const useUtils = () => {
  const capitalize = (str: string) => {
    const strCapitalized = `${str[0].toUpperCase()}${str.slice(1)}`
    return strCapitalized
  }

  const capitalizeWithEndDot = (str: string) => {
    const strCapitalized = `${capitalize(str)}.`
    return strCapitalized
  }

  return {capitalize, capitalizeWithEndDot}
}

export {useUtils}