var somePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("hey");
  })
})

somePromise.then((message) => {
  console.log("success", message)
})
