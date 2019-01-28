import fs from 'fs'
import path from 'path'

const promisify = (fn, ctx = null) =>
  (...args) =>
    new Promise((resolve, reject) =>
      fn.call(ctx, ...args, (err, response) =>
        err ? reject(err) : resolve(response)
      )
    )

const lstat = promisify(fs.lstat)
const readdir = promisify(fs.readdir)

const allFilesIn = (dir) => {
  return readdir(dir)
    .then(names => Promise.all(
      names.map((name) => {
        const full = path.join(dir, name)
        console.log(full)
        return lstat(full)
          .then(stat => stat.isDirectory() ? allFilesIn(full) : full)
      })
    ))
    .then(any => {
      console.log(dir, any)
      return any
    })
    .then(Array.prototype.concat) // merge arrays
}

export {
  lstat,
  readdir,
  allFilesIn,
}

// function lstat(path) {
//   return new Promise((resolve, reject) =>
//     fs.lstat(path, (err, stat) =>
//       err ? reject(err) : resolve(stat))
//   )
// }

// function readdir(path) {
//   return new Promise((resolve, reject) =>
//     fs.readdir(path, (err, files) =>
//       err ? reject(err) : resolve(files))
//   )
// }
