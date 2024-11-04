const convertVNDToUSD = (vndAmount) => {
    const exchangeRate = 24000
    const usdAmount = vndAmount / exchangeRate
    return usdAmount.toFixed(2)
}

export default convertVNDToUSD
