module.exports = (debug) => {
  if (process.env.NODE_ENV === 'production') {
    return (_, [result]) => result
  }

  return (name, [results, ...infos]) => {
    infos.forEach(info => debug(`[INFO] ${name}: %s`, info))
    debug(`[RESULT] ${name}: %o`, results)

    return results
  }
}
